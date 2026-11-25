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

    it("should trim spaces at the beginning and at the end of class name string", () => {
      const result = cx("  button ", " primary   ");
      expect(result).toBe("button primary");
    });
  });

  describe("falsy values", () => {
    it("should correctly handle and ignore undefined values", () => {
      const result = cx("button", undefined, "active");
      expect(result).toBe("button active");
    });

    it("should correctly handle and ignore null values", () => {
      const result = cx("button", null, "active");
      expect(result).toBe("button active");
    });
  });

  describe("conditions", () => {
    it("should ignore boolean (false) params when conditions work", () => {
      const isActive = false;
      const result = cx(isActive && "active", "button");
      expect(result).toBe("button");
    });

    it("should properly handle cases where different conditions are passed", () => {
      const isActive = true;
      const result = cx(isActive && "active", "button");
      expect(result).toBe("active button");
    });
  });
});
