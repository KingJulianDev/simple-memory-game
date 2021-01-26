const sizeBtns = Array.from(document.querySelectorAll('.size'))
const gameScreen = document.querySelector('.game-screen')
const start = document.querySelector('.start')
const startScreen = document.querySelector('.start-screen')

let firstCardInner, firstCardId, secondCardInner, secondCardId, quantityOfCards, cards, fronts, backs, quantity, remainingCards
firstCardInner = null
secondCardInner = null

const objects = [
    {id: 0, cars: 'img/audi.png', football: 'img/acm.png'},
    {id: 1, cars: 'img/bmw.png', football: 'img/arsenal.png'},
    {id: 2, cars: 'img/bugatti.png', football: 'img/atletico.png'},
    {id: 3, cars: 'img/chevrolet.png', football: 'img/barca.png'},
    {id: 4, cars: 'img/ferrari.png', football: 'img/bayern.png'},
    {id: 5, cars: 'img/fiat.png', football: 'img/bvb.png'},
    {id: 6, cars: 'img/ford.png', football: 'img/chelsea.png'},
    {id: 7, cars: 'img/honda.png', football: 'img/everton.png'},
    {id: 8, cars: 'img/hyundai.png', football: 'img/gent.png'},
    {id: 9, cars: 'img/infiniti.png', football: 'img/inter.png'},
    {id: 10, cars: 'img/jaguar.png', football: 'img/juventus.png'},
    {id: 11, cars: 'img/lamborghini.png', football: 'img/leicester.png'},
    {id: 12, cars: 'img/lexus.png', football: 'img/lion.png'},
    {id: 13, cars: 'img/mercedes.png', football: 'img/liverpool.png'},
    {id: 14, cars: 'img/mazda.png', football: 'img/psg.png'},
    {id: 15, cars: 'img/mg.png', football: 'img/realmadrid.png'},
    {id: 16, cars: 'img/mini.png', football: 'img/stutgard.png'},
    {id: 17, cars: 'img/mitsubishi.png', football: 'img/torino.png'},
    {id: 18, cars: 'img/nissan.png', football: 'img/tottenham.png'},
    {id: 19, cars: 'img/opel.png', football: 'img/vilareal.png'},
    {id: 20, cars: 'img/porsche.png', football: 'img/wolf.png'},
    {id: 21, cars: 'img/romeo.png', football: 'img/loko.png'},
    {id: 22, cars: 'img/rover.png', football: 'img/betis.png'},
    {id: 23, cars: 'img/subaru.png', football: 'img/valencia.png'},
    {id: 24, cars: 'img/suzuki.png', football: 'img/nice.png'},
    {id: 25, cars: 'img/tesla.png', football: 'img/marsel.png'},
    {id: 26, cars: 'img/toyota.png', football: 'img/standart.png'},
    {id: 27, cars: 'img/volkswagen.png', football: 'img/lazio.png'},
    
]

let usedObjects = []          //использованые объекты 
let usedCards = []

const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const items = document.querySelectorAll('.item')

let indexOfCategorie = 0

next.onclick = () => {
    indexOfCategorie++
    if(indexOfCategorie > items.length-1) indexOfCategorie = 0
    showSlide()
}

prev.onclick = () => {
    indexOfCategorie --
    if(indexOfCategorie < 0) indexOfCategorie = items.length-1
    showSlide()
}

function showSlide(){
    items.forEach((el) => {
        let classArr = Array.from(el.classList)
        if(classArr.includes('active-slide')){
            el.classList.remove('active-slide')
        }
    })
    items[indexOfCategorie].classList.add('active-slide')
}

sizeBtns.forEach((el) => {
    el.onclick = (event) => {
        let id = (event.target.id)
        sizeBtns.forEach((el) => {
            el.classList.remove('active')
        })
        quantity = id
        remainingCards = id/2
        console.log(remainingCards)
        el.classList.add('active')
        console.log(quantity)
    }
})

start.onclick = () => {
    startScreen.style.display = 'none'
    gameScreen.style.display = 'grid'
    checkDeskSize(quantity)
}

function renderGameDesk(quantity) {            //рендерим игровое поле 
    for(let i = 0; i < quantity; i++){
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
    randomCardLocation(quantity)
}

function checkDeskSize(quantity){         //подгоняем грид под количество карточек
    if(quantity === '12'){
        gameScreen.style.gridTemplateColumns = 'repeat(4, 1fr)'
        renderGameDesk(quantity)
    }else if(quantity === '20'){
        gameScreen.style.gridTemplateColumns = 'repeat(5, 1fr)'
        renderGameDesk(quantity)
    }else if(quantity === '30'){
        gameScreen.style.gridTemplateColumns = 'repeat(6, 1fr)'
        renderGameDesk(quantity)
    }else if(quantity === '42'){
        gameScreen.style.gridTemplateColumns = 'repeat(7, 1fr)'
        renderGameDesk(quantity)
    }else if(quantity === '4'){
        gameScreen.style.gridTemplateColumns = 'repeat(8, 1fr)'
        randerGameDesk(quantity)
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
                    <img src = "${objects[i].football}">
                `
            ) 
        }else{
            usedObjects.push(randomNumber1)
            backs[randomNumber1].insertAdjacentHTML(
                "afterbegin",
                `
                    <img src = "${objects[i].football}">
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
                    <img src = "${objects[i].football}">
                `
            )
        }else{
            usedObjects.push(randomNumber2)
            backs[randomNumber2].insertAdjacentHTML(
                "afterbegin",
                `
                    <img src = "${objects[i].football}">
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
    /* cards.forEach((el) => {
        el.style.pointerEvents = 'none'
    }) */
    gameScreen.style.pointerEvents = 'none'
    setTimeout(function(){
        /* cards.forEach((el) => {
            el.style.pointerEvents = 'all'
        }) */
        gameScreen.style.pointerEvents = 'all'
    },
    1200)
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
        remainingCards--
        console.log(remainingCards)
        if(remainingCards === 0) alert('You won!')
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

/* const categories = document.querySelector('.categories')
const size = document.querySelector('.size')
const themes = document.querySelector('.themes')
const options = document.querySelector('.options')
const settings = document.querySelector('.settings')

settings.onclick = () => {
    let i = 0
    let j = 0
    let y = 0
    let animation = setInterval(() => {
        i += 7
        j += 14
        y += 21
        size.style.left = i + 'px'
        themes.style.left = j + 'px'
        categories.style.left = y + 'px'
        size.style.boxShadow = '5px 5px 5px black'
        themes.style.boxShadow = '5px 5px 5px black'
        categories.style.boxShadow = '5px 5px 5px black'
    }, 20);
    setTimeout(() => {
        clearInterval(animation)
    }, 300);
} */