fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(json => extractName(json));


function extractName(data){

  let items = document.getElementById('items');


 
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);

    let element = document.createElement('div');

    element.innerHTML = `
    <a href="./product.html?id= + ${data[i]["_id"]}" class= productLink>
    <img width= "350" height="350" src="${data[i]['imageUrl']}" alt="${data[i]['altTxt']}">
    <h3 class="productName">${data[i]['name']}</h3>
    <h2 class="productPrice">${data[i]['price']} €</h2>
    </a>
    `  
    items.appendChild(element)
  }
}