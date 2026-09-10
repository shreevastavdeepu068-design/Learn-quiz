export type Subject = "math" | "english";
export type Difficulty = "easy" | "medium" | "hard";

export type Question = {
  id: number;
  subject: Subject;
  category: string;
  difficulty: Difficulty;
  classLevel: 1 | 2 | 3 | 4 | 5;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export const questionBank: Question[] = [
  // Math - Class 1
  { id: 1, subject: "math", category: "addition", difficulty: "easy", classLevel: 1, question: "What is 1 + 1?", options: ["1", "2", "3", "4"], correctAnswer: 1, explanation: "1 + 1 = 2." },
  { id: 2, subject: "math", category: "addition", difficulty: "easy", classLevel: 1, question: "What is 2 + 1?", options: ["1", "2", "3", "4"], correctAnswer: 2, explanation: "2 + 1 = 3." },
  { id: 3, subject: "math", category: "addition", difficulty: "easy", classLevel: 1, question: "What is 3 + 2?", options: ["4", "5", "6", "7"], correctAnswer: 1, explanation: "3 + 2 = 5." },
  { id: 4, subject: "math", category: "subtraction", difficulty: "easy", classLevel: 1, question: "What is 5 − 2?", options: ["2", "3", "4", "5"], correctAnswer: 1, explanation: "5 − 2 = 3." },
  { id: 5, subject: "math", category: "subtraction", difficulty: "easy", classLevel: 1, question: "What is 4 − 1?", options: ["1", "2", "3", "4"], correctAnswer: 2, explanation: "4 − 1 = 3." },
  { id: 6, subject: "math", category: "challenge", difficulty: "easy", classLevel: 1, question: "How many fingers on one hand?", options: ["3", "4", "5", "6"], correctAnswer: 2, explanation: "One hand has 5 fingers." },
  
  // Math - Class 2
  { id: 7, subject: "math", category: "addition", difficulty: "easy", classLevel: 2, question: "What is 5 + 3?", options: ["6", "7", "8", "9"], correctAnswer: 2, explanation: "5 + 3 = 8." },
  { id: 8, subject: "math", category: "addition", difficulty: "easy", classLevel: 2, question: "What is 6 + 4?", options: ["8", "9", "10", "11"], correctAnswer: 2, explanation: "6 + 4 = 10." },
  { id: 9, subject: "math", category: "addition", difficulty: "medium", classLevel: 2, question: "What is 12 + 5?", options: ["15", "16", "17", "18"], correctAnswer: 1, explanation: "12 + 5 = 17." },
  { id: 10, subject: "math", category: "subtraction", difficulty: "easy", classLevel: 2, question: "What is 10 − 4?", options: ["4", "5", "6", "7"], correctAnswer: 2, explanation: "10 − 4 = 6." },
  { id: 11, subject: "math", category: "subtraction", difficulty: "easy", classLevel: 2, question: "What is 9 − 3?", options: ["4", "5", "6", "7"], correctAnswer: 2, explanation: "9 − 3 = 6." },
  { id: 12, subject: "math", category: "multiplication", difficulty: "easy", classLevel: 2, question: "What is 2 × 3?", options: ["4", "5", "6", "7"], correctAnswer: 2, explanation: "2 × 3 = 6." },
  { id: 13, subject: "math", category: "series", difficulty: "easy", classLevel: 2, question: "What number comes next: 2, 4, 6, __?", options: ["7", "8", "9", "10"], correctAnswer: 1, explanation: "The numbers go up by 2, so 8 is next." },
  { id: 14, subject: "math", category: "challenge", difficulty: "easy", classLevel: 2, question: "Which is bigger: 7 or 5?", options: ["5", "7", "Same", "Can't tell"], correctAnswer: 1, explanation: "7 is bigger than 5." },

  // Math - Class 3
  { id: 15, subject: "math", category: "addition", difficulty: "easy", classLevel: 3, question: "What is 5 + 3?", options: ["6", "7", "8", "9"], correctAnswer: 2, explanation: "5 + 3 makes 8." },
  { id: 16, subject: "math", category: "addition", difficulty: "easy", classLevel: 3, question: "You have 4 apples and get 2 more. How many apples?", options: ["5", "6", "7", "8"], correctAnswer: 1, explanation: "4 + 2 = 6 apples." },
  { id: 17, subject: "math", category: "addition", difficulty: "medium", classLevel: 3, question: "What is 17 + 8?", options: ["24", "25", "26", "27"], correctAnswer: 1, explanation: "17 + 8 = 25." },
  { id: 18, subject: "math", category: "addition", difficulty: "hard", classLevel: 3, question: "What is 28 + 15?", options: ["40", "41", "42", "43"], correctAnswer: 3, explanation: "28 + 15 = 43." },
  { id: 19, subject: "math", category: "subtraction", difficulty: "easy", classLevel: 3, question: "What is 10 − 4?", options: ["5", "6", "7", "8"], correctAnswer: 1, explanation: "10 − 4 = 6." },
  { id: 20, subject: "math", category: "subtraction", difficulty: "easy", classLevel: 3, question: "What is 12 − 5?", options: ["6", "7", "8", "9"], correctAnswer: 1, explanation: "12 − 5 = 7." },
  { id: 21, subject: "math", category: "subtraction", difficulty: "medium", classLevel: 3, question: "What is 32 − 18?", options: ["12", "13", "14", "15"], correctAnswer: 2, explanation: "32 − 18 = 14." },
  { id: 22, subject: "math", category: "subtraction", difficulty: "hard", classLevel: 3, question: "What is 45 − 17?", options: ["26", "27", "28", "29"], correctAnswer: 2, explanation: "45 − 17 = 28." },
  { id: 23, subject: "math", category: "multiplication", difficulty: "easy", classLevel: 3, question: "What is 3 × 4?", options: ["7", "10", "12", "14"], correctAnswer: 2, explanation: "3 groups of 4 make 12." },
  { id: 24, subject: "math", category: "multiplication", difficulty: "easy", classLevel: 3, question: "What is 5 × 2?", options: ["7", "8", "10", "12"], correctAnswer: 2, explanation: "5 groups of 2 make 10." },
  { id: 25, subject: "math", category: "multiplication", difficulty: "medium", classLevel: 3, question: "What is 8 × 3?", options: ["21", "24", "26", "28"], correctAnswer: 1, explanation: "8 × 3 = 24." },
  { id: 26, subject: "math", category: "multiplication", difficulty: "hard", classLevel: 3, question: "What is 7 × 6?", options: ["40", "41", "42", "43"], correctAnswer: 2, explanation: "7 × 6 = 42." },
  { id: 27, subject: "math", category: "division", difficulty: "easy", classLevel: 3, question: "What is 12 ÷ 3?", options: ["3", "4", "5", "6"], correctAnswer: 1, explanation: "12 shared into 3 equal groups gives 4." },
  { id: 28, subject: "math", category: "division", difficulty: "easy", classLevel: 3, question: "What is 20 ÷ 5?", options: ["2", "4", "5", "10"], correctAnswer: 1, explanation: "20 ÷ 5 = 4." },
  { id: 29, subject: "math", category: "division", difficulty: "medium", classLevel: 3, question: "What is 36 ÷ 6?", options: ["5", "6", "7", "8"], correctAnswer: 1, explanation: "36 ÷ 6 = 6." },
  { id: 30, subject: "math", category: "series", difficulty: "easy", classLevel: 3, question: "What number comes next: 2, 4, 6, __?", options: ["7", "8", "9", "10"], correctAnswer: 1, explanation: "The numbers go up by 2, so 8 is next." },
  { id: 31, subject: "math", category: "series", difficulty: "easy", classLevel: 3, question: "What number comes next: 5, 10, 15, __?", options: ["18", "19", "20", "25"], correctAnswer: 2, explanation: "The numbers go up by 5, so 20 is next." },
  { id: 32, subject: "math", category: "series", difficulty: "medium", classLevel: 3, question: "What number comes next: 3, 6, 9, __?", options: ["10", "11", "12", "13"], correctAnswer: 2, explanation: "The numbers go up by 3, so 12 is next." },
  { id: 33, subject: "math", category: "challenge", difficulty: "easy", classLevel: 3, question: "Which is the biggest number?", options: ["18", "81", "28", "38"], correctAnswer: 1, explanation: "81 is bigger than all the other numbers." },
  { id: 34, subject: "math", category: "challenge", difficulty: "easy", classLevel: 3, question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], correctAnswer: 1, explanation: "A triangle has 3 sides." },

  // Math - Class 4
  { id: 35, subject: "math", category: "addition", difficulty: "medium", classLevel: 4, question: "What is 24 + 15?", options: ["37", "38", "39", "40"], correctAnswer: 1, explanation: "24 + 15 = 39." },
  { id: 36, subject: "math", category: "addition", difficulty: "hard", classLevel: 4, question: "What is 156 + 248?", options: ["402", "403", "404", "405"], correctAnswer: 2, explanation: "156 + 248 = 404." },
  { id: 37, subject: "math", category: "subtraction", difficulty: "medium", classLevel: 4, question: "What is 50 − 23?", options: ["25", "26", "27", "28"], correctAnswer: 2, explanation: "50 − 23 = 27." },
  { id: 38, subject: "math", category: "subtraction", difficulty: "hard", classLevel: 4, question: "What is 200 − 87?", options: ["111", "112", "113", "114"], correctAnswer: 2, explanation: "200 − 87 = 113." },
  { id: 39, subject: "math", category: "multiplication", difficulty: "medium", classLevel: 4, question: "What is 12 × 3?", options: ["34", "35", "36", "37"], correctAnswer: 2, explanation: "12 × 3 = 36." },
  { id: 40, subject: "math", category: "multiplication", difficulty: "hard", classLevel: 4, question: "What is 15 × 7?", options: ["102", "103", "104", "105"], correctAnswer: 3, explanation: "15 × 7 = 105." },
  { id: 41, subject: "math", category: "division", difficulty: "medium", classLevel: 4, question: "What is 48 ÷ 6?", options: ["6", "7", "8", "9"], correctAnswer: 2, explanation: "48 ÷ 6 = 8." },
  { id: 42, subject: "math", category: "division", difficulty: "hard", classLevel: 4, question: "What is 144 ÷ 12?", options: ["10", "11", "12", "13"], correctAnswer: 2, explanation: "144 ÷ 12 = 12." },
  { id: 43, subject: "math", category: "series", difficulty: "medium", classLevel: 4, question: "What number comes next: 5, 10, 15, 20, __?", options: ["23", "24", "25", "26"], correctAnswer: 2, explanation: "The numbers go up by 5, so 25 is next." },
  { id: 44, subject: "math", category: "series", difficulty: "hard", classLevel: 4, question: "What number comes next: 2, 4, 8, 16, __?", options: ["30", "31", "32", "33"], correctAnswer: 2, explanation: "Each number doubles, so 32 is next." },

  // Math - Class 5
  { id: 45, subject: "math", category: "addition", difficulty: "hard", classLevel: 5, question: "What is 456 + 789?", options: ["1245", "1246", "1247", "1248"], correctAnswer: 0, explanation: "456 + 789 = 1245." },
  { id: 46, subject: "math", category: "subtraction", difficulty: "hard", classLevel: 5, question: "What is 500 − 234?", options: ["264", "265", "266", "267"], correctAnswer: 2, explanation: "500 − 234 = 266." },
  { id: 47, subject: "math", category: "multiplication", difficulty: "hard", classLevel: 5, question: "What is 25 × 12?", options: ["298", "299", "300", "301"], correctAnswer: 2, explanation: "25 × 12 = 300." },
  { id: 48, subject: "math", category: "division", difficulty: "hard", classLevel: 5, question: "What is 360 ÷ 12?", options: ["28", "29", "30", "31"], correctAnswer: 2, explanation: "360 ÷ 12 = 30." },
  { id: 49, subject: "math", category: "series", difficulty: "hard", classLevel: 5, question: "What number comes next: 1, 1, 2, 3, 5, 8, __?", options: ["11", "12", "13", "14"], correctAnswer: 2, explanation: "This is the Fibonacci sequence; 13 is next (5 + 8)." },

  // English - Class 1
  { id: 50, subject: "english", category: "alphabet", difficulty: "easy", classLevel: 1, question: "Which letter comes after A?", options: ["A", "B", "C", "D"], correctAnswer: 1, explanation: "B comes after A." },
  { id: 51, subject: "english", category: "alphabet", difficulty: "easy", classLevel: 1, question: "Which letter is this: B?", options: ["A", "B", "C", "D"], correctAnswer: 1, explanation: "This is the letter B." },
  { id: 52, subject: "english", category: "alphabet", difficulty: "easy", classLevel: 1, question: "What sound does 'A' make at the start of 'apple'?", options: ["Short a", "Long a", "Silent", "None"], correctAnswer: 0, explanation: "Apple starts with a short 'a' sound." },
  { id: 53, subject: "english", category: "simple", difficulty: "easy", classLevel: 1, question: "What do we use to see?", options: ["Ears", "Eyes", "Hands", "Feet"], correctAnswer: 1, explanation: "We use our eyes to see." },
  { id: 54, subject: "english", category: "simple", difficulty: "easy", classLevel: 1, question: "What colour is an apple?", options: ["Blue", "Red", "Yellow", "Green"], correctAnswer: 1, explanation: "Apples are usually red or green." },

  // English - Class 2
  { id: 55, subject: "english", category: "alphabet", difficulty: "easy", classLevel: 2, question: "Which letter comes after C?", options: ["A", "B", "D", "E"], correctAnswer: 2, explanation: "D comes after C." },
  { id: 56, subject: "english", category: "alphabet", difficulty: "easy", classLevel: 2, question: "Which letter starts the word 'Sun'?", options: ["S", "T", "C", "F"], correctAnswer: 0, explanation: "Sun starts with S." },
  { id: 57, subject: "english", category: "spelling", difficulty: "easy", classLevel: 2, question: "Choose the missing letter: _at", options: ["C", "B", "D", "T"], correctAnswer: 0, explanation: "C + at makes cat." },
  { id: 58, subject: "english", category: "spelling", difficulty: "easy", classLevel: 2, question: "Choose the missing letter: d_g", options: ["o", "a", "e", "i"], correctAnswer: 0, explanation: "d + o + g makes dog." },
  { id: 59, subject: "english", category: "vocabulary", difficulty: "easy", classLevel: 2, question: "What is the opposite of 'big'?", options: ["Small", "Huge", "Large", "Giant"], correctAnswer: 0, explanation: "Small is the opposite of big." },
  { id: 60, subject: "english", category: "simple", difficulty: "easy", classLevel: 2, question: "What colour is a banana?", options: ["Green", "Yellow", "Brown", "Red"], correctAnswer: 1, explanation: "A ripe banana is yellow." },

  // English - Class 3
  { id: 61, subject: "english", category: "alphabet", difficulty: "easy", classLevel: 3, question: "Which letter comes after C?", options: ["A", "B", "D", "E"], correctAnswer: 2, explanation: "D comes after C." },
  { id: 62, subject: "english", category: "alphabet", difficulty: "easy", classLevel: 3, question: "Which letter starts the word 'Sun'?", options: ["S", "T", "C", "F"], correctAnswer: 0, explanation: "Sun starts with S." },
  { id: 63, subject: "english", category: "alphabet", difficulty: "medium", classLevel: 3, question: "Which letter comes before M?", options: ["K", "L", "N", "O"], correctAnswer: 1, explanation: "L comes before M." },
  { id: 64, subject: "english", category: "spelling", difficulty: "easy", classLevel: 3, question: "Which word is spelled correctly?", options: ["Skool", "School", "Scool", "Sckool"], correctAnswer: 1, explanation: "School is the correct spelling." },
  { id: 65, subject: "english", category: "spelling", difficulty: "easy", classLevel: 3, question: "Choose the missing letter: _og", options: ["D", "C", "B", "T"], correctAnswer: 0, explanation: "D + og makes dog." },
  { id: 66, subject: "english", category: "spelling", difficulty: "medium", classLevel: 3, question: "Which word rhymes with 'cake'?", options: ["Bike", "Lake", "Book", "Cup"], correctAnswer: 1, explanation: "Lake rhymes with cake." },
  { id: 67, subject: "english", category: "vocabulary", difficulty: "easy", classLevel: 3, question: "What is the opposite of 'hot'?", options: ["Warm", "Cold", "Dry", "Bright"], correctAnswer: 1, explanation: "Cold is the opposite of hot." },
  { id: 68, subject: "english", category: "vocabulary", difficulty: "easy", classLevel: 3, question: "Which word means 'happy'?", options: ["Sad", "Glad", "Tired", "Small"], correctAnswer: 1, explanation: "Glad means happy." },
  { id: 69, subject: "english", category: "grammar", difficulty: "easy", classLevel: 3, question: "Choose the correct sentence.", options: ["She are happy.", "She is happy.", "She am happy.", "She be happy."], correctAnswer: 1, explanation: "She is happy is correct." },
  { id: 70, subject: "english", category: "simple", difficulty: "easy", classLevel: 3, question: "What do we use to see?", options: ["Ears", "Eyes", "Hands", "Feet"], correctAnswer: 1, explanation: "We use our eyes to see." },

  // English - Class 4
  { id: 71, subject: "english", category: "spelling", difficulty: "medium", classLevel: 4, question: "How do you spell 'beautiful'?", options: ["Beautyful", "Beautiful", "Beautifull", "Beauiful"], correctAnswer: 1, explanation: "Beautiful is spelled b-e-a-u-t-i-f-u-l." },
  { id: 72, subject: "english", category: "vocabulary", difficulty: "medium", classLevel: 4, question: "A tiny house is called a…", options: ["Cottage", "Mountain", "River", "Garden"], correctAnswer: 0, explanation: "A cottage is a small house." },
  { id: 73, subject: "english", category: "grammar", difficulty: "medium", classLevel: 4, question: "Choose the plural of 'box'.", options: ["Boxs", "Boxes", "Boxies", "Boxen"], correctAnswer: 1, explanation: "The plural of box is boxes." },
  { id: 74, subject: "english", category: "simple", difficulty: "medium", classLevel: 4, question: "Where do fish live?", options: ["In water", "In trees", "In clouds", "In sand"], correctAnswer: 0, explanation: "Fish live in water." },

  // English - Class 5
  { id: 75, subject: "english", category: "spelling", difficulty: "hard", classLevel: 5, question: "How do you spell 'necessary'?", options: ["Neccessary", "Necessary", "Necessery", "Nesessary"], correctAnswer: 1, explanation: "Necessary is spelled n-e-c-e-s-s-a-r-y." },
  { id: 76, subject: "english", category: "vocabulary", difficulty: "hard", classLevel: 5, question: "What does 'persevere' mean?", options: ["To give up", "To keep trying", "To stop", "To rest"], correctAnswer: 1, explanation: "Persevere means to keep trying despite difficulties." },
  { id: 77, subject: "english", category: "grammar", difficulty: "hard", classLevel: 5, question: "Which sentence uses correct grammar?", options: ["She don't like apples.", "She doesn't like apples.", "She do not likes apples.", "She didn't likes apples."], correctAnswer: 1, explanation: "She doesn't like apples is grammatically correct." },
];

export function getQuizQuestions(subject: Subject, category: string, difficulty: Difficulty, count: number, classLevel: number) {
  const exact = questionBank.filter(
    (question) => question.subject === subject && question.category === category && question.difficulty === difficulty && question.classLevel === classLevel,
  );
  const categoryFallback = questionBank.filter(
    (question) => question.subject === subject && question.category === category && question.classLevel === classLevel,
  );
  const classLevelFallback = questionBank.filter(
    (question) => question.subject === subject && question.classLevel === classLevel,
  );
  const subjectFallback = questionBank.filter((question) => question.subject === subject);
  
  const pool = exact.length >= count 
    ? exact 
    : categoryFallback.length >= count 
    ? categoryFallback 
    : classLevelFallback.length >= count 
    ? classLevelFallback 
    : subjectFallback;

  return [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, pool.length));
}

export const mathCategories = [
  { id: "addition", label: "Addition", icon: "+", color: "coral", hint: "Make numbers grow" },
  { id: "subtraction", label: "Subtraction", icon: "−", color: "blue", hint: "Take a little away" },
  { id: "multiplication", label: "Multiplication", icon: "×", color: "yellow", hint: "Groups of numbers" },
  { id: "division", label: "Division", icon: "÷", color: "mint", hint: "Share it fairly" },
  { id: "series", label: "Number Series", icon: "123", color: "purple", hint: "Spot the pattern" },
  { id: "challenge", label: "Math Challenge", icon: "★", color: "navy", hint: "Think like a pro" },
] as const;

export const englishCategories = [
  { id: "alphabet", label: "Alphabet", icon: "ABC", color: "coral", hint: "Letters are fun" },
  { id: "spelling", label: "Spelling", icon: "✎", color: "blue", hint: "Build every word" },
  { id: "vocabulary", label: "Vocabulary", icon: "▣", color: "yellow", hint: "Grow your word bank" },
  { id: "grammar", label: "Grammar", icon: "✓", color: "mint", hint: "Make sentences shine" },
  { id: "simple", label: "Simple English", icon: "☀", color: "purple", hint: "Everyday language" },
] as const;

export const badgeCatalog = [
  { id: "first-quiz", icon: "✦", label: "First Quiz", description: "Complete your first quiz" },
  { id: "ten-correct", icon: "◎", label: "10 Correct", description: "Answer 10 questions correctly" },
  { id: "math-star", icon: "＋", label: "Math Star", description: "Complete a Math quiz" },
  { id: "english-star", icon: "A", label: "English Star", description: "Complete an English quiz" },
  { id: "streak", icon: "♨", label: "Quiz Streak", description: "Complete 3 quizzes" },
  { id: "champion", icon: "♛", label: "Quiz Champion", description: "Score 90% or more" },
] as const;
