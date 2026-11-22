import test from "node:test";
import assert from "node:assert/strict";
import { registrationEntry } from "../src/lib/legalityChecker";

test("Road entry preserves the identity of a registration when suggesting spacing", () => {
  for (const input of ["ab51cde", "AB 51 CDE", "AB51   CDE"]) {
    const result = registrationEntry(input, false);
    assert.equal(result.ready, false);
    assert.equal(result.correction, "AB51 CDE");
    assert.equal(registrationEntry(result.correction!, false).ready, true);
  }
});

test("Mistyped and unrelated entries never become corrected registrations", () => {
  for (const input of ["", "12345", "JAMES", "SW1A 1AA", "POST OFFICE", "AB51-CDE", "AB51 CDE extra", "AB5O CDE", "AB51 CDß", "AB51💡CDE"]) {
    const entry = registrationEntry(input, false);
    assert.equal(entry.ready, false, input);
    assert.equal(entry.correction, undefined, input);
  }
});

test("Display text and road registration have separate ordering rules", () => {
  assert.equal(registrationEntry("JAMES", true).ready, true);
  assert.equal(registrationEntry("JAMES", false).ready, false);
  assert.equal(registrationEntry("Q123 ABC", false).ready, true);
  assert.equal(registrationEntry("BIG 1234", false).ready, true);
});

test("Registration format checks keep ambiguous and non-ASCII characters intact", () => {
  for (const input of ["AB5O CDE", "AB51 CD0", "ＡB51 CDE", "АB51 CDE", "AB51\tCDE", "AB51 CDE🚘"]) {
    const result = registrationEntry(input, false);
    assert.equal(result.ready, false, input);
    assert.equal(result.correction, undefined, input);
  }
  for (const input of ["A123 BCD", "ABC 123D", "BIG 1234", "1234 AB"]) {
    assert.equal(registrationEntry(input, false).ready, true, input);
  }
});
