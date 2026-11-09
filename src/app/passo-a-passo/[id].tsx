import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import StepItem from '../../components/StepItem';
import { buscarPassos } from '../../data/passos';
import { useExercises } from '../../hooks/useExercises'; 
import { exerciseColors, exerciseFonts } from '../../constants/exerciseTheme';
import { radius } from '../../constants/appTheme';

export default function PassoAPassoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { exercises, isLoading, errorMessage, reload } = useExercises();
  const [etapaAtiva, setEtapaAtiva] = useState(0);

  const exercicio = exercises.find((e) => e._id === id);
  const passos = exercicio ? buscarPassos(exercicio.name) : [];
  const ehPrimeira = etapaAtiva === 0;
  const ehUltima = etapaAtiva === passos.length - 1;

  function voltar() {
    router.replace('/escolha-exercicio');
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centro}>
        <ActivityIndicator size="large" color={exerciseColors.primary} />
      </SafeAreaView>
    );
  }

  if (errorMessage || !exercicio) {
    return (
      <SafeAreaView style={styles.centro}>
        <Text style={[styles.mensagem, { color: exerciseColors.error }]}>
          {errorMessage || 'Exercício não encontrado.'}
        </Text>
        <Pressable style={styles.botaoPrincipal} onPress={reload}>
          <Text style={styles.textoBotao}>Tentar novamente</Text>
        </Pressable>
        <Pressable onPress={voltar} style={{ marginTop: 12 }}>
          <Text style={styles.textoVoltar}>Voltar para exercícios</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.tela}>
      <Pressable style={styles.voltar} onPress={voltar} hitSlop={10}>
        <Ionicons name="arrow-back" size={22} color={exerciseColors.primary} />
        <Text style={styles.textoVoltar}>Voltar</Text>
      </Pressable>

      <Text style={styles.titulo}>{exercicio.name}</Text>

      {passos.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.mensagem}>
            Passo a passo ainda não disponível para este exercício.
          </Text>
        </View>
      ) : (
        <>
          {/* FlatList: lista das etapas */}
          <FlatList
            style={styles.flatList}
            data={passos}
            keyExtractor={(passo) => passo.titulo}
            extraData={etapaAtiva}
            contentContainerStyle={styles.lista}
            renderItem={({ item, index }) => (
              <StepItem
                numero={index + 1}
                titulo={item.titulo}
                texto={item.texto}
                imagem={item.imagem}
                ativo={index === etapaAtiva}
                onPress={() => setEtapaAtiva(index)}
              />
            )}
          />

          <View style={styles.navegacao}>
            <Pressable
              style={[styles.botaoSec, ehPrimeira && styles.desabilitado]}
              disabled={ehPrimeira}
              onPress={() => setEtapaAtiva(etapaAtiva - 1)}
            >
              <Text style={styles.textoSec}>Anterior</Text>
            </Pressable>

            <Text style={styles.contador}>
              {etapaAtiva + 1} / {passos.length}
            </Text>

            <Pressable
              style={[styles.botaoSec, ehUltima && styles.desabilitado]}
              disabled={ehUltima}
              onPress={() => setEtapaAtiva(etapaAtiva + 1)}
            >
              <Text style={styles.textoSec}>Próximo</Text>
            </Pressable>
          </View>
        </>
      )}

      <Pressable
        style={styles.botaoPrincipal}
        onPress={() => {
          // quando a tela da câmera existir: router.push('/camera')
        }}
      >
        <Text style={styles.textoBotao}>Realizar Exercício</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: exerciseColors.background, paddingHorizontal: 16, paddingBottom: 16 },
  centro: { flex: 1, backgroundColor: exerciseColors.background, alignItems: 'center', justifyContent: 'center', padding: 24 },
  voltar: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  textoVoltar: { color: exerciseColors.primary, fontSize: 14, fontFamily: exerciseFonts.semibold },
  titulo: { fontSize: 18, fontFamily: exerciseFonts.heading, color: exerciseColors.heading, marginVertical: 16 },
  flatList: { flex: 1 },
  lista: { paddingBottom: 16 },
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mensagem: { fontSize: 14, fontFamily: exerciseFonts.regular, textAlign: 'center', color: exerciseColors.text, marginBottom: 16 },
  navegacao: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  contador: { fontSize: 13, fontFamily: exerciseFonts.regular, color: exerciseColors.heading },
  botaoSec: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: radius.button, borderWidth: 1, borderColor: exerciseColors.primary },
  textoSec: { color: exerciseColors.primary, fontFamily: exerciseFonts.semibold },
  desabilitado: { opacity: 0.4 },
  botaoPrincipal: { backgroundColor: exerciseColors.primary, borderRadius: radius.button, paddingVertical: 14, paddingHorizontal: 24, alignItems: 'center' },
  textoBotao: { color: exerciseColors.white, fontFamily: exerciseFonts.semibold, fontSize: 14 },
});