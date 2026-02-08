import { BookOpen, Calculator, FlaskConical, Atom, Globe, History, Languages, Pen, Scale, MapPin, Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Subject {
  slug: string;
  title: string;
  icon: LucideIcon;
  levels: string[];
  description: string;
  examBoards: string[];
}

export const subjects: Subject[] = [
  {
    slug: "maths",
    title: "Maths",
    icon: Calculator,
    levels: ["GCSE", "A-Level"],
    description: "From algebra to calculus, our expert maths tutors break down complex concepts into clear, manageable steps. Build confidence, improve grades, and master exam technique.",
    examBoards: ["AQA", "Edexcel", "OCR"],
  },
  {
    slug: "biology",
    title: "Biology",
    icon: Brain,
    levels: ["GCSE", "A-Level"],
    description: "Explore the living world with structured lessons covering cell biology, genetics, ecology, and human physiology. Perfect for students targeting top grades.",
    examBoards: ["AQA", "Edexcel", "OCR"],
  },
  {
    slug: "chemistry",
    title: "Chemistry",
    icon: FlaskConical,
    levels: ["GCSE", "A-Level"],
    description: "Master chemical reactions, bonding, and organic chemistry with tutors who simplify the hardest topics and provide extensive exam practice.",
    examBoards: ["AQA", "Edexcel", "OCR"],
  },
  {
    slug: "physics",
    title: "Physics",
    icon: Atom,
    levels: ["GCSE", "A-Level"],
    description: "Understand forces, energy, waves, and electricity through clear explanations and real-world applications. Our tutors make physics click.",
    examBoards: ["AQA", "Edexcel", "OCR"],
  },
  {
    slug: "english-literature",
    title: "English Literature",
    icon: BookOpen,
    levels: ["GCSE", "A-Level"],
    description: "Develop critical analysis skills, essay writing technique, and deep understanding of set texts with experienced English literature tutors.",
    examBoards: ["AQA", "Edexcel", "OCR"],
  },
  {
    slug: "english-language",
    title: "English Language",
    icon: Pen,
    levels: ["GCSE", "A-Level"],
    description: "Sharpen reading comprehension, creative writing, and language analysis skills. Our tutors help students express ideas with clarity and confidence.",
    examBoards: ["AQA", "Edexcel"],
  },
  {
    slug: "history",
    title: "History",
    icon: History,
    levels: ["GCSE", "A-Level"],
    description: "From medieval Britain to modern world history, our tutors help students build strong analytical arguments and source evaluation skills.",
    examBoards: ["AQA", "Edexcel", "OCR"],
  },
  {
    slug: "geography",
    title: "Geography",
    icon: MapPin,
    levels: ["GCSE", "A-Level"],
    description: "Explore physical and human geography with structured revision, case study mastery, and fieldwork preparation from dedicated tutors.",
    examBoards: ["AQA", "Edexcel", "OCR"],
  },
  {
    slug: "spanish",
    title: "Spanish",
    icon: Languages,
    levels: ["GCSE", "A-Level"],
    description: "Build fluency in speaking, listening, reading, and writing with native-level tutors who make language learning engaging and effective.",
    examBoards: ["AQA", "Edexcel"],
  },
  {
    slug: "philosophy",
    title: "Philosophy",
    icon: Scale,
    levels: ["A-Level"],
    description: "Tackle epistemology, ethics, and philosophy of mind with tutors who help you construct compelling arguments and think critically.",
    examBoards: ["AQA", "OCR"],
  },
  {
    slug: "politics",
    title: "Politics",
    icon: Globe,
    levels: ["A-Level"],
    description: "Understand UK government, political ideologies, and global politics through structured lessons designed for exam success.",
    examBoards: ["Edexcel", "AQA"],
  },
];

export function getSubjectBySlug(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}
