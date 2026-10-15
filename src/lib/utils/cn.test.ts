/**
 * src/lib/utils/cn.test.ts
 * Unit test untuk cn() utility.
 */

import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn()", () => {
  it("menggabungkan beberapa class menjadi satu string", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("mengabaikan nilai falsy", () => {
    expect(cn("foo", undefined, null, false, "", "bar")).toBe("foo bar");
  });

  it("mengembalikan string kosong jika semua nilai falsy", () => {
    expect(cn(undefined, null, false)).toBe("");
  });

  it("mengembalikan class tunggal jika hanya satu nilai", () => {
    expect(cn("only")).toBe("only");
  });
});
