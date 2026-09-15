import React, { useState, useEffect } from "react";

// ---------- DEFAULT_WORDS_START ----------
// Alap szókészlet, ha még nincs mentett szólista.
// Formátum soronként: "angol szó – magyar jelentés"
// (A GitHub Pages verzióban ez egy külön words.js fájlban van.)
const DEFAULT_WORDS_TEXT = `goodbye – viszlát
bye – szia, viszlát
good morning – jó reggelt
good afternoon – jó napot
good evening – jó estét
good night – jó éjszakát
eight – nyolc
nine – kilenc
eleven – tizenegy
twelve – tizenkettő
thirteen – tizenhárom
fourteen – tizennégy
fifteen – tizenöt
sixteen – tizenhat
seventeen – tizenhét
eighteen – tizennyolc
nineteen – tizenkilenc
twenty – húsz
thirty – harminc
forty – negyven
fifty – ötven
sixty – hatvan
seventy – hetven
eighty – nyolcvan
ninety – kilencven
one hundred – száz
Monday – hétfő
Tuesday – kedd
Wednesday – szerda
Thursday – csütörtök
Friday – péntek
Saturday – szombat
Sunday – vasárnap
book – könyv
notebook – füzet
pen – toll
pencil – ceruza
pencil case – tolltartó
ruler – vonalzó
rubber – radír
schoolbag – iskolatáska
desk – pad, íróasztal
chair – szék
board – tábla
computer – számítógép
bag – táska
mobile phone – mobiltelefon
watch – óra
keys – kulcsok
glasses – szemüveg
Hungary – Magyarország
Hungarian – magyar
England – Anglia
English – angol
Germany – Németország
German – német
France – Franciaország
French – francia
Italy – Olaszország
Italian – olasz
Spain – Spanyolország
Spanish – spanyol
America – Amerika
American – amerikai
mother – anya
father – apa
mum – anya
dad – apa
brother – fiútestvér
sister – lánytestvér
grandmother – nagymama
grandfather – nagypapa
aunt – nagynéni
uncle – nagybácsi
cousin – unokatestvér
yellow – sárga
orange – narancssárga
purple – lila
brown – barna
white – fehér
grey – szürke
listen – hallgass
repeat – ismételd
look – nézz
read – olvass
write – írj
open – nyisd ki
close – csukd be
stand up – állj fel
sit down – ülj le`;
// ---------- DEFAULT_WORDS_END ----------

// ---------- mascot copy ----------

const MENU_GREETINGS = [
  "Szia majom-pajtás! Készen állsz banánkeményen gyakorolni? 🐵🍌",
  "Húzzunk fel egy fára, és tanuljunk pár szót!",
  "Gyere, majmoljuk be együtt ezt a szólistát!",
  "Szia! Mi, majmok, imádunk szavakat gyűjteni. Kezdjünk bele!",
  "Helló! A dzsungel vár, de előbb gyakoroljunk egy kicsit.",
  "Pszt... hallom, hogy egy banán szótanulásra vár! 🍌",
  "Kész vagy egy kis majomerős gyakorlásra?",
  "Szia! Ugorjunk neki, mint majom a liánról a liánra!",
  "Ma is szótanuló majmok vagyunk, ugye?",
  "Helló, majom-cimbora! Irány a szavak dzsungele!",
  "Szia! Ma is banánért gyakorlunk, vagy csak úgy, kedvből?",
  "Kapaszkodj, indulunk felfelé a szótudás fáján!",
];

const SETUP_MESSAGES = [
  "Én is egy tanulós majom vagyok — dobd be a szavakat!",
  "Add ide a szólistát, majd én elrendezem a fán!",
  "Egy majomnak sosem elég a szó — gyere, gyűjtsünk még!",
  "Ide a szavakkal, és irány a dzsungel iskolája!",
];

const CORRECT_MESSAGES = [
  "Majomügyes vagy! 🐵",
  "Ez banánérő teljesítmény! 🍌",
  "Szuper, igazi szótanuló majom vagy!",
  "Ezt még egy vén hegyi majom is megirigyelné!",
  "Ez az! Egyenesen a fa tetejére ezzel!",
  "Pontos, mint egy majom ugrása liánról liánra!",
  "Ezt profi módon majmoltad le!",
  "Banánosztás mindenkinek, ez nagyon jó volt!",
  "Nagyon jó! Már majdnem majom-mester vagy!",
  "Szuperszem, semmi nem kerüli el a figyelmedet!",
  "Ez az igazi majomtudás!",
  "Ügyes vagy, mint egy majom a fán!",
];
const WRONG_MESSAGES = [
  "Semmi baj, még én is leesek néha egy fáról!",
  "Ez egy trükkös szó, még a legügyesebb majom is elgondolkodik rajta!",
  "Majdnem! Egy banánt azért kapsz próbálkozásért 🍌",
  "Nem baj, majmocskám, gyakoroljuk még egy kicsit!",
  "Ez a szó még kúszik-mászik, de hamarosan megvan!",
  "Ejnye, ez most kicsúszott, mint egy csúszós banánhéj!",
  "Semmi gond, mindenki elvéti néha egy ágat!",
  "Ez most nem sikerült, de a majmok sosem adják fel!",
  "Kicsit még gyakoroljuk, aztán liánról liánra repülünk!",
  "Ejha, ez nehéz volt! Nézzük meg együtt még egyszer.",
];

const PRACTICE_PERFECT_MESSAGES = [
  "Ez maga volt a majom-mesterfokozat! 🎉🐵",
  "Vau, minden szót bezsebeltél, mint egy fürge majom a banánt!",
  "Tökéletes! Ma te vagy a dzsungel királya!",
  "Ezt nevezem majomügyességnek! Minden szó megvan!",
];
const PRACTICE_GOOD_MESSAGES = [
  "Szép munka, majom-pajtás! Ezekre még figyeljünk:",
  "Ez már egész jó volt! Még pár szóra hajtsunk rá:",
  "Ügyes voltál! Csak ezek szorulnak még gyakorlásra:",
  "Majdnem tökéletes! Ezeket nézzük át még egyszer:",
];

const EXAM_PERFECT_MESSAGES = [
  "Fantasztikus, igazi szótanuló majom vagy! 🎉",
  "Ez maga volt a majom-Nobel-díj! Minden szó megvan!",
  "Hihetetlen, egy szót sem hibáztál! 🐒🎉",
];
const EXAM_GOOD_MESSAGES = [
  "Ez már egy majomügyes Banánpróba lenne!",
  "Szép eredmény, már majdnem majom-mester szinten vagy!",
  "Ügyes voltál, csak pár szó szorul még gyakorlásra!",
];
const EXAM_PRACTICE_MESSAGES = [
  "Ezeket még gyakoroljuk — még a legügyesebb majom is tanul minden nap!",
  "Semmi baj, mindenki innen indul — gyakoroljunk még egy kicsit!",
  "Ez még nem ment annyira, de a majmok kitartóak! Nézzük át együtt.",
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------- helpers ----------

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function parseWordList(raw) {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/\s*[–—]\s*|\s+-\s+|\s*:\s*/);
      if (parts.length < 2) return null;
      const en = parts[0].trim();
      const hu = parts.slice(1).join(" - ").trim();
      if (!en || !hu) return null;
      return { en, hu };
    })
    .filter(Boolean);
}

function keyOf(word) {
  return word.en.toLowerCase();
}

function ensureProgress(words, progress) {
  const p = { ...progress };
  words.forEach((w) => {
    const k = keyOf(w);
    if (!p[k]) p[k] = { level: 0, seen: false };
  });
  return p;
}

function getWeakWords(words, progress, threshold = 2) {
  return words.filter((w) => {
    const p = progress[keyOf(w)];
    return p && p.seen && p.level < threshold;
  });
}

function pickDistractorWords(words, correct, count) {
  const others = words.filter((w) => keyOf(w) !== keyOf(correct));
  return shuffle(others).slice(0, Math.min(count, others.length));
}

// Letters that are easy to confuse with each other when spelling from memory
// (visually similar, or the kind of mix-up a Hungarian-speaking kid makes in English).
const CONFUSABLE = {
  a: ["e", "o", "u"],
  b: ["d", "p", "q"],
  c: ["k", "s", "g"],
  d: ["b", "p", "q"],
  e: ["a", "i", "u"],
  f: ["v", "t"],
  g: ["j", "c", "q"],
  h: ["n"],
  i: ["e", "y", "j"],
  j: ["g", "y"],
  k: ["c", "q"],
  l: ["r", "i"],
  m: ["n", "w"],
  n: ["m", "h"],
  o: ["a", "u"],
  p: ["b", "q", "d"],
  q: ["g", "p"],
  r: ["l"],
  s: ["c", "z"],
  t: ["d", "f"],
  u: ["a", "o", "v"],
  v: ["w", "f", "u"],
  w: ["v", "m"],
  x: ["z", "s"],
  y: ["i", "j"],
  z: ["s", "x"],
};

function pickLetterOptions(correctChar) {
  const c = correctChar.toLowerCase();
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const similar = shuffle((CONFUSABLE[c] || []).filter((l) => l !== c));
  const rest = shuffle(alphabet.filter((l) => l !== c && !similar.includes(l)));
  const distractors = [...similar, ...rest].slice(0, 3);
  return shuffle([c, ...distractors]);
}

function pickBlankIndices(word, level) {
  const chars = word.en.split("");
  const eligible = [];
  chars.forEach((ch, i) => {
    if (ch !== " " && i !== 0) eligible.push(i);
  });
  const pool = eligible.length > 0 ? eligible : chars.map((_, i) => i).filter((i) => chars[i] !== " ");
  const nonSpaceLen = chars.filter((c) => c !== " ").length;
  let count = nonSpaceLen <= 5 ? 1 : 2;
  if (level >= 3) count = Math.min(count + 1, pool.length);
  count = Math.max(1, Math.min(count, pool.length));
  return shuffle(pool).slice(0, count).sort((a, b) => a - b);
}

function buildPracticeQueue(pool, progress, maxQuestions = DEFAULT_MAX_QUESTIONS) {
  if (!pool || pool.length === 0) return [];
  let items = [];
  pool.forEach((w) => {
    const lvl = progress[keyOf(w)]?.level ?? 0;
    const weight = Math.max(1, 6 - lvl);
    for (let i = 0; i < weight; i++) items.push(w);
  });
  items = shuffle(items);
  for (let i = 1; i < items.length; i++) {
    if (keyOf(items[i]) === keyOf(items[i - 1])) {
      const j = (i + 3) % items.length;
      [items[i], items[j]] = [items[j], items[i]];
    }
  }
  const cap = Math.max(1, maxQuestions || DEFAULT_MAX_QUESTIONS);
  const size = Math.max(Math.min(8, cap), Math.min(cap, Math.round(pool.length * 1.6)));
  return items.slice(0, Math.min(size, items.length));
}

// ---------- theme ----------

const LIGHT = {
  page: "bg-sky-50",
  card: "bg-white border-sky-100",
  heading: "text-slate-800",
  muted: "text-slate-500",
  faint: "text-slate-400",
  textarea: "bg-white border-slate-300 text-slate-800 focus:ring-lime-400",
  optionBase: "bg-white border-slate-300 text-slate-700 hover:bg-slate-50",
  optionCorrect: "bg-lime-100 border-lime-500 text-lime-800",
  optionWrong: "bg-rose-100 border-rose-400 text-rose-700",
  optionNeutralSel: "bg-slate-200 border-slate-300 text-slate-700",
  blankLine: "border-slate-400",
  blankChar: "text-slate-800",
  activeBlank: "bg-amber-100 border-2 border-amber-400 text-amber-700",
  score: "text-lime-600",
  toggle: "bg-white border-slate-300 text-slate-600 hover:bg-slate-50",
  dotEmpty: "bg-slate-200",
  catWeak: "text-rose-600",
  catMid: "text-amber-600",
  catGood: "text-lime-600",
  progressTrack: "bg-slate-200",
  progressFill: "bg-lime-500",
  mascotBubble: "bg-white border-slate-200 text-slate-700",
  metaColor: "#f0f9ff",
  btn: {
    primary: "bg-lime-500 hover:bg-lime-400 active:translate-y-1 text-white border-b-4 border-lime-700",
    secondary: "bg-sky-500 hover:bg-sky-400 active:translate-y-1 text-white border-b-4 border-sky-700",
    subtle: "bg-amber-400 hover:bg-amber-300 active:translate-y-1 text-amber-950 border-b-4 border-amber-600",
    ghost: "bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-300 active:translate-y-1",
  },
};

const DARK = {
  page: "bg-slate-950",
  card: "bg-slate-900 border-slate-700",
  heading: "text-slate-100",
  muted: "text-slate-400",
  faint: "text-slate-500",
  textarea: "bg-slate-800 border-slate-600 text-slate-100 focus:ring-lime-500",
  optionBase: "bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700",
  optionCorrect: "bg-lime-900 border-lime-500 text-lime-300",
  optionWrong: "bg-rose-900 border-rose-500 text-rose-300",
  optionNeutralSel: "bg-slate-700 border-slate-600 text-slate-200",
  blankLine: "border-slate-500",
  blankChar: "text-slate-100",
  activeBlank: "bg-amber-900/40 border-2 border-amber-500 text-amber-300",
  score: "text-lime-400",
  toggle: "bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700",
  dotEmpty: "bg-slate-700",
  catWeak: "text-rose-400",
  catMid: "text-amber-400",
  catGood: "text-lime-400",
  progressTrack: "bg-slate-700",
  progressFill: "bg-lime-500",
  mascotBubble: "bg-slate-800 border-slate-600 text-slate-200",
  metaColor: "#020617",
  btn: {
    primary: "bg-lime-500 hover:bg-lime-400 active:translate-y-1 text-slate-950 border-b-4 border-lime-700",
    secondary: "bg-sky-500 hover:bg-sky-400 active:translate-y-1 text-slate-950 border-b-4 border-sky-700",
    subtle: "bg-amber-400 hover:bg-amber-300 active:translate-y-1 text-amber-950 border-b-4 border-amber-600",
    ghost: "bg-slate-800 hover:bg-slate-700 text-slate-200 border-2 border-slate-600 active:translate-y-1",
  },
};

// ---------- storage ----------

const DEFAULT_MAX_QUESTIONS = 25;

async function loadData() {
  let words = null;
  let progress = {};
  let theme = "light";
  let maxQuestions = DEFAULT_MAX_QUESTIONS;
  try {
    const r = await window.storage.get("wordlist", false);
    if (r) words = JSON.parse(r.value);
  } catch (e) {}
  try {
    const r = await window.storage.get("progress", false);
    if (r) progress = JSON.parse(r.value);
  } catch (e) {}
  try {
    const r = await window.storage.get("theme", false);
    if (r) theme = r.value;
  } catch (e) {}
  try {
    const r = await window.storage.get("maxQuestions", false);
    if (r) {
      const n = parseInt(r.value, 10);
      if (!isNaN(n) && n > 0) maxQuestions = n;
    }
  } catch (e) {}
  return { words, progress, theme, maxQuestions };
}

async function saveWords(words) {
  try {
    await window.storage.set("wordlist", JSON.stringify(words), false);
  } catch (e) {}
}

async function saveProgress(progress) {
  try {
    await window.storage.set("progress", JSON.stringify(progress), false);
  } catch (e) {}
}

async function saveTheme(theme) {
  try {
    await window.storage.set("theme", theme, false);
  } catch (e) {}
}

async function saveMaxQuestions(n) {
  try {
    await window.storage.set("maxQuestions", String(n), false);
  } catch (e) {}
}

// ---------- UI bits ----------

function BigButton({ children, onClick, tone = "primary", disabled, t }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-2xl py-4 px-5 text-lg font-bold transition disabled:opacity-40 disabled:active:translate-y-0 ${t.btn[tone]}`}
    >
      {children}
    </button>
  );
}

const BG_PATTERN = Array.from({ length: 48 }, (_, i) => (i % 3 === 0 ? "🐵" : "🍌"));

function Shell({ children, t, dark, onToggle, onClose }) {
  return (
    <div className={`relative min-h-screen ${t.page} flex items-center justify-center p-4 transition-colors overflow-hidden`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-6 gap-10 -rotate-6 scale-125 opacity-10 pointer-events-none select-none text-4xl leading-none content-center justify-items-center"
      >
        {BG_PATTERN.map((emoji, i) => (
          <span key={i}>{emoji}</span>
        ))}
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-between items-center mb-2">
          {onClose ? (
            <button
              onClick={onClose}
              aria-label="Vissza a főmenübe"
              className={`text-base leading-none rounded-full w-7 h-7 flex items-center justify-center transition-colors ${t.faint} hover:opacity-70`}
            >
              ✕
            </button>
          ) : (
            <span />
          )}
          <button
            onClick={onToggle}
            className={`text-xs rounded-full border px-3 py-1.5 transition-colors ${t.toggle}`}
          >
            {dark ? "☀️ Világos mód" : "🌙 Sötét mód"}
          </button>
        </div>
        <div className={`rounded-3xl shadow-xl border-2 p-6 sm:p-8 transition-colors ${t.card}`}>{children}</div>
      </div>
    </div>
  );
}

function ProgressBar({ value, total, t }) {
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
  const markerPct = Math.max(6, Math.min(94, pct));
  return (
    <div className={`relative w-full h-3 rounded-full overflow-visible mb-7 ${t.progressTrack}`}>
      <div
        className={`h-full rounded-full overflow-hidden transition-all duration-300 ${t.progressFill}`}
        style={{ width: `${pct}%` }}
      />
      <div
        className="absolute top-1/2 transition-all duration-300"
        style={{ left: `${markerPct}%`, transform: "translate(-50%, -55%)" }}
      >
        <Monkey mood="happy" size={26} />
      </div>
    </div>
  );
}

// A friendly green monkey mascot, built from real emoji so it's instantly recognizable.
// `mood` picks which monkey emoji fits the moment (never a sad/crying face — stays encouraging).
const MOOD_EMOJI = {
  wave: "🐵",
  happy: "🐵",
  thinking: "🙊",
  oops: "🙈",
  celebrate: "🐒",
  excited: "🐒",
};

function Monkey({ mood = "wave", size = 88, className = "" }) {
  const bounce = mood === "celebrate" || mood === "excited" ? "animate-bounce" : "";
  const emoji = MOOD_EMOJI[mood] || MOOD_EMOJI.wave;
  return (
    <div
      className={`${bounce} ${className} inline-flex items-center justify-center leading-none select-none`}
      style={{ width: size, height: size, fontSize: size * 0.85 }}
    >
      <span>{emoji}</span>
    </div>
  );
}

function SpeechBubble({ children, t }) {
  return <div className={`rounded-2xl border-2 px-4 py-2.5 text-sm font-semibold ${t.mascotBubble}`}>{children}</div>;
}

// Shows the session reward as 0-5 bananas, filled according to how well it went.
function BananaScore({ ratio }) {
  const filled = Math.max(0, Math.min(5, Math.round(ratio * 5)));
  return (
    <div className="flex justify-center gap-1 text-4xl mb-1" aria-label={`${filled} / 5 banán`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} style={{ opacity: i < filled ? 1 : 0.2 }}>
          🍌
        </span>
      ))}
    </div>
  );
}

// ---------- main component ----------

export default function VocabTrainer() {
  const [screen, setScreen] = useState("loading"); // loading, setup, menu, practice, practiceEnd, exam, examEnd, progressView
  const [words, setWords] = useState([]);
  const [progress, setProgress] = useState({});
  const [setupText, setSetupText] = useState("");
  const [dark, setDark] = useState(false);
  const t = dark ? DARK : LIGHT;
  const [menuGreeting] = useState(() => pickRandom(MENU_GREETINGS));
  const [setupMsg] = useState(() => pickRandom(SETUP_MESSAGES));
  const [confirmReset, setConfirmReset] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [maxQuestions, setMaxQuestions] = useState(DEFAULT_MAX_QUESTIONS);
  const [maxQuestionsInput, setMaxQuestionsInput] = useState(String(DEFAULT_MAX_QUESTIONS));

  // session state
  const [sessionType, setSessionType] = useState("practice"); // practice, quick, exam
  const [queue, setQueue] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [stage, setStage] = useState("intro"); // intro, recall, spelling
  const [direction, setDirection] = useState("hu2en"); // hu2en, en2hu
  const [examExType, setExamExType] = useState("recall_hu2en"); // recall_hu2en, recall_en2hu, spelling (exam only)
  const [recallOptions, setRecallOptions] = useState([]);
  const [recallSelected, setRecallSelected] = useState(null);
  const [recallOk, setRecallOk] = useState(null);
  const [blankIdx, setBlankIdx] = useState([]);
  const [blankPos, setBlankPos] = useState(0);
  const [filled, setFilled] = useState({});
  const [letterOptions, setLetterOptions] = useState([]);
  const [letterSelected, setLetterSelected] = useState(null);
  const [letterOk, setLetterOk] = useState(null);
  const [spellAllCorrect, setSpellAllCorrect] = useState(true);
  const [reaction, setReaction] = useState(null); // { mood, text } — practice/quick only
  const [missed, setMissed] = useState([]); // {en, hu}
  const [isExam, setIsExam] = useState(false);
  const [examTotal, setExamTotal] = useState(0);
  const [examCorrect, setExamCorrect] = useState(0);

  useEffect(() => {
    (async () => {
      const { words: w, progress: p, theme, maxQuestions: mq } = await loadData();
      setDark(theme === "dark");
      setMaxQuestions(mq);
      setMaxQuestionsInput(String(mq));
      if (w && w.length > 0) {
        setWords(w);
        setProgress(ensureProgress(w, p));
        setScreen("menu");
      } else {
        const defaults = parseWordList(DEFAULT_WORDS_TEXT);
        if (defaults.length > 0) {
          const dp = ensureProgress(defaults, {});
          setWords(defaults);
          setProgress(dp);
          saveWords(defaults);
          saveProgress(dp);
          setScreen("menu");
        } else {
          setScreen("setup");
        }
      }
    })();
  }, []);

  // Keep the Safari status bar / home-screen icon color in sync with light/dark mode.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? DARK.metaColor : LIGHT.metaColor);
  }, [dark]);

  function commitMaxQuestions(raw) {
    const n = parseInt(raw, 10);
    const clamped = !isNaN(n) ? Math.max(5, Math.min(200, n)) : DEFAULT_MAX_QUESTIONS;
    setMaxQuestions(clamped);
    setMaxQuestionsInput(String(clamped));
    saveMaxQuestions(clamped);
  }

  function toggleDark() {
    setDark((prev) => {
      const next = !prev;
      saveTheme(next ? "dark" : "light");
      return next;
    });
  }

  function startTurn(word, examFlag = isExam) {
    setRecallSelected(null);
    setRecallOk(null);
    setLetterSelected(null);
    setLetterOk(null);
    setSpellAllCorrect(true);
    setFilled({});
    setBlankPos(0);
    setReaction(null);

    if (examFlag) {
      // Banánpróba: just ONE random exercise per word — hu→en recall, en→hu recall, or spelling.
      const exType = pickRandom(["recall_hu2en", "recall_en2hu", "spelling"]);
      setExamExType(exType);
      const lvl = progress[keyOf(word)]?.level ?? 0;
      if (exType === "spelling") {
        setStage("spelling");
        const idxs = pickBlankIndices(word, lvl);
        setBlankIdx(idxs);
        setLetterOptions(pickLetterOptions(word.en[idxs[0]]));
      } else {
        setStage("recall");
        setDirection(exType === "recall_en2hu" ? "en2hu" : "hu2en");
        const distractors = pickDistractorWords(words, word, 3);
        setRecallOptions(shuffle([word, ...distractors]));
      }
      return;
    }

    const seen = progress[keyOf(word)]?.seen;
    const st = !seen ? "intro" : "recall";
    const dir = Math.random() < 0.5 ? "hu2en" : "en2hu";
    setDirection(dir);
    setStage(st);
    if (st === "recall" || st === "intro") {
      const distractors = pickDistractorWords(words, word, 3);
      setRecallOptions(shuffle([word, ...distractors]));
    }
  }

  function beginSession(type) {
    const exam = type === "exam";
    setSessionType(type);
    setIsExam(exam);
    setMissed([]);
    setExamTotal(0);
    setExamCorrect(0);
    const pool = type === "quick" ? getWeakWords(words, progress) : words;
    const q = exam
      ? shuffle(pool).slice(0, Math.max(1, maxQuestions))
      : buildPracticeQueue(pool, progress, maxQuestions);
    if (q.length === 0) return;
    setQueue(q);
    setQIndex(0);
    setScreen(exam ? "exam" : "practice");
    startTurn(q[0], exam);
  }

  const currentWord = queue[qIndex];

  function handleIntroNext() {
    setStage("recall");
    const distractors = pickDistractorWords(words, currentWord, 3);
    setRecallOptions(shuffle([currentWord, ...distractors]));
  }

  function handleRecallPick(opt) {
    if (recallSelected) return;
    setRecallSelected(opt);
    if (!isExam) {
      const ok = keyOf(opt) === keyOf(currentWord);
      setRecallOk(ok);
      setReaction({ mood: ok ? "happy" : "oops", text: pickRandom(ok ? CORRECT_MESSAGES : WRONG_MESSAGES) });
    } else {
      setRecallOk(null);
    }
  }

  function goToSpelling() {
    const lvl = progress[keyOf(currentWord)]?.level ?? 0;
    const idxs = pickBlankIndices(currentWord, lvl);
    setBlankIdx(idxs);
    setBlankPos(0);
    setFilled({});
    setLetterSelected(null);
    setLetterOk(null);
    setReaction(null);
    setLetterOptions(pickLetterOptions(currentWord.en[idxs[0]]));
    setStage("spelling");
  }

  function handleLetterPick(letter) {
    if (letterSelected) return;
    setLetterSelected(letter);
    const idx = blankIdx[blankPos];
    const correctChar = currentWord.en[idx].toLowerCase();
    const ok = letter === correctChar;
    if (!isExam) {
      setLetterOk(ok);
      if (!ok) setSpellAllCorrect(false);
      setFilled((f) => ({ ...f, [idx]: correctChar }));
      setReaction({ mood: ok ? "happy" : "oops", text: pickRandom(ok ? CORRECT_MESSAGES : WRONG_MESSAGES) });
    } else {
      setLetterOk(null);
      if (!ok) setSpellAllCorrect(false);
      setFilled((f) => ({ ...f, [idx]: letter }));
    }
  }

  function nextBlankOrFinish() {
    const nextPos = blankPos + 1;
    if (nextPos < blankIdx.length) {
      setBlankPos(nextPos);
      setLetterSelected(null);
      setLetterOk(null);
      setReaction(null);
      setLetterOptions(pickLetterOptions(currentWord.en[blankIdx[nextPos]]));
    } else {
      finishWord();
    }
  }

  function finishWord() {
    let wasFullyCorrect;
    if (isExam) {
      wasFullyCorrect =
        examExType === "spelling" ? spellAllCorrect : !!recallSelected && keyOf(recallSelected) === keyOf(currentWord);
    } else {
      wasFullyCorrect = recallOk === true && spellAllCorrect;
    }
    const k = keyOf(currentWord);

    setProgress((prev) => {
      const cur = prev[k] || { level: 0, seen: false };
      const level = wasFullyCorrect ? Math.min(5, cur.level + 1) : Math.max(0, cur.level - 1);
      const updated = { ...prev, [k]: { level, seen: true } };
      saveProgress(updated);
      return updated;
    });

    if (isExam) {
      setExamTotal((tt) => tt + 1);
      if (wasFullyCorrect) setExamCorrect((c) => c + 1);
      else setMissed((m) => [...m, currentWord]);
    } else if (!wasFullyCorrect) {
      setMissed((m) => (m.find((x) => keyOf(x) === k) ? m : [...m, currentWord]));
    }

    advanceQueue(!wasFullyCorrect && !isExam);
  }

  function advanceQueue(requeue) {
    setQueue((q) => {
      let newQ = q;
      if (requeue) {
        const insertAt = Math.min(qIndex + 3, newQ.length);
        newQ = [...newQ.slice(0, insertAt), currentWord, ...newQ.slice(insertAt)];
      }
      const nextIdx = qIndex + 1;
      if (nextIdx >= newQ.length) {
        setScreen(isExam ? "examEnd" : "practiceEnd");
      } else {
        setQIndex(nextIdx);
        setTimeout(() => startTurn(newQ[nextIdx]), 0);
      }
      return newQ;
    });
  }

  function handleSetupSave() {
    const parsed = parseWordList(setupText);
    if (parsed.length === 0) return;
    setWords(parsed);
    const p = ensureProgress(parsed, {});
    setProgress(p);
    saveWords(parsed);
    saveProgress(p);
    setScreen("menu");
  }

  function openWordListEditor() {
    setSetupText(words.map((w) => `${w.en} – ${w.hu}`).join("\n"));
    setScreen("setup");
  }

  function handleResetProgress() {
    const fresh = ensureProgress(words, {});
    setProgress(fresh);
    saveProgress(fresh);
    setConfirmReset(false);
  }

  // ---------- render ----------

  if (screen === "loading") {
    return (
      <Shell t={t} dark={dark} onToggle={toggleDark}>
        <p className={`text-center ${t.muted}`}>Betöltés…</p>
      </Shell>
    );
  }

  if (screen === "setup") {
    return (
      <Shell t={t} dark={dark} onToggle={toggleDark}>
        <div className="flex items-center gap-3 mb-4">
          <Monkey mood="thinking" size={56} />
          <div>
            <h1 className={`text-xl font-extrabold tracking-tight ${t.heading}`}>Szólista</h1>
            <p className={`text-xs ${t.muted}`}>{setupMsg}</p>
          </div>
        </div>
        <p className={`text-sm mb-4 ${t.muted}`}>
          Minden sorba egy szót írj, ilyen formában: <span className="font-mono">angol – magyar</span>
        </p>
        <textarea
          value={setupText}
          onChange={(e) => setSetupText(e.target.value)}
          rows={10}
          placeholder={"suitcase – bőrönd\nstormy – viharos\nappeared – megjelent"}
          className={`w-full rounded-xl border p-3 font-mono text-base mb-4 focus:outline-none focus:ring-2 ${t.textarea}`}
        />
        <BigButton t={t} onClick={handleSetupSave}>
          Irány a fára!
        </BigButton>
        {words.length > 0 && (
          <button onClick={() => setScreen("menu")} className={`mt-3 w-full text-center text-sm ${t.faint}`}>
            Mégse
          </button>
        )}
      </Shell>
    );
  }

  if (screen === "menu") {
    const weakWords = getWeakWords(words, progress);
    return (
      <Shell t={t} dark={dark} onToggle={toggleDark}>
        <div className="flex justify-end mb-1">
          <div className="flex gap-3">
            <button onClick={openWordListEditor} className={`text-xs ${t.faint}`}>
              szólista
            </button>
            <button
              onClick={() => {
                setConfirmReset(false);
                setShowInfo(false);
                setScreen("progressView");
              }}
              className={`text-xs ${t.faint}`}
            >
              haladás
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center text-center mb-6">
          <Monkey mood="wave" size={100} />
          <h1 className={`text-2xl font-extrabold tracking-tight mt-2 ${t.heading}`}>Angol szótanuló</h1>
          <div className="mt-3 w-full">
            <SpeechBubble t={t}>{menuGreeting}</SpeechBubble>
          </div>
          <p className={`mt-3 text-sm ${t.muted}`}>{words.length} szó a listában</p>
        </div>
        <div className="space-y-3">
          <BigButton t={t} onClick={() => beginSession("practice")}>
            Majomiskola
          </BigButton>
          <BigButton t={t} tone="subtle" disabled={weakWords.length === 0} onClick={() => beginSession("quick")}>
            {weakWords.length > 0 ? `Banánfrissítő (${weakWords.length})` : "Banánfrissítő"}
          </BigButton>
          <BigButton t={t} onClick={() => beginSession("exam")} tone="secondary">
            Banánpróba
          </BigButton>
        </div>
      </Shell>
    );
  }

  if (screen === "progressView") {
    const weakList = [];
    const midList = [];
    const goodList = [];
    words.forEach((w) => {
      const lvl = progress[keyOf(w)]?.level ?? 0;
      if (lvl <= 1) weakList.push(w);
      else if (lvl <= 3) midList.push(w);
      else goodList.push(w);
    });
    const total = words.length || 1;
    const sections = [
      { key: "weak", label: "🍌 Még zöld", list: weakList, barBg: "bg-rose-400", textCls: t.catWeak },
      { key: "mid", label: "🍌 Érik már", list: midList, barBg: "bg-amber-400", textCls: t.catMid },
      { key: "good", label: "🍌 Tökéletesen érett", list: goodList, barBg: "bg-lime-500", textCls: t.catGood },
    ];
    return (
      <Shell t={t} dark={dark} onToggle={toggleDark}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h2 className={`text-2xl font-extrabold tracking-tight ${t.heading}`}>Haladás</h2>
          <button
            onClick={() => setShowInfo((v) => !v)}
            aria-label="Hogyan működik?"
            className={`text-sm rounded-full w-6 h-6 flex items-center justify-center shrink-0 ${t.faint}`}
          >
            ℹ️
          </button>
        </div>
        <p className={`text-sm mb-1 ${t.muted}`}>Így áll {words.length} szóval:</p>
        <p className={`text-sm font-semibold mb-3 ${t.catGood}`}>🍌 Learatott banánok: {goodList.length}</p>

        {showInfo && (
          <div className={`rounded-2xl border-2 p-3 mb-4 text-xs leading-relaxed ${t.mascotBubble}`}>
            Minden Majomiskola / Banánfrissítő / Banánpróba kör végén banánt kap a gyerek a teljesítménye alapján —
            minél több szó megy elsőre, annál több banán jár. Idelent pedig az látszik, melyik szó hol tart az
            "éréseben": zöld = még tanulja, érik = egyre jobban megy, teljesen érett = magabiztosan tudja.
          </div>
        )}

        <div className="flex w-full h-3 rounded-full overflow-hidden mb-3">
          {sections.map((s) =>
            s.list.length > 0 ? (
              <div key={s.key} className={s.barBg} style={{ width: `${(s.list.length / total) * 100}%` }} />
            ) : null
          )}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
          {sections.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5 text-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${s.barBg}`} />
              <span className={t.muted}>
                {s.label} ({s.list.length})
              </span>
            </div>
          ))}
        </div>

        <div className="max-h-80 overflow-y-auto pr-1 mb-5 ios-scroll">
          {sections
            .filter((s) => s.list.length > 0)
            .map((s) => (
              <div key={s.key} className="mb-4">
                <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${s.textCls}`}>{s.label}</p>
                <div className="space-y-2">
                  {s.list.map((w) => (
                    <div key={keyOf(w)} className="flex items-baseline justify-between gap-3">
                      <span className={`text-sm font-medium truncate ${t.heading}`}>{w.en}</span>
                      <span className={`text-xs truncate ${t.faint}`}>{w.hu}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        <div className={`rounded-2xl border-2 p-3 mb-5 ${t.mascotBubble}`}>
          <label htmlFor="maxq" className={`block text-xs font-bold mb-1 ${t.heading}`}>
            Feladatok száma (Majomiskola / Banánpróba)
          </label>
          <p className={`text-xs mb-2 ${t.muted}`}>
            Ennyi szó jön max. egy Majomiskola vagy Banánpróba körben (alapból 25).
          </p>
          <input
            id="maxq"
            type="number"
            inputMode="numeric"
            min={5}
            max={200}
            value={maxQuestionsInput}
            onChange={(e) => setMaxQuestionsInput(e.target.value)}
            onBlur={(e) => commitMaxQuestions(e.target.value)}
            className={`w-24 rounded-xl border-2 px-3 py-2 text-sm font-semibold ${t.textarea}`}
          />
        </div>

        <div className="space-y-2">
          <BigButton t={t} tone="ghost" onClick={() => setScreen("menu")}>
            Vissza a fára
          </BigButton>
          {confirmReset ? (
            <div className={`rounded-2xl border-2 p-3 ${t.mascotBubble}`}>
              <p className={`text-xs mb-2 ${t.heading}`}>
                Biztosan törlöd az eddigi haladást? A szólista megmarad, de minden szó újra kezdő szintre áll.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleResetProgress}
                  className="flex-1 rounded-xl py-2 text-xs font-bold bg-rose-500 hover:bg-rose-400 text-white"
                >
                  Igen, töröld
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold border-2 ${t.optionBase}`}
                >
                  Mégse
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full text-center text-xs text-rose-500 hover:text-rose-600 pt-1"
            >
              Haladás visszaállítása
            </button>
          )}
        </div>
      </Shell>
    );
  }

  if ((screen === "practice" || screen === "exam") && currentWord) {
    const modeLabel = sessionType === "exam" ? "Banánpróba" : sessionType === "quick" ? "Banánfrissítő" : "Majomiskola";
    const promptText = direction === "hu2en" ? currentWord.hu : currentWord.en;
    const promptLabel = direction === "hu2en" ? "Melyik szó jelenti ezt?" : "Mit jelent ez a szó?";

    return (
      <Shell t={t} dark={dark} onToggle={toggleDark} onClose={() => setScreen("menu")}>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            {isExam && <Monkey mood="wave" size={22} />}
            <span className={`text-xs font-semibold ${t.faint}`}>{modeLabel}</span>
          </div>
          <span className={`text-xs ${t.faint}`}>
            {qIndex + 1} / {queue.length}
          </span>
        </div>
        <ProgressBar value={qIndex} total={queue.length} t={t} />

        {stage === "intro" && (
          <div className="text-center py-4">
            <p className={`font-extrabold text-4xl mb-3 tracking-tight ${t.heading}`}>{currentWord.en}</p>
            <p className={`text-xl mb-8 ${t.muted}`}>{currentWord.hu}</p>
            <BigButton t={t} onClick={handleIntroNext}>
              Ugorjunk!
            </BigButton>
          </div>
        )}

        {stage === "recall" && (
          <div className="py-2">
            <p className={`mb-2 text-center text-sm ${t.muted}`}>{promptLabel}</p>
            <p className={`font-extrabold text-3xl mb-6 text-center tracking-tight ${t.heading}`}>{promptText}</p>
            <div className="grid grid-cols-1 gap-3 mb-4">
              {recallOptions.map((opt) => {
                const isSel = recallSelected && keyOf(opt) === keyOf(recallSelected);
                let cls = t.optionBase;
                if (isSel) {
                  cls = isExam ? t.optionNeutralSel : recallOk ? t.optionCorrect : t.optionWrong;
                }
                return (
                  <button
                    key={keyOf(opt)}
                    onClick={() => handleRecallPick(opt)}
                    disabled={!!recallSelected}
                    className={`w-full rounded-2xl py-3 px-4 text-lg font-semibold border-2 transition active:scale-95 disabled:opacity-100 disabled:active:scale-100 ${cls}`}
                  >
                    {direction === "hu2en" ? opt.en : opt.hu}
                  </button>
                );
              })}
            </div>
            {reaction && (
              <div className="flex items-center gap-2 mb-4">
                <Monkey mood={reaction.mood} size={40} />
                <SpeechBubble t={t}>{reaction.text}</SpeechBubble>
              </div>
            )}
            {recallSelected && (
              <BigButton t={t} onClick={isExam ? finishWord : goToSpelling}>
                Tovább
              </BigButton>
            )}
          </div>
        )}

        {stage === "spelling" && (
          <div className="py-2">
            {isExam && examExType === "spelling" && (
              <p className={`font-extrabold text-3xl mb-4 text-center tracking-tight ${t.heading}`}>{currentWord.hu}</p>
            )}
            <p className={`mb-4 text-center text-sm ${t.muted}`}>
              Melyik betű hiányzik?
              {blankIdx.length > 1 && (
                <span className={`ml-1 ${t.faint}`}>
                  ({blankPos + 1}/{blankIdx.length})
                </span>
              )}
            </p>
            <div className="flex justify-center flex-wrap gap-1 mb-8">
              {currentWord.en.split("").map((ch, i) => {
                if (ch === " ") return <span key={i} className="w-3" />;
                const isBlank = blankIdx.includes(i);
                const isActive = isBlank && i === blankIdx[blankPos] && filled[i] === undefined;
                const shown = isBlank ? filled[i] || null : ch;
                return (
                  <span
                    key={i}
                    className={`w-8 h-10 flex items-center justify-center font-mono text-2xl rounded-md transition-colors ${
                      isActive ? t.activeBlank : `border-b-2 ${t.blankLine} ${t.blankChar}`
                    }`}
                  >
                    {shown || (isBlank ? "_" : ch)}
                  </span>
                );
              })}
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {letterOptions.map((l) => {
                const isSel = letterSelected === l;
                let cls = t.optionBase;
                if (isSel) {
                  cls = isExam ? t.optionNeutralSel : letterOk ? t.optionCorrect : t.optionWrong;
                }
                return (
                  <button
                    key={l}
                    onClick={() => handleLetterPick(l)}
                    disabled={!!letterSelected}
                    className={`rounded-xl py-3 text-xl font-bold border-2 transition active:scale-95 disabled:opacity-100 disabled:active:scale-100 ${cls}`}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
            {reaction && (
              <div className="flex items-center gap-2 mb-4">
                <Monkey mood={reaction.mood} size={40} />
                <SpeechBubble t={t}>{reaction.text}</SpeechBubble>
              </div>
            )}
            {letterSelected && (
              <BigButton t={t} onClick={nextBlankOrFinish}>
                Tovább
              </BigButton>
            )}
          </div>
        )}
      </Shell>
    );
  }

  if (screen === "practiceEnd") {
    const uniqueWords = new Set(queue.map(keyOf)).size;
    const correctCount = Math.max(0, uniqueWords - missed.length);
    const ratio = uniqueWords > 0 ? correctCount / uniqueWords : 1;
    const perfect = missed.length === 0;
    const title = sessionType === "quick" ? "Kész a Banánfrissítővel!" : "Kész a Majomiskolával!";
    const msg = perfect ? pickRandom(PRACTICE_PERFECT_MESSAGES) : pickRandom(PRACTICE_GOOD_MESSAGES);
    return (
      <Shell t={t} dark={dark} onToggle={toggleDark}>
        <div className="flex flex-col items-center text-center mb-3">
          <Monkey mood={perfect ? "celebrate" : "happy"} size={96} />
          <h2 className={`text-2xl font-extrabold tracking-tight mt-2 ${t.heading}`}>{title}</h2>
        </div>
        <BananaScore ratio={ratio} />
        <p className={`text-center text-sm font-semibold mb-1 ${t.heading}`}>
          {correctCount} / {uniqueWords} szó ment elsőre
        </p>
        <p className={`text-center text-sm mb-6 ${t.muted}`}>{msg}</p>
        {missed.length > 0 && (
          <div className="mb-6">
            <ul className={`space-y-1 ${t.heading}`}>
              {missed.map((w) => (
                <li key={keyOf(w)} className="text-sm">
                  <span className="font-medium">{w.en}</span> – {w.hu}
                </li>
              ))}
            </ul>
          </div>
        )}
        <BigButton t={t} onClick={() => setScreen("menu")}>
          Vissza a fára
        </BigButton>
      </Shell>
    );
  }

  if (screen === "examEnd") {
    const ratio = examTotal > 0 ? examCorrect / examTotal : 0;
    const mood = ratio === 1 ? "celebrate" : ratio >= 0.7 ? "happy" : "oops";
    const msg =
      ratio === 1
        ? pickRandom(EXAM_PERFECT_MESSAGES)
        : ratio >= 0.7
        ? pickRandom(EXAM_GOOD_MESSAGES)
        : pickRandom(EXAM_PRACTICE_MESSAGES);
    return (
      <Shell t={t} dark={dark} onToggle={toggleDark}>
        <div className="flex flex-col items-center text-center mb-3">
          <Monkey mood={mood} size={96} />
          <h2 className={`text-2xl font-extrabold tracking-tight mt-2 ${t.heading}`}>Banánpróba eredménye</h2>
        </div>
        <BananaScore ratio={ratio} />
        <p className={`text-4xl font-extrabold text-center mb-3 ${t.score}`}>
          {examCorrect} / {examTotal}
        </p>
        <p className={`text-center text-sm mb-6 ${t.muted}`}>{msg}</p>
        {missed.length > 0 && (
          <div className="mb-6">
            <p className={`text-sm mb-2 ${t.muted}`}>Bizonytalan szavak:</p>
            <ul className={`space-y-1 ${t.heading}`}>
              {missed.map((w) => (
                <li key={keyOf(w)} className="text-sm">
                  <span className="font-medium">{w.en}</span> – {w.hu}
                </li>
              ))}
            </ul>
            <p className={`text-xs mt-3 ${t.faint}`}>Ezek automatikusan visszakerülnek a következő gyakorlásba.</p>
          </div>
        )}
        <BigButton t={t} onClick={() => setScreen("menu")}>
          Vissza a fára
        </BigButton>
      </Shell>
    );
  }

  return null;
}
