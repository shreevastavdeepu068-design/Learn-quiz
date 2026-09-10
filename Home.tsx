import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  CircleHelp,
  Flame,
  Grid2X2,
  History,
  Home as HomeIcon,
  Info,
  LockKeyhole,
  Medal,
  Percent,
  RotateCcw,
  Settings2,
  Sparkles,
  Star,
  Trophy,
  Volume2,
  VolumeX,
  XCircle,
  Zap,
} from "lucide-react";
import {
  badgeCatalog,
  englishCategories,
  getQuizQuestions,
  mathCategories,
  type Difficulty,
  type Question,
  type Subject,
} from "@/lib/questions";
import { buildQuizHistoryEntry, defaultProgress, loadProgress, saveProgress, summarizeProgress, type ProgressData, type QuizHistoryEntry } from "@/lib/progress";
import { playSound, setSoundEnabled } from "@/lib/sounds";

const mascotSrc = "/manus-storage/learn-play-mascot_90d12e88.png";
type Screen = "home" | "categories" | "quiz" | "result" | "settings" | "about" | "dashboard";
type Progress = ProgressData;
type QuizResult = {
  subject: Subject;
  category: string;
  difficulty: Difficulty;
  correct: number;
  total: number;
  score: number;
  stars: number;
  newBest: boolean;
  unlockedBadge?: string;
};

const subjectMeta: Record<Subject, { label: string; eyebrow: string; icon: ReactNode; color: string; intro: string }> = {
  math: {
    label: "Math Adventure",
    eyebrow: "Numbers can be fun",
    icon: <Calculator size={26} strokeWidth={2.5} />,
    color: "coral",
    intro: "Pick a mission and show your number skills.",
  },
  english: {
    label: "English World",
    eyebrow: "Learn English by playing",
    icon: <BookOpen size={26} strokeWidth={2.5} />,
    color: "blue",
    intro: "Explore words, letters, and bright new ideas.",
  },
};

const difficultyMeta: { id: Difficulty; label: string; note: string; color: string }[] = [
  { id: "easy", label: "Easy", note: "Warm up", color: "green" },
  { id: "medium", label: "Medium", note: "Level up", color: "yellow" },
  { id: "hard", label: "Hard", note: "Big challenge", color: "red" },
];


function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button className="icon-button" type="button" aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

function ScreenHeader({ onBack, onSettings, right }: { onBack?: () => void; onSettings?: () => void; right?: ReactNode }) {
  return (
    <header className="app-header">
      <div className="header-left">
        {onBack ? (
          <IconButton label="Go back" onClick={onBack}>
            <ArrowLeft size={20} />
          </IconButton>
        ) : (
          <div className="logo-mark" aria-hidden="true"><Sparkles size={18} /></div>
        )}
        <button type="button" className="brand-lockup" onClick={onBack ?? (() => undefined)} aria-label="Learn and Play home">
          <span className="brand-name">learn<span>&</span>play</span>
          <span className="brand-tagline">learn • play • grow</span>
        </button>
      </div>
      <div className="header-right">
        {right}
        {onSettings && (
          <IconButton label="Open settings" onClick={onSettings}>
            <Settings2 size={20} />
          </IconButton>
        )}
      </div>
    </header>
  );
}

function StatPill({ icon, label, value, tone }: { icon: ReactNode; label: string; value: string | number; tone: string }) {
  return (
    <div className={`stat-pill ${tone}`}>
      <span className="stat-pill-icon">{icon}</span>
      <span><strong>{value}</strong><small>{label}</small></span>
    </div>
  );
}

function CategoryCard({ icon, label, hint, color, onClick }: { icon: string; label: string; hint: string; color: string; onClick: () => void }) {
  return (
    <button className={`category-card tint-${color}`} type="button" onClick={onClick}>
      <span className="category-icon">{icon}</span>
      <span className="category-card-text"><strong>{label}</strong><small>{hint}</small></span>
      <span className="category-arrow"><ChevronRight size={19} /></span>
    </button>
  );
}

function HomeScreen({ progress, onSubject, onSettings, onAbout, onDashboard }: { progress: Progress; onSubject: (subject: Subject) => void; onSettings: () => void; onAbout: () => void; onDashboard: () => void }) {
  return (
    <div className="screen home-screen">
      <ScreenHeader onSettings={onSettings} />
      <main className="home-content">
        <section className="hero-card">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> Your learning clubhouse</span>
            <h1>Hello<br /><em>Champion!</em></h1>
            <p>Ready to learn, play, and collect some shiny stars?</p>
            <div className="hero-actions">
              <span className="hero-tip"><Zap size={15} fill="currentColor" /> Little steps. Big wins.</span>
              <button className="text-button" type="button" onClick={onAbout}>How it works <ArrowRight size={16} /></button>
            </div>
          </div>
          <div className="hero-art" aria-label="Friendly fox mascot">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <span className="float-star star-a">✦</span><span className="float-star star-b">✧</span><span className="float-star star-c">✦</span>
            <img src={mascotSrc} alt="A friendly orange fox with a blue backpack" />
            <div className="mascot-bubble">Let’s go!</div>
          </div>
        </section>

        <section className="section-heading">
          <div><span className="section-kicker">Pick your playground</span><h2>What are we learning today?</h2></div>
          <span className="section-scribble">Choose one!</span>
        </section>
        <section className="category-grid" aria-label="Learning categories">
          <button className="subject-card math-card" type="button" onClick={() => onSubject("math")}>
            <span className="subject-card-art"><Calculator size={40} strokeWidth={2.3} /><span>+ ×</span></span>
            <span><strong>Math Adventure</strong><small>Numbers can be fun!</small></span>
            <span className="go-badge"><ArrowRight size={18} /></span>
          </button>
          <button className="subject-card english-card" type="button" onClick={() => onSubject("english")}>
            <span className="subject-card-art"><BookOpen size={40} strokeWidth={2.3} /><span>A B C</span></span>
            <span><strong>English World</strong><small>Learn English by playing!</small></span>
            <span className="go-badge"><ArrowRight size={18} /></span>
          </button>
          <button className="subject-card abc-card" type="button" onClick={() => onSubject("english")}>
            <span className="subject-card-art"><span className="abc-art">Aa</span><span>spell it!</span></span>
            <span><strong>ABC & Words</strong><small>Letters, words & spelling</small></span>
            <span className="go-badge"><ArrowRight size={18} /></span>
          </button>
          <button className="subject-card brain-card" type="button" onClick={() => onSubject("math")}>
            <span className="subject-card-art"><Brain size={40} strokeWidth={2.3} /><span>?</span></span>
            <span><strong>Brain Games</strong><small>Challenge your brain!</small></span>
            <span className="go-badge"><ArrowRight size={18} /></span>
          </button>
        </section>

        <section className="progress-section">
          <div className="progress-heading"><div><span className="section-kicker">Your adventure so far</span><h2>My progress</h2></div><Trophy size={25} /></div>
          <div className="progress-stats">
            <StatPill tone="stars" icon={<Star size={19} fill="currentColor" />} value={progress.totalStars} label="total stars" />
            <StatPill tone="score" icon={<Trophy size={19} />} value={progress.bestScore} label="best score" />
            <StatPill tone="streak" icon={<Flame size={19} fill="currentColor" />} value={progress.currentStreak} label="quiz streak" />
            <StatPill tone="badges" icon={<Award size={19} />} value={progress.badges.length} label="badges" />
          </div>
          <div className="badge-row">
            {badgeCatalog.slice(0, 4).map((badge) => {
              const unlocked = progress.badges.includes(badge.id);
              return <span className={`mini-badge ${unlocked ? "unlocked" : "locked"}`} key={badge.id} title={badge.description}>{unlocked ? badge.icon : <LockKeyhole size={14} />}</span>;
            })}
            <button className="badge-caption" type="button" onClick={onAbout}>{progress.badges.length ? `${progress.badges.length} badge${progress.badges.length === 1 ? "" : "s"} unlocked` : "Your first badge is waiting"}<ChevronRight size={14} /></button>
            <button className="parent-link" type="button" onClick={onDashboard}><BarChart3 size={15} /> Parent dashboard</button>
          </div>
        </section>
      </main>
      <footer className="home-footer"><span>Made for curious minds</span><span className="footer-dots">● ● ●</span><span>100% screen-time friendly</span></footer>
    </div>
  );
}

function CategoriesScreen({ subject, onBack, onSettings, onStart }: { subject: Subject; onBack: () => void; onSettings: () => void; onStart: (category: string, difficulty: Difficulty, count: number) => void }) {
  const meta = subjectMeta[subject];
  const categories = subject === "math" ? mathCategories : englishCategories;
  const [category, setCategory] = useState<string>(categories[0].id);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [count, setCount] = useState(10);
  const selected = categories.find((item) => item.id === category) ?? categories[0];

  return (
    <div className="screen inner-screen">
      <ScreenHeader onBack={onBack} onSettings={onSettings} />
      <main className="inner-content">
        <section className={`subject-banner ${meta.color}`}>
          <div><span className="eyebrow">{meta.icon} {meta.eyebrow}</span><h1>{meta.label}</h1><p>{meta.intro}</p></div>
          <span className="banner-sticker">{subject === "math" ? "∑" : "ABC"}</span>
        </section>
        <div className="selection-layout">
          <section className="selection-panel">
            <div className="panel-title"><span className="step-number">1</span><div><span className="section-kicker">Choose a mission</span><h2>What should we practise?</h2></div></div>
            <div className="mission-grid">
              {categories.map((item) => <button key={item.id} type="button" className={`mission-option tint-${item.color} ${category === item.id ? "selected" : ""}`} onClick={() => setCategory(item.id)}><span className="mission-icon">{item.icon}</span><span><strong>{item.label}</strong><small>{item.hint}</small></span>{category === item.id && <CheckCircle2 className="selected-check" size={20} />}</button>)}
            </div>
          </section>
          <aside className="setup-card">
            <div className="panel-title"><span className="step-number">2</span><div><span className="section-kicker">Set your pace</span><h2>Ready when you are</h2></div></div>
            <span className="setup-label">Difficulty</span>
            <div className="difficulty-row">{difficultyMeta.map((item) => <button type="button" key={item.id} className={`difficulty-option ${item.color} ${difficulty === item.id ? "selected" : ""}`} onClick={() => setDifficulty(item.id)}><span className="difficulty-dot" /><strong>{item.label}</strong><small>{item.note}</small></button>)}</div>
            <span className="setup-label">Number of questions</span>
            <div className="count-row">{[5, 10, 20].map((value) => <button type="button" key={value} className={count === value ? "selected" : ""} onClick={() => setCount(value)}>{value}<small>questions</small></button>)}</div>
            <div className="setup-summary"><span className="summary-icon">{selected.icon}</span><span><strong>{selected.label}</strong><small>{difficultyMeta.find((item) => item.id === difficulty)?.label} · {count} questions</small></span></div>
            <button className="primary-button start-button" type="button" onClick={() => onStart(category, difficulty, count)}>Start adventure <ArrowRight size={19} /></button>
          </aside>
        </div>
      </main>
    </div>
  );
}

function QuizScreen({ subject, category, difficulty, questions, questionIndex, correctCount, selectedAnswer, onAnswer, onNext, onQuit }: { subject: Subject; category: string; difficulty: Difficulty; questions: Question[]; questionIndex: number; correctCount: number; selectedAnswer: number | null; onAnswer: (index: number) => void; onNext: () => void; onQuit: () => void }) {
  const question = questions[questionIndex];
  const answered = selectedAnswer !== null;
  const isCorrect = answered && selectedAnswer === question.correctAnswer;
  const meta = subjectMeta[subject];
  const percentage = Math.round(((questionIndex + 1) / questions.length) * 100);
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="screen quiz-screen">
      <ScreenHeader onBack={onQuit} right={<span className="quiz-score"><Star size={16} fill="currentColor" /> {correctCount * 10}</span>} />
      <main className="quiz-content">
        <div className="quiz-topline"><span className={`topic-chip ${meta.color}`}>{meta.icon} {meta.label}</span><span className="question-count">Question <strong>{questionIndex + 1}</strong> / {questions.length}</span></div>
        <div className="quiz-progress"><span style={{ width: `${percentage}%` }} /></div>
        <section className={`question-card ${answered ? (isCorrect ? "celebrate" : "try-again") : ""}`}>
          <div className="question-bubbles"><span>✦</span><span>✧</span><span>•</span></div>
          <span className="question-label">{category.replace("series", "number series").replace("simple", "simple English")}</span>
          <h1>{question.question}</h1>
          <p className="question-prompt">{answered ? (isCorrect ? "Your brain is sparkling!" : "Keep going — every try helps you learn.") : "Tap an answer to choose it"}</p>
          <div className="answer-grid">
            {question.options.map((option, index) => {
              const optionState = !answered ? "" : index === question.correctAnswer ? "correct" : index === selectedAnswer ? "wrong" : "muted";
              return <button key={option} type="button" disabled={answered} className={`answer-button ${optionState}`} onClick={() => onAnswer(index)}><span className="answer-letter">{letters[index]}</span><span>{option}</span>{answered && index === question.correctAnswer && <CheckCircle2 size={21} />}{answered && index === selectedAnswer && index !== question.correctAnswer && <XCircle size={21} />}</button>;
            })}
          </div>
          {answered && <div className={`feedback-box ${isCorrect ? "correct" : "wrong"}`}><span className="feedback-icon">{isCorrect ? <Sparkles size={21} /> : <CircleHelp size={21} />}</span><span><strong>{isCorrect ? "Correct! 🎉" : "Oops! 😄"}</strong><small>{isCorrect ? question.explanation : `The answer is ${question.options[question.correctAnswer]}. ${question.explanation}`}</small></span></div>}
        </section>
        <div className="quiz-bottom"><span className="quiz-encouragement"><span className="tiny-star">★</span> {answered ? `${correctCount} correct so far` : "You’ve got this!"}</span>{answered && <button className="primary-button next-button" type="button" onClick={onNext}>{questionIndex === questions.length - 1 ? "See my result" : "Next question"} <ArrowRight size={18} /></button>}</div>
      </main>
    </div>
  );
}

function ResultScreen({ result, progress, onAgain, onHome }: { result: QuizResult; progress: Progress; onAgain: () => void; onHome: () => void }) {
  const meta = subjectMeta[result.subject];
  const accuracy = Math.round((result.correct / result.total) * 100);
  return (
    <div className="screen result-screen">
      <ScreenHeader onBack={onHome} />
      <main className="result-content">
        <section className="result-hero"><div className="celebration-burst" aria-hidden="true"><span>✦</span><span>✧</span><span>★</span><span>✦</span><span>•</span><span>✧</span></div><div className="confetti confetti-one">✦</div><div className="confetti confetti-two">✧</div><div className="result-trophy"><Trophy size={42} /></div><span className="eyebrow"><span className="eyebrow-dot" /> Adventure complete</span><h1>{result.newBest ? "New best score!" : result.correct === result.total ? "Amazing!" : "Great try!"}</h1><p>{result.newBest ? "You just made your personal best." : "Every question you try makes your brain stronger."}</p></section>
        <section className="result-score-card"><div className="score-main"><span>Score</span><strong>{result.score}<small> / {result.total * 10}</small></strong></div><div className="result-stats"><div><span className="result-icon star-icon"><Star size={18} fill="currentColor" /></span><strong>{result.stars}</strong><small>Stars earned</small></div><div><span className="result-icon correct-icon"><CheckCircle2 size={18} /></span><strong>{result.correct}</strong><small>Correct</small></div><div><span className="result-icon wrong-icon"><XCircle size={18} /></span><strong>{result.total - result.correct}</strong><small>Wrong</small></div><div><span className="result-icon accuracy-icon"><Zap size={18} fill="currentColor" /></span><strong>{accuracy}%</strong><small>Accuracy</small></div></div></section>
        {result.newBest && <div className="new-best"><Trophy size={18} /> NEW BEST SCORE <span>{progress.bestScore}</span></div>}
        {result.unlockedBadge && <div className="badge-unlocked"><span className="badge-unlocked-icon">{badgeCatalog.find((badge) => badge.id === result.unlockedBadge)?.icon ?? "✦"}</span><span><strong>Badge unlocked!</strong><small>{badgeCatalog.find((badge) => badge.id === result.unlockedBadge)?.label ?? "New achievement"}</small></span><Sparkles size={20} /></div>}
        <section className="result-badge-note"><span className={`result-subject-icon ${meta.color}`}>{meta.icon}</span><span><strong>{meta.label} complete</strong><small>{result.difficulty} · {result.total} questions · {progress.totalStars} total stars</small></span><Medal size={22} /></section>
        <div className="result-actions"><button className="primary-button" type="button" onClick={onAgain}><RotateCcw size={18} /> Play again</button><button className="secondary-button" type="button" onClick={onHome}><HomeIcon size={18} /> Home</button></div>
      </main>
    </div>
  );
}

function formatCategory(category: string) {
  return category.replace("series", "Number Series").replace("simple", "Simple English").replace("addition", "Addition").replace("subtraction", "Subtraction").replace("multiplication", "Multiplication").replace("division", "Division").replace("challenge", "Math Challenge").replace("alphabet", "Alphabet").replace("spelling", "Spelling").replace("vocabulary", "Vocabulary").replace("grammar", "Grammar");
}

function ParentDashboard({ progress, onBack, onHome }: { progress: Progress; onBack: () => void; onHome: () => void }) {
  const summary = summarizeProgress(progress.quizHistory);
  const recent = [...progress.quizHistory].reverse().slice(0, 5);
  return <div className="screen inner-screen dashboard-screen">
    <ScreenHeader onBack={onBack} right={<button className="dashboard-home" type="button" onClick={onHome}><HomeIcon size={16} /> Child view</button>} />
    <main className="dashboard-content">
      <section className="dashboard-heading"><div><span className="eyebrow"><BarChart3 size={17} /> Parent corner</span><h1>Progress dashboard</h1><p>A calm look at the learning journey, saved on this device.</p></div><div className="dashboard-sticker"><Trophy size={35} /></div></section>
      <section className="dashboard-overview">
        <StatPill tone="score" icon={<History size={19} />} value={progress.quizzesCompleted} label="quizzes completed" />
        <StatPill tone="stars" icon={<ClipboardListIcon />} value={summary.totalQuestions} label="questions attempted" />
        <StatPill tone="streak" icon={<CheckCircle2 size={19} />} value={progress.correctAnswers} label="correct answers" />
        <StatPill tone="badges" icon={<Percent size={19} />} value={`${summary.accuracy}%`} label="overall accuracy" />
        <StatPill tone="stars" icon={<Star size={19} fill="currentColor" />} value={progress.totalStars} label="total stars" />
        <StatPill tone="score" icon={<Trophy size={19} />} value={progress.bestScore} label="best score" />
        <StatPill tone="streak" icon={<Flame size={19} fill="currentColor" />} value={progress.currentStreak} label="current streak" />
        <StatPill tone="badges" icon={<Award size={19} />} value={progress.badges.length} label="badges unlocked" />
      </section>
      <div className="dashboard-grid">
        <section className="dashboard-card subject-progress-card"><div className="dashboard-card-heading"><div><span className="section-kicker">At a glance</span><h2>Subject progress</h2></div><BookOpen size={22} /></div>{(["math", "english"] as Subject[]).map((item) => { const data = summary.subjects[item]; const meta = subjectMeta[item]; return <div className="subject-progress-row" key={item}><span className={`subject-progress-icon ${meta.color}`}>{meta.icon}</span><span className="subject-progress-name"><strong>{meta.label}</strong><small>{data.quizzes} quiz{data.quizzes === 1 ? "" : "zes"} · {data.correct}/{data.questions} correct</small></span><span className="subject-progress-meter"><span style={{ width: `${data.accuracy}%` }} /></span><strong className="subject-progress-percent">{data.accuracy}%</strong></div>; })}</section>
        <section className="dashboard-card category-progress-card"><div className="dashboard-card-heading"><div><span className="section-kicker">Practice map</span><h2>Category performance</h2></div><Grid2X2 size={22} /></div>{Object.keys(summary.categories).length ? <div className="category-list">{Object.entries(summary.categories).sort((a, b) => b[1].accuracy - a[1].accuracy).slice(0, 8).map(([key, data]) => <div className="category-performance" key={key}><span><strong>{formatCategory(key.split(":")[1])}</strong><small>{data.subject === "math" ? "Math" : "English"} · {data.correct}/{data.questions} correct</small></span><strong>{data.accuracy}%</strong></div>)}</div> : <div className="empty-dashboard"><Sparkles size={20} /><span>Complete a quiz to see category patterns here.</span></div>}</section>
      </div>
      <section className="dashboard-card recent-card"><div className="dashboard-card-heading"><div><span className="section-kicker">The latest adventures</span><h2>Recent quiz results</h2></div><History size={22} /></div>{recent.length ? <div className="recent-table">{recent.map((entry) => <div className="recent-row" key={entry.id}><span className={`recent-subject ${entry.subject}`}>{entry.subject === "math" ? <Calculator size={17} /> : <BookOpen size={17} />}</span><span className="recent-result-name"><strong>{formatCategory(entry.category)}</strong><small>{entry.subject === "math" ? "Math" : "English"} · {entry.difficulty} · {new Date(entry.completedAt).toLocaleDateString()}</small></span><span className="recent-result-score"><strong>{entry.score}</strong><small>{entry.accuracy}% accuracy</small></span><span className="recent-result-stars"><Star size={15} fill="currentColor" /> {entry.starsEarned}</span></div>)}</div> : <div className="empty-dashboard"><History size={20} /><span>No completed quizzes yet. The first adventure will appear here.</span></div>}</section>
      <section className="dashboard-card badges-card"><div className="dashboard-card-heading"><div><span className="section-kicker">Celebrate growth</span><h2>Badges & achievements</h2></div><Medal size={22} /></div><div className="dashboard-badges">{badgeCatalog.map((badge) => { const unlocked = progress.badges.includes(badge.id); return <div className={`dashboard-badge ${unlocked ? "unlocked" : "locked"}`} key={badge.id}><span>{unlocked ? badge.icon : <LockKeyhole size={16} />}</span><strong>{badge.label}</strong><small>{unlocked ? "Unlocked" : badge.description}</small></div>; })}</div></section>
      <div className="dashboard-note"><Info size={16} /><span>Parent dashboard is private to this browser. No account or personal information is collected.</span></div>
    </main>
  </div>;
}

function ClipboardListIcon() { return <ClipboardList size={19} />; }

function SettingsScreen({ progress, onToggleSound, onBack, onAbout, onDashboard }: { progress: Progress; onToggleSound: () => void; onBack: () => void; onAbout: () => void; onDashboard: () => void }) {
  return <div className="screen inner-screen"><ScreenHeader onBack={onBack} /><main className="settings-content"><span className="eyebrow"><Settings2 size={17} /> Personalise your clubhouse</span><h1>Settings</h1><p className="screen-intro">Keep things comfy while you learn and play.</p><section className="settings-card"><button className="setting-row" type="button" onClick={onToggleSound}><span className="setting-icon sound">{progress.soundOn ? <Volume2 size={21} /> : <VolumeX size={21} />}</span><span><strong>Sound effects</strong><small>Little clicks and celebration tones</small></span><span className={`toggle ${progress.soundOn ? "on" : ""}`}><span /></span></button><button className="setting-row" type="button" onClick={onDashboard}><span className="setting-icon dashboard"><BarChart3 size={21} /></span><span><strong>Parent Dashboard</strong><small>See real quiz results and learning patterns</small></span><ChevronRight size={20} /></button><button className="setting-row" type="button" onClick={onAbout}><span className="setting-icon info"><Info size={21} /></span><span><strong>About Learn & Play</strong><small>Fun learning through English and Math quizzes</small></span><ChevronRight size={20} /></button></section><div className="storage-note"><Grid2X2 size={18} /><span><strong>Your progress is saved on this device.</strong><small>No account needed. We use your browser’s local storage.</small></span></div></main></div>;
}

function AboutScreen({ onBack }: { onBack: () => void }) {
  return <div className="screen inner-screen"><ScreenHeader onBack={onBack} /><main className="about-content"><div className="about-logo"><Sparkles size={28} /></div><span className="eyebrow">A tiny clubhouse for curious minds</span><h1>Learn <em>&</em> Play</h1><p>Fun learning through English and Math quizzes.</p><div className="about-points"><div><span>✦</span><strong>Playful by design</strong><small>Big buttons, bright ideas, zero pressure.</small></div><div><span>↗</span><strong>Progress that sticks</strong><small>Your stars and badges stay right here on your device.</small></div><div><span>♡</span><strong>Made for growing brains</strong><small>Short, friendly quizzes for everyday practice.</small></div></div><button className="secondary-button" type="button" onClick={onBack}><ArrowLeft size={18} /> Back to clubhouse</button></main></div>;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [subject, setSubject] = useState<Subject>("math");
  const [category, setCategory] = useState("addition");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => { saveProgress(progress); setSoundEnabled(progress.soundOn); }, [progress]);
  useEffect(() => {
    const handleButtonSound = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("button")) playSound("click");
    };
    document.addEventListener("click", handleButtonSound, true);
    return () => document.removeEventListener("click", handleButtonSound, true);
  }, []);
  useEffect(() => { if (!toast) return; const timeout = window.setTimeout(() => setToast(""), 2600); return () => window.clearTimeout(timeout); }, [toast]);

  const startQuiz = (selectedCategory: string, selectedDifficulty: Difficulty, count: number) => {
    const nextQuestions = getQuizQuestions(subject, selectedCategory, selectedDifficulty, count);
    if (!nextQuestions.length) { setToast("That mission is still getting ready. Try another one!"); return; }
    setCategory(selectedCategory); setDifficulty(selectedDifficulty); setQuestions(nextQuestions); setQuestionIndex(0); setCorrectCount(0); setSelectedAnswer(null); setResult(null); setScreen("quiz"); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    const question = questions[questionIndex];
    const correct = answerIndex === question.correctAnswer;
    setSelectedAnswer(answerIndex);
    if (correct) { setCorrectCount((value) => value + 1); playSound("correct"); } else playSound("wrong");
  };

  const finishQuiz = (lastAnswerCorrect = false) => {
    const finalCorrect = correctCount + (lastAnswerCorrect ? 1 : 0);
    const finalScore = finalCorrect * 10;
    const newBest = finalScore > progress.bestScore;
    const completed = progress.quizzesCompleted + 1;
    const nextBadges = [...progress.badges];
    const addBadge = (id: string) => { if (!nextBadges.includes(id)) nextBadges.push(id); };
    addBadge("first-quiz");
    if (progress.correctAnswers + finalCorrect >= 10) addBadge("ten-correct");
    addBadge(subject === "math" ? "math-star" : "english-star");
    if (completed >= 3) addBadge("streak");
    if (finalCorrect / questions.length >= 0.9) addBadge("champion");
    const unlockedBadge = nextBadges.find((badge) => !progress.badges.includes(badge));
    const historyEntry = buildQuizHistoryEntry({ subject, category, difficulty, totalQuestions: questions.length, correctAnswers: finalCorrect, score: finalScore, starsEarned: finalCorrect });
    const nextProgress = { ...progress, totalStars: progress.totalStars + finalCorrect, bestScore: Math.max(progress.bestScore, finalScore), quizzesCompleted: completed, correctAnswers: progress.correctAnswers + finalCorrect, currentStreak: progress.currentStreak + 1, badges: nextBadges, quizHistory: [...progress.quizHistory, historyEntry] };
    setProgress(nextProgress);
    setResult({ subject, category, difficulty, correct: finalCorrect, total: questions.length, score: finalScore, stars: finalCorrect, newBest, unlockedBadge });
    setScreen("result"); playSound(unlockedBadge ? "achievement" : "complete"); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => { setScreen("home"); setResult(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goCategories = (nextSubject: Subject) => { setSubject(nextSubject); setScreen("categories"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleNext = () => { if (questionIndex === questions.length - 1) finishQuiz(selectedAnswer === questions[questionIndex]?.correctAnswer); else { setQuestionIndex((value) => value + 1); setSelectedAnswer(null); window.scrollTo({ top: 0, behavior: "smooth" }); } };
  const handleAgain = () => { if (result) startQuiz(result.category, result.difficulty, result.total); };
  const backFromCategories = () => setScreen("home");
  const backFromSettings = () => setScreen("home");
  return <div className="app-shell"><div className="background-shape shape-one" /><div className="background-shape shape-two" />
    {screen === "home" && <HomeScreen progress={progress} onSubject={goCategories} onSettings={() => setScreen("settings")} onAbout={() => setScreen("about")} onDashboard={() => setScreen("dashboard")} />}
    {screen === "categories" && <CategoriesScreen subject={subject} onBack={backFromCategories} onSettings={() => setScreen("settings")} onStart={startQuiz} />}
    {screen === "quiz" && questions.length > 0 && <QuizScreen subject={subject} category={category} difficulty={difficulty} questions={questions} questionIndex={questionIndex} correctCount={correctCount} selectedAnswer={selectedAnswer} onAnswer={handleAnswer} onNext={handleNext} onQuit={goHome} />}
    {screen === "result" && result && <ResultScreen result={result} progress={progress} onAgain={handleAgain} onHome={goHome} />}
    {screen === "settings" && <SettingsScreen progress={progress} onToggleSound={() => setProgress((value) => ({ ...value, soundOn: !value.soundOn }))} onBack={backFromSettings} onAbout={() => setScreen("about")} onDashboard={() => setScreen("dashboard")} />}
    {screen === "dashboard" && <ParentDashboard progress={progress} onBack={backFromSettings} onHome={goHome} />}
    {screen === "about" && <AboutScreen onBack={() => setScreen("home")} />}
    {toast && <div className="toast" role="status"><Sparkles size={17} /> {toast}</div>}
  </div>;
}
