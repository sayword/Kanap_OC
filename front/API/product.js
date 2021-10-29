fetch('http://localhost:3000/api/products/')
    .then(response => response.json())
    .then(json => getPost(json));

    function getPost(){


        let Img = document.querySelector(".item__img")
        let productImg = document.createElement("img");
        productImg.innerHTML = '<img src="http://localhost:3000/images/kanap03.jpeg">'
        Img.appendChild(productImg)

        let Name = document.getElementById('title');
        let productName = document.createElement("h2");
        productName.innerHTML = '<h2>Canapé</h2>'
        Name.appendChild(productName)

        let Price = document.getElementById('price');
        let productPrice = document.createElement("h3");
        productPrice.innerHTML = '<h3>1300</h3>'
        Price.appendChild(productPrice)

        let Description = document.getElementById('description');
        let productDescription = document.createElement("p");
        productDescription.innerHTML = '<p>Blablaa</p>'
        Description.appendChild(productDescription)


    }
    