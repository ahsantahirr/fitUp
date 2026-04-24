import { useExercises } from '@/context/exercise-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { exercises, completedCount, toggleExerciseCompleted } = useExercises();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>Daily Routine</Text>
        <Text style={styles.heroTitle}>Train Smarter</Text>
        <Text style={styles.heroSubtitle}>Track every workout and keep your streak alive.</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{exercises.length}</Text>
            <Text style={styles.statLabel}>Exercises</Text>
          </View>
        </View>

        <Pressable style={styles.addButton} onPress={() => router.push('/add-exercise')}>
          <Text style={styles.addButtonText}>+ Create Custom Exercise</Text>
        </Pressable>
      </View>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => router.push(`/exercise/${item.id}`)}>
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} contentFit="cover" />

            <View style={styles.cardContent}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.cardTextWrap}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>

                <Pressable
                  style={[styles.completeBadge, item.isCompleted && styles.completeBadgeDone]}
                  onPress={(event) => {
                    event.stopPropagation();
                    toggleExerciseCompleted(item.id);
                  }}>
                  <Text style={styles.completeText}>{item.isCompleted ? 'Done' : 'Mark'}</Text>
                </Pressable>
              </View>

              <Text style={styles.cardMeta}>
                {item.source === 'custom' ? 'Custom exercise' : 'Starter exercise'}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2ff',
  },
  hero: {
    paddingTop: 64,
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: '#111827',
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  heroEyebrow: {
    fontSize: 13,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#93c5fd',
    fontWeight: '600',
  },
  heroTitle: {
    marginTop: 8,
    fontSize: 34,
    fontWeight: '700',
    color: '#ffffff',
  },
  heroSubtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  statsRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: '#374151',
    alignItems: 'center',
  },
  statNumber: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
  },
  statLabel: {
    marginTop: 2,
    color: '#94a3b8',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  list: {
    padding: 16,
    gap: 14,
    paddingBottom: 34,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 145,
    backgroundColor: '#e5e7eb',
  },
  cardContent: {
    padding: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardTextWrap: {
    flex: 1,
    gap: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  cardDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  completeBadge: {
    backgroundColor: '#334155',
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  completeBadgeDone: {
    backgroundColor: '#16a34a',
  },
  completeText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  cardMeta: {
    marginTop: 12,
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '600',
  },
});
