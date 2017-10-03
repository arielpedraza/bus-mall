'use strict';

var imgEl = document.getElementsByClassName('displayed-picture');
Product.allProducts = [];
Product.history = [];
Product.totalShown = 0;

function Product(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.displayed = 0;
  this.clicked = 0;
  Product.allProducts.push(this);
}

function generateNewImages() {
  if (event){
    event.preventDefault();
    var selected = event.target.alt;
    // console.log(selected);
    for (var i in Product.allProducts){
      if (Product.allProducts[i].name === selected){
        Product.allProducts[i].clicked += 1;
        // console.log(Product.allProducts[i].name + ' clicked ' + Product.allProducts[i].clicked + ' times.');
        break;
      }
    }
  }
  if (Product.totalShown >= 25){
    for (i = 0; i < imgEl.length; i++){
      imgEl[i].removeEventListener('click', generateNewImages);
    }
    var parentEl = document.getElementById('image-section');
    parentEl.classList.remove('image-class');
    while(parentEl.firstChild){
      parentEl.removeChild(parentEl.firstChild);
    }
    var newCanvasEl = document.createElement('canvas');
    newCanvasEl.setAttribute('id', 'myChart');
    newCanvasEl.setAttribute('width', '100%');
    // newCanvasEl.setAttribute('height', '100%');
    parentEl.appendChild(newCanvasEl);
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
      // The data for our dataset
      data: {
        labels: generateXAxis(),
        datasets: [{
          label: '# of Votes',
          data: generateYAxis(),
          backgroundColor: generateBarColors(),
          borderColor: generateBarColors(),
          borderWidth: 1
        }]
      },
      // Configuration options go here
      options: {}
    });
  }else{
    var randomIndex;
    for (i = 0; i < imgEl.length; i++){
      randomIndex = Math.floor(Math.random() * Product.allProducts.length);
      if (!Product.history.includes(randomIndex)){
        imgEl[i].src = Product.allProducts[randomIndex].filePath;
        imgEl[i].alt = Product.allProducts[randomIndex].name;
        Product.history.unshift(randomIndex);
        Product.allProducts[randomIndex].displayed += 1;
        console.log(Product.allProducts[randomIndex].name + ' displayed ' + Product.allProducts[randomIndex].displayed + ' times.');
      }else{
        i--;
      }
      console.log(Product.history);
    }
  }
  while (Product.history.length > 3) {
    Product.history.pop();
  }
  Product.totalShown += 3;
}

function generateXAxis() {
  var tempArray = [];
  for (var i in Product.allProducts){
    tempArray.push(Product.allProducts[i].name);
  }
  return tempArray;
}

function generateYAxis() {
  var tempArray = [];
  for (var i in Product.allProducts){
    tempArray.push(Product.allProducts[i].clicked);
  }
  return tempArray;
}

function generateBarColors() {
  var tempArray = [];
  var r, g, b;
  for (var i in Product.allProducts){
    r = Math.floor(Math.random() * (256));
    g = Math.floor(Math.random() * (256));
    b = Math.floor(Math.random() * (256));
    tempArray.push('rgba(' + r + ', ' + g + ', ' + b + ', 1.0)');
  }
  return tempArray;
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

generateNewImages();
