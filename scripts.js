const sizeBtns = Array.from(document.querySelectorAll('.size-btn'))
const gameScreen = document.querySelector('.game')

let firstCardInner, firstCardId, secondCardInner, secondCardId, quantityOfCards, cards, fronts, backs
firstCardInner = null
secondCardInner = null

const objects = [
    {id: 0, cars: 'img/audi.png'},
    {id: 1, cars: 'img/bmw.png'},
    {id: 2, cars: 'img/bugatti.png'},
    {id: 3, cars: 'img/chevrolet.png'},
    {id: 4, cars: 'img/ferrari.png'},
    {id: 5, cars: 'img/fiat.png'},
    {id: 6, cars: 'img/ford.png'},
    {id: 7, cars: 'img/honda.png'},
    {id: 8, cars: 'img/hyundai.png'},
    {id: 9, cars: 'img/infiniti.png'},
    {id: 10, cars: 'img/jaguar.png'},
    {id: 11, cars: 'img/lamborghini.png'},
    {id: 12, cars: 'img/lexus.png'},
    {id: 13, cars: 'img/mercedes.png'},
    {id: 14, cars: 'img/mazda.png'},
    {id: 15, cars: 'img/mg.png'},
    {id: 16, cars: 'img/mini.png'},
    {id: 17, cars: 'img/mitsubushi.png'},
    {id: 18, cars: 'img/nissan.png'},
    {id: 19, cars: 'img/opel.png'},
    {id: 20, cars: 'img/porsche.png'},
    {id: 21, cars: 'img/romeo.png'},
    {id: 22, cars: 'img/rover.png'},
    {id: 23, cars: 'img/subaru.png'},
    {id: 24, cars: 'img/suzuki.png'},
    {id: 25, cars: 'img/tesla.png'},
    {id: 26, cars: 'img/toyota.png'},
    {id: 27, cars: 'img/volkswagen.png'},
    
]

let usedObjects = []          //использованые объекты 
let usedCards = []

sizeBtns.forEach((el) => {          //выбираем размер игрового поля
    el.onclick = (event) => {
        let id = (event.target.id)
        if(gameScreen.children.length > 0){
            Array.from(gameScreen.children).forEach((el) => {
                el.remove()
            })
            usedObjects = []
            checkDeskSize(id)
        }else{
            checkDeskSize(id)
        }
    }
})

function randerGameDesk(x) {            //рендерим игровое поле 
    for(let i = 0; i < x; i++){
        //<img src=${objects[i].cars}>
    gameScreen.insertAdjacentHTML("beforeend",
    `
    <div class="card">
        <div class="front"></div>
        <div class="back"></div>
    </div>
    `
    )
    }
    randomCardLocation(x)
}

function checkDeskSize(id){         //подгоняем грид под количество карточек
    if(id === '0'){
        gameScreen.style.gridTemplateColumns = 'repeat(4, 1fr)'
        quantityOfCards = 12
        randerGameDesk(12)
    }else if(id === '1'){
        gameScreen.style.gridTemplateColumns = 'repeat(5, 1fr)'
        quantityOfCards = 20
        randerGameDesk(20)
    }else if(id === '2'){
        gameScreen.style.gridTemplateColumns = 'repeat(6, 1fr)'
        quantityOfCards = 30
        randerGameDesk(30)
    }else if(id === '3'){
        gameScreen.style.gridTemplateColumns = 'repeat(7, 1fr)'
        quantityOfCards = 42
        randerGameDesk(42)
    }else if(id === '4'){
        gameScreen.style.gridTemplateColumns = 'repeat(8, 1fr)'
        quantityOfCards = 56
        randerGameDesk(56)
    }
}

function randomCardLocation(x){          //случайное расположение карточек
    cards = Array.from(document.querySelectorAll('.card'))
    fronts = Array.from(document.querySelectorAll('.front'))
    backs = Array.from(document.querySelectorAll('.back'))

    console.log(x)

    for (let i = 0; i < x/2; i++) {
        let randomNumber1 = Math.floor(Math.random()*x)
        let randomNumber2 = Math.floor(Math.random()*x)

        if(usedObjects.includes(randomNumber1) === true){
            while(usedObjects.includes(randomNumber1) === true){
                randomNumber1 = Math.floor(Math.random()*x)
            }
            usedObjects.push(randomNumber1)
            backs[randomNumber1].insertAdjacentHTML(
                "afterbegin",
                `
                    <img src = "${objects[i].cars}">
                `
            ) 
        }else{
            usedObjects.push(randomNumber1)
            backs[randomNumber1].insertAdjacentHTML(
                "afterbegin",
                `
                    <img src = "${objects[i].cars}">
                `
            )
        }

        if(usedObjects.includes(randomNumber2) === true){
            while(usedObjects.includes(randomNumber2) === true){
                randomNumber2 = Math.floor(Math.random()*x)
            }
            usedObjects.push(randomNumber2)
            backs[randomNumber2].insertAdjacentHTML(
                "afterbegin",
                `
                    <img src = "${objects[i].cars}">
                `
            )
        }else{
            usedObjects.push(randomNumber2)
            backs[randomNumber2].insertAdjacentHTML(
                "afterbegin",
                `
                    <img src = "${objects[i].cars}">
                `
            )
        }
    }

    cards.forEach((el) => {
        el.onclick = (event) => {           //вешаем онКлики на карточки
            let idOfElement = cards.indexOf(event.target.parentNode)
            
                if(firstCardInner === null){            //записываем данные первой карточки
                    firstCardInner = backs[idOfElement].innerHTML
                    firstCardId = idOfElement

                    fronts[idOfElement].classList.add('front-clicked')
                    backs[idOfElement].classList.add('back-clicked')
                }else{
                    if(idOfElement != firstCardId){         //если карточка не одна и та же...
                        secondCardInner = backs[idOfElement].innerHTML          //...записываем данные второй карточки
                        secondCardId = idOfElement

                        fronts[idOfElement].classList.add('front-clicked')
                        backs[idOfElement].classList.add('back-clicked')

                        compareCards()
                    }
                }
        } 
    })
}

function blockCards(){
    cards.forEach((el) => {
        el.style.pointerEvents = 'none'
    })
    setTimeout(function(){
        cards.forEach((el) => {
            el.style.pointerEvents = 'all'
        })
    },
    1000)
}

function compareCards(){            //сравниваем карточки
    if(firstCardInner === secondCardInner){
        blockCards()
        setTimeout(function(){          //карточки совпали,удаляем
            cards[firstCardId].style.visibility = 'hidden'
            cards[secondCardId].style.visibility = 'hidden'
            firstCardInner = null
            secondCardInner = null
            firstCardId = ''
            secondCardId = ''
            },
            500);
    }else{
        blockCards()
        setTimeout(function(){          //карточки не совпали,переворачиваем назад
            fronts[firstCardId].classList.remove('front-clicked')
            backs[firstCardId].classList.remove('back-clicked')
            fronts[secondCardId].classList.remove('front-clicked')
            backs[secondCardId].classList.remove('back-clicked')
            cards[firstCardId].isCardVisible = false
            cards[secondCardId].isCardVisible = false
            firstCardInner = null
            secondCardInner = null
            firstCardId = ''
            secondCardId = ''
            },
            1000);
    }
}
