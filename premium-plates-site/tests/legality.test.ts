import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * tests/legality.test.ts
 * 
 * DVLA Number Plate Legality & Format Verification Test Suite.
 * Authoritative sources:
 *  - ORIGINAL_REQUEST.md § Acceptance Criteria
 *  - PROJECT.md § Interface Contracts (src/lib/legalityChecker.ts)
 *  - BS AU 145e & DVLA INF104 Specifications (explorer_survey_3/analysis.md § 2.5)
 */

interface LegalityResult {
  isLegal: boolean;
  formattedReg: string;
  formatStyle: string; // 'current' | 'prefix' | 'suffix' | 'dateless' | 'invalid' | 'empty' | 'misspaced'
  reason: string;
}

type LegalityCheckerFn = (registration: string) => LegalityResult;

import { checkLegality } from '../src/lib/legalityChecker';

const checkerFilePath = path.resolve('src/lib/legalityChecker.ts');
let checkerLoadError: Error | null = null;

function runOrSkip(t: any, testFn: (fn: LegalityCheckerFn) => void | Promise<void>) {
  if (!fs.existsSync(checkerFilePath)) {
    if (process.env.STRICT_REQUIRE_ALL === 'true') {
      assert.fail(`Module ${checkerFilePath} does not exist (required in STRICT mode).`);
    } else {
      t.skip('Pending Milestone 3 implementation of src/lib/legalityChecker.ts');
      return;
    }
  }

  if (checkerLoadError) {
    assert.fail(`Failed to load src/lib/legalityChecker.ts: ${checkerLoadError.message}`);
  }

  if (typeof checkLegality !== 'function') {
    assert.fail('src/lib/legalityChecker.ts does not export a checkLegality function');
  }

  return testFn(checkLegality);
}

describe('R5.1 DVLA Number Plate Legality Checker Suite', () => {

  describe('Tier 1: Feature Coverage (Valid Road-Legal Formats)', () => {
    test('1. Validates Current format (2001-present): "AB51 CDE"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('AB51 CDE');
        assert.strictEqual(res.isLegal, true, 'AB51 CDE should be road-legal');
        assert.strictEqual(res.formatStyle, 'current');
        assert.strictEqual(res.formattedReg, 'AB51 CDE');
        assert.match(res.reason, /current/i);
      });
    });

    test('2. Validates Prefix format (1983-2001): "A123 BCD"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('A123 BCD');
        assert.strictEqual(res.isLegal, true, 'A123 BCD should be road-legal');
        assert.strictEqual(res.formatStyle, 'prefix');
        assert.strictEqual(res.formattedReg, 'A123 BCD');
        assert.match(res.reason, /prefix/i);
      });
    });

    test('3. Validates Suffix format (1963-1983): "ABC 123D"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('ABC 123D');
        assert.strictEqual(res.isLegal, true, 'ABC 123D should be road-legal');
        assert.strictEqual(res.formatStyle, 'suffix');
        assert.strictEqual(res.formattedReg, 'ABC 123D');
        assert.match(res.reason, /suffix/i);
      });
    });

    test('4. Validates Dateless format (numbers first): "1 A"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('1 A');
        assert.strictEqual(res.isLegal, true, '1 A should be road-legal dateless');
        assert.strictEqual(res.formatStyle, 'dateless');
        assert.strictEqual(res.formattedReg, '1 A');
        assert.match(res.reason, /dateless/i);
      });
    });

    test('5. Validates Dateless format (letters first): "ABC 1"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('ABC 1');
        assert.strictEqual(res.isLegal, true, 'ABC 1 should be road-legal dateless');
        assert.strictEqual(res.formatStyle, 'dateless');
        assert.strictEqual(res.formattedReg, 'ABC 1');
        assert.match(res.reason, /dateless/i);
      });
    });

    test('6. Validates Dateless format (3 numbers, 3 letters): "123 ABC"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('123 ABC');
        assert.strictEqual(res.isLegal, true, '123 ABC should be road-legal dateless');
        assert.strictEqual(res.formatStyle, 'dateless');
      });
    });

    test('7. Validates Northern Ireland Cherished format: "BIG 1234"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('BIG 1234');
        assert.strictEqual(res.isLegal, true, 'BIG 1234 should be road-legal');
        assert.strictEqual(res.formatStyle, 'dateless');
      });
    });
  });

  describe('Tier 2: Boundary & Corner Cases (Invalid Characters, Lengths & Spacing)', () => {
    test('8. Flags forbidden letter "Q" in registration: "AB51 CDQ"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('AB51 CDQ');
        assert.strictEqual(res.isLegal, false);
        assert.match(res.reason, /'Q'|letter q/i);
      });
    });

    test('9. Flags forbidden letter "I" in GB standard registration: "AB51 IDE"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('AB51 IDE');
        assert.strictEqual(res.isLegal, false);
        assert.match(res.reason, /'I'|letter i/i);
      });
    });

    test('10. Flags length exceeding 7 characters: "PREMIUM1"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('PREMIUM1');
        assert.strictEqual(res.isLegal, false);
        assert.match(res.reason, /length|7|exceeds/i);
      });
    });

    test('11. Flags altered spacing: "AB 51CDE"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('AB 51CDE');
        assert.strictEqual(res.isLegal, false);
        assert.match(res.reason, /spacing|altered/i);
      });
    });

    test('12. Flags missing required space: "AB51CDE"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('AB51CDE');
        assert.strictEqual(res.isLegal, false);
        assert.match(res.reason, /space|missing/i);
      });
    });

    test('13. Flags leading zero in number group: "A012 BCD"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('A012 BCD');
        assert.strictEqual(res.isLegal, false);
        assert.match(res.reason, /zero|cannot begin/i);
      });
    });

    test('14. Handles empty string gracefully: ""', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('');
        assert.strictEqual(res.isLegal, false);
        assert.match(res.reason, /enter|empty/i);
      });
    });

    test('15. Flags non-alphanumeric symbols: "AB51-CDE" or "AB51@CDE"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('AB51-CDE');
        assert.strictEqual(res.isLegal, false);
        assert.match(res.reason, /invalid|character|symbol/i);
      });
    });

    test('16. Flags unissued age identifier "00": "AB00 CDE"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('AB00 CDE');
        assert.strictEqual(res.isLegal, false);
        assert.match(res.reason, /00|unissued|invalid/i);
      });
    });

    test('17. Flags invalid prefix year letter "Z": "Z123 BCD"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('Z123 BCD');
        assert.strictEqual(res.isLegal, false);
        assert.match(res.reason, /'Z'|invalid|prefix/i);
      });
    });

    test('18. Flags invalid suffix year letter "Z": "ABC 123Z"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('ABC 123Z');
        assert.strictEqual(res.isLegal, false);
        assert.match(res.reason, /'Z'|invalid|suffix/i);
      });
    });

    test('19. Handles multiple interior spaces: "AB51   CDE"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('AB51   CDE');
        assert.strictEqual(res.isLegal, false);
        assert.match(res.reason, /space|spacing/i);
      });
    });
  });

  describe('Tier 3: Normalization & Boundary Tolerances', () => {
    test('20. Normalizes lowercase characters: "ab51 cde" -> "AB51 CDE"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('ab51 cde');
        assert.strictEqual(res.isLegal, true);
        assert.strictEqual(res.formattedReg, 'AB51 CDE');
        assert.strictEqual(res.formatStyle, 'current');
      });
    });

    test('21. Trims leading and trailing whitespace: "  PP24 LUX  "', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('  PP24 LUX  ');
        assert.strictEqual(res.isLegal, true);
        assert.strictEqual(res.formattedReg, 'PP24 LUX');
        assert.strictEqual(res.formatStyle, 'current');
      });
    });

    test('22. Validates shortest possible dateless plate: "A 1"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('A 1');
        assert.strictEqual(res.isLegal, true);
        assert.strictEqual(res.formatStyle, 'dateless');
      });
    });

    test('23. Validates 4-digit dateless plate: "9999 LUX"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('9999 LUX');
        assert.strictEqual(res.isLegal, true);
        assert.strictEqual(res.formatStyle, 'dateless');
      });
    });

    test('24. Validates Northern Ireland 2-letter format: "AZ 1234"', (t) => {
      runOrSkip(t, (checker) => {
        const res = checker('AZ 1234');
        assert.strictEqual(res.isLegal, true);
        assert.strictEqual(res.formatStyle, 'dateless');
      });
    });

    test('25. Reason message always populated and non-empty', (t) => {
      runOrSkip(t, (checker) => {
        const inputs = ['AB51 CDE', 'A123 BCD', 'AB51 CDQ', '', 'INVALID', '123 456'];
        for (const input of inputs) {
          const res = checker(input);
          assert.ok(typeof res.reason === 'string' && res.reason.length > 0, `Reason must be non-empty string for input "${input}"`);
          assert.ok(typeof res.isLegal === 'boolean', `isLegal must be boolean for input "${input}"`);
        }
      });
    });
  });
});
