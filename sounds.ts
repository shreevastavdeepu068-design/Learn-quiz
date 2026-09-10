export type SoundName = "click" | "correct" | "wrong" | "complete" | "achievement";

let soundEnabled = true;

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  return new AudioContextClass();
}

export function playSound(name: SoundName) {
  if (!soundEnabled || typeof window === "undefined") return;
  try {
    // Future local assets can be added under assets/sounds/ without changing this API.
    // The oscillator fallback keeps the app fully functional when those files are missing.
    const context = getAudioContext();
    if (!context) return;
    const notes: Record<SoundName, number[]> = {
      click: [430],
      correct: [620, 820],
      wrong: [220, 180],
      complete: [520, 660, 820, 1040],
      achievement: [660, 820, 1040, 1320],
    };
    const frequencies = notes[name];
    const step = name === "click" ? 0 : 0.075;
    frequencies.forEach((frequency, index) => {
      const start = context.currentTime + index * step;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = name === "wrong" ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(name === "click" ? 0.025 : 0.04, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + (name === "click" ? 0.07 : 0.13));
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + (name === "click" ? 0.07 : 0.13));
    });
  } catch {
    // Sound is optional and should never block the quiz.
  }
}
