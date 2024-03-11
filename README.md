# To Do check

Seja muito bem-vindo ao To Do Check!
O objetivo desse documento é compartilhar os principais processos de desenvolvimento do projeto, além das tecnologias utilizadas, motivações e passos para a execução do código.

## Stack utilizada

**Mobile:** JestJs, NativeBase, React Native, Android Studio
**Backend:** PostgreSQL, Vercel, ExpressJS

## Funcionalidades

- Marcar tarefas como concluídas
- Definir tarefa como importante (ao clicar e segurar tarefa)
- Definir categoria de tarefa como favorita
- Criar, editar, excluir e mostrar categorias
- Criar, editar, excluir e mostrar tarefas
- Definir um ícone e um título para a categoria
- Definir um título e uma descrição para a tarefa
- Informações de quantas categorias foram criadas
- Informações de quantas tarefas foram criadas
- Informações de quantas tarefas foram concluídas
- Organização de tarefas por categorias

## Instalação

No repositório do github, clone o projeto da branch 'develop':
https://github.com/Allyson1602/to-do-check

Abra o terminal dentro do projeto 'to-do-check' e execute o comando:

```bash
  npm install
```

Para executar o app em um dispositivo android já configurado, execute o comando:
Obs: Foi estado apenas no Android, na web existem quebras de design (não fui a fundo na web por ser um app para mobile)

```bash
  npm run android
```

## Melhorias

- Não foi possível implementar os ícones do Line Awesome como recomendado então utilizei os ícones do Phosphor.
- Tentei utilizar um efeito de blur no fundo dos modais que utilizei mas mantive um tom mais escuro.
- Gostaria de ter utilizado o recurso Drag&Drop para arrastar e organizar melhor os 'afazeres' criados pelo usuário, existe o design no app mas a funcionalidade não está implementada.
- Não foi possível testar os testes automatizados por conta da configuração.
- Não foi possível criar o APK do app.

## Demonstração

- Edição de tarefas e visualização das estatísticas
  ![alt text](https://media.giphy.com/media/tfXRzTCuUq6Ds66NyE/giphy.gif)

- Criar categoria e tarefa
  ![alt text](https://media.giphy.com/media/TaGC7KU6xKosKo1dBI/giphy.gif)

- Apagar e favoritar categoria
  ![alt text](https://media.giphy.com/media/kJS2PONxNHhyN23C8D/giphy.gif)

- Apagar tarefa e categoria
  ![alt text](https://media.giphy.com/media/q6bw281vKTWY4x2Hqa/giphy.gif)

## Referência

- [Padrão de commit](https://dev.to/ishanmakadia/git-commit-message-convention-that-you-can-follow-1709)
- [Definição das telas (UI/UX)](https://www.figma.com/file/5yNjQj8FWLrgRSfT5OmrbS/To-Do-check?type=design&node-id=1%3A2&mode=design&t=2XUDMP9xTc8rgekA-1)
- [Phosphor icons](https://phosphoricons.com/)
