// FETCH Code

fetch('https://randomuser.me/api/?results=12')
    .then(console.log('Fetching...'))
    .then(res => res.json())
    .then(data => {
        displayInfo(data.results)
        displayModal(data.results)
    })

// Display info

const displayInfo = (data) => {

    console.log('from displayInfo: ', data)
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
        img.src=`${data[i].picture.thumbnail}`
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

const displayModal = (data) => {
    const body = document.querySelector('body')
    document.addEventListener('click', e => {
        if(e.target.classList.contains('card') || e.target.classList.contains('card-img-container') || e.target.classList.contains('card-text') || e.target.classList.contains('card-img') || e.target.classList.contains('card-name')) {
               for(let i = 0; i < data.length; i++) {
                 if(e.target.textContent == data[i].email) {
                     console.log('found them')
                    const modalContainerDiv = document.createElement('div')
                    modalContainerDiv.className = 'modal-container'
                    body.appendChild(modalContainerDiv)
                    const modalDiv = document.createElement('div')
                    modalDiv.className = 'modal'
                    modalContainerDiv.appendChild(modalDiv)
                    const modalButton = document.createElement('button')
                    const strong = document.createElement('strong')
                    modalButton.type = 'button'
                    modalButton.id = 'modal-close-btn'
                    modalButton.className = 'modal-close-btn'
                    strong.innerText = 'X'
                    modalDiv.appendChild(modalButton)
                    modalButton.appendChild(strong)
                    const modalInfoContainerDiv = document.createElement('div')
                    modalInfoContainerDiv.className = 'modal-info-container'
                    modalDiv.appendChild(modalInfoContainerDiv)
                     
                    const html = `
                        <img class="modal-img" src="${data[i].picture.medium}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                        <p class="modal-text">${data[i].email}</p>
                        <p class="modal-text cap">${data[i].location.city}</p>
                        <hr>
                        <p class="modal-text">${data[i].cell}</p>
                        <p class="modal-text">${data[i].location.street.name}, ${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}</p>
                        <p class="modal-text">Birthday: ${data[i].dob.date}</p>
                    `
                    modalInfoContainerDiv.insertAdjacentHTML('beforeend', html)

                    document.querySelector('.gallery').style.zIndex ='2'

                    const closeButton = document.querySelector('button')
                    const modalContainer = document.querySelector('.modal')

                    closeButton.addEventListener('click', e => {
                        e.preventDefault()
                        console.log('close button clicked')
                        document.querySelector('.gallery').style.zIndex = '0'
                    })
                 }
               }
        }
        })
}


