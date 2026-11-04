// 100 mock products. Images are Unsplash URLs; ProductCard falls back to a gradient if one fails.
// To swap a photo: replace the ID in IMG below (the part after "photo-").
const u = (id, w = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const IMG = {
  Clothing: ['1583391733956-6c78276477e2', '1610030469983-98e550d6193c', '1617627143750-d86bc21e42bb', '1602810318383-e386cc2a3ccf'],
  Dupattas: ['1583391733981-8498408ee4b6', '1594938298603-c8148c4dae35', '1609357605129-26f69add5d6e'],
  Jewellery: ['1535632066927-ab7c9ab60908', '1599643478518-a784e5dc4c8f', '1611591437281-460bfbe1220a', '1515562141207-7a88fb7ce338'],
  Bags: ['1590874103328-eac38a683ce7', '1584917865442-de89df76afd3', '1553062407-98eeb64c6a62'],
  'Home decor': ['1578749556568-bc2c40e68b61', '1513519245088-0e12902e5a38', '1565193566173-7a0ee3dbe261', '1616486338812-3dadae4b4ace'],
  Gifts: ['1513885535751-8b9238bd345a', '1549465220-1a8b9238cd48', '1607344645866-009c320b63e0'],
  Eyewear: ['1511499767150-a48a237f0083', '1572635196237-14b3f281503f', '1577803645773-f96470509666'],
};

const TEMPLATES = {
  Clothing: ['Block-print Kurta', 'Bandhani Co-ord Set', 'Hand-woven Jacket', 'Ajrakh Shirt', 'Kantha Stitch Top', 'Linen Kurta Set'],
  Dupattas: ['Phulkari Dupatta', 'Banarasi Silk Dupatta', 'Leheriya Dupatta', 'Chikankari Stole', 'Mirror-work Dupatta'],
  Jewellery: ['Jhumka Earrings', 'Meenakari Necklace', 'Oxidised Silver Choker', 'Kundan Bangles', 'Terracotta Studs', 'Lac Bangle Set'],
  Bags: ['Jute Tote', 'Patchwork Sling', 'Embroidered Potli', 'Leather Satchel', 'Madhubani Clutch'],
  'Home decor': ['Blue Pottery Vase', 'Brass Diya Set', 'Macramé Wall Hanging', 'Warli Wall Art', 'Handmade Candle Trio', 'Cane Lampshade'],
  Gifts: ['Diwali Hamper', 'Handmade Soap Box', 'Rangoli Kit', 'Tea & Mug Gift Set', 'Wooden Toy Set'],
  Eyewear: ['Handcrafted Wood Frames', 'Horn-rim Sunglasses', 'Bamboo Sunglasses'],
};

const MAKERS = ['Rangrez Looms', 'Kala Ghar', 'Mitti & Thread', 'Chhapai Studio', 'Dhaga Co.', 'Neel Pottery', 'Sutradhar', 'Pink City Crafts', 'Gulabo Works', 'Thaat Weaves'];
const CITIES = ['Jaipur', 'Patna', 'Lucknow', 'Pune', 'Indore', 'Kolkata'];
const TAGS = ['Bestseller', 'New', 'Only 3 left', 'Diwali pick', 'Handmade in 5 days', null, null, null];

// small deterministic PRNG so the list is stable between reloads
let seed = 42;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const pick = (a) => a[Math.floor(rnd() * a.length)];

const cats = Object.keys(TEMPLATES);
export const products = Array.from({ length: 100 }, (_, i) => {
  const category = cats[i % cats.length];
  const base = pick(TEMPLATES[category]);
  const mrp = Math.round((300 + rnd() * 3200) / 50) * 50;
  const off = pick([0, 10, 15, 20, 25, 30, 40, 50]);
  const price = Math.round((mrp * (100 - off)) / 100 / 10) * 10;
  const imgId = pick(IMG[category]);
  return {
    id: `p${i + 1}`,
    title: base,
    category,
    maker: pick(MAKERS),
    city: pick(CITIES),
    mrp,
    price,
    off,
    rating: +(4 + rnd() * 0.9).toFixed(1),
    reviews: Math.floor(5 + rnd() * 400),
    tag: pick(TAGS),
    image: u(imgId),
    images: [u(imgId, 900)],
  };
});

export const byCategory = (c) => (c ? products.filter((p) => p.category === c) : products);
export const categories = cats.map((c) => ({ name: c, image: u(IMG[c][0], 200) }));
export const inr = (n) => '₹' + n.toLocaleString('en-IN');
