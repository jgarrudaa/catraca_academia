# 🛡️ Sparta Gym | Sistema de Catraca

Sistema inteligente de controle de acesso para academias, desenvolvido para validar a entrada de alunos através do CPF em uma catraca digital integrada ao backend.

O projeto simula uma catraca real, permitindo que o aluno digite seu CPF em um painel numérico e receba instantaneamente a resposta de acesso:

- ✅ **LIBERADO** → Entrada autorizada
- ❌ **BLOQUEADO** → Entrada negada
- ⚠️ **Aluno não encontrado** → CPF inexistente no sistema

---

## 🚀 Funcionalidades

- 🔢 Teclado numérico virtual para digitação do CPF
- 🧹 Botão limpar CPF digitado
- ⬅️ Botão apagar último número
- 🔐 Validação automática com API externa
- 👤 Exibição do nome do aluno ao liberar entrada
- 🚫 Bloqueio visual para usuários inadimplentes ou inativos
- 🌐 Integração com backend em tempo real
- 📱 Interface moderna e responsiva
- ⚡ Feedback instantâneo de acesso

---

## 🧠 Tecnologias Utilizadas

### Frontend

- **HTML5** → Estrutura da aplicação
- **CSS3** → Estilização visual
- **Tailwind CSS** → Layout moderno e responsivo
- **JavaScript Vanilla** → Lógica da catraca
- **Font Awesome** → Ícones
- **Google Fonts** → Tipografia premium

### Backend

- **Python Flask** → API REST
- **Firebase Firestore** → Banco de dados
- **Vercel** → Deploy da API

---

## 💻 Estrutura do Sistema

### Interface Principal

A aplicação possui um painel semelhante a uma catraca digital real.

### Componentes

#### 🔢 Display CPF

Campo onde o CPF digitado aparece em tempo real.

#### ⌨️ Teclado Numérico

Botões:

- 1 2 3
- 4 5 6
- 7 8 9
- 0

#### ⚙️ Ações

- **Limpar** → apaga tudo
- **Apagar** → remove o último dígito
- **Acessar** → envia o CPF para validação

#### 📢 Área de Status

Exibe mensagens como:

- Bem-vindo, João!
- Acesso negado.
- Aluno não encontrado.
- CPF inválido.
- Erro ao conectar com servidor.

---

## 🔄 Fluxo de Funcionamento

1. Usuário digita CPF
2. Clica em **ACESSAR**
3. Sistema valida se o CPF possui 11 dígitos
4. Envia CPF para API
5. Backend consulta o banco de dados
6. Retorna um dos status:
   - **LIBERADO**
   - **BLOQUEADO**
   - **NÃO ENCONTRADO**
7. Interface mostra o resultado visual

---

## 🌐 Integração com API

### Endpoint Principal

- `POST /catraca`
- URL Base: `https://api-backend-catraca.vercel.app/catraca`

### Exemplo de body enviado

```json
{
  "cpf": "12345678900"
}
```

### Possíveis respostas

**Liberado**

```json
{
  "status": "LIBERADO",
  "nome": "João Silva"
}
```

**Bloqueado**

```json
{
  "status": "BLOQUEADO"
}
```

**Não encontrado**

```json
{
  "mensagem": "Aluno não encontrado"
}
```

---

## ⚙️ Como Rodar Localmente

1. Clone o projeto:

```bash
git clone https://github.com/jgarrudaa/catraca_academia.git
```

2. Entre na pasta:

```bash
cd sparta-catraca
```

3. Abra `index.html` no navegador ou use Live Server no VS Code.

---

## 🎯 Como Usar

1. Digite o CPF completo (11 números)
2. Clique em **ACESSAR**
3. Aguarde a resposta

- Se aprovado: `Bem-vindo, Nome do Aluno!`
- Se bloqueado: `Acesso negado.`

---

## 🧠 Lógica JavaScript

O controle do CPF é feito com a variável:

```js
let cpf = '';
```

Funções principais:

- `adicionarNumero(numero)` → adiciona dígitos ao CPF
- `limparCPF()` → zera o display
- `apagarUltimoDigito()` → remove o último número
- `acessar()` → valida CPF e consulta API
- `confirmarUsuario()` → faz requisição POST para backend

---

## 🎨 Design Visual

- Tema Sparta Gym
- Fundo escuro premium
- Destaques em dourado
- Estilo de academia de luxo
- Feedback verde/vermelho
- Interface inspirada em catracas modernas

### Paleta de cores

- 🟡 Ouro → Destaques
- ⚫ Preto → Fundo
- 🟢 Verde → Liberado
- 🔴 Vermelho → Bloqueado

---

## 📱 Responsividade

Sistema adaptado para:

- Desktop
- Tablet
- Celular
- Totens touchscreen

---

## 🔐 Segurança

- CPF validado no backend
- Nenhum dado sensível salvo no frontend
- Comunicação via HTTPS
- Respostas controladas pela API

---

## ⚠️ Possíveis Problemas

- **CPF inválido** → digite exatamente 11 números
- **Erro ao conectar** → verifique a internet ou se a API está offline
- **Aluno não encontrado** → CPF não cadastrado no sistema administrativo

---

## 🔗 Integração Completa

Este projeto funciona junto com o Sparta Gym Admin Panel, onde gestores podem:

- cadastrar alunos
- editar status
- bloquear acesso
- remover usuários

---

## 👨‍💻 Desenvolvedores

- 👤 **João Guilherme** https://github.com/jgarrudaa
- 👤 **Daniel Pupo** https://github.com/DanielPupo

---

## 🌍 Deploy

- Frontend Catraca: `https://catraca-academia-six.vercel.app/`
- Frontend Admin Panel: `https://administrativo-academia.vercel.app/`
- Backend: `https://api-backend-catraca.vercel.app`

---

## 📄 Licença

Projeto acadêmico e educacional.

---

## 💡 Sobre o Projeto

O Sparta Gym Catraca foi criado para simular um sistema real de controle de acesso em academias modernas, unindo:

- automação
- segurança
- interface intuitiva
- integração com banco de dados
- experiência premium
