const parametre = window.location.href;
const kanapUrl = new URL(parametre);
const id = kanapUrl.searchParams.get("id");

fetch("http://localhost:3000/api/products/" + id)
.then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(data => {
    document.querySelector("#title").innerHTML = data.name;
    document.querySelector("#description").innerHTML = data.description;
    document.querySelector("#price").innerHTML = data.price;
    let img = document.querySelector(".item__img");
    let image = document.createElement('img');
    image.src = data.imageUrl;
    img.appendChild(image);
    });
  
