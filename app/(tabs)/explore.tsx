import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

type AdviceResponse = {
  slip: {
    id: number;
    advice: string;
  };
};

export default function MotivationScreen() {
  const [quote, setQuote] = useState('Consistency beats intensity.');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadQuote = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('https://api.adviceslip.com/advice');
      const data = (await response.json()) as AdviceResponse;

      if (!data?.slip?.advice) {
        throw new Error('Invalid quote response');
      }

      setQuote(data.slip.advice);
    } catch {
      setError('Could not fetch a fresh quote. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuote();
  }, [loadQuote]);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>Mindset</Text>
        <Text style={styles.title}>Motivation Feed</Text>
        <Text style={styles.subtitle}>Refresh your focus before you start the next set.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.quoteMark}>"</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : (
          <Text style={styles.quote}>{`"${quote}"`}</Text>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable style={styles.refreshButton} onPress={loadQuote}>
        <Text style={styles.refreshButtonText}>Get Another Quote</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    backgroundColor: '#e2e8f0',
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
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    marginTop: 22,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    minHeight: 180,
    justifyContent: 'center',
    padding: 20,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  quoteMark: {
    position: 'absolute',
    top: 6,
    left: 14,
    fontSize: 56,
    color: '#93c5fd',
    opacity: 0.45,
    fontWeight: '700',
  },
  quote: {
    fontSize: 22,
    lineHeight: 32,
    color: '#1f2937',
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 16,
    color: '#dc2626',
  },
  refreshButton: {
    marginTop: 18,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
