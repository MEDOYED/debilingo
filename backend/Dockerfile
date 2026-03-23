 # Використовуємо офіційний образ Node.js версії 18 на Alpine Linux (легка версія)
  FROM node:18-alpine

  # Встановлюємо робочу директорію всередині контейнера
  WORKDIR /app

  # Копіюємо package.json та package-lock.json
  # Це робимо окремо для кращого кешування Docker layers
  COPY package*.json ./

  # Встановлюємо тільки production залежності (без devDependencies)
  # --omit=dev = не встановлювати devDependencies
  RUN npm ci --omit=dev

  # Копіюємо весь вихідний код
  COPY . .

  # Білдимо TypeScript → JavaScript
  RUN npm run build

  # Видаляємо вихідні файли TypeScript після білду (зменшуємо розмір образу)
  RUN rm -rf src

  # Вказуємо порт який буде слухати додаток
  # Fly.io автоматично прокидає трафік на цей порт
  EXPOSE 8080

  # Команда для запуску сервера
  CMD ["npm", "start"]

