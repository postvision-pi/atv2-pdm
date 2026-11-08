import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { exerciseColors as colors, exerciseFonts as fonts } from '../constants/exerciseTheme';

interface Props {
  isLoading: boolean;
  errorMessage: string;
  emptyMessage: string;
  onRetry: () => void;
}

export default function ExerciseFeedback({ isLoading, errorMessage, emptyMessage, onRetry }: Props) {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <ActivityIndicator size="large" color={colors.primary} accessibilityLabel="Carregando exercícios" />
          <Text style={styles.message}>Carregando exercícios...</Text>
        </>
      ) : (
        <>
          <Text style={styles.message} accessibilityRole={errorMessage ? 'alert' : undefined}>
            {errorMessage || emptyMessage}
          </Text>
          <Pressable onPress={onRetry} style={styles.retry} accessibilityRole="button">
            <Text style={styles.retryText}>Tentar novamente</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  message: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, textAlign: 'center', color: colors.heading },
  retry: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 20 },
  retryText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.primary },
});
