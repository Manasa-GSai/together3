import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { MoodCheckIn } from '@/components/MoodCheckIn';
import { TaskSetup } from '@/components/TaskSetup';
import { BuddySelect } from '@/components/BuddySelect';
import { FocusSession } from '@/components/FocusSession';
import { Reflection } from '@/components/Reflection';
import { SessionState, Mood, Task, Buddy, ReflectionChoice } from '@/types/app';

const Index = () => {
  const [sessionState, setSessionState] = useState<SessionState | 'welcome'>('welcome');
  const [mood, setMood] = useState<Mood>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [buddy, setBuddy] = useState<Buddy | null>(null);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const handleStart = () => {
    setSessionState('check-in');
  };

  const handleMoodComplete = (selectedMood: Mood) => {
    setMood(selectedMood);
    setSessionState('task-setup');
  };

  const handleTaskComplete = (newTask: Task) => {
    setTask(newTask);
    setSessionState('buddy-select');
  };

  const handleBuddyComplete = (selectedBuddy: Buddy | null) => {
    setBuddy(selectedBuddy);
    setSessionState('focusing');
  };

  const handleSessionComplete = (completed: boolean) => {
    setTaskCompleted(completed);
    setSessionState('reflection');
  };

  const handleReflectionComplete = (choice: ReflectionChoice | 'done') => {
    // Reset everything for a new session
    setSessionState('welcome');
    setMood(null);
    setTask(null);
    setBuddy(null);
    setTaskCompleted(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {sessionState === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}
      
      {sessionState === 'check-in' && (
        <MoodCheckIn onComplete={handleMoodComplete} />
      )}
      
      {sessionState === 'task-setup' && mood && (
        <TaskSetup mood={mood} onComplete={handleTaskComplete} />
      )}
      
      {sessionState === 'buddy-select' && (
        <BuddySelect onComplete={handleBuddyComplete} />
      )}
      
      {sessionState === 'focusing' && task && (
        <FocusSession 
          task={task} 
          buddy={buddy} 
          onComplete={handleSessionComplete} 
        />
      )}
      
      {sessionState === 'reflection' && task && (
        <Reflection 
          task={task} 
          buddy={buddy} 
          completed={taskCompleted} 
          onComplete={handleReflectionComplete} 
        />
      )}
    </div>
  );
};

export default Index;
