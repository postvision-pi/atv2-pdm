import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExerciseFeedback from '../../components/ExerciseFeedback';
import { exerciseColors as colors, exerciseFonts as fonts } from '../../constants/exerciseTheme';
import { useExercises } from '../../hooks/useExercises';

export default function ExerciseWalkthrough() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { exercises, isLoading, errorMessage, reload } = useExercises();
  const [videoError, setVideoError] = useState('');
  const exercise = exercises.find((item) => item._id === id);
  const hasVideo = !!exercise && /^https?:\/\/\S+$/i.test(exercise.videoUrl);

  async function openVideo() {
    if (!exercise || !hasVideo) return;
    setVideoError('');
    try {
      await Linking.openURL(exercise.videoUrl);
    } catch {
      setVideoError('Não foi possível abrir a demonstração. Tente novamente.');
    }
  }

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/escolha-exercicio');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={goBack} style={styles.back} accessibilityRole="button">
        <Text style={styles.backText}>Voltar</Text>
      </Pressable>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading} accessibilityRole="header">Passo a passo</Text>
        {isLoading || errorMessage || !exercise ? (
          <ExerciseFeedback
            isLoading={isLoading}
            errorMessage={errorMessage}
            emptyMessage="Exercício não encontrado. Volte e escolha outro exercício."
            onRetry={reload}
          />
        ) : (
          <View style={styles.card}>
            <Text style={styles.name} accessibilityRole="header">{exercise.name}</Text>
            <Text style={styles.label}>Descrição</Text>
            <Text style={styles.description}>{exercise.description}</Text>
            <Text style={styles.label}>Grupo muscular</Text>
            <Text style={styles.description}>{exercise.muscleGroup}</Text>
            {hasVideo ? (
              <Pressable style={styles.videoButton} onPress={openVideo} accessibilityRole="link" accessibilityHint="Abre o vídeo cadastrado para este exercício">
                <Text style={styles.videoButtonText}>Ver demonstração</Text>
              </Pressable>
            ) : <Text style={styles.description}>Demonstração indisponível para este exercício.</Text>}
            {videoError ? <Text style={styles.error} accessibilityRole="alert">{videoError}</Text> : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  back: { minHeight: 44, alignSelf: 'flex-start', paddingHorizontal: 24, justifyContent: 'center' },
  backText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.primary },
  content: { padding: 24, gap: 28 },
  heading: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 20, color: colors.text },
  card: { padding: 24, borderRadius: 10, backgroundColor: colors.white },
  name: { fontFamily: fonts.bold, fontSize: 20, lineHeight: 26, color: colors.heading },
  label: { marginTop: 20, marginBottom: 4, fontFamily: fonts.bold, fontSize: 14, color: colors.text },
  description: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, color: colors.text },
  videoButton: { marginTop: 28, minHeight: 51, borderRadius: 10, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', padding: 12 },
  videoButtonText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.white },
  error: { marginTop: 16, fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.error },
});
