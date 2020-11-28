// FETCH Code

fetch('https://randomuser.me/api/?results=12')
    .then(console.log('Fetching...'))
    .then(res => res.json())
    .then(data => {
        displayInfo(data.results)
    })

// Display info

const displayInfo = (data) => {
    for(let i = 0; i < data.length; i++) {
        const galleryDiv = document.querySelector('#gallery')
        const cardDiv = document.createElement('div')
        cardDiv.className = 'card'
        galleryDiv.appendChild(cardDiv)
        const cardImgContainer = document.createElement('div')
        cardImgContainer.className = 'card-img-container'
        cardDiv.appendChild(cardImgContainer)
        const img = document.createElement('img')
        img.className = 'card-img'
        img.src='https://placehold.it/90x90'
        img.alt = 'profile picture'
        cardImgContainer.appendChild(img)
        const cardInfoDiv = document.createElement('div')
        cardInfoDiv.className = 'card-info-container'
        cardDiv.appendChild(cardInfoDiv)
        const h3 = document.createElement('h3')
        h3.className = 'card-name cap'
        h3.id ='name'
        h3.innerHTML = `${data[i].name.first} ${data[i].name.last}`
        cardInfoDiv.appendChild(h3)
        const pEmail = document.createElement('p')
        pEmail.className = 'card-text'
        pEmail.innerHTML = `${data[i].email}`
        cardInfoDiv.appendChild(pEmail)
        const pLocation = document.createElement('p')
        pLocation.className = 'card-text cap'
        pLocation.innerHTML = `${data[i].location.city}, ${data[i].location.state}`
        cardInfoDiv.appendChild(pLocation)
    }
}
