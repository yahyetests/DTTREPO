export type Role = 'student' | 'tutor' | 'admin' | 'parent';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  balanceHours?: number; // Only relevant for students
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Tutor {
  id: string;
  name: string;
  subjects: string[];
  bio: string;
  rating: number;
  imageUrl?: string;
  reviews?: Review[]; // Optional for list view, populated for detail view
  hourlyRate: number;
}

export interface Session {
  id: string;
  studentId: string;
  tutorId: string;
  tutorName: string; // Denormalized for display convenience
  subject: string;
  date: string; // ISO date string YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink?: string;
}

export interface Resource {
  id: string;
  title: string;
  subject: string;
  type: 'pdf' | 'video' | 'link';
  url: string;
  dateAdded: string; // ISO date string
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Contact {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  role: string;
}

// Availability Types
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface TimeRange {
  start: string;
  end: string;
}

export interface DailyAvailability {
  day: DayOfWeek;
  isEnabled: boolean;
  slots: TimeRange[];
}

export interface AvailabilityException {
  id: string;
  date: string;
  isOff: boolean;
  slots: TimeRange[];
}

// Billing Types
export interface Transaction {
  id: string;
  type: 'deposit' | 'payment' | 'refund';
  description: string;
  amount: number;
  credits: number; // Hours equivalent
  date: string;
  status: 'completed' | 'pending' | 'failed';
  invoiceUrl?: string;
}
