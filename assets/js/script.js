// Carrega o log de números do localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const savedNumbers = localStorage.getItem('numberLog');
    if (savedNumbers) {
        const numberLog = document.getElementById('numberLog');
        const numbers = savedNumbers.split(',');
        numbers.forEach(number => {
            const newLogItem = document.createElement('li');
            newLogItem.textContent = number.trim();
            numberLog.appendChild(newLogItem);
        });
    }
});

function updateNumber() {
    const numberInput = document.getElementById('numberInput').value;
    const bingoBall = document.getElementById('bingoBall');
    const numberLog = document.getElementById('numberLog');

    if (numberInput.trim() !== "") {
        // Atualiza o número na bola de bingo
        bingoBall.textContent = numberInput;

        // Adiciona o número ao log
        const newLogItem = document.createElement('li');
        newLogItem.textContent = numberInput;
        numberLog.appendChild(newLogItem);

        // Salva o estado atualizado do log no localStorage
        saveNumberLog();

        // Limpa o campo de entrada
        document.getElementById('numberInput').value = "";
    }
}

function saveNumberLog() {
    const numberLog = document.getElementById('numberLog');
    const logItems = numberLog.querySelectorAll('li');
    const numbers = Array.from(logItems).map(item => item.textContent);
    localStorage.setItem('numberLog', numbers.join(', '));
}

function downloadNumbers() {
    const numberLog = document.getElementById('numberLog');
    const logItems = numberLog.querySelectorAll('li');
    let logText = '';

    logItems.forEach((item, index) => {
        logText += item.textContent;
        if (index < logItems.length - 1) {
            logText += ', ';
        }
    });

    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'numeros_bingo.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function saveNumbersToFile(numbers) {
    const blob = new Blob([numbers.join(', ')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'numeros_bingo.txt';
    a.click();
    URL.revokeObjectURL(url);
}


function newBingo() {
    const confirmNewBingo = confirm("Tem certeza de que deseja começar um novo bingo? Todos os números serão apagados.");

    if (confirmNewBingo) {
        const numberLog = document.getElementById('numberLog');
        const logItems = numberLog.querySelectorAll('li');
        let numbers = [];
        logItems.forEach(item => {
            numbers.push(item.textContent.trim());
        });

        // Salvar os números em um arquivo de texto
        saveNumbersToFile(numbers);

        // Limpar o log de números
        numberLog.innerHTML = '';

        // Remover os números do localStorage
        localStorage.removeItem('numberLog');

        // Reseta a bola de bingo
        document.getElementById('bingoBall').textContent = 'B';
    }
}

// Adicionando evento de tecla ao campo de entrada
document.getElementById("numberInput").addEventListener("keypress", function (event) {
    // Verificando se a tecla pressionada é Enter (código 13)
    if (event.key === "Enter") {
        // Acionando a função updateNumber()
        updateNumber();
    }
});