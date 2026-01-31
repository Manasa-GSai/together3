export type Mood = 'great' | 'okay' | 'meh' | 'struggling' | null;

export type Buddy = {
  id: string;
  name: string;
  emoji: string;
  status: 'online' | 'focusing' | 'offline';
};

export type Task = {
  id: string;
  title: string;
  duration: number; // in minutes
  completed: boolean;
  startedAt?: Date;
};

export type SessionState = 'check-in' | 'task-setup' | 'buddy-select' | 'focusing' | 'reflection';

export type ReflectionChoice = 'encouragement' | 'space' | 'reassurance';
