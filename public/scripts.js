let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let list = document.querySelector('.list'); // A lista de itens
let items = document.querySelectorAll('.list .item'); // Todos os itens da lista
let indicators = document.querySelectorAll('.indicator-list li'); // Todas as `li` dos indicadores
let numberDisplay = document.querySelector('.number'); // Display do número
let currentIndex = 0;

// Lista de cores/gradientes para cada carro
const backgrounds = [
    'radial-gradient(circle, rgba(255, 71, 71, 0.699) 0%, #1A1A1A 70%)', 
    'radial-gradient(circle, rgba(0, 102, 255, 0.8) 0%, #1A1A1A 70%)', 
    'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, #1A1A1A 70%)'  
];

// Função para exibir o item correspondente ao índice
function showItem(index) {
    items.forEach((item, i) => {
        item.style.transform = i === index ? 'translateX(0)' : 'translateX(100vw)';
        item.style.opacity = i === index ? '1' : '0';
        item.style.pointerEvents = i === index ? 'auto' : 'none';
        indicators[i].classList.toggle('active', i === index);
    });

    // Atualizar o número exibido
    numberDisplay.textContent = `0${index + 1}`; // Exemplo: 01, 02...

    // Alterar o fundo do body
    document.body.style.backgroundImage = backgrounds[index];
}

// Botão "Anterior"
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
});

// Botão "Próximo"
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
});

// Inicializa o primeiro item
showItem(currentIndex);
