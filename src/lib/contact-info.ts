// Single source of truth for CTRL AZ's contact details — referenced by
// the Contact page, footer, and header CTA. Update here, not per-page.
export const CONTACT_EMAIL = "info@ctrlaz.com";

// Stored in local (not international-prefixed with spaces) form for
// building tel:/wa.me links reliably.
export const CONTACT_PHONE_DISPLAY = "+91 88287 43651";
export const CONTACT_PHONE_E164 = "+918828743651";
export const CONTACT_WHATSAPP_NUMBER = "918828743651"; // wa.me wants no "+"

export const contactLinks = {
  email: `mailto:${CONTACT_EMAIL}`,
  phone: `tel:${CONTACT_PHONE_E164}`,
  whatsapp: `https://wa.me/${CONTACT_WHATSAPP_NUMBER}`,
};
