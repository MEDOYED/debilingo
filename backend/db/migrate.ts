import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

const databaseUrlConnectionString = process.env.DATABASE_URL_CONNECTION_STRING;

if (!databaseUrlConnectionString) {
  console.error("Error: DATABASE_URL_CONNECTION_STRING is not exist in .env backend file");
  process.exit(1);
}

export const runMigrations = async (): Promise<void> => {
  console.log("Launch migrations system...");
  const client = new Client({
    connectionString: databaseUrlConnectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  // path to this file backend/db/migrate.ts
  const thisFilePath = url.fileURLToPath(import.meta.url);

  // path to backend/db folder
  const dirnamePath = path.dirname(thisFilePath);

  const migrationsFolderPath = path.join(dirnamePath, "migrations");

  if (!fs.existsSync(migrationsFolderPath)) {
    console.error("migrations folder not found in backend/db/migrations. Check is it folder exist");
    return;
  }

  let hasError: boolean = false;

  try {
    // create table _migrations if it is not exist yet
    await client.query(`
        CREATE TABLE IF NOT EXISTS _migrations (
          id SERIAL PRIMARY KEY,
          filename VARCHAR(255) NOT NULL UNIQUE,
          applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);

    const { rows: appliedRows } = await client.query<{ filename: string }>(`
        SELECT filename FROM _migrations ORDER BY id ASC;
      `);

    const appliedMigrationsSet = new Set(appliedRows.map((appliedRow) => appliedRow.filename));

    const allMigrationsFilenamesInMigrationsFolder = fs
      .readdirSync(migrationsFolderPath)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    let appliedCount = 0;

    for (const file of allMigrationsFilenamesInMigrationsFolder) {
      if (appliedMigrationsSet.has(file)) {
        console.log(`Skip migaration from file: ${file}. It was already applied in your database`);
        continue;
      }

      console.log(`migration from file: ${file} in progress...`);

      const filePath = path.join(migrationsFolderPath, file);
      const sql = fs.readFileSync(filePath, "utf-8");

      await client.query("BEGIN");

      try {
        await client.query(sql);

        await client.query(`INSERT INTO _migrations (filename) VALUES ($1);`, [file]);

        console.log(`Success: migration from file: ${file} applied successfully`);

        await client.query("COMMIT");

        appliedCount = appliedCount + 1;
      } catch (error) {
        await client.query("ROLLBACK");

        console.error(`Error: something went wrong with migration from file ${file}`);
        console.error(error.message);
        throw error;
      }
    }

    if (appliedCount === 0) {
      console.log("Finished: All migrations where already applied. Now applied 0 new migrations");
    } else {
      console.log(`Finished: Now applied ${appliedCount} new migration(s)`);
    }
  } catch (error) {
    hasError = true;
    console.log("error. Migration process was stopped");
  } finally {
    await client.end();

    if (hasError) {
      process.exit(1);
    }
  }
};

runMigrations();
