let params = new URL(document.location).searchParams;
let id = params.get("_id");

fetch('http://localhost:3000/api/products/${id}')
    .then(response => response.json())
    .then(json => getPost(json));

    function getPost(){


        let Img = document.querySelector(".item__img")
        let productImg = document.createElement("img");
        productImg.src = article.imageUrl
        Img.appendChild(productImg)

        let Name = document.getElementById('title');
        let productName = document.createElement("h2");
        productName.innerHTML = '<h2>$['name']</h2>'
        Name.appendChild(productName)

        let Price = document.getElementById('price');
        let productPrice = document.createElement("h3");
        productPrice.innerHTML = '<h3>$['price']</h3>'
        Price.appendChild(productPrice)

        let Description = document.getElementById('description');
        let productDescription = document.createElement("p");
        productDescription.innerHTML = '<p>${data[i]['description']}</p>'
        Description.appendChild(productDescription)


    }
    
