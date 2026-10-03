/**
 * Centralized business facts and editable placeholders for Premium Plates.
 * All client details, contact channels, legal registration numbers, and service guarantees
 * are declared here in a single location for easy client handover.
 */

export interface BusinessFacts {
  tradingName: string;
  legalEntity: string;
  tagline: string;
  dvlaRnpsNumber: string; // Registered Number Plate Supplier number
  britishStandard: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappLink: string;
  email: string;
  dispatchTime: string;
  standardDelivery: string;
  expressDelivery: string;
  warrantyYears: number;
  guaranteeYears: number;
  warrantyDescription: string;
  fulfillment: {
    deliveryEstimate: string;
    shippingMethod: string;
    warranty: string;
  };
  contact: {
    phoneDisplay: string;
    phoneHref: string;
    whatsappDisplay: string;
    whatsappHref: string;
  };
  registeredAddress: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    country: string;
  };
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

/* PLACEHOLDER: editable client details */
export const businessFacts: BusinessFacts = {
  tradingName: "Premium Plates",
  legalEntity: "Premium Plates Bespoke Automotive Ltd",
  tagline: "The detail that makes it yours.",
  dvlaRnpsNumber: "RNPS 68421", // Verified DVLA Registered Supplier placeholder
  britishStandard: "BS AU 145e",
  phone: "+44 7884 208718",
  phoneDisplay: "+44 7884 208718",
  whatsapp: "+44 7884 208718",
  whatsappLink: "https://wa.me/447884208718?text=Hello%20Premium%20Plates%2C%20I%20have%20an%20enquiry%20about%20a%20bespoke%20plate",
  email: "concierge@premiumplates.co.uk",
  dispatchTime: "Same-day dispatch before 2:00 PM",
  standardDelivery: "Tracked Royal Mail 24 (1-2 business days)",
  expressDelivery: "DPD Next Day Guaranteed",
  warrantyYears: 3,
  guaranteeYears: 3,
  warrantyDescription: "3-year guarantee against delamination, fading, and acrylic discolouration",
  fulfillment: {
    deliveryEstimate: "1-2 Business Days (Tracked 24)",
    shippingMethod: "Royal Mail Tracked 24 / DPD Next Day",
    warranty: "3-Year Bespoke Delamination & UV Guarantee",
  },
  contact: {
    phoneDisplay: "+44 7884 208718",
    phoneHref: "tel:+447884208718",
    whatsappDisplay: "WhatsApp Concierge",
    whatsappHref: "https://wa.me/447884208718?text=Hello%20Premium%20Plates",
  },
  registeredAddress: {
    line1: "Unit 4, The Apex Works",
    line2: "Automotive Way",
    city: "London",
    postcode: "SW1A 1AA",
    country: "United Kingdom",
  },
  openingHours: {
    weekdays: "8:30 AM – 6:30 PM",
    saturday: "9:00 AM – 4:00 PM",
    sunday: "Concierge WhatsApp only",
  },
};

export const BUSINESS_FACTS = businessFacts;
export default businessFacts;
