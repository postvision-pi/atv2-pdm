import { View, Text, Image, Pressable, StyleSheet, ImageSourcePropType } from 'react-native';
import { exerciseColors, exerciseFonts } from '../constants/exerciseTheme';
import { colors, radius } from '../constants/appTheme';

type Props = {
  numero: number;
  titulo: string;
  texto: string;
  imagem?: ImageSourcePropType;
  ativo: boolean;
  onPress: () => void;
};

export default function StepItem({ numero, titulo, texto, imagem, ativo, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.container, ativo && styles.ativo]}>
      {imagem && <Image source={imagem} style={styles.imagem} resizeMode="contain" />}
      <View style={styles.conteudo}>
        <View style={styles.cabecalho}>
          <View style={styles.bolinha}>
            <Text style={styles.numero}>{numero}</Text>
          </View>
          <Text style={styles.titulo}>{titulo}</Text>
        </View>
        <Text style={styles.texto}>{texto}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: radius.button,
    marginBottom: 16,
    opacity: 0.6,
  },
  ativo: {
    opacity: 1,
    backgroundColor: colors.lavender + '66',
  },
  imagem: { width: 130, height: 150, marginRight: 12 },
  conteudo: { flex: 1 },
  cabecalho: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  bolinha: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: exerciseColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  numero: { color: exerciseColors.white, fontSize: 11, fontFamily: exerciseFonts.bold },
  titulo: { fontSize: 14, fontFamily: exerciseFonts.bold, color: exerciseColors.heading },
  texto: { fontSize: 14, lineHeight: 20, fontFamily: exerciseFonts.regular, color: exerciseColors.text },
});