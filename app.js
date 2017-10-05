'use strict';
var imageLibrary = [
  ['bag', 'img/bag.jpg'],
  ['banana', 'img/banana.jpg'],
  ['bathroom', 'img/bathroom.jpg'],
  ['boots', 'img/boots.jpg'],
  ['breakfast', 'img/breakfast.jpg'],
  ['bubblegum', 'img/bubblegum.jpg'],
  ['chair', 'img/chair.jpg'],
  ['cthulhu', 'img/cthulhu.jpg'],
  ['dog-duck', 'img/dog-duck.jpg'],
  ['dragon', 'img/dragon.jpg'],
  ['pen', 'img/pen.jpg'],
  ['pet-sweep', 'img/pet-sweep.jpg'],
  ['scissors', 'img/scissors.jpg'],
  ['shark', 'img/shark.jpg'],
  ['sweep', 'img/sweep.png'],
  ['tauntaun', 'img/tauntaun.jpg'],
  ['unicorn', 'img/unicorn.jpg'],
  ['usb', 'img/usb.gif'],
  ['water-can', 'img/water-can.jpg'],
  ['wine-glass', 'img/wine-glass.jpg']
];
var imgEl = document.getElementsByClassName('displayed-picture');
var saveBtnEl = document.getElementById('save-progress');
var clearBtnEl = document.getElementById('clear-history');
var retakeBtnEl = document.getElementById('retake-survey');
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
    for (var i in Product.allProducts){
      if (Product.allProducts[i].name === selected){
        Product.allProducts[i].clicked += 1;
        break;
      }
    }
  }
  if (Product.totalShown < 25){
    var randomIndex;
    for (i = 0; i < imgEl.length; i++){
      randomIndex = Math.floor(Math.random() * Product.allProducts.length);
      if (!Product.history.includes(randomIndex)){
        imgEl[i].src = Product.allProducts[randomIndex].filePath;
        imgEl[i].alt = Product.allProducts[randomIndex].name;
        Product.history.unshift(randomIndex);
        Product.allProducts[randomIndex].displayed += 1;
      }else{
        i--;
      }
    }
    while (Product.history.length > 3) {
      Product.history.pop();
    }
    Product.totalShown += 3;
  }else{
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
    parentEl.appendChild(newCanvasEl);
    drawChart();
    localStorage.setItem('pageHistory', JSON.stringify(Product.allProducts));
    localStorage.removeItem('lastViewed');
    localStorage.removeItem('shownCount');
    saveBtnEl.style.display = 'none';
    clearBtnEl.style.display = 'inline';
    retakeBtnEl.style.display = 'inline';
  }
}

function drawChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
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
    options: {
      responsive: true,
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero:true
          }
        }],
        yAxes: [{
          ticks: {
            stepSize: 1,
            beginAtZero:true,
          }
        }]
      }
    }
  });
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
    tempArray.push('rgba(' + r + ', ' + g + ', ' + b + ', 0.5)');
  }
  return tempArray;
}

function saveProgress(){
  event.preventDefault();
  localStorage.setItem('pageHistory', JSON.stringify(Product.allProducts));
  localStorage.setItem('lastViewed', JSON.stringify(Product.history));
  localStorage.setItem('shownCount', JSON.stringify(Product.totalShown));
}
function clearStorage() {
  event.preventDefault();
  localStorage.removeItem('pageHistory');
}
function retakeSurvey() {
  event.preventDefault();
  location.reload();
}

function initialize() {
  if (!window.localStorage.pageHistory){
    for (var i in imageLibrary){
      new Product(imageLibrary[i][0], imageLibrary[i][1]);
    }
  }else{
    Product.allProducts = JSON.parse(localStorage.getItem('pageHistory'));
    if (window.localStorage.lastViewed){
      Product.history = JSON.parse(localStorage.getItem('lastViewed'));
    }
    if (window.localStorage.shownCount){
      Product.totalShown = JSON.parse(localStorage.getItem('shownCount'));
      Product.totalShown -= 3;
    }
  }
  for (i = 0; i < imgEl.length; i++){
    imgEl[i].addEventListener('click', generateNewImages);
  }
  saveBtnEl.style.display = 'inline';
  clearBtnEl.style.display = 'none';
  retakeBtnEl.style.display = 'none';
  saveBtnEl.addEventListener('click', saveProgress);
  clearBtnEl.addEventListener('click', clearStorage);
  retakeBtnEl.addEventListener('click', retakeSurvey);
  generateNewImages();
}

initialize();
