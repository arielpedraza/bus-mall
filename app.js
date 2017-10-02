'use strict';

var imgEl = document.getElementsByClassName('displayed-picture');
Product.allProducts = [];

function Product(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.displayed = 0;
  this.clicked = 0;
  Product.allProducts.push(this);
}

function generateNewImages() {
  event.preventDefault();
  var randomIndex;
  for (var i = 0; i < imgEl.length; i++){
    randomIndex = Math.floor(Math.random() * Product.allProducts.length);
    imgEl[i].src = Product.allProducts[randomIndex].filePath;
  }
}

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

for (var i = 0; i < imgEl.length; i++){
  imgEl[i].addEventListener('click', generateNewImages);
}
