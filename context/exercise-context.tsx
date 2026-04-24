import { defaultExercises } from '@/data/exercises';
import { Exercise } from '@/types/exercise';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type AddExerciseInput = {
  name: string;
  description: string;
  imageUrl?: string;
};

type ExerciseContextValue = {
  exercises: Exercise[];
  completedCount: number;
  addExercise: (exercise: AddExerciseInput) => Exercise;
  getExerciseById: (id: string) => Exercise | undefined;
  toggleExerciseCompleted: (id: string) => void;
};

const ExerciseContext = createContext<ExerciseContextValue | undefined>(undefined);

const defaultCustomImage =
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80';

export function ExerciseProvider({ children }: { children: ReactNode }) {
  const [exercises, setExercises] = useState<Exercise[]>(defaultExercises);

  const addExercise = ({ name, description, imageUrl }: AddExerciseInput) => {
    const newExercise: Exercise = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      imageUrl: imageUrl?.trim() ? imageUrl.trim() : defaultCustomImage,
      isCompleted: false,
      source: 'custom',
    };

    setExercises((current) => [newExercise, ...current]);
    return newExercise;
  };

  const getExerciseById = (id: string) => exercises.find((exercise) => exercise.id === id);

  const toggleExerciseCompleted = (id: string) => {
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === id ? { ...exercise, isCompleted: !exercise.isCompleted } : exercise
      )
    );
  };

  const value = useMemo(
    () => ({
      exercises,
      completedCount: exercises.filter((exercise) => exercise.isCompleted).length,
      addExercise,
      getExerciseById,
      toggleExerciseCompleted,
    }),
    [exercises]
  );

  return <ExerciseContext.Provider value={value}>{children}</ExerciseContext.Provider>;
}

export function useExercises() {
  const context = useContext(ExerciseContext);

  if (!context) {
    throw new Error('useExercises must be used inside ExerciseProvider.');
  }

  return context;
}
