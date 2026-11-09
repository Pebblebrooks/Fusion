/**
 * CPF policy constants and rate tables (January 2026). Update each January when CPF Board publishes new values.
 * Extracted from App.jsx (App_170) — logic unchanged.
 */

// ── Silver Housing Bonus lookup table ─────────────────────────────────────────
// Source: HDB SHB eligibility matrix. Validate against HDB website each January.
// Key: '{fromRooms}r_to_{toRooms}r'
export const SHS_BONUS_RA = {
  '5r_to_4r': 15000, '5r_to_3r': 20000, '5r_to_2r': 25000,
  '4r_to_3r': 15000, '4r_to_2r': 20000,
  '3r_to_2r': 15000,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CPF POLICY CONSTANTS — UPDATE EACH JANUARY WHEN CPF BOARD PUBLISHES NEW VALUES
// ───────────────────────────────────────────────────────────────────────────────
// Checklist of values that change annually:
//   [ ] RETIREMENT_SUMS_2026  — BRS / FRS / ERS / BHS (CPF Board circular, ~Aug–Sep)
//   [ ] ANNUAL_LIMIT          — CPF Annual Contribution Limit (Budget announcement)
//   [ ] CPF_RATES             — OA / SA / MA / RA interest rates (usually stable)
//   [ ] MMSS_PILOT_END_YEAR   — if CPF Board extends the MediSave Matched Savings Scheme
//   [ ] PR_CONTRIBUTION_RATES — G/G rate tables (below) if CPF Board revises PR rates
//   [ ] PR_FG_CONTRIBUTION_RATES — F/G rate tables (below) if revised
// After updating, do a global search for the old year (e.g. "2026") to catch any
// prose references in UI strings that also need bumping.
// ═══════════════════════════════════════════════════════════════════════════════

export const CPF_RATES = { OA: 0.025, SA: 0.04, MA: 0.04, RA: 0.04, EXTRA_1: 0.01, EXTRA_2: 0.01 };

// 2026 SC / PR(3rd yr+) contribution allocation by age band — CPF Board Table 1 (1 Jan 2026).
// Fractions of wages; `sa` is credited to RA from 55. Used for age-band step-down (Path C) and Barista FIRE.
export const scAllocBand = (age) => {
  if (age <= 35) return { total: 0.37,  oa: 0.23,  sa: 0.06,  ma: 0.08  };
  if (age <= 45) return { total: 0.37,  oa: 0.21,  sa: 0.07,  ma: 0.09  };
  if (age <= 50) return { total: 0.37,  oa: 0.19,  sa: 0.08,  ma: 0.10  };
  if (age <= 55) return { total: 0.37,  oa: 0.15,  sa: 0.115, ma: 0.105 };
  if (age <= 60) return { total: 0.34,  oa: 0.12,  sa: 0.115, ma: 0.105 };
  if (age <= 65) return { total: 0.25,  oa: 0.035, sa: 0.11,  ma: 0.105 };
  if (age <= 70) return { total: 0.165, oa: 0.01,  sa: 0.05,  ma: 0.105 };
  return               { total: 0.125, oa: 0.01,  sa: 0.01,  ma: 0.105 };
};

// Employee share of CPF (2026), used for take-home pay on part-time (Barista FIRE) income.
export const scEmployeeRate = (age) => age <= 55 ? 0.20 : age <= 60 ? 0.18 : age <= 65 ? 0.125 : age <= 70 ? 0.075 : 0.05;

export const RETIREMENT_SUMS_2026 = { BRS: 110200, FRS: 220400, ERS: 440800, BHS: 79000 };

export const ANNUAL_LIMIT = 37740;

export const ASSUMED_TARGET_GROWTH = 0.03;

// Rev #5: kept as fallback; engine + UI now use inputs.retirementSumGrowth
// P2 fix: SRS annual contribution caps — IRAS may revise; update both values here and rebuild.
// SC/PR: $15,300/yr · Foreigner: $35,700/yr (higher because foreigners have no CPF entitlement).
export const SRS_CAP_SC_PR    = 15300;

export const SRS_CAP_FOREIGNER = 35700;

// ─────────────────────────────────────────────────────────────────────────────

// MMSS pilot window — update MMSS_PILOT_END_YEAR if CPF Board extends the scheme.
// Engine uses these constants at the simYear gate (search MMSS_PILOT_START_YEAR to find it).
export const MMSS_PILOT_START_YEAR = 2026;

export const MMSS_PILOT_END_YEAR   = 2030;

// CPF contribution rates for PR members in Year 1 and Year 2.
// Source: CPF Board Tables 2 & 3, Graduated Employer / Graduated Employee (G/G) rates, 1 Jan 2026.
// Total rates per age band are taken directly from the official tables.
// OA/SA/MA splits are proportionally derived from SC/PR3+ age-band allocation ratios (combined
// employer + employee), scaled to each band's correct PR total — no separate CPF allocation
// table is published for PR G/G, so proportional scaling is the authoritative approximation.
// flatRate  = employer-only rate applicable when OW is $50–$500 (employee contributes Nil).
// gradFactor = employee phase-in rate for OW $500–$750 band (= employeeRate × 750/250 = employeeRate × 3).
export const PR_CONTRIBUTION_RATES = {
  1: [
    // PR Year 1 G/G (Table 2, 1 Jan 2026). Employee = 5% for all bands.
    // Total: 9% (age ≤60), 8.5% (age >60). OA/SA/MA proportionally scaled from SC/PR3+ ratios.
    { maxAge: 35, oa: 0.056, sa: 0.015, ma: 0.019, total: 0.090, flatRate: 0.040, gradFactor: 0.15  }, // 9.0%  ≤35
    { maxAge: 45, oa: 0.051, sa: 0.017, ma: 0.022, total: 0.090, flatRate: 0.040, gradFactor: 0.15  }, // 9.0%  36–45
    { maxAge: 50, oa: 0.046, sa: 0.019, ma: 0.025, total: 0.090, flatRate: 0.040, gradFactor: 0.15  }, // 9.0%  46–50
    { maxAge: 55, oa: 0.036, sa: 0.028, ma: 0.026, total: 0.090, flatRate: 0.040, gradFactor: 0.15  }, // 9.0%  51–55
    { maxAge: 60, oa: 0.032, sa: 0.030, ma: 0.028, total: 0.090, flatRate: 0.040, gradFactor: 0.15  }, // 9.0%  56–60
    { maxAge: 65, oa: 0.012, sa: 0.037, ma: 0.036, total: 0.085, flatRate: 0.035, gradFactor: 0.15  }, // 8.5%  61–65
    { maxAge: 70, oa: 0.005, sa: 0.026, ma: 0.054, total: 0.085, flatRate: 0.035, gradFactor: 0.15  }, // 8.5%  66–70
    { maxAge: Infinity, oa: 0.007, sa: 0.007, ma: 0.071, total: 0.085, flatRate: 0.035, gradFactor: 0.15  }, // 8.5%  >70
  ],
  2: [
    // PR Year 2 G/G (Table 3, 1 Jan 2026). Employee: 15% (≤55), 12.5% (56–60), 7.5% (61–65), 5% (>65).
    // Total: 24% (≤55), 18.5% (56–60), 11% (61–65), 8.5% (>65). OA/SA/MA proportionally scaled.
    { maxAge: 35, oa: 0.149, sa: 0.039, ma: 0.052, total: 0.240, flatRate: 0.090, gradFactor: 0.45  }, // 24.0% ≤35
    { maxAge: 45, oa: 0.136, sa: 0.045, ma: 0.059, total: 0.240, flatRate: 0.090, gradFactor: 0.45  }, // 24.0% 36–45
    { maxAge: 50, oa: 0.123, sa: 0.052, ma: 0.065, total: 0.240, flatRate: 0.090, gradFactor: 0.45  }, // 24.0% 46–50
    { maxAge: 55, oa: 0.097, sa: 0.075, ma: 0.068, total: 0.240, flatRate: 0.090, gradFactor: 0.45  }, // 24.0% 51–55
    { maxAge: 60, oa: 0.065, sa: 0.063, ma: 0.057, total: 0.185, flatRate: 0.060, gradFactor: 0.375 }, // 18.5% 56–60
    { maxAge: 65, oa: 0.015, sa: 0.049, ma: 0.046, total: 0.110, flatRate: 0.035, gradFactor: 0.225 }, // 11.0% 61–65
    { maxAge: 70, oa: 0.005, sa: 0.026, ma: 0.054, total: 0.085, flatRate: 0.035, gradFactor: 0.15  }, // 8.5%  66–70
    { maxAge: Infinity, oa: 0.007, sa: 0.007, ma: 0.071, total: 0.085, flatRate: 0.035, gradFactor: 0.15  }, // 8.5%  >70
  ],
};

// F/G rates: Full Employer (same as SC/PR3+ employer rates) + Graduated Employee (same as G/G employee rates).
// Requires voluntary joint application by employer and employee.
// Source: CPF Board — employer rates from Table 1, employee rates from Tables 2 & 3.
// OA/SA/MA splits proportionally scaled from SC/PR3+ ratios (same method as G/G above).
// flatRate = full employer-only rate (same as SC/PR3+ employer share).
// gradFactor = employeeRate × 3 (Yr1: 5%×3=0.15; Yr2: age-banded, same as G/G Yr2).
export const PR_FG_CONTRIBUTION_RATES = {
  1: [
    // F/G Year 1: Employer 17% (full) + Employee 5% (graduated) = 22% total (≤55)
    { maxAge: 35, oa: 0.136, sa: 0.036, ma: 0.048, total: 0.220, flatRate: 0.17,  gradFactor: 0.15  }, // 22.0% ≤35
    { maxAge: 45, oa: 0.124, sa: 0.042, ma: 0.054, total: 0.220, flatRate: 0.17,  gradFactor: 0.15  }, // 22.0% 36–45
    { maxAge: 50, oa: 0.112, sa: 0.048, ma: 0.060, total: 0.220, flatRate: 0.17,  gradFactor: 0.15  }, // 22.0% 46–50
    { maxAge: 55, oa: 0.090, sa: 0.068, ma: 0.062, total: 0.220, flatRate: 0.17,  gradFactor: 0.15  }, // 22.0% 51–55
    { maxAge: 60, oa: 0.074, sa: 0.071, ma: 0.065, total: 0.210, flatRate: 0.16,  gradFactor: 0.15  }, // 21.0% 56–60
    { maxAge: 65, oa: 0.024, sa: 0.077, ma: 0.074, total: 0.175, flatRate: 0.125, gradFactor: 0.15  }, // 17.5% 61–65
    { maxAge: 70, oa: 0.009, sa: 0.042, ma: 0.089, total: 0.140, flatRate: 0.09,  gradFactor: 0.15  }, // 14.0% 66–70
    { maxAge: Infinity, oa: 0.010, sa: 0.010, ma: 0.105, total: 0.125, flatRate: 0.075, gradFactor: 0.15  }, // 12.5% >70
  ],
  2: [
    // F/G Year 2: Employer full + Employee graduated (15% ≤55, 12.5% 56–60, 7.5% 61–65, 5% >65)
    { maxAge: 35, oa: 0.199, sa: 0.052, ma: 0.069, total: 0.320, flatRate: 0.17,  gradFactor: 0.45  }, // 32.0% ≤35
    { maxAge: 45, oa: 0.182, sa: 0.060, ma: 0.078, total: 0.320, flatRate: 0.17,  gradFactor: 0.45  }, // 32.0% 36–45
    { maxAge: 50, oa: 0.164, sa: 0.069, ma: 0.087, total: 0.320, flatRate: 0.17,  gradFactor: 0.45  }, // 32.0% 46–50
    { maxAge: 55, oa: 0.130, sa: 0.099, ma: 0.091, total: 0.320, flatRate: 0.17,  gradFactor: 0.45  }, // 32.0% 51–55
    { maxAge: 60, oa: 0.101, sa: 0.096, ma: 0.088, total: 0.285, flatRate: 0.16,  gradFactor: 0.375 }, // 28.5% 56–60
    { maxAge: 65, oa: 0.028, sa: 0.088, ma: 0.084, total: 0.200, flatRate: 0.125, gradFactor: 0.225 }, // 20.0% 61–65
    { maxAge: 70, oa: 0.009, sa: 0.042, ma: 0.089, total: 0.140, flatRate: 0.09,  gradFactor: 0.15  }, // 14.0% 66–70
    { maxAge: Infinity, oa: 0.010, sa: 0.010, ma: 0.105, total: 0.125, flatRate: 0.075, gradFactor: 0.15  }, // 12.5% >70
  ],
};

// Helper: look up PR OA/SA/MA rates for a given year, age, and rate type (GG or FG).
// rateType 'GG' = Graduated Employer + Graduated Employee (default, no application needed).
// rateType 'FG' = Full Employer + Graduated Employee (requires voluntary joint application).
export const getPRRates = (prYear, age, rateType = 'GG') => {
  const rateSet = rateType === 'FG' ? PR_FG_CONTRIBUTION_RATES : PR_CONTRIBUTION_RATES;
  const table = rateSet[prYear];
  if (!table) return null;
  return table.find(r => age <= r.maxAge) || table[table.length - 1];
};

// ── DPS premium lookup — Great Eastern Life / CPF Board ─────────────────────
// Premiums are age-banded (assessed at member's age on last birthday).
// Source: Dependants' Protection Scheme premium table (2025/2026).
// Coverage ends at age 65. SC/PR only. Used by engines (per-year lookup) and
// the sidebar UI (show current-age auto-premium).
export const getDpsPremiumForAge = (age) => {
  if (age >= 65) return 0; // coverage ends at 65
  if (age <= 34) return 18;
  if (age <= 39) return 30;
  if (age <= 44) return 50;
  if (age <= 49) return 93;
  if (age <= 54) return 188;
  return 298; // ages 55–64
};

// ── MediShield Life Net Premium Schedule 2025 — B-04 ────────────────────────
// Source: CPF Board MediShield Life premium schedule (net of govt subsidies,
// before MediSave withdrawal). Male/female rates unified since 2015 restructuring.
// Excludes Integrated Plan (IP) rider premiums — those remain in medicalUsage.
export const MSL_PREMIUMS = [
  { maxAge: 20, p: 174  }, { maxAge: 25, p: 174  }, { maxAge: 30, p: 246  },
  { maxAge: 35, p: 296  }, { maxAge: 40, p: 382  }, { maxAge: 45, p: 544  },
  { maxAge: 50, p: 798  }, { maxAge: 55, p: 1000 }, { maxAge: 60, p: 1226 },
  { maxAge: 65, p: 1486 }, { maxAge: 70, p: 1718 }, { maxAge: 75, p: 2014 },
  { maxAge: 80, p: 2492 }, { maxAge: 85, p: 3102 },
];

export const getMslPremiumForAge = (age) => {
  for (const s of MSL_PREMIUMS) { if (age <= s.maxAge) return s.p; }
  return 3490; // age 86+
};
