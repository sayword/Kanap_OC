fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(json => recupCanap(json));

function recupCanap(data){

  let items = document.getElementById('items');

  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);

    let element = document.createElement('div');

    element.innerHTML = `
    <a href="#" class= product>
    <img width= "270" height="270" src="${data[i]['imageUrl']}" alt="${data[i]['altTxt']}">
    <h3 class="Name">${data[i]['name']}</h3>
    <h2 class="Price">${data[i]['price']} €</h2>
    </a>
    `  
    items.appendChild(element) 
  }
}
