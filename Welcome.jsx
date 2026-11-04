import { useState } from 'react';

const CITIES = [
  { name: 'Patna', icon: '🏛️', line: 'Litti, Madhubani & more' },
  { name: 'Lucknow', icon: '🕌', line: 'Chikankari capital' },
  { name: 'Jaipur', icon: '🏰', line: 'Blue pottery, block prints' },
  { name: 'Pune', icon: '🛕', line: 'Paithani & indie brands' },
  { name: 'Indore', icon: '🏙️', line: 'Maheshwari, street-style' },
  { name: 'Kolkata', icon: '🌉', line: 'Kantha, terracotta' },
];

const CATS = ['👗 Fashion', '💍 Jewellery', '🏠 Home', '💄 Beauty', '🎁 Gifts', '👜 Bags', '👟 Footwear', '🕶️ Eyewear', '🧸 Kids', '🍯 Gourmet'];

const USPS = [
  { i: '📍', t: 'Local sellers', s: 'Delivered fast from your own city' },
  { i: '🧵', t: 'Handmade picks', s: 'Real makers, real stories' },
  { i: '🛡️', t: 'Prepaid & protected', s: 'Refund if it goes wrong' },
];

const T = {
  English: { h1: 'Everything you love,\nfrom your own city.', sub: 'Fashion, home, gifts & more from local sellers and handmade makers.', city: 'Choose your city', pin: 'Or enter pincode', cta: 'Start shopping', check: 'Check' },
  हिंदी: { h1: 'सब कुछ, आपके\nअपने शहर से।', sub: 'लोकल सेलर्स और हैंडमेड कारीगरों से फ़ैशन, होम, गिफ़्ट और बहुत कुछ।', city: 'अपना शहर चुनें', pin: 'या पिनकोड डालें', cta: 'शॉपिंग शुरू करें', check: 'चेक करें' },
};

export default function Welcome({ onDone = () => {} }) {
  const [lang, setLang] = useState('English');
  const [city, setCity] = useState(null);
  const [pin, setPin] = useState('');
  const [msg, setMsg] = useState(null);
  const t = T[lang];

  const checkPin = () => {
    if (!/^\d{6}$/.test(pin)) return setMsg({ ok: false, text: 'Enter a valid 6-digit pincode' });
    // mock: replace with real serviceability lookup
    const guess = { 8: 'Patna', 22: 'Lucknow', 30: 'Jaipur', 41: 'Pune', 45: 'Indore', 70: 'Kolkata' }[+pin.slice(0, 2)];
    if (guess) { setCity(guess); setMsg({ ok: true, text: `Great, we deliver in ${guess}` }); }
    else setMsg({ ok: false, text: "We're not in your area yet. Pick the nearest city." });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <style>{`
        @keyframes wl-marq{to{transform:translateX(-50%)}}
        @keyframes wl-rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes wl-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
      `}</style>

      {/* HERO */}
      <header className="relative overflow-hidden text-white px-5 pt-6 pb-10 rounded-b-[36px]"
        style={{ background: 'linear-gradient(140deg,#1a237e 0%,#5e35b1 55%,#ff7043 120%)' }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle,#fff 1.5px,transparent 1.5px)', backgroundSize: '22px 22px' }} />
        <div className="relative max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xl tracking-tight">[APP NAME]</span>
            <div className="flex bg-white/15 rounded-full p-0.5 text-xs">
              {Object.keys(T).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full transition ${lang === l ? 'bg-white text-indigo-900 font-bold' : 'text-white/80'}`}>{l}</button>
              ))}
            </div>
          </div>

          <h1 className="mt-7 text-[28px] leading-tight font-extrabold whitespace-pre-line" style={{ animation: 'wl-rise .7s both' }}>{t.h1}</h1>
          <p className="mt-2 text-sm text-white/85 max-w-xs" style={{ animation: 'wl-rise .7s .1s both' }}>{t.sub}</p>

          <div className="mt-5 inline-flex items-center gap-2 bg-yellow-300 text-indigo-950 text-xs font-black px-3 py-1.5 rounded-full"
            style={{ animation: 'wl-bob 3s ease-in-out infinite' }}>
            🪔 DIWALI SALE · UP TO 50% OFF
          </div>
        </div>

        {/* category marquee */}
        <div className="relative mt-6 overflow-hidden">
          <div className="flex gap-2 w-max" style={{ animation: 'wl-marq 26s linear infinite' }}>
            {[...CATS, ...CATS].map((c, i) => (
              <span key={i} className="whitespace-nowrap bg-white/15 backdrop-blur px-3 py-1.5 rounded-full text-xs">{c}</span>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto px-4 -mt-5">
        {/* USP cards */}
        <div className="grid grid-cols-3 gap-2">
          {USPS.map((u) => (
            <div key={u.t} className="bg-white rounded-2xl p-2.5 text-center shadow-sm">
              <div className="text-xl">{u.i}</div>
              <p className="text-[11px] font-bold mt-0.5">{u.t}</p>
              <p className="text-[10px] text-gray-500 leading-tight">{u.s}</p>
            </div>
          ))}
        </div>

        {/* CITY */}
        <h2 className="mt-6 mb-2 font-bold text-sm">{t.city}</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {CITIES.map((c) => {
            const on = city === c.name;
            return (
              <button key={c.name} onClick={() => { setCity(c.name); setMsg(null); }}
                className={`text-left rounded-2xl p-3 border-2 transition active:scale-95 ${on ? 'border-indigo-700 bg-indigo-50 shadow-md' : 'border-transparent bg-white shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{c.icon}</span>
                  {on && <span className="w-5 h-5 rounded-full bg-indigo-700 text-white text-xs grid place-items-center">✓</span>}
                </div>
                <p className="font-bold text-sm mt-1">{c.name}</p>
                <p className="text-[11px] text-gray-500 leading-tight">{c.line}</p>
              </button>
            );
          })}
        </div>

        {/* PINCODE */}
        <h2 className="mt-5 mb-2 font-bold text-sm">{t.pin}</h2>
        <div className="flex gap-2">
          <input value={pin} inputMode="numeric" maxLength={6} placeholder="e.g. 302001"
            onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setMsg(null); }}
            className="flex-1 rounded-xl bg-white shadow-sm px-4 py-3 text-sm outline-none focus:ring-2 ring-indigo-600" />
          <button onClick={checkPin} className="px-5 rounded-xl bg-indigo-900 text-white font-semibold text-sm active:scale-95">{t.check}</button>
        </div>
        {msg && <p className={`mt-1.5 text-xs ${msg.ok ? 'text-green-600' : 'text-red-600'}`}>{msg.text}</p>}

        <p className="mt-6 mb-28 text-center text-[11px] text-gray-400">Prepaid orders only · Sellers pay zero commission · Buyer protection on every order</p>
      </main>

      {/* sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur border-t p-3">
        <button disabled={!city} onClick={() => onDone({ city, lang })}
          className="block w-full max-w-md mx-auto py-3.5 rounded-2xl font-extrabold text-base transition active:scale-[.98] disabled:opacity-40 bg-gradient-to-r from-amber-400 to-orange-500 text-indigo-950 shadow-lg">
          {city ? `${t.cta} in ${city} →` : t.cta}
        </button>
      </div>
    </div>
  );
}
