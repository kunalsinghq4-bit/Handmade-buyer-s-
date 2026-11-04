// ALL fees, plans, credits, free allowances and feature flags. Admin panel can overwrite this later.
export const PRICING = {
  fee: { pct: 3, min: 10, gstIncluded: true },
  tryOn: { freeImages: 3, perImage: 15, video: { min: 99, max: 149 },
    packs: [{ id: 'p10', images: 10, videos: 0, price: 99 }, { id: 'p5v1', images: 5, videos: 1, price: 199 }] },
  premium: { monthly: 99 /* PLACEHOLDER for Rs. [X]/month */, tryOnPerImage: 8, freeImagesPerMonth: 10, unlocksContact: true },
  addons: { deliveryProtection: 29, giftWrap: 49, giftCard: 0 },
  disputes: { reviewHours: 24, returnWindowDays: 7, autoReleaseHours: 48 },
  delivery: 40, coupons: { WELCOME10: { pct: 10 }, FRIEND50: { flat: 50 } }, // FRIEND50 = referral credit
  festival: 'Diwali', // Diwali | Rakhi | Eid | Holi | null
  flags: { tryOn: true, premium: true, sponsored: true, referral: true, festivalBanner: true },
}
