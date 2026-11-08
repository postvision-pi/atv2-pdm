# PostVision Mobile

Aplicativo mobile desenvolvido com **React Native e Expo** como parte do Projeto Integrador (PI) do curso de Desenvolvimento de Software Multiplataforma da Fatec Registro.

## Sobre o projeto

O **PostVision** é uma aplicação voltada à análise e correção da postura durante a prática de exercícios físicos. Utilizando inteligência artificial, a proposta é auxiliar os usuários na execução correta dos movimentos, contribuindo para a prevenção de lesões e para a prática de atividades físicas mais seguras.

## Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- Expo Router
- Axios
- React Hooks (`useState` e `useEffect`)
- StyleSheet e Flexbox

## Funcionalidades

O aplicativo reúne funcionalidades para auxiliar o usuário durante sua experiência:

- **Login e cadastro:** acesso à aplicação e gerenciamento de autenticação.
- **Tela inicial:** apresentação de informações importantes, estatísticas, sugestões de exercícios e sequência de atividades.
- **Navegação principal:** acesso às diferentes áreas do aplicativo.
- **Escolha de exercícios:** visualização e seleção dos exercícios disponíveis.
- **Passo a passo:** orientações para a execução dos movimentos.

## Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Expo Go ou emulador Android configurado.

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/postvision-pi/atv2-pdm.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd atv2-pdm
   ```

3. Instale as dependências:

   ```bash
   npm ci
   ```

4. Inicie o servidor Expo:

   ```bash
   npx expo start
   ```

5. Execute o aplicativo utilizando o Expo Go ou um emulador Android.

## Issue #3 — escolha de exercícios

Na tela inicial, toque em **Iniciar**, no card **Faça sua análise**, para abrir
`/escolha-exercicio`. A tela segue o protótipo de 393 × 852: fundo `#F1F1FB`,
cards brancos, seleção circular roxa, fontes Raleway e Montserrat incluídas e botão
**Iniciar Passo a Passo** fixo no rodapé. A lista pode rolar em telas menores e
os cards crescem conforme o texto recebido e o tamanho de fonte do aparelho.

### Comunicação com a API

O Axios já estava instalado. A implementação usa a instância de
`src/services/api.ts` para fazer **GET `/exercice`**, exatamente como a API
fornecida. Essa rota é pública e não precisa de token. Nenhum arquivo da API
foi alterado e o aplicativo não cria nem modifica exercícios no banco.

O endereço padrão continua sendo `https://postvision-api.onrender.com`.
Para testar em outro servidor, copie `.env.example` para `.env.local`, ajuste
`EXPO_PUBLIC_API_URL` e reinicie o Expo:

```dotenv
EXPO_PUBLIC_API_URL=http://IP_DO_COMPUTADOR:4000
```

No celular, use o IP da máquina que executa a API, acessível pela mesma rede.
O endereço `localhost` no celular aponta para o próprio celular. O Axios aguarda
até 60 segundos pela listagem, para acomodar a inicialização do serviço hospedado.
Se testar pelo navegador, a origem do Expo Web precisa estar permitida no
`FRONTEND_URL` já existente na configuração da API; essa restrição de CORS
não se aplica ao aplicativo nativo.

O serviço espera o array que a API atual retorna:

```json
[
  {
    "_id": "ID_DO_EXERCICIO",
    "name": "Nome cadastrado",
    "description": "Descrição cadastrada",
    "videoUrl": "https://exemplo.com/demonstracao.mp4",
    "muscleGroup": "Grupo muscular"
  }
]
```

Os nomes e as descrições são os do banco, sem lista fictícia ou substituição
pelos textos da imagem. Portanto, os dois cards do protótipo só aparecerão se
esses exercícios estiverem cadastrados na API.

### Estados e navegação

- `useExercises` executa a requisição com `useEffect`, armazena os dados com
  `useState` e cancela a chamada ao sair da tela.
- `FlatList` apresenta os exercícios, usando `_id` como chave.
- Há indicador de carregamento, tratamento de erros, estado vazio e botão
  **Tentar novamente**. A resposta da API também é validada antes da exibição.
- A seleção é única. Se tocar em iniciar sem escolher um exercício, o app
  solicita a seleção e permanece na tela.
- O botão abre `/passo-a-passo/[id]` com o `_id` selecionado, via Expo Router.

O projeto enviado ainda não tinha a tela de passo a passo. Foi criada uma
**tela inicial de destino** que busca o exercício pelo ID na listagem existente,
exibe nome, descrição e grupo muscular e permite abrir o vídeo cadastrado.
Como a API não possui `GET /exercice/:id`, a tela reaproveita `GET /exercice`.
Ela não inventa instruções por movimento: uma sequência detalhada de passos
pode ser implementada na atividade responsável por essa tela. O link do vídeo
só é habilitado para URLs HTTP/HTTPS válidas.

### Conferência local

```bash
npm run lint
npx tsc --noEmit
npx expo export --platform web
```

Para conferir o fluxo: Iniciar na home → escolher um card → Iniciar Passo a
Passo → conferir o nome do exercício no destino → Voltar. Interromper a API
permite conferir o erro e a nova tentativa; um array vazio deve mostrar
**Nenhum exercício disponível no momento.**

As fontes Raleway e Montserrat são distribuídas sob a licença SIL Open Font
License; as licenças estão em `assets/fonts/OFL.txt` e
`assets/fonts/Montserrat-OFL.txt`.

## Estrutura do projeto

A aplicação utiliza o Expo Router para organização das telas e navegação, além de componentes reutilizáveis para facilitar a manutenção e organização do código.

```text
atv2-pdm/
├── src/
│   ├── app/
│   │   ├── index.tsx
│   │   ├── home.tsx
│   │   └── ...
│   └── components/
│       ├── BottomNav.tsx
│       ├── BottomNavItem.tsx
│       └── ...
├── assets/
├── package.json
└── README.md
```

## Projeto acadêmico

Desenvolvido para a disciplina de **Programação para Dispositivos Móveis I (PDM)**, como parte da Atividade Avaliativa II, vinculada ao Projeto Integrador.

**Instituição:** Fatec Registro  
**Curso:** Desenvolvimento de Software Multiplataforma (DSM)
**Alunos:**
*Carlos Henrique dos Santos Silva*,
*Heloísa Vale dos Santos*,
*Raissa de Oliveira Souza*,
*Renan Zanetti Oliveira*
