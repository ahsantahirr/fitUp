import { useExercises } from '@/context/exercise-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AddExerciseScreen() {
  const { addExercise } = useExercises();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const onSave = () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('Missing information', 'Please enter both exercise name and description.');
      return;
    }

    const created = addExercise({ name, description, imageUrl });
    setName('');
    setDescription('');
    setImageUrl('');
    router.replace(`/exercise/${created.id}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>Build Your Plan</Text>
        <Text style={styles.title}>Add Custom Exercise</Text>
        <Text style={styles.subtitle}>Create a personalized workout and keep your routine fresh.</Text>
      </View>

      <View style={styles.formCard}>
        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Exercise Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Mountain Climbers"
            placeholderTextColor="#94a3b8"
            style={styles.input}
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Short details about how to do this exercise"
            placeholderTextColor="#94a3b8"
            multiline
            numberOfLines={4}
            style={[styles.input, styles.multilineInput]}
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Image URL (optional)</Text>
          <TextInput
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="https://example.com/exercise-image.jpg"
            placeholderTextColor="#94a3b8"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <Pressable style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save Exercise</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e2e8f0',
    padding: 16,
    gap: 12,
    paddingBottom: 24,
  },
  hero: {
    borderRadius: 20,
    backgroundColor: '#111827',
    padding: 18,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  heroEyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#93c5fd',
  },
  title: {
    marginTop: 8,
    fontSize: 31,
    fontWeight: '700',
    color: '#ffffff',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  formCard: {
    marginTop: 4,
    gap: 14,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
  },
  fieldWrap: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  multilineInput: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 4,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});
