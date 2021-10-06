const img = document.getElementById('img')

fetch("http://localhost:3000/images/kanap01.jpeg")
    .then(res => res.json())
    .then(data => img.src = data.url)
