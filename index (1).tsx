import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Lock, Heart, Music2, Volume2, VolumeX, Sparkles, Gift,
  ChevronLeft, ChevronRight, Flame,
} from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import cakeImg from "@/assets/cake.jpg";
import memory1 from "@/assets/memory1.jpg";
import memory2 from "@/assets/memory2.jpeg";
import memory3 from "@/assets/memory3.jpeg";
import memory4 from "@/assets/memory4.jpeg";
import memory5 from "@/assets/memory5.jpeg";

// ─── CUSTOMIZE ──────────────────────────────────────────────
const BIRTHDAY_NAME = "My favorite person";
const PASSWORD = "26062004";
const MUSIC_URL =
  "https://open.spotify.com/track/1GFQthxDi4Tqe3wJ5j0G5S?si=5EEgEy6iQ-OiOgc19RQn3A";
// ────────────────────────────────────────────────────────────

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Happy Birthday, ${BIRTHDAY_NAME} 💜` },
      { name: "description", content: "A handcrafted birthday surprise ." },
    ],
  }),
  component: Page,
});

function Page() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Petals />
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <LockScreen key="lock" onUnlock={() => setUnlocked(true)} />
        ) : (
          <Experience key="exp" />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ───────────────────────── Lock Screen ───────────────────────── */
function HeartKey({
  label,
  onClick,
  filled,
}: {
  label: string;
  onClick: () => void;
  filled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.06 }}
      className="relative grid h-16 w-16 place-items-center sm:h-20 sm:w-20"
      aria-label={label}
    >
      <Heart
        className={`absolute inset-0 h-full w-full drop-shadow-[0_4px_10px_rgba(200,162,200,0.45)] ${
          filled ? "fill-wine text-wine" : "fill-lavender-soft/90 text-lavender-soft/90"
        }`}
        strokeWidth={1}
      />
      <span
        className={`relative z-10 font-display text-2xl sm:text-3xl ${
          filled ? "text-softwhite" : "text-wine"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const max = PASSWORD.length;

  const tryUnlock = (next: string) => {
    if (next.length === max) {
      if (next === PASSWORD) {
        setTimeout(onUnlock, 250);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
          setValue("");
        }, 700);
      }
    }
  };

  const press = (d: string) => {
    if (value.length >= max) return;
    const next = value + d;
    setValue(next);
    tryUnlock(next);
  };
  const back = () => setValue((v) => v.slice(0, -1));
  const clear = () => setValue("");

  const dots = Array.from({ length: max }, (_, i) => i < value.length);

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
      transition={{ duration: 1 }}
      className="relative grid min-h-screen place-items-center px-4 py-10"
    >
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40 blur-md"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-wine-deep/85 via-wine/80 to-wine-deep/90" />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="relative z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-8 rounded-[2rem] bg-gradient-to-br from-wine/60 to-wine-deep/70 p-6 backdrop-blur-xl ring-1 ring-lavender/20 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.7)] sm:p-10 md:grid-cols-2"
      >
        {/* Polaroid */}
        <motion.div
          animate={error ? { x: [-10, 10, -8, 8, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-full bg-black/80 px-4 py-1 font-script text-sm text-softwhite shadow-lg">
              Happy birthday
            </div>
          </div>
          <div className="-rotate-2 rounded-md bg-softwhite p-4 pb-16 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-sm">
              <img src={memory1} alt="" className="h-full w-full object-cover" />
            </div>
            <p className="mt-4 text-center font-script text-2xl text-wine">
              {BIRTHDAY_NAME.toLowerCase()} 💕
            </p>
          </div>
          {/* bow accent */}
          <div className="absolute -top-3 right-8 text-4xl">🎀</div>
        </motion.div>

        {/* Keypad */}
        <div className="flex flex-col items-center">
          <p className="font-script text-2xl text-lavender-soft">Enter a passcode</p>

          {/* dots */}
          <div className="mt-4 flex gap-3">
            {dots.map((on, i) => (
              <div
                key={i}
                className={`grid h-8 w-8 place-items-center rounded-md border-2 ${
                  error
                    ? "border-destructive"
                    : "border-lavender-soft/70"
                }`}
              >
                <span className="text-lavender-soft text-lg">{on ? "✱" : ""}</span>
              </div>
            ))}
          </div>

          {/* heart grid */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
              <HeartKey key={n} label={n} onClick={() => press(n)} />
            ))}
            <HeartKey label="✱" onClick={clear} />
            <HeartKey label="0" onClick={() => press("0")} />
            <HeartKey label="⌫" onClick={back} />
          </div>

          {error && (
            <p className="mt-3 text-xs text-destructive">Not quite… try again 💜</p>
          )}

          <button
            type="button"
            onClick={() => tryUnlock(value)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lavender to-rosegold px-7 py-2.5 text-sm font-semibold tracking-wide text-wine-deep shadow-[0_10px_30px_-10px_rgba(200,162,200,0.8)] transition hover:scale-[1.04]"
          >
            NEXT <span aria-hidden>›</span>
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
}

/* ───────────────────────── Experience ───────────────────────── */
function Experience() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <MusicPlayer />
      <Hero />
      <Gallery />
      <LoveLetter />
      <CakeSection />
      <Memories />
      <WhySpecial />
      <FinalSurprise />
      <Footer />
    </motion.div>
  );
}

/* ───────────────────────── Background Petals ───────────────────────── */
function Petals() {
  const [petals, setPetals] = useState<
    Array<{ i: number; left: number; delay: number; duration: number; size: number; hue: string }>
  >([]);
  useEffect(() => {
    setPetals(
      Array.from({ length: 18 }, (_, i) => ({
        i,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 18 + Math.random() * 16,
        size: 8 + Math.random() * 14,
        hue: Math.random() > 0.5 ? "var(--lavender)" : "var(--rosegold)",
      })),
    );
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.i}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.hue,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
          className="absolute bottom-0 rounded-full opacity-70 blur-[1px]"
        />
      ))}
    </div>
  );
}


/* ───────────────────────── Music Player ───────────────────────── */
function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const a = new Audio(MUSIC_URL);
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;
    // attempt autoplay (may be blocked)
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    return () => { a.pause(); };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play(); setPlaying(true); }
    else { a.pause(); setPlaying(false); }
  };
  const mute = () => {
    const a = audioRef.current; if (!a) return;
    a.muted = !a.muted; setMuted(a.muted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full glass px-4 py-2">
      <button
        onClick={toggle}
        className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-wine to-lavender text-softwhite hover:scale-110 transition"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <Music2 className={`h-4 w-4 ${playing ? "animate-pulse" : ""}`} />
      </button>
      <button
        onClick={mute}
        className="grid h-9 w-9 place-items-center rounded-full text-lavender hover:bg-lavender/10 transition"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -80]);

  return (
    <section className="relative grid min-h-screen place-items-center px-6 text-center">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />

      <motion.div style={{ y }} className="relative z-10 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-script text-xl text-lavender"
        >
          To the one who lights up my world
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="mt-4 font-display text-6xl leading-[1.05] md:text-8xl"
        >
          <span className="text-gradient">Happy Birthday,</span>
          <br />
          <span className="text-softwhite">{BIRTHDAY_NAME}</span>
          <span className="ml-3 inline-block animate-pulse" style={{ color: "var(--lavender)" }}>💜</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground"
        >
          Tonight is all about celebrating someone truly special.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-lavender/80"
        >
          <Sparkles className="h-4 w-4" />
          <span>Scroll to begin the journey</span>
          <Sparkles className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── Photo Gallery ───────────────────────── */
function Gallery() {
  const photos = [
    { src: memory1, caption: "The day that felt like magic" },
    { src: memory2, caption: "The ever gorgeousssssssss" },
    { src: memory3, caption: "The prettiest smile" },
    { src: memory4, caption: "The beautifullllll" },
    { src: memory5, caption: "Pretty pretty ladyyy" },
  ];
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % photos.length);
  const prev = () => setI((p) => (p - 1 + photos.length) % photos.length);

  return (
    <SectionShell title="Moments" sub="A handful of frozen feelings">
      <div className="relative mx-auto mt-12 max-w-4xl">
        <div className="relative h-[480px] sm:h-[560px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 mx-auto w-full max-w-md"
            >
              <div className="glass rounded-2xl p-4 glow-lavender">
                <img
                  src={photos[i].src}
                  alt={photos[i].caption}
                  className="h-[420px] w-full rounded-xl object-cover"
                  loading="lazy"
                />
                <p className="mt-4 text-center font-script text-xl text-lavender">
                  {photos[i].caption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="grid h-11 w-11 place-items-center rounded-full glass hover:glow-lavender transition"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5 text-lavender" />
          </button>
          <div className="flex gap-2">
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? "w-8 bg-lavender" : "w-2 bg-lavender/30"
                }`}
                aria-label={`Go to ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="grid h-11 w-11 place-items-center rounded-full glass hover:glow-lavender transition"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5 text-lavender" />
          </button>
        </div>
      </div>
    </SectionShell>
  );
}

/* ───────────────────────── Love Letter ───────────────────────── */
function LoveLetter() {
  const lines = [
    "If I had a thousand birthdays to give you,",
    "I'd still feel like the lucky one.",
    "You are my favorite poem,",
    "the one I read again every morning.",
    "Today the world celebrates you —",
    "and so does every quiet corner of my heart. 💜",
  ];

  return (
    <SectionShell title="A Letter For You" sub="written line by line, slowly, like the first time">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="glass-wine mx-auto mt-12 max-w-2xl rounded-3xl p-10 md:p-14"
      >
        <div className="space-y-4 font-script text-xl leading-relaxed text-softwhite md:text-2xl">
          {lines.map((l, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.5 }}
            >
              {l}
            </motion.p>
          ))}
        </div>
        <p className="mt-8 text-right font-script text-2xl text-lavender">— Yours, always</p>
      </motion.div>
    </SectionShell>
  );
}

/* ───────────────────────── Cake + Candle Interaction ───────────────────────── */
function CakeSection() {
  const [lit, setLit] = useState(true);
  const [celebrated, setCelebrated] = useState(false);

  const blow = () => {
    if (!lit) return;
    setLit(false);
    setCelebrated(true);
    fireCelebration();
  };

  return (
    <SectionShell title="Make a Wish" sub="tap the flame, close your eyes, and wish">
      <div className="relative mx-auto mt-12 max-w-2xl">
        <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-3xl glass glow-wine">
          <img
            src={cakeImg}
            alt="Birthday cake"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* Glowing overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

          {/* Candle flame — clickable */}
          <button
            onClick={blow}
            aria-label="Blow the candle"
            className="absolute left-1/2 top-[22%] -translate-x-1/2 cursor-pointer"
          >
            <AnimatePresence>
              {lit && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="relative"
                >
                  <div
                    className="h-10 w-5 animate-flicker rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 70%, #fff7c2 0%, #ffb347 40%, #ff5e3a 80%, transparent 100%)",
                      boxShadow:
                        "0 0 30px 8px rgba(255, 180, 80, 0.7), 0 0 60px 20px rgba(255, 90, 50, 0.4)",
                    }}
                  />
                </motion.div>
              )}
              {!lit && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0.6, 0], y: -40 }}
                  transition={{ duration: 1.5 }}
                  className="h-8 w-8 rounded-full bg-softwhite/40 blur-md"
                />
              )}
            </AnimatePresence>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {lit ? (
            <span className="flex items-center justify-center gap-2">
              <Flame className="h-4 w-4 text-lavender" /> Tap the flame to make your wish
            </span>
          ) : (
            <span className="text-lavender">Your wish is on its way ✨</span>
          )}
        </p>

        <AnimatePresence>
          {celebrated && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="glass-wine mt-10 rounded-2xl p-8 text-center"
            >
              <p className="font-display text-2xl text-gradient md:text-3xl">
                May your life bloom beautifully like lavender
                <br />
                and glow richly like vintage wine.
              </p>
              <p className="mt-3 font-script text-xl text-lavender">Happy Birthday ❤️</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}

function makeEmojiShape(emoji: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.font = "52px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, 32, 36);
  const c = confetti as unknown as { shapeFromText?: (o: { text: string; scalar?: number }) => unknown };
  if (typeof c.shapeFromText === "function") {
    return c.shapeFromText({ text: emoji, scalar: 2 });
  }
  return "circle" as const;
}

function fireCelebration() {
  const colors = ["#722F37", "#C8A2C8", "#E0BFB8", "#F8F5F2"];
  const flower = makeEmojiShape("🌸");
  const rose = makeEmojiShape("🌹");
  const lavenderFlower = makeEmojiShape("💐");
  const balloon = makeEmojiShape("🎈");
  const heart = makeEmojiShape("💜");

  const end = Date.now() + 2800;
  (function frame() {
    confetti({
      particleCount: 3, angle: 60, spread: 70, origin: { x: 0, y: 0.8 }, colors,
      shapes: [balloon, flower, heart] as any, scalar: 1.6, gravity: 0.6, ticks: 260,
    });
    confetti({
      particleCount: 3, angle: 120, spread: 70, origin: { x: 1, y: 0.8 }, colors,
      shapes: [balloon, rose, lavenderFlower] as any, scalar: 1.6, gravity: 0.6, ticks: 260,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  // Big burst of flowers + balloons from center
  setTimeout(() => {
    confetti({
      particleCount: 40, spread: 130, origin: { y: 0.5 },
      shapes: [flower, rose, lavenderFlower] as any, scalar: 2, ticks: 320, gravity: 0.5,
    });
    confetti({
      particleCount: 30, spread: 100, origin: { y: 0.6 },
      shapes: [balloon] as any, scalar: 2.2, gravity: -0.3, ticks: 400,
    });
    confetti({
      particleCount: 120, spread: 140, origin: { y: 0.5 }, colors,
      shapes: ["circle"], scalar: 1.2,
    });
  }, 500);

  // Floating balloons rising up
  setTimeout(() => {
    confetti({
      particleCount: 25, spread: 80, origin: { y: 1 },
      shapes: [balloon, heart] as any, scalar: 2, gravity: -0.4, ticks: 500, startVelocity: 50,
    });
  }, 1200);
}

/* ───────────────────────── Memories Timeline ───────────────────────── */
function Memories() {
  const moments = [
    { date: "April 6", text: "A Text popped up my Teams😅" },
    { date: "April 19", text: "At 2:32 AM We officially became friends🥂" },
    { date: "May 25", text: "The best day ever 😁" },
    { date: "June 26", text: "Another year of you. Another year I am the luckiest." },
  ];

  return (
    <SectionShell title="Our Story" sub="a small timeline of beautiful things">
      <div className="relative mx-auto mt-16 max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-wine via-lavender to-transparent md:left-1/2" />
        <div className="space-y-12">
          {moments.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`relative flex items-start gap-6 md:gap-10 ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2">
                <div className="h-4 w-4 rounded-full bg-lavender glow-lavender" />
              </div>
              <div className="ml-12 flex-1 md:ml-0 md:w-1/2 md:px-8">
                <div className="glass rounded-2xl p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-lavender">{m.date}</p>
                  <p className="mt-3 font-display text-xl text-softwhite md:text-2xl">{m.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* ───────────────────────── Why You're Special ───────────────────────── */
function WhySpecial() {
  const cards = [
    { title: "Your smile", text: "lights up every room you walk into — including mine." },
    { title: "Your presence", text: "feels like home, even on the loudest of days." },
    { title: "Your softness", text: "makes ordinary moments feel quietly magical." },
    { title: "Your strength", text: "is the kind that doesn't shout, but moves mountains." },
    { title: "Your laughter", text: "is my favorite sound and my favorite cure." },
    { title: "Your love", text: "is the best thing that's ever happened to me." },
  ];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SectionShell title="Why You're Special" sub="six tiny truths, of many">
      <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, idx) => {
          const isOpen = open === idx;
          return (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onClick={() => setOpen(isOpen ? null : idx)}
              className="group relative overflow-hidden rounded-2xl glass p-6 text-left transition hover:glow-lavender hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-wine/0 to-lavender/0 transition group-hover:from-wine/10 group-hover:to-lavender/20" />
              <Heart className="relative h-5 w-5 text-lavender" />
              <h3 className="relative mt-4 font-display text-2xl text-softwhite">{c.title}</h3>
              <motion.p
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                className="relative overflow-hidden text-sm text-muted-foreground"
              >
                <span className="block pt-3">{c.text}</span>
              </motion.p>
              {!isOpen && (
                <p className="relative mt-3 text-xs uppercase tracking-[0.2em] text-lavender/70">
                  tap to reveal
                </p>
              )}
            </motion.button>
          );
        })}
      </div>
    </SectionShell>
  );
}

/* ───────────────────────── Final Surprise ───────────────────────── */
function FinalSurprise() {
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(true);
    fireCelebration();
  };

  return (
    <SectionShell title="One Last Thing" sub="a small gift, hidden until now">
      <div className="mx-auto mt-12 max-w-2xl text-center">
        {!opened ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            onClick={open}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-wine to-lavender px-8 py-4 font-medium tracking-wide text-softwhite glow-wine transition"
          >
            <Gift className="h-5 w-5 transition group-hover:rotate-12" />
            One Last Surprise
            <Heart className="h-4 w-4 fill-current" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="glass-wine rounded-3xl p-10 md:p-14"
          >
            <Sparkles className="mx-auto h-8 w-8 text-lavender" />
            <p className="mt-6 font-display text-2xl leading-relaxed text-softwhite md:text-3xl">
              Some gifts fade.
              <br />
              <span className="text-gradient">Some memories don't.</span>
            </p>
            <p className="mt-6 font-script text-xl text-lavender md:text-2xl">
              This was made so you always remember how special you are to me.
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              with all my love · today and always
            </p>
          </motion.div>
        )}
      </div>
    </SectionShell>
  );
}

/* ───────────────────────── Shared shell ───────────────────────── */
function SectionShell({
  title, sub, children,
}: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="relative px-6 py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-5xl text-center"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-lavender/80">{sub}</p>
        <h2 className="mt-3 font-display text-4xl text-gradient md:text-6xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative px-6 py-16 text-center">
      <p className="font-script text-xl text-lavender">made with 💜 just for you</p>
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {BIRTHDAY_NAME} · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
