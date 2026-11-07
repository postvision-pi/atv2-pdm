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
   git clone URL_DO_REPOSITORIO
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd atv2-pdm
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor Expo:

   ```bash
   npx expo start
   ```

5. Execute o aplicativo utilizando o Expo Go ou um emulador Android.

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