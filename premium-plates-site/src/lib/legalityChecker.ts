/**
 * DVLA Number Plate Legality & Syntax Verification Engine.
 * 
 * Complies with:
 * - BS AU 145e (British Standard specification for retroreflecting number plates)
 * - DVLA INF104 (Vehicle registration numbers and number plates)
 * - The Road Vehicles (Display of Registration Marks) Regulations 2001
 * 
 * Formats supported:
 * 1. Current (2001 to present): 2 letters + 2 numbers + space + 3 letters (e.g. "AB51 CDE")
 * 2. Prefix (1983 to 2001): 1 letter + 1-3 numbers + space + 3 letters (e.g. "A123 BCD")
 * 3. Suffix (1963 to 1983): 3 letters + 1-3 numbers + space + 1 letter (e.g. "ABC 123D")
 * 4. Dateless / Cherished (pre-1963): 1-3 letters + 1-4 numbers OR 1-4 numbers + 1-3 letters
 */

export interface LegalityResult {
  isLegal: boolean;
  formattedReg: string;
  formatStyle: "current" | "prefix" | "suffix" | "dateless" | "invalid" | "empty" | "misspaced";
  reason: string;
  badgeLegalNote?: string;
}

export function checkLegality(rawReg: string): LegalityResult {
  if (!rawReg || typeof rawReg !== "string") {
    return {
      isLegal: false,
      formattedReg: "",
      formatStyle: "empty",
      reason: "Please enter your vehicle registration to check road legality.",
    };
  }

  const trimmed = rawReg.trim().toUpperCase();
  if (trimmed.length === 0) {
    return {
      isLegal: false,
      formattedReg: "",
      formatStyle: "empty",
      reason: "Please enter your vehicle registration to check road legality.",
    };
  }

  // Remove all internal spacing for raw character validation
  const compact = trimmed.replace(/\s+/g, "");

  // Check character legality: Only A-Z and 0-9 allowed
  if (/[^A-Z0-9]/.test(compact)) {
    return {
      isLegal: false,
      formattedReg: trimmed,
      formatStyle: "invalid",
      reason: "Contains invalid characters or symbols. Only letters and numbers are permitted.",
    };
  }

  // Length boundaries: UK marks are between 2 and 7 characters (compact)
  if (compact.length < 2) {
    return {
      isLegal: false,
      formattedReg: trimmed,
      formatStyle: "invalid",
      reason: "Registration is too short to be a valid UK mark (minimum 2 characters).",
    };
  }

  if (compact.length > 7) {
    return {
      isLegal: false,
      formattedReg: trimmed,
      formatStyle: "invalid",
      reason: "Registration exceeds the maximum legal UK plate length of 7 characters.",
    };
  }

  // 1. Current Format: LLNN LLL (e.g., AB51 CDE)
  const currentMatch = compact.match(/^([A-Z]{2})([0-9]{2})([A-Z]{3})$/);
  if (currentMatch) {
    const [, area, age, random] = currentMatch;

    // Age identifier "00" has never been issued by DVLA
    if (age === "00") {
      return {
        isLegal: false,
        formattedReg: `${area}${age} ${random}`,
        formatStyle: "invalid",
        reason: "Unissued age identifier '00' is invalid under DVLA registration schemes.",
      };
    }

    // Current format does not use letters I or Q in area code, nor I or Q in random 3 letters
    if (/[IQ]/.test(area) || /[IQ]/.test(random)) {
      return {
        isLegal: false,
        formattedReg: `${area}${age} ${random}`,
        formatStyle: "invalid",
        reason: "Letters 'I' and 'Q' cannot be issued in current standard UK series marks.",
      };
    }

    const canonicalSpacing = `${area}${age} ${random}`;
    const isCorrectSpacing = trimmed === canonicalSpacing;

    return {
      isLegal: isCorrectSpacing,
      formattedReg: canonicalSpacing,
      formatStyle: isCorrectSpacing ? "current" : "misspaced",
      reason: isCorrectSpacing
        ? "Road Legal: Standard current-issue UK registration (BS AU 145e compliant)."
        : `Show plate only: missing or incorrect space. Legal spacing must be "${canonicalSpacing}".`,
      badgeLegalNote: "Compatible with legal UK, Union Flag, and national identifier flags.",
    };
  }

  // 2. Prefix Format: L N{1,3} LLL (e.g., A123 BCD, A1 BCD)
  const prefixMatch = compact.match(/^([A-Z]{1})([0-9]{1,3})([A-Z]{3})$/);
  if (prefixMatch) {
    const [, prefixYear, seq, letters] = prefixMatch;

    // Prefix number group cannot start with zero (e.g. A012 BCD is illegal)
    if (seq.startsWith("0")) {
      return {
        isLegal: false,
        formattedReg: `${prefixYear}${seq} ${letters}`,
        formatStyle: "invalid",
        reason: "Number sequence cannot begin with a leading zero in prefix marks.",
      };
    }

    if (/[IQZ]/.test(prefixYear) || /[IQ]/.test(letters)) {
      return {
        isLegal: false,
        formattedReg: `${prefixYear}${seq} ${letters}`,
        formatStyle: "invalid",
        reason: "Prefix marks do not use 'I' or 'Q' in random letters, or 'I', 'Q', 'Z' as year prefixes.",
      };
    }

    const canonicalSpacing = `${prefixYear}${seq} ${letters}`;
    const isCorrectSpacing = trimmed === canonicalSpacing;

    return {
      isLegal: isCorrectSpacing,
      formattedReg: canonicalSpacing,
      formatStyle: isCorrectSpacing ? "prefix" : "misspaced",
      reason: isCorrectSpacing
        ? "Road Legal: Authentic prefix-style UK registration (1983–2001)."
        : `Show plate only: missing or incorrect space. Legal spacing must be "${canonicalSpacing}".`,
    };
  }

  // 3. Suffix Format: LLL N{1,3} L (e.g., ABC 123D, ABC 1D)
  const suffixMatch = compact.match(/^([A-Z]{3})([0-9]{1,3})([A-Z]{1})$/);
  if (suffixMatch) {
    const [, letters, seq, suffixYear] = suffixMatch;

    if (seq.startsWith("0")) {
      return {
        isLegal: false,
        formattedReg: `${letters} ${seq}${suffixYear}`,
        formatStyle: "invalid",
        reason: "Number sequence cannot begin with a leading zero in suffix marks.",
      };
    }

    if (/[IQ]/.test(letters) || /[IQZ]/.test(suffixYear)) {
      return {
        isLegal: false,
        formattedReg: `${letters} ${seq}${suffixYear}`,
        formatStyle: "invalid",
        reason: "Suffix marks do not use 'I' or 'Q' in prefix letters, or 'I', 'Q', 'Z' as suffix year letters.",
      };
    }

    const canonicalSpacing = `${letters} ${seq}${suffixYear}`;
    const isCorrectSpacing = trimmed === canonicalSpacing;

    return {
      isLegal: isCorrectSpacing,
      formattedReg: canonicalSpacing,
      formatStyle: isCorrectSpacing ? "suffix" : "misspaced",
      reason: isCorrectSpacing
        ? "Road Legal: Historic suffix-style UK registration (1963–1983)."
        : `Show plate only: missing or incorrect space. Legal spacing must be "${canonicalSpacing}".`,
    };
  }

  // 4. Dateless / Cherished / Northern Ireland Formats:
  // Form A: 1-3 letters + 1-4 numbers (e.g. 1 A, 12 AB, 1234 ABC, A 1, AB 12, ABC 1234)
  const datelessA = compact.match(/^([A-Z]{1,3})([0-9]{1,4})$/);
  if (datelessA) {
    if (datelessA[2].startsWith("0")) {
      return {
        isLegal: false,
        formattedReg: `${datelessA[1]} ${datelessA[2]}`,
        formatStyle: "invalid",
        reason: "Number sequence cannot begin with a leading zero in dateless marks.",
      };
    }

    const canonicalSpacing = `${datelessA[1]} ${datelessA[2]}`;
    const isCorrectSpacing = trimmed === canonicalSpacing;
    return {
      isLegal: isCorrectSpacing,
      formattedReg: canonicalSpacing,
      formatStyle: isCorrectSpacing ? "dateless" : "misspaced",
      reason: isCorrectSpacing
        ? "Road Legal: Classic dateless / cherished UK mark."
        : `Show plate only: missing or incorrect space. Legal spacing must be "${canonicalSpacing}".`,
    };
  }

  // Form B: 1-4 numbers + 1-3 letters (e.g. 1 A, 123 ABC)
  const datelessB = compact.match(/^([0-9]{1,4})([A-Z]{1,3})$/);
  if (datelessB) {
    if (datelessB[1].startsWith("0")) {
      return {
        isLegal: false,
        formattedReg: `${datelessB[1]} ${datelessB[2]}`,
        formatStyle: "invalid",
        reason: "Number sequence cannot begin with a leading zero in dateless marks.",
      };
    }

    const canonicalSpacing = `${datelessB[1]} ${datelessB[2]}`;
    const isCorrectSpacing = trimmed === canonicalSpacing;
    return {
      isLegal: isCorrectSpacing,
      formattedReg: canonicalSpacing,
      formatStyle: isCorrectSpacing ? "dateless" : "misspaced",
      reason: isCorrectSpacing
        ? "Road Legal: Inverted classic dateless / Northern Ireland mark."
        : `Show plate only: missing or incorrect space. Legal spacing must be "${canonicalSpacing}".`,
    };
  }

  // If no standard grammar matches
  return {
    isLegal: false,
    formattedReg: trimmed,
    formatStyle: "invalid",
    reason: "Show Plate Only: Custom or non-standard format not matching DVLA registration schemas.",
  };
}

export default checkLegality;
