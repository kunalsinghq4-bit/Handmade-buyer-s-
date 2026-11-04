# Handmade buyer PWA, pass A (screens 1-10 (pass B added: cart, checkout, orders, chat, try-on, premium))
npm install && npm run dev. Optional: copy .env.example to .env and set VITE_UNSPLASH_KEY. Without a key, images show soft colour blocks with the product name.
Built: onboarding (language, city/pincode, login, waitlist), home, search + filters sheet, store page, product page.
Mocked: everything. Auth, payments, chat, try-on, notifications and seller data need a real backend in later passes.
All fees and flags: src/config/pricing.js. Sample stats are marked in src/data/mock.js.

## Deploy on GitHub Pages
1. Push this folder to a GitHub repo (branch `main`).
2. Repo Settings > Pages > Source: GitHub Actions.
3. Optional: Settings > Secrets > Actions > add VITE_UNSPLASH_KEY (it ends up public in the built site, use a demo key).
4. Site: https://USERNAME.github.io/REPO-NAME/ (uses HashRouter, so refresh never 404s).
