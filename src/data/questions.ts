export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  question: string;
  answers: Answer[];
}

export const questions: Question[] = [
  {
    id: 'q1',
    question: 'What should you check first in a suspicious email?',
    answers: [
      { id: 'a', text: 'Font',           isCorrect: false },
      { id: 'b', text: 'Sender address', isCorrect: true  },
      { id: 'c', text: 'Color',          isCorrect: false },
      { id: 'd', text: 'Length',         isCorrect: false },
    ],
  },
  {
    id: 'q2',
    question: 'Is it safe to enter a password on an unknown site?',
    answers: [
      { id: 'a', text: 'Yes',       isCorrect: false },
      { id: 'b', text: 'No',        isCorrect: true  },
      { id: 'c', text: 'Sometimes', isCorrect: false },
      { id: 'd', text: 'Always',    isCorrect: false },
    ],
  },
  {
    id: 'q3',
    question: 'What does HTTPS indicate?',
    answers: [
      { id: 'a', text: 'Design',           isCorrect: false },
      { id: 'b', text: 'Secure connection', isCorrect: true  },
      { id: 'c', text: 'Speed',            isCorrect: false },
      { id: 'd', text: 'Age',              isCorrect: false },
    ],
  },
  {
    id: 'q4',
    question: 'Can support ask for your password?',
    answers: [
      { id: 'a', text: 'Yes',       isCorrect: false },
      { id: 'b', text: 'No',        isCorrect: true  },
      { id: 'c', text: 'Sometimes', isCorrect: false },
      { id: 'd', text: 'Rarely',    isCorrect: false },
    ],
  },
  {
    id: 'q5',
    question: 'What should you do with unexpected prizes?',
    answers: [
      { id: 'a', text: 'Accept',          isCorrect: false },
      { id: 'b', text: 'Ignore or verify', isCorrect: true  },
      { id: 'c', text: 'Share',           isCorrect: false },
      { id: 'd', text: 'Pay',             isCorrect: false },
    ],
  },
  {
    id: 'q6',
    question: 'Is clicking email links always safe?',
    answers: [
      { id: 'a', text: 'Yes',       isCorrect: false },
      { id: 'b', text: 'No',        isCorrect: true  },
      { id: 'c', text: 'Sometimes', isCorrect: false },
      { id: 'd', text: 'Always',    isCorrect: false },
    ],
  },
  {
    id: 'q7',
    question: 'What is phishing?',
    answers: [
      { id: 'a', text: 'Game',               isCorrect: false },
      { id: 'b', text: 'Data theft attempt', isCorrect: true  },
      { id: 'c', text: 'App',                isCorrect: false },
      { id: 'd', text: 'File',               isCorrect: false },
    ],
  },
  {
    id: 'q8',
    question: 'Should you trust new contacts online quickly?',
    answers: [
      { id: 'a', text: 'Yes',       isCorrect: false },
      { id: 'b', text: 'No',        isCorrect: false },
      { id: 'c', text: 'Carefully', isCorrect: true  },
      { id: 'd', text: 'Always',    isCorrect: false },
    ],
  },
  {
    id: 'q9',
    question: 'What is the safest action if unsure?',
    answers: [
      { id: 'a', text: 'Click',  isCorrect: false },
      { id: 'b', text: 'Ignore', isCorrect: false },
      { id: 'c', text: 'Verify', isCorrect: true  },
      { id: 'd', text: 'Share',  isCorrect: false },
    ],
  },
  {
    id: 'q10',
    question: 'Should you reuse passwords?',
    answers: [
      { id: 'a', text: 'Yes',       isCorrect: false },
      { id: 'b', text: 'No',        isCorrect: true  },
      { id: 'c', text: 'Sometimes', isCorrect: false },
      { id: 'd', text: 'Always',    isCorrect: false },
    ],
  },
  {
    id: 'q11',
    question: 'What is 2FA?',
    answers: [
      { id: 'a', text: 'Game',               isCorrect: false },
      { id: 'b', text: 'Extra security layer', isCorrect: true },
      { id: 'c', text: 'App',                isCorrect: false },
      { id: 'd', text: 'Code',               isCorrect: false },
    ],
  },
  {
    id: 'q12',
    question: 'Are all official-looking sites safe?',
    answers: [
      { id: 'a', text: 'Yes',       isCorrect: false },
      { id: 'b', text: 'No',        isCorrect: true  },
      { id: 'c', text: 'Sometimes', isCorrect: false },
      { id: 'd', text: 'Always',    isCorrect: false },
    ],
  },
  {
    id: 'q13',
    question: 'What should you do before payment?',
    answers: [
      { id: 'a', text: 'Trust',       isCorrect: false },
      { id: 'b', text: 'Verify site', isCorrect: true  },
      { id: 'c', text: 'Rush',        isCorrect: false },
      { id: 'd', text: 'Ignore',      isCorrect: false },
    ],
  },
  {
    id: 'q14',
    question: 'Is urgency a manipulation tactic?',
    answers: [
      { id: 'a', text: 'Yes',       isCorrect: true  },
      { id: 'b', text: 'No',        isCorrect: false },
      { id: 'c', text: 'Sometimes', isCorrect: false },
      { id: 'd', text: 'Rarely',    isCorrect: false },
    ],
  },
  {
    id: 'q15',
    question: 'Should you download unknown files?',
    answers: [
      { id: 'a', text: 'Yes',       isCorrect: false },
      { id: 'b', text: 'No',        isCorrect: true  },
      { id: 'c', text: 'Sometimes', isCorrect: false },
      { id: 'd', text: 'Always',    isCorrect: false },
    ],
  },
  {
    id: 'q16',
    question: 'Is public Wi-Fi always safe?',
    answers: [
      { id: 'a', text: 'Yes',       isCorrect: false },
      { id: 'b', text: 'No',        isCorrect: true  },
      { id: 'c', text: 'Sometimes', isCorrect: false },
      { id: 'd', text: 'Always',    isCorrect: false },
    ],
  },
  {
    id: 'q17',
    question: 'What should you do with unknown attachments?',
    answers: [
      { id: 'a', text: 'Open',           isCorrect: false },
      { id: 'b', text: 'Delete or scan', isCorrect: true  },
      { id: 'c', text: 'Share',          isCorrect: false },
      { id: 'd', text: 'Ignore',         isCorrect: false },
    ],
  },
  {
    id: 'q18',
    question: 'Are strong passwords important?',
    answers: [
      { id: 'a', text: 'No',        isCorrect: false },
      { id: 'b', text: 'Yes',       isCorrect: true  },
      { id: 'c', text: 'Sometimes', isCorrect: false },
      { id: 'd', text: 'Rarely',    isCorrect: false },
    ],
  },
  {
    id: 'q19',
    question: 'Should you verify URLs?',
    answers: [
      { id: 'a', text: 'No',        isCorrect: false },
      { id: 'b', text: 'Yes',       isCorrect: true  },
      { id: 'c', text: 'Sometimes', isCorrect: false },
      { id: 'd', text: 'Rarely',    isCorrect: false },
    ],
  },
  {
    id: 'q20',
    question: 'What protects your account best?',
    answers: [
      { id: 'a', text: 'Luck',                        isCorrect: false },
      { id: 'b', text: 'Awareness and security habits', isCorrect: true },
      { id: 'c', text: 'Speed',                       isCorrect: false },
      { id: 'd', text: 'Design',                      isCorrect: false },
    ],
  },
];