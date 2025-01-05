let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let list = document.querySelector('.list'); // A lista de itens
let items = document.querySelectorAll('.list .item'); // Todos os itens da lista
let currentIndex = 0; // Índice do item ativo

prevButton.onclick = () => moveItemsOnclick('prev');
nextButton.onclick = () => moveItemsOnclick('next');

function moveItemsOnclick(type) {
    if (type === 'next') {
        // Remover a classe "active" do item atual
        items[currentIndex].classList.remove('active');
        // Aumentar o índice, garantindo que ele esteja no intervalo correto
        currentIndex = (currentIndex + 1) % items.length;
        // Adicionar a classe "active" no próximo item
        items[currentIndex].classList.add('active');
    } else if (type === 'prev') {
        // Remover a classe "active" do item atual
        items[currentIndex].classList.remove('active');
        // Diminuir o índice, garantindo que ele esteja no intervalo correto
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        // Adicionar a classe "active" no item anterior
        items[currentIndex].classList.add('active');
    }
}
