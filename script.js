// Captura de elementos HTML

// Números
const btn1 = document.getElementById('btn-1');
const btn2 = document.getElementById('btn-2');
const btn3 = document.getElementById('btn-3');
const btn4 = document.getElementById('btn-4');
const btn5 = document.getElementById('btn-5');
const btn6 = document.getElementById('btn-6');
const btn7 = document.getElementById('btn-7');
const btn8 = document.getElementById('btn-8');
const btn9 = document.getElementById('btn-9');
const btn0 = document.getElementById('btn-0');

// Ações
const btnLimpar = document.getElementById('btn-limpar');
const btnApagar = document.getElementById('btn-apagar');
const btnAcessar = document.getElementById('btn-acessar');

// Display
const display = document.getElementById('cpfInput');

// Status
const usuarioStatus = document.getElementById('usuarioStatus');

// Adiciona eventos aos botões numéricos
btn1.addEventListener('click', () => adicionarNumero('1'));
btn2.addEventListener('click', () => adicionarNumero('2'));
btn3.addEventListener('click', () => adicionarNumero('3'));
btn4.addEventListener('click', () => adicionarNumero('4'));
btn5.addEventListener('click', () => adicionarNumero('5'));
btn6.addEventListener('click', () => adicionarNumero('6'));
btn7.addEventListener('click', () => adicionarNumero('7'));
btn8.addEventListener('click', () => adicionarNumero('8'));
btn9.addEventListener('click', () => adicionarNumero('9'));
btn0.addEventListener('click', () => adicionarNumero('0'));

// Adiciona eventos aos botões de ação
btnLimpar.addEventListener('click', limparCPF);
btnApagar.addEventListener('click', apagarUltimoDigito);
btnAcessar.addEventListener('click', acessar);

// Variável para armazenar o CPF digitado
let cpf = '';

// Função que irá buscar usuário ATIVO ou BLOQUEADO no backend
async function confimarUsuario(){
    try {
        const baseUrl = 'https://api-backend-catraca.vercel.app/catraca';
       
        const respostaApi = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cpf: cpf }) // Envia o JSON que o Python espera
        });

        const dados = await respostaApi.json();

        // Ajuste da lógica de exibição conforme o retorno do seu Python
        if (dados.status === 'LIBERADO') {
            usuarioStatus.innerHTML = `
                <div class="status-enter flex flex-col items-center">
                    <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2 shadow-lg">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span class="text-green-400 uppercase tracking-widest">Bem-vindo, ${dados.nome}!</span>
                </div>`;
        } else if (dados.status === 'BLOQUEADO') {
            usuarioStatus.innerHTML = `
                <div class="status-enter flex flex-col items-center">
                    <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                    <span class="text-red-500 uppercase tracking-widest">Acesso negado.</span>
                </div>`;
        } else {
            usuarioStatus.textContent = dados.mensagem || "Aluno não encontrado.";
        }

    } catch (erro) {
        usuarioStatus.textContent = "Erro ao conectar com o servidor.";
        console.error("Erro na busca: ", erro);
    }
}

// Função para atualizar o display
function atualizarDisplay() {
    display.value = cpf;
}

// Função para adicionar um número ao CPF
function adicionarNumero(numero) {
    if (cpf.length < 11) { // Limita o CPF a 11 dígitos
        cpf += numero;
        atualizarDisplay();
    }
}

// Função para limpar o CPF
function limparCPF() {
    cpf = '';
    atualizarDisplay();
}

// Função para apagar o último dígito do CPF
function apagarUltimoDigito() {
    cpf = cpf.slice(0, -1);
    atualizarDisplay();
}

// Função para acessar
function acessar() {
    if (cpf.length === 11) {
        confimarUsuario()
    } else {
        usuarioStatus.textContent = "CPF inválido. Digite 11 dígitos.";
    }
}
