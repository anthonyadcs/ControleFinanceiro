/* ELEMENTOS */
const formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
})

/* CONSTANTES PARA MAIN */
let entrada = 0;
let saida = 0;
let total = 0;
let selected;
const entradaMain = document.querySelector('#entrada')
const saidaMain = document.querySelector('#saida')
const totalMain = document.querySelector('#total')
const entradaMainP = document.querySelector('.valor-entrada')
const saidaMainP = document.querySelector('.valor-saida')
const totalMainP = document.querySelector('.valor-total')

/* CONSTANTES PARA TABLE */
let ID = 0;
let valorEntrada = [];
let valorSaida = [];
let valorArmazenadoEntrada = [];
let valorArmazenadoSaida = [];
const formTransacoes = document.querySelector('.form-transacoes');
const descricaoInput = document.querySelector('#descricao-input');
const valorInput = document.querySelector('#valor-input');
const tipoSelect = document.querySelector('#tipo-select');
const tabela = document.querySelector('.tabela-resultados')
const tBody = document.querySelector('.tbody');
const lixeira = document.querySelector('.fa-trash-can');


/* EVENTOS */
/* EVENTOS */
formTransacoes.addEventListener("submit", function (e) {
    e.preventDefault();
    const funcDescricao = capturaDescricao();
    const funcValor = capturaValor();
    const funcTipo = capturaTipo();
    //FUNCOES DO MAIN
    if (funcTipo !== undefined && funcValor !== NaN) {
        contabilizaTransacao(funcTipo);
    }

    //FUNCOES DA TABLE
    if (funcDescricao !== '') {
        if (funcValor !== '' && funcValor !== NaN) {
            if (funcTipo !== undefined) {
                novaTransacao(funcDescricao, funcTipo, funcValor);
            };
        };
    };
});

//ADICIONA UM ESCUTADOR DE EVENTOS NA TABELA
tabela.addEventListener('click', function (e) {
    const elementoClicado = e.target;

    if (elementoClicado.classList.contains('fa-trash-can')) {
        const TR = elementoClicado.closest('tr')

        if (TR) {
            retiraContabilizacao(elementoClicado)
        }
    }
})


//EVENTO DE CLICK NO BOTÃO DE DELETAR

/* FUNÇÕES */
/* FUNÇÕES */

//---------------------------------------- FUNÇÕES PARA O MAIN ---------------------------------------------------------

//
function contabilizaTransacao(tipo) {
    //ARMAZENA O VALOR DO INPUT PARA CASO DE EXCLUSÃO DO MESMO
    valorValue = parseFloat(valorInput.value)

    //ADICIONA VALORES AS CAIXAS DE ENTRADA, SAÍDA E TOTAL
    if (!isNaN(valorValue)) {

        if (selected === 'entrada') {
            valorArmazenadoEntrada.push(valorValue);
            valorEntrada.push(valorValue);

            for (let i = 0; i < valorEntrada.length; i++) {
                const valor = valorEntrada[i]

                entrada += valor;

                const entradaFormatada = formatter.format(entrada)
                entradaMainP.innerHTML = entradaFormatada

                valorEntrada.length = 0
                valorInput.value = '';
            }
        } else if (selected === 'saida') {
            valorArmazenadoSaida.push(valorValue);
            valorSaida.push(valorValue);

            for (let i = 0; i < valorSaida.length; i++) {
                const valor = valorSaida[i]

                saida += valor

                const saidaFormatada = formatter.format(saida)
                saidaMainP.innerHTML = saidaFormatada
                total -= saida

                valorSaida.length = 0;
                valorInput.value = '';
            }
        } else {
            alert('Descreva o valor da sua transação corretamente.')
        }
        total = entrada - saida;
        const totalFormatado = formatter.format(total)
        totalMainP.innerHTML = totalFormatado
    }
}

//FUNÇÕES PARA A TABLE

//REMOVE OS VALORES DAS CAIXAS DE ENTRADA, SAIDA E TOTAL QUANDO REMOVIDOS
function retiraContabilizacao(elementoClicado) {
    const trClosest = elementoClicado.closest('tr');
    const valorTD = trClosest.children[1].innerHTML;
    const valorTDSplitado = valorTD.split(';')[1];
    const valorTDFinal = parseFloat(valorTDSplitado.replace(',', '.'));

    const tipoTD = trClosest.children[2].innerHTML

    if (tipoTD === '<i class="fa-solid fa-caret-up fa-2x"></i>') {
        const indexRetirar = valorArmazenadoEntrada.indexOf(valorTDFinal)

        if (indexRetirar !== -1) {
            const valorRetirar = valorArmazenadoEntrada.splice(indexRetirar, 1)
            entrada -= valorRetirar;
            const entradaFormatada = formatter.format(entrada)
            entradaMainP.innerHTML = entradaFormatada

            trClosest.remove()
        } else {
            alert('Valor já retirado')
        }

    } else if (tipoTD === '<i class="fa-solid fa-caret-down fa-2x"></i>') {
        const indexRetirar = valorArmazenadoSaida.indexOf(valorTDFinal)

        if (indexRetirar !== -1) {
            const valorRetirar = valorArmazenadoSaida.splice(indexRetirar, 1)
            saida -= valorRetirar;
            const saidaFormatada = formatter.format(saida)
            saidaMainP.innerHTML = saidaFormatada

            trClosest.remove()
        }
    }

    total = entrada - saida;
    const totalFormatado = formatter.format(total)
    totalMainP.innerHTML = totalFormatado
}

//CAPTURA A DESCRIÇÃO DA TRANSAÇÃO DO INPUT DE DESCRIÇÃO
function capturaDescricao() {
    if (descricaoInput.value !== '') {
        const descricaoValue = descricaoInput.value;
        descricaoInput.value = '';
        return descricaoValue;
    } else {
        alert('Descreva sua transação.');
        descricaoInput.value = '';
        descricaoInput.focus();
    }
}

//CAPTURA O VALOR DA TRANSAÇÃO DO INPUT DE VALOR
function capturaValor() {
    if (valorInput.value !== '') {
        let valorValue = parseFloat(valorInput.value);

        if (!isNaN(valorValue)) {
            return valorValue;
        } else {
            valorInput.value = '';
        }
    }
    else {
        alert('Descreva o valor da sua transação corretamente.')
        descricaoInput.value = '';
        valorInput.value = ''
        valorInput.focus();
    }
}


//CAPTURA O TIPO DA TRANSAÇÃO (ENTRADA OU SAÍDA) DO SELECT TIPO
function capturaTipo() {
    if (tipoSelect.value !== 'valor-0') {
        selected = tipoSelect.value;
        tipoSelect.value = 'valor-0';

        if (selected == 'entrada') {
            return icon = '<i class="fa-solid fa-caret-up fa-2x"></i>'
        } else {
            return icon = '<i class="fa-solid fa-caret-down fa-2x"></i>'
        }
    }
    else {
        alert('Selecione um tipo de transação válida.')
        tipoSelect.focus()
        descricaoInput.value = ''
        valorInput.value = ''
    }
}

//ADICIONA OS VALORES CAPTURADOS DENTRO DE UMA NOVA TR DENTRO DA TABLE COM SUAS CLASSES PERSONALIZADAS E DEVIDAMENTE DIVIDIDOS
function novaTransacao(funcDescricao, funcTipo, funcValor) {

    const novaTransacao = {
        descricao: funcDescricao,
        tipo: funcTipo,
        valor: funcValor
    }

    if (novaTransacao.descricao !== undefined && novaTransacao.tipo !== undefined && novaTransacao.valor !== undefined && novaTransacao.valor !== NaN) {
        const formatter = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        })
        const formatado = formatter.format(novaTransacao.valor)

        const novaTR = tBody.insertRow();
        novaTR.classList.add(`TR`)
        novaTR.classList.add(`ID-${ID}`)

        const tdDescricao = novaTR.insertCell(0);
        tdDescricao.classList.add("transacao-descricao");
        tdDescricao.classList.add(`ID-${ID}`)

        const tdValor = novaTR.insertCell(1);
        tdValor.classList.add("transacao-valor");
        tdValor.classList.add(`ID-${ID}`)

        const tdTipo = novaTR.insertCell(2);
        tdTipo.classList.add("transacao-tipo");
        tdTipo.classList.add("basic");
        tdTipo.classList.add(`ID-${ID}`)

        const tdLixeira = novaTR.insertCell(3);
        tdLixeira.classList.add("transacao-lixeira");
        tdLixeira.classList.add("basic");
        tdLixeira.classList.add(`ID-${ID}`);


        tdDescricao.innerHTML = novaTransacao.descricao;
        tdValor.innerHTML = formatado;
        tdTipo.innerHTML = novaTransacao.tipo;
        tdLixeira.innerHTML = `<i class="fa-solid fa-trash-can fa-2x"></i>`

        tBody.appendChild(novaTR);
        ID++
    }
};