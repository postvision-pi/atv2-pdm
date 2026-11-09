import { ImageSourcePropType } from 'react-native';

export type Passo = {
  titulo: string;
  texto: string;
  imagem?: ImageSourcePropType;
};

export const passosPorExercicio: Record<string, Passo[]> = {
  Agachamento: [
    {
      titulo: 'Posição inicial:',
      texto:
        'Fique em pé com os pés afastados na largura dos ombros. Mantenha a coluna reta, o peito aberto e os braços estendidos à frente para equilíbrio.',
      imagem: require('../../assets/images/first_step.png'),
    },
    {
      titulo: 'Agache com controle:',
      texto:
        'Dobre os joelhos e os quadris ao mesmo tempo, como se fosse sentar. Evite tirar os calcanhares do chão e mantenha os joelhos apontando na direção dos pés.',
      imagem: require('../../assets/images/second_step.png'),
    },
    {
      titulo: 'Volte à posição inicial:',
      texto:
        'Empurre o chão com os pés e estique as pernas até ficar em pé novamente, sem perder o alinhamento da postura.',
    },
  ],
};

function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

export function buscarPassos(nomeExercicio: string): Passo[] {
  const chave = Object.keys(passosPorExercicio).find(
    (k) => normalizar(k) === normalizar(nomeExercicio),
  );
  return chave ? passosPorExercicio[chave] : [];
}