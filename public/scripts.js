let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let container = document.querySelector('.container');
let items = container.querySelectorAll('.list .item');
let indicator = document.querySelector('.indicators');
let dots = indicator.querySelectorAll('ul li')

let active = 0;
let firstPosition = 0;
let lastPosition = items.length -1 ; // a posicão final vai ser "item - 2", então a quantidade de itens dele é -1"

nextButton.onclick = () =>{
    let itemOld = container.querySelector(' .list .item.active')
    itemOld.classList.remove('active')
}

prevButton.onclick = () =>{
    console.log("Botão prev")
}