const

if (!isNaN(valorValue)) {
    if (tipo === '<i class="fa-solid fa-caret-up fa-2x"></i>') {
        valorArmazenadoEntrada.push(valorValue);

        for (let i = 0; i < valorArmazenadoEntrada.length; i++) {
            const valor = valorArmazenadoEntrada[i];
            entrada += valor
            console.log(entrada)
        }