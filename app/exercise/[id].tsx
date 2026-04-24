import { useExercises } from '@/context/exercise-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();
  const router = useRouter();
  const { getExerciseById, toggleExerciseCompleted } = useExercises();
  const exerciseId = Array.isArray(id) ? id[0] : id;

  if (!exerciseId) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Exercise id is missing.</Text>
      </View>
    );
  }

  const exercise = getExerciseById(exerciseId);

  if (!exercise) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Exercise not found.</Text>
        <Pressable style={styles.backButton} onPress={() => router.replace('/')}>
          <Text style={styles.backButtonText}>Go Back Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroImageWrap}>
        <Image source={{ uri: exercise.imageUrl }} style={styles.image} contentFit="cover" />
        <View style={styles.overlayTopRow}>
          <Text style={styles.sourceBadge}>{exercise.source === 'custom' ? 'Custom' : 'Starter'}</Text>
        </View>
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.description}>{exercise.description}</Text>

        <View style={styles.quickStatsRow}>
          <View style={styles.quickStatBox}>
            <Text style={styles.quickStatValue}>15-20 min</Text>
            <Text style={styles.quickStatLabel}>Estimated Time</Text>
          </View>
          <View style={styles.quickStatBox}>
            <Text style={styles.quickStatValue}>Beginner</Text>
            <Text style={styles.quickStatLabel}>Difficulty</Text>
          </View>
        </View>

        <View
          style={[styles.statusPill, exercise.isCompleted ? styles.statusDone : styles.statusOpen]}>
          <Text style={styles.statusText}>
            {exercise.isCompleted ? 'Completed today' : 'Not completed yet'}
          </Text>
        </View>

        <Pressable
          style={[styles.actionButton, exercise.isCompleted && styles.actionButtonDone]}
          onPress={() => toggleExerciseCompleted(exercise.id)}>
          <Text style={styles.actionButtonText}>
            {exercise.isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e2e8f0',
    paddingBottom: 30,
  },
  heroImageWrap: {
    margin: 16,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#0f172a',
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 290,
    backgroundColor: '#e5e7eb',
  },
  overlayTopRow: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  sourceBadge: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.76)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  contentCard: {
    marginHorizontal: 16,
    marginTop: 4,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 12,
  },
  name: {
    fontSize: 31,
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  quickStatsRow: {
    marginTop: 2,
    flexDirection: 'row',
    gap: 10,
  },
  quickStatBox: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quickStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  quickStatLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#475569',
  },
  statusPill: {
    alignSelf: 'flex-start',
    marginTop: 2,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
  },
  statusDone: {
    backgroundColor: '#16a34a',
  },
  statusOpen: {
    backgroundColor: '#334155',
  },
  statusText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
  },
  actionButton: {
    marginTop: 8,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionButtonDone: {
    backgroundColor: '#dc2626',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  fallbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
    backgroundColor: '#e2e8f0',
  },
  fallbackText: {
    fontSize: 18,
    color: '#1f2937',
  },
  backButton: {
    marginTop: 8,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
