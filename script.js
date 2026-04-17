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
let resetTimeout = null;
const resetDelay = 10000;

function limparStatusPadrao() {
    usuarioStatus.innerHTML = '<span class="text-zinc-600 text-xs tracking-widest">AGUARDANDO CPF...</span>';
}

function agendarReset() {
    if (resetTimeout) {
        clearTimeout(resetTimeout);
    }
    resetTimeout = setTimeout(() => {
        cpf = '';
        atualizarDisplay();
        limparStatusPadrao();
        resetTimeout = null;
    }, resetDelay);
}

function mostrarMensagemStatus(conteudoHtml) {
    usuarioStatus.innerHTML = conteudoHtml;
    agendarReset();
}

function criarCardStatus(bgClass, iconSvg, textClass, titulo, subtitulo = '') {
    return `
        <div class="status-enter flex flex-col items-center text-center">
            <div class="w-12 h-12 ${bgClass} rounded-full flex items-center justify-center mb-2 shadow-lg">
                ${iconSvg}
            </div>
            <span class="${textClass} uppercase tracking-widest">${titulo}</span>
            ${subtitulo ? `<p class="mt-2 text-sm text-zinc-300">${subtitulo}</p>` : ''}
        </div>`;
}

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

        if (dados.status === 'LIBERADO') {
            mostrarMensagemStatus(criarCardStatus(
                'bg-green-500',
                '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>',
                'text-green-400',
                `Bem-vindo, ${dados.nome}!`
            ));
        } else if (dados.status === 'BLOQUEADO') {
            mostrarMensagemStatus(criarCardStatus(
                'bg-red-600',
                '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>',
                'text-red-500',
                'Acesso negado.',
                'Procure a secretaria.'
            ));
        } else {
            mostrarMensagemStatus(criarCardStatus(
                'bg-rose-600',
                '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"></path></svg>',
                'text-rose-200',
                'Aluno não encontrado',
                'CPF não cadastrado no sistema administrativo. Procure a secretaria.'
            ));
        }

    } catch (erro) {
        console.error('Erro na busca: ', erro);
        mostrarMensagemStatus(criarCardStatus(
            'bg-red-700',
            '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"></path></svg>',
            'text-rose-200',
            'Erro de conexão',
            'Tente novamente em alguns segundos ou procure a secretaria.'
        ));
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
    limparStatusPadrao();
    if (resetTimeout) {
        clearTimeout(resetTimeout);
        resetTimeout = null;
    }
}

// Função para apagar o último dígito do CPF
function apagarUltimoDigito() {
    cpf = cpf.slice(0, -1);
    atualizarDisplay();
}

// Função para acessar
function acessar() {
    if (cpf.length === 11) {
        confimarUsuario();
    } else {
        mostrarMensagemStatus(criarCardStatus(
            'bg-rose-600',
            '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"></path></svg>',
            'text-rose-200',
            'CPF inválido',
            'Digite 11 dígitos.'
        ));
    }
}
