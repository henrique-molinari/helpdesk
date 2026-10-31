# HelpDesk Lite

Projeto da disciplina de Desenvolvimento Web. O sistema é um gerenciador de chamados (tickets) com front-end em React e uma API local simulada com JSON REST Server.

**Atividade proposta:** criar a página de login da plataforma, seguindo o padrão visual e de código do projeto.

## Estrutura

```text
helpdesk/
├── helpdesk-web/   # Front-end (React + TypeScript + Vite + Tailwind)
└── helpdesk-jrs/   # API local (JSON REST Server, em Dart)
```

## Como executar

### 1. API (`helpdesk-jrs`)

Requer o Dart SDK (o Flutter já inclui). Instalação do servidor:

```bash
dart pub global activate json_rest_server
```

Se o terminal não reconhecer o comando `json_rest_server`, adicione ao PATH a pasta de executáveis do Dart. No Windows:

```powershell
$env:Path += ";C:\Users\<seu-usuario>\AppData\Local\Pub\Cache\bin"
```

Depois, dentro da pasta da API:

```bash
cd helpdesk-jrs
json_rest_server run
```

A API fica em `http://127.0.0.1:5050`. Não use `npm install` nesta pasta: ela não é um projeto Node.

### 2. Front-end (`helpdesk-web`)

Crie o arquivo `helpdesk-web/.env` (ele não vai para o Git) com:

```env
VITE_API_URL=http://localhost:5050
```

Em outro terminal:

```bash
cd helpdesk-web
npm install
npm run dev
```

Acesse `http://localhost:5173`.

### Contas de teste

| Perfil | E-mail | Senha | Checkbox "Entrar como administrador" |
|---|---|---|---|
| Usuário | `usuario@helpdesk.local` | `Usuario@123` | desmarcado |
| Administrador | `admin@helpdesk.local` | `Admin@123` | marcado |

Os usuários ficam em `helpdesk-jrs/database.json`, nas listas `users` e `adm_users`. São dados fictícios, com senha em texto puro, apenas para uso didático local.

## O que foi feito (login)

### Arquivos criados em `helpdesk-web/src`

| Arquivo | Função |
|---|---|
| `pages/LoginPage.tsx` | Tela de login com e-mail, senha e a opção de entrar como administrador. Usa o mesmo visual do projeto (fundo `slate-100`, cabeçalho escuro, card branco, botão azul, mensagem de erro em vermelho). Valida os campos, mostra o estado "Entrando..." e exibe erro quando as credenciais são inválidas. |
| `services/authService.ts` | Comunicação com a API: `POST /auth` para autenticar, `GET /me` para obter os dados do usuário, e funções para ler o token, ler o usuário, verificar se há sessão e fazer logout. O token (`access_token`) e o usuário ficam no `localStorage`. |
| `components/RequireAuth.tsx` | Protege as rotas. Sem token, redireciona para `/login` e, após entrar, devolve o usuário à página que ele tentou abrir. |
| `types/Auth.ts` | Tipos TypeScript `AuthUser` e `LoginInput`. |

### Arquivos alterados

| Arquivo | Alteração |
|---|---|
| `App.tsx` | Nova rota pública `/login`; as demais rotas passaram a ficar dentro do `RequireAuth`. |
| `components/Navbar.tsx` | Passou a exibir o nome do usuário logado e o botão **Sair**, que limpa a sessão e volta para o login. |
| `.gitignore` (raiz) | Ignora `node_modules/` e arquivos `.env`. |

### Como funciona o fluxo

1. O usuário abre qualquer página sem estar logado e é levado a `/login`.
2. O formulário envia as credenciais para `POST /auth`. Para administrador, o campo `admin: true` é enviado junto.
3. A API devolve um `access_token` (JWT). O front consulta `/me` e guarda token e dados do usuário.
4. O `ticketService` já enviava o token no cabeçalho `Authorization: Bearer ...`, então as chamadas seguintes passam a ser autenticadas.
5. **Sair** remove os dados da sessão.

## Erros corrigidos para o projeto funcionar

1. **`npm install` falhando na raiz e em `helpdesk-jrs`** (`package.json` não encontrado). O comando só vale dentro de `helpdesk-web`; a API é feita em Dart e não usa npm.
2. **`json_rest_server` não reconhecido.** O Dart instala seus executáveis em `AppData\Local\Pub\Cache\bin`, que não estava no PATH. A solução é adicionar a pasta ao PATH (ou chamar o executável pelo caminho completo).
3. **Aplicação inteira quebrando com "Missing catch or finally clause"** em `NewTicketPage.tsx`. O `try` do `handleSubmit` estava sem `catch`/`finally`, o que impedia o Vite de compilar qualquer página. Foi completado o bloco, com tratamento de erro e `setSaving(false)` no `finally`.
4. **Formulário de novo chamado sem ação.** O `onSubmit` não estava ligado ao `<form>`, e o evento usava o tipo errado (`FormDataEvent`); foi trocado por `FormEvent<HTMLFormElement>`.
5. **`ticketService.create` incompleto.** A função fazia um `GET` sem enviar dados e retornava vazio. Agora faz `POST /tickets` com título, descrição, prioridade e status "Aberto", e trata respostas com erro.

Após as correções, `npx tsc -b` compila sem erros.

## Testes da API no Insomnia

A pasta `testes-insomnia/` contém a coleção `HelpDesk.insomnia.json`.

1. Deixe a API rodando em `http://127.0.0.1:5050`.
2. No Insomnia: *Import* e escolha `testes-insomnia/HelpDesk.insomnia.json`.
3. As requisições estão em duas pastas: **01 - Autenticação** (login de usuário e admin, senha errada, `/me`) e **02 - Chamados e permissões** (listagem, criação como usuário e como admin, exclusão). Cada requisição descreve o resultado esperado. O token do login é reaproveitado automaticamente nas demais.
4. A aba **Test** do Insomnia traz a suíte "Login e permissões", com 9 testes automáticos (clique em *Run tests*).

A requisição "Criar chamado como admin" grava um chamado no `database.json`; use "Excluir chamado criado (admin)" em seguida para removê-lo.

## Observações sobre permissões

Pelo `config.yaml` da API (`enableAdm: true` e `urlUserPermission: []`), apenas administradores podem criar, editar e excluir chamados; o usuário comum só consulta. Por isso, ao criar um chamado com a conta de usuário, a API responde 403 e o front mostra "Não foi possível criar o chamado". Liberar `/tickets` para o usuário comum também liberaria editar e excluir qualquer chamado, pois o JRS não filtra por dono.

Limitações do JRS (senhas sem hash, sem validação, sem controle de propriedade) estão descritas em `helpdesk-jrs/README.md`. A API é apenas para uso didático local.

## Próximos passos planejados

- Permitir que o administrador crie novos usuários.
- Permitir que o usuário comum crie novos chamados.
- Impedir que o usuário veja todos os chamados, mostrando apenas os que ele abriu.
- Bloquear o acesso por alguns minutos após muitas tentativas de login erradas, para ambos os perfis.

Esses itens exigem regras que o JRS não oferece (permissão por dono do chamado, limite de tentativas), então provavelmente demandarão um backend próprio.
