// FETCH Code

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(res => res.json())
    .then(data => {
        displayInfo(data.results)
        displayModal(data.results)
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
        img.src=`${data[i].picture.medium}`
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


// Display the modal after clicking on a profile
const displayModal = (data) => {
    const body = document.querySelector('body')
    let cards = document.querySelectorAll('.card')
    for(let i = 0; i < cards.length; i++) {
        
        cards[i].addEventListener('click', e => {
            // Stores the grandparent of the item clicked
            const parent = e.target.parentNode.parentNode

            if(parent.className ==='card' || parent.className === 'card-info-container') {
                const birthday = data[i].dob.date
                const convertedDOB = `${birthday.slice(5,7)}/${birthday.slice(8,10)}/${birthday.slice(0,4)}`
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
                    <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                    <p class="modal-text">${data[i].email}</p>
                    <p class="modal-text cap">${data[i].location.city}</p>
                    <hr>
                    <p class="modal-text">${data[i].cell}</p>
                    <p class="modal-text">${data[i].location.street.name}, ${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}</p>
                    <p class="modal-text">Birthday: ${convertedDOB}</p>
                `

                modalInfoContainerDiv.insertAdjacentHTML('beforeend', html)

                // Places the main page behind the modal
                document.querySelector('.gallery').style.zIndex ='2'

                // Removes the modal completely when closing the modal
                const closeButton = document.querySelector('button')
                closeButton.addEventListener('click', e => {
                    e.preventDefault()
                    body.removeChild(modalContainerDiv)
                })
            }
        })
    }
}