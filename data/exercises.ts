import { Exercise } from '@/types/exercise';

export const defaultExercises: Exercise[] = [
  {
    id: 'pushups',
    name: 'Push-ups',
    description:
      'A classic upper-body exercise that strengthens your chest, shoulders, and triceps.',
    imageUrl:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80',
    isCompleted: false,
    source: 'default',
  },
  {
    id: 'squats',
    name: 'Bodyweight Squats',
    description:
      'A lower-body movement that targets the quads, glutes, and hamstrings while improving balance.',
    imageUrl:
      'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1200&q=80',
    isCompleted: false,
    source: 'default',
  },
  {
    id: 'plank',
    name: 'Plank Hold',
    description:
      'An isometric core exercise that helps build abdominal and lower back strength.',
    imageUrl:
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80',
    isCompleted: false,
    source: 'default',
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    description:
      'A full-body cardio warm-up exercise that improves heart rate and coordination.',
    imageUrl:
      'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1200&q=80',
    isCompleted: false,
    source: 'default',
  },
];
