// ALL ratings, review counts and reviews below are SAMPLE DATA, not real.
export const CITIES = [
  { name: 'Patna', pins: ['800'] }, { name: 'Lucknow', pins: ['226'] }, { name: 'Jaipur', pins: ['302'] },
  { name: 'Pune', pins: ['411'] }, { name: 'Indore', pins: ['452'] }, { name: 'Kolkata', pins: ['700'] }]
export const CATS = ['Clothing', 'Dupattas', 'Jewellery', 'Bags', 'Home decor', 'Gifts', 'Eyewear']
const T = [['Block print kurta', 'Clothing', 1499, 'block print kurta'], ['Handloom saree', 'Clothing', 3200, 'handloom saree'],
  ['Madhubani dupatta', 'Dupattas', 899, 'handmade dupatta'], ['Silver jhumkas', 'Jewellery', 1250, 'silver jewellery india'],
  ['Lac bangles set', 'Jewellery', 650, 'lac bangles'], ['Jute tote bag', 'Bags', 799, 'handmade bag india'],
  ['Terracotta planter', 'Home decor', 540, 'terracotta pottery'], ['Festive diya set', 'Gifts', 420, 'festive diya decor'],
  ['Wooden frame sunglasses', 'Eyewear', 1100, 'wooden sunglasses']]
const S = [['Rangrez Looms', 'Hand-block printing, three generations.'], ['Kala Ghar', 'Folk art and gifting from our home studio.'], ['Mitti & Thread', 'Clay, cane and cotton, made slowly.']]
export const STORES = CITIES.flatMap((c, ci) => S.map(([name, story], si) => ({
  id: `${ci}${si}`, city: c.name, name, story, featured: si === 0, verified: si !== 2,
  rating: +(4.2 + ((ci + si) % 7) / 10).toFixed(1), reviews: 40 + ci * 13 + si * 7, // sample
  products: Array.from({ length: 8 }, (_, k) => {
    const [n, cat, price, q] = T[(k + si * 2 + ci) % T.length]
    return { id: `${ci}${si}${k}`, storeId: `${ci}${si}`, city: c.name, name: n, cat, q, price: price + si * 50, mrp: Math.round(price * 1.25),
      sizes: cat === 'Clothing' ? ['S', 'M', 'L', 'XL'] : [], colours: ['Indigo', 'Rust', 'Ivory'],
      rating: +(4 + ((k + si) % 9) / 10).toFixed(1), sponsored: k === 3 && si === 1, isNew: k > 5 }
  }) })))
export const REVIEWS = [{ n: 'Ananya', t: 'Stitching and print are exactly like the video. Arrived in two days.', r: 5 },
  { n: 'Rohit', t: 'Gifted this, got lots of compliments. Packaging was careful.', r: 4 }] // sample
export const PRODUCTS = STORES.flatMap(s => s.products)
