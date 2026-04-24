export type ExerciseSource = 'default' | 'custom';

export type Exercise = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isCompleted: boolean;
  source: ExerciseSource;
};
