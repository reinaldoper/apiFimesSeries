/* const fetch = require('node-fetch'); */
const productInput = document.querySelector('#input');
const urlNba = async (brand) => {
  try {
    const options = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`
    const result = await fetch(options);
    const response = await result.json();
    document.querySelector(".preload").style.display = "none"//stop the load
    return response;
  } catch (error) {
    alert(`Erro: ${error}`);
  }
}
const result = async () => {
  try {
    const options = `http://makeup-api.herokuapp.com/api/v1/products.json?`
    const result = await fetch(options);
    const response = await result.json();
    document.querySelector(".preload").style.display = "none"//stop the load
    return response;
  } catch (error) {
    alert(`Erro: ${error}`);
  }
}
const criaOl = async () => {
  const results = await result();
  results.forEach((item) => {
    const ol = document.querySelector('#list');
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.brand}</strong>`;
    ol.appendChild(li);
  })
}
const loader = document.querySelector('.preload');
const emoji = loader.querySelector('.emoji');

const emojis = ["🕐", "🕜", "🕑","🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢",  "🕗", "🕣", "🕘", "🕤", "🕙",  "🕥", "🕚", "🕦",  "🕛", "🕧"];

const interval = 125;

const loadEmojis = (arr) => {
    setInterval(() => {
      emoji.innerText = `Carregando.... ${arr[Math.floor(Math.random() * arr.length)]}`;
    }, interval);
}
const init = () => {
  loadEmojis(emojis);
}

const buscaProduct = async ({ target }) => {
  const results = await urlNba(target.value);
  const ol = document.querySelector('#list');
  ol.innerHTML = '';
  console.log(results);
  results.forEach(({name, price, image_link}) => {
    const ol = document.querySelector('#list');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const li = document.createElement('li');
    img.src = image_link;
    div.appendChild(img);
    li.innerHTML = `<strong>${name} -US$ ${price}</strong>`;
    li.appendChild(div);
    ol.appendChild(li);
  })
  productInput.value = '';

}
productInput.addEventListener('change', buscaProduct);
init();
criaOl();