import { useEffect, useRef, useState } from 'react';

const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`;

const SLIDES = [
  {
    kicker: 'DIWALI SALE',
    title: 'Light up with\nlocal makers',
    sub: 'Diyas, hampers & festive wear',
    badge: 'UP TO 50% OFF',
    cta: 'Shop festive',
    bg: 'linear-gradient(135deg,#3b0a8c 0%,#7b1fa2 50%,#ff6f3c 100%)',
    img: u('1513885535751-8b9238bd345a'),
  },
  {
    kicker: 'JAIPUR SPECIAL',
    title: 'Blue pottery\n& block prints',
    sub: 'Straight from the Pink City',
    badge: 'FROM ₹299',
    cta: 'Explore Jaipur',
    bg: 'linear-gradient(135deg,#0d47a1 0%,#1976d2 55%,#4dd0e1 100%)',
    img: u('1578749556568-bc2c40e68b61'),
  },
  {
    kicker: 'DUPATTA EDIT',
    title: 'Phulkari, Bandhani,\nChikankari',
    sub: 'Hand-done by real artisans',
    badge: 'UNDER ₹799',
    cta: 'Shop dupattas',
    bg: 'linear-gradient(135deg,#880e4f 0%,#d81b60 55%,#ffb300 100%)',
    img: u('1583391733981-8498408ee4b6'),
  },
  {
    kicker: 'GIFTING',
    title: 'Gifts with\na story',
    sub: 'Hampers made in small batches',
    badge: 'BUY 2 SAVE 15%',
    cta: 'Find a gift',
    bg: 'linear-gradient(135deg,#bf360c 0%,#f4511e 55%,#ffca28 100%)',
    img: u('1607344645866-009c320b63e0'),
  },
  {
    kicker: 'JEWELLERY',
    title: 'Jhumkas, Meenakari\n& Lac bangles',
    sub: 'Wear something nobody else has',
    badge: 'MIN. 30% OFF',
    cta: 'Shop jewellery',
    bg: 'linear-gradient(135deg,#1b5e20 0%,#00897b 55%,#ffd54f 100%)',
    img: u('1535632066927-ab7c9ab60908'),
  },
];

const DURATION = 4500;

export default function HeroCarousel({ onCta = () => {} }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(null);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), DURATION);
    return () => clearTimeout(t);
  }, [i, paused]);

  const onEnd = (x) => {
    if (startX.current == null) return;
    const d = x - startX.current;
    if (Math.abs(d) > 40) setI((n) => (n + (d < 0 ? 1 : -1) + SLIDES.length) % SLIDES.length);
    startX.current = null;
    setPaused(false);
  };

  return (
    <section className="px-3 pt-3">
      <style>{`
        @keyframes hc-fill{from{width:0}to{width:100%}}
        @keyframes hc-float{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-8px) rotate(2deg)}}
        @keyframes hc-shine{from{transform:translateX(-120%)}to{transform:translateX(220%)}}
        @keyframes hc-pop{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      `}</style>

      <div
        className="relative overflow-hidden rounded-3xl shadow-xl"
        onTouchStart={(e) => { startX.current = e.touches[0].clientX; setPaused(true); }}
        onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {SLIDES.map((s, idx) => (
            <div key={idx} className="relative min-w-full h-56 sm:h-72 text-white overflow-hidden" style={{ background: s.bg }}>
              {/* sparkle dots */}
              <div className="absolute inset-0 opacity-30"
                style={{ backgroundImage: 'radial-gradient(circle,#fff 1.5px,transparent 1.5px)', backgroundSize: '22px 22px' }} />
              {/* product photo */}
              <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-[46%] aspect-[4/5]"
                style={{ animation: 'hc-float 5s ease-in-out infinite' }}>
                <img src={s.img} alt="" loading={idx ? 'lazy' : 'eager'}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  className="w-full h-full object-cover rounded-[28px] border-4 border-white/80 shadow-2xl" />
              </div>
              {/* text */}
              <div key={i === idx ? 'on' : 'off'} className="relative z-10 h-full w-[58%] p-5 flex flex-col justify-center"
                style={i === idx ? { animation: 'hc-pop .7s .15s both' } : {}}>
                <span className="text-[11px] tracking-[.25em] font-semibold opacity-90">{s.kicker}</span>
                <h2 className="mt-1 text-2xl sm:text-4xl font-extrabold leading-tight whitespace-pre-line drop-shadow">{s.title}</h2>
                <p className="mt-1 text-xs sm:text-sm opacity-90">{s.sub}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-yellow-300 text-purple-950 text-[11px] font-black">{s.badge}</span>
                </div>
                <button onClick={() => onCta(s)}
                  className="relative overflow-hidden mt-3 w-fit px-4 py-2 rounded-full bg-white text-gray-900 text-sm font-bold shadow-lg active:scale-95 transition">
                  {s.cta} →
                  <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                    style={{ animation: 'hc-shine 2.4s infinite' }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* progress segments */}
        <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 px-6 z-20">
          {SLIDES.map((_, idx) => (
            <button key={idx} aria-label={`Slide ${idx + 1}`} onClick={() => setI(idx)}
              className="h-1 flex-1 max-w-10 rounded-full bg-white/40 overflow-hidden">
              <span className="block h-full bg-white rounded-full"
                style={{
                  width: idx < i ? '100%' : idx === i ? undefined : 0,
                  animation: idx === i ? `hc-fill ${DURATION}ms linear forwards` : 'none',
                  animationPlayState: paused ? 'paused' : 'running',
                }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
