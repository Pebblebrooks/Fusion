/**
 * IRAS personal income tax (resident rates).
 * Extracted from App.jsx (App_170) — logic unchanged.
 */

// ── IRAS Singapore Individual Income Tax — 2024 YA (A-01/I-21) ──────────────
// Source: IRAS.gov.sg — Year of Assessment 2024 resident individual tax rates.
// Each slab: floor = start of band; baseTax = cumulative tax owed at exactly floor.
export const IRAS_SLABS = [
  { floor: 0,      ceiling: 20000,    baseTax: 0,     marginal: 0     },
  { floor: 20000,  ceiling: 30000,    baseTax: 0,     marginal: 0.02  },
  { floor: 30000,  ceiling: 40000,    baseTax: 200,   marginal: 0.035 },
  { floor: 40000,  ceiling: 80000,    baseTax: 550,   marginal: 0.07  },
  { floor: 80000,  ceiling: 120000,   baseTax: 3350,  marginal: 0.115 },
  { floor: 120000, ceiling: 160000,   baseTax: 7950,  marginal: 0.15  },
  { floor: 160000, ceiling: 200000,   baseTax: 13950, marginal: 0.17  },
  { floor: 200000, ceiling: 240000,   baseTax: 20750, marginal: 0.18  },
  { floor: 240000, ceiling: 280000,   baseTax: 27950, marginal: 0.19  },
  { floor: 280000, ceiling: 320000,   baseTax: 35550, marginal: 0.195 },
  { floor: 320000, ceiling: 360000,   baseTax: 43350, marginal: 0.20  },
  { floor: 360000, ceiling: Infinity, baseTax: 51350, marginal: 0.22  },
];

// Returns total annual income tax for a given chargeable income (after reliefs).
export const computeIrasTax = (chargeableIncome) => {
  if (chargeableIncome <= 0) return 0;
  for (const s of IRAS_SLABS) {
    if (chargeableIncome <= s.ceiling)
      return Math.round(s.baseTax + (chargeableIncome - s.floor) * s.marginal);
  }
  return Math.round(51350 + (chargeableIncome - 360000) * 0.22);
};

// Returns the marginal (top) tax rate for a given chargeable income.
export const getMarginalRate = (chargeableIncome) => {
  if (chargeableIncome <= 20000) return 0;
  for (const s of IRAS_SLABS) {
    if (chargeableIncome <= s.ceiling) return s.marginal;
  }
  return 0.22;
};
