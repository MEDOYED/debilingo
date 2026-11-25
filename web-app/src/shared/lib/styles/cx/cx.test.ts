import { describe, expect, it } from "vitest";
import { cx } from "./cx";

describe("cx", () => {
  describe("strings only", () => {
    it("should return an empty string when no arguments are provided", () => {
      const result = cx();
      expect(result).toBe("");
    });

    it("should return a single class name without changes", () => {
      const result = cx("someClassName");
      expect(result).toBe("someClassName");
    });

    it("should join multiple class names with a single space", () => {
      const result = cx("button", "primary", "large");
      expect(result).toBe("button primary large");
    });

    it("should ignore empty class name string", () => {
      const result = cx("button", "", "primary");
      expect(result).toBe("button primary");
    });

    it("should ignore empty class name string with spaces: '    '", () => {
      const result = cx("button", "   ", "primary");
      expect(result).toBe("button primary");
    });
  });
});
