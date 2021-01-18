/* const fronts = Array.from(document.querySelectorAll('.front'))
const backs = Array.from(document.querySelectorAll('.back'))
const cards = Array.from(document.querySelectorAll('.card'))



cards.forEach((el) => {
    el.onclick = (event) => {
        let index = cards.indexOf(event.target.parentNode)
        let classListArr = Array.from(fronts[index].classList)
        if(classListArr.includes('front-clicked')){
            fronts[index].classList.remove('front-clicked')
            backs[index].classList.remove('back-clicked')
        }else{
            fronts[index].classList.add('front-clicked')
            backs[index].classList.add('back-clicked')
        }
    }
}) */

let cards //= Array.from(document.querySelectorAll('.card'))
let fronts //= Array.from(document.querySelectorAll('.front'))
let backs //= Array.from(document.querySelectorAll('.back'))
const sizeBtns = Array.from(document.querySelectorAll('.size-btn'))
const gameScreen = document.querySelector('.game')

let firstCardInner, firstCardId, secondCardInner, secondCardId
firstCardInner = null
secondCardInner = null

const objects = [
    {id:0, bgimage: 'back.jpg'},
    {id:0, bgimage: 'back.jpg'},
    {id:1, bgimage: 'back.jpg'},
    {id:1, bgimage: 'back.jpg'},
    {id:2, bgimage: 'back.jpg'},
    {id:2, bgimage: 'back.jpg'},
    {id:3, bgimage: 'back.jpg'},
    {id:3, bgimage: 'back.jpg'},
    {id:4, bgimage: 'back.jpg'},
    {id:4, bgimage: 'back.jpg'},
    {id:5, bgimage: 'back.jpg'},
    {id:5, bgimage: 'back.jpg'},
    {id:6, bgimage: 'back.jpg'},
    {id:6, bgimage: 'back.jpg'},
    {id:7, bgimage: 'back.jpg'},
    {id:7, bgimage: 'back.jpg'},
    {id:8, bgimage: 'back.jpg'},
    {id:8, bgimage: 'back.jpg'},
    {id:9, bgimage: 'back.jpg'},
    {id:9, bgimage: 'back.jpg'},
]

const usedObjects = []          //использованые объекты 

sizeBtns.forEach((el) => {          //выбираем размер игрового поля
    el.onclick = (event) => {
        let id =  (event.target.id)
        checkDeskSize(id)
        console.log(Array.from(gameScreen.children))
    }
})

function renderGamaDesk(x) {            //рендерим игровое поле 
    for(let i = 0; i < x; i++){
    gameScreen.insertAdjacentHTML("afterbegin",
    `
    <div class="card">
        <div class="front"></div>
        <div class="back"></div>
    </div>
    `
    )
    }
    randomCardLocation()
}

function checkDeskSize(id){         //подгоняем грид под количество карточек
    if(id === '0'){
        (gameScreen.style.gridTemplateColumns = 'repeat(4, 1fr)', 
        renderGamaDesk(12))
    }else if(id === '1'){
        (gameScreen.style.gridTemplateColumns = 'repeat(5, 1fr)', 
        renderGamaDesk(20))
    }else if(id === '2'){
        (gameScreen.style.gridTemplateColumns = 'repeat(6, 1fr)', 
        renderGamaDesk(30))
    }else if(id === '3'){
        (gameScreen.style.gridTemplateColumns = 'repeat(7, 1fr)', 
        renderGamaDesk(42))
    }else if(id === '4'){
        (gameScreen.style.gridTemplateColumns = 'repeat(8, 1fr)', 
        renderGamaDesk(56))
    }
}

function randomCardLocation(){          //случайное расположение карточек
    cards = Array.from(document.querySelectorAll('.card'))
    fronts = Array.from(document.querySelectorAll('.front'))
    backs = Array.from(document.querySelectorAll('.back'))
    cards.forEach((el) => {
        let index = cards.indexOf(el)
        let randomNumber = Math.floor(Math.random()*objects.length)
        let isCardVisible = false
        
        if(usedObjects.includes(randomNumber) === true){
            do {
                randomNumber = Math.floor(Math.random()*objects.length)
            } while (usedObjects.includes(randomNumber) === true);

            backs[index].innerHTML = objects[randomNumber].id
            usedObjects.push(randomNumber)
        }else{
            backs[index].innerHTML = objects[randomNumber].id
            usedObjects.push(randomNumber)
        }

        el.onclick = (event) => {           //вешаем онКлики на карточки
            let idOfElement = cards.indexOf(event.target.parentNode)
            
                if(firstCardInner === null){            //записываем данные первой карточки
                    firstCardInner = backs[idOfElement].innerHTML
                    firstCardId = idOfElement

                    fronts[index].classList.add('front-clicked')
                    backs[index].classList.add('back-clicked')
                }else{
                    if(idOfElement != firstCardId){         //если карточка не одна и та же...
                        secondCardInner = backs[idOfElement].innerHTML          //...записываем данные второй карточки
                        secondCardId = idOfElement

                        fronts[index].classList.add('front-clicked')
                        backs[index].classList.add('back-clicked')

                        compareCards()
                    }
                }
                isCardVisible = !isCardVisible
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

const reset = document.getElementById('clear')
reset.onclick = () => {
    Array.from(gameScreen.children).forEach((el) => {
        el.remove()
    })
}