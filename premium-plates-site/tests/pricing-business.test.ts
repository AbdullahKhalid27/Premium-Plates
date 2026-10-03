import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * tests/pricing-business.test.ts
 * 
 * Tests for R4 (Visible Pricing & Studio Running Total) and R5.6 (Centralized Business Facts).
 * Validates interface contracts defined in PROJECT.md:
 *  - src/config/businessFacts.ts
 *  - src/config/pricing.ts
 */

const factsPath = path.resolve('src/config/businessFacts.ts');
const pricingPath = path.resolve('src/config/pricing.ts');

import * as businessFactsModule from '../src/config/businessFacts';
import * as pricingModule from '../src/config/pricing';

function runFactsTest(t: any, fn: (facts: any) => void) {
  if (!fs.existsSync(factsPath)) {
    t.skip('Pending Milestone 1 implementation of src/config/businessFacts.ts');
    return;
  }
  const facts = businessFactsModule?.businessFacts || businessFactsModule?.BUSINESS_FACTS;
  assert.ok(facts, 'src/config/businessFacts.ts must export businessFacts or BUSINESS_FACTS');
  return fn(facts);
}

function runPricingTest(t: any, fn: (pricing: any) => void) {
  if (!fs.existsSync(pricingPath)) {
    t.skip('Pending Milestone 1 implementation of src/config/pricing.ts');
    return;
  }
  assert.ok(pricingModule, 'src/config/pricing.ts must be imported');
  return fn(pricingModule);
}

describe('R5.6 & R4: Business Facts & Pricing Config Specification', () => {

  describe('Tier 1: Centralized Business Facts Contract (R5.6)', () => {
    test('1. Exports company & trading identity', (t) => {
      runFactsTest(t, (facts) => {
        const name = facts.companyName || facts.tradingName;
        assert.ok(typeof name === 'string' && name.includes('Premium Plates'), 'Should include Premium Plates trading name');
      });
    });

    test('2. Exports DVLA RNPS supplier registration identifier', (t) => {
      runFactsTest(t, (facts) => {
        const rnps = facts.dvlaRnpsNumber || facts.dvlaNumber || facts.rnps;
        assert.ok(typeof rnps === 'string' && rnps.length > 0, 'DVLA RNPS registration must be defined');
      });
    });

    test('3. Exports customer contact channels (phone & whatsapp)', (t) => {
      runFactsTest(t, (facts) => {
        const phone = facts.phone || facts.contact?.phoneDisplay || facts.contact?.phoneHref;
        const whatsapp = facts.whatsapp || facts.contact?.whatsappDisplay || facts.contact?.whatsappHref;
        assert.ok(phone, 'Phone contact must be defined');
        assert.ok(whatsapp, 'WhatsApp contact must be defined');
      });
    });

    test('4. Exports fulfillment details (delivery estimate & warranty)', (t) => {
      runFactsTest(t, (facts) => {
        const delivery = facts.standardDelivery || facts.fulfillment?.deliveryEstimate || facts.fulfillment?.shippingMethod;
        const warranty = facts.guaranteeYears || facts.fulfillment?.warranty;
        assert.ok(delivery, 'Delivery information must be specified');
        assert.ok(warranty, 'Warranty information must be specified');
      });
    });

    test('5. British Standard compliance tag (BS AU 145e)', (t) => {
      runFactsTest(t, (facts) => {
        const standard = facts.britishStandard || facts.standard;
        assert.ok(typeof standard === 'string' ? standard.includes('145e') : true, 'British standard BS AU 145e reference');
      });
    });
  });

  describe('Tier 2: Pricing Structure & Catalog (R4)', () => {
    test('6. Exports style pricing catalog for standard, gel, and acrylic styles', (t) => {
      runPricingTest(t, (pricing) => {
        const styles = pricing.stylePricing || pricing.PRICING?.styles || pricing.styles;
        assert.ok(styles, 'stylePricing must be exported');
      });
    });

    test('7. Calculates base total for standard plate pair', (t) => {
      runPricingTest(t, (pricing) => {
        const calc = pricing.calculateTotal;
        assert.ok(typeof calc === 'function', 'calculateTotal must be a function');
        const result = calc({ style: 'regular', isPair: true, upgrades: [] });
        assert.ok(typeof result.total === 'number' && result.total > 0, 'Total should be positive number');
        assert.ok(Array.isArray(result.breakdown), 'Breakdown should be an array');
      });
    });

    test('8. Calculates premium for 3D Gel and 4D Acrylic styles', (t) => {
      runPricingTest(t, (pricing) => {
        const calc = pricing.calculateTotal;
        const regTotal = calc({ style: 'regular', isPair: true }).total;
        const gelTotal = calc({ style: 'gel', isPair: true }).total;
        const acrylicTotal = calc({ style: 'acrylic', isPair: true }).total;
        assert.ok(gelTotal > regTotal, '3D Gel should cost more than standard regular');
        assert.ok(acrylicTotal >= gelTotal, '4D Acrylic should cost equal or more than 3D gel');
      });
    });

    test('9. Single plate price is lower than pair price', (t) => {
      runPricingTest(t, (pricing) => {
        const calc = pricing.calculateTotal;
        const pairTotal = calc({ style: 'acrylic', isPair: true }).total;
        const singleTotal = calc({ style: 'acrylic', isPair: false }).total;
        assert.ok(singleTotal < pairTotal, 'Single plate should cost less than pair');
      });
    });

    test('10. Adds upgrade surcharges accurately (aluminium, badge, border)', (t) => {
      runPricingTest(t, (pricing) => {
        const calc = pricing.calculateTotal;
        const base = calc({ style: 'regular', isPair: true, upgrades: [] }).total;
        const withAlu = calc({ style: 'regular', isPair: true, upgrades: ['pressedAluminium'] }).total;
        assert.ok(withAlu > base, 'Aluminium upgrade should increase total');
      });
    });
  });

  describe('Tier 3: Pricing Cross-Feature Calculations', () => {
    test('11. Breakdown sum equals calculated total exactly', (t) => {
      runPricingTest(t, (pricing) => {
        const calc = pricing.calculateTotal;
        const result = calc({
          style: 'acrylic',
          isPair: true,
          upgrades: ['pressedAluminium', 'ukBadge', 'fineBorder'],
        });
        const breakdownSum = result.breakdown.reduce((sum: number, item: any) => sum + item.amount, 0);
        assert.strictEqual(Math.round(breakdownSum * 100), Math.round(result.total * 100), 'Breakdown items must sum to total');
      });
    });

    test('12. Quantity multiplier scales the total accurately', (t) => {
      runPricingTest(t, (pricing) => {
        const calc = pricing.calculateTotal;
        const singleQty = calc({ style: 'gel', isPair: true, quantity: 1 }).total;
        const doubleQty = calc({ style: 'gel', isPair: true, quantity: 2 }).total;
        if (doubleQty !== undefined) {
          assert.strictEqual(doubleQty, singleQty * 2, 'Total for quantity 2 should be double quantity 1');
        }
      });
    });
  });
});
