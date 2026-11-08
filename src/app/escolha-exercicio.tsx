import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ExerciseFeedback from '../components/ExerciseFeedback';
import { exerciseColors as colors, exerciseFonts as fonts } from '../constants/exerciseTheme';
import { useExercises } from '../hooks/useExercises';

export default function ExerciseSelection() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { exercises, isLoading, errorMessage, reload } = useExercises();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectionMessage, setSelectionMessage] = useState('');
  const canStart = !isLoading && !errorMessage && exercises.length > 0;

  function handleStart() {
    if (!canStart) return;
    if (!selectedId || !exercises.some((exercise) => exercise._id === selectedId)) {
      setSelectionMessage('Selecione um exercício para continuar.');
      return;
    }

    router.push({ pathname: '/passo-a-passo/[id]', params: { id: selectedId } });
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: Math.max(42, insets.top + 16) }]}>
        <Text style={styles.heading} accessibilityRole="header">Escolha do exercício</Text>
      </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={[styles.listContent, exercises.length === 0 && styles.emptyList]}
        data={exercises}
        extraData={selectedId}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ExerciseSeparator}
        ListEmptyComponent={
          <ExerciseFeedback
            isLoading={isLoading}
            errorMessage={errorMessage}
            emptyMessage="Nenhum exercício disponível no momento."
            onRetry={reload}
          />
        }
        renderItem={({ item }) => {
          const selected = selectedId === item._id;
          return (
            <Pressable
              style={styles.card}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              aria-checked={selected}
              accessibilityLabel={item.name}
              accessibilityHint={item.description}
              onPress={() => {
                setSelectedId(item._id);
                setSelectionMessage('');
              }}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <View style={styles.radio}>
                  {selected && <View style={styles.radioDot} />}
                </View>
              </View>
              <Text style={styles.descriptionLabel}>Descrição</Text>
              <Text style={styles.description}>{item.description}</Text>
            </Pressable>
          );
        }}
      />

      <View style={[styles.footer, { paddingBottom: Math.max(49, insets.bottom + 16) }]}>
        {selectionMessage ? <Text style={styles.validation} accessibilityRole="alert">{selectionMessage}</Text> : null}
        <Pressable
          style={styles.startButton}
          onPress={handleStart}
          disabled={!canStart}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canStart }}
          aria-disabled={!canStart}
          accessibilityHint="Escolha um exercício para abrir suas orientações"
        >
          <Text style={styles.startButtonText}>Iniciar Passo a Passo</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function ExerciseSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 24, paddingBottom: 38 },
  heading: { fontFamily: fonts.heading, fontSize: 16, lineHeight: 20, color: colors.text },
  list: { flex: 1 },
  listContent: { paddingHorizontal: 24, paddingBottom: 16 },
  emptyList: { flexGrow: 1, justifyContent: 'center' },
  separator: { height: 28 },
  card: {
    minHeight: 171,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 14,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 },
  exerciseName: { flex: 1, fontFamily: fonts.bold, fontSize: 20, lineHeight: 24, color: colors.heading },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.primary,
    marginTop: 2,
    marginRight: -6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  descriptionLabel: { marginTop: 12, fontFamily: fonts.bold, fontSize: 14, lineHeight: 17, color: colors.text },
  description: { marginTop: 4, marginRight: 16, fontFamily: fonts.regular, fontSize: 14, lineHeight: 16, color: colors.text },
  footer: { paddingLeft: 11, paddingRight: 18, paddingTop: 16 },
  startButton: { minHeight: 51, borderRadius: 10, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', padding: 12 },
  startButtonText: { fontFamily: fonts.heading, fontSize: 13, lineHeight: 17, color: colors.white },
  validation: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18, color: colors.error, textAlign: 'center', marginBottom: 12 },
});
