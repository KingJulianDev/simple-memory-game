const sizeBtns = Array.from(document.querySelectorAll('.size'))
const gameScreen = document.querySelector('.game-screen')
const start = document.querySelector('.start')
const startScreen = document.querySelector('.start-screen')
const mixedMode = document.getElementById('mixed')
const desk = document.querySelector('.desk')

let firstCardInner, firstCardId, secondCardInner, secondCardId, quantityOfCards, cards, fronts, backs, 
quantity, remainingCards, nameOfCategorie, randomObjects, isMixedModeActive, home/* , selectedItems, randomNumber */
firstCardInner = null
secondCardInner = null
isMixedModeActive = false

const objects = [
    {id: 0, cars: 'img/audi.png', football: 'img/acm.png', cartoons: 'img/bak.png'},
    {id: 1, cars: 'img/bmw.png', football: 'img/arsenal.png', cartoons: 'img/belka.png'},
    {id: 2, cars: 'img/bugatti.png', football: 'img/atletico.png', cartoons: 'img/blitz.png'},
    {id: 3, cars: 'img/chevrolet.png', football: 'img/barca.png', cartoons: 'img/bull.png'},
    {id: 4, cars: 'img/ferrari.png', football: 'img/bayern.png', cartoons: 'img/burunduk.png'},
    {id: 5, cars: 'img/fiat.png', football: 'img/bvb.png', cartoons: 'img/cars.png'},
    {id: 6, cars: 'img/ford.png', football: 'img/chelsea.png', cartoons: 'img/chaika.png'},
    {id: 7, cars: 'img/honda.png', football: 'img/everton.png', cartoons: 'img/doris.png'},
    {id: 8, cars: 'img/hyundai.png', football: 'img/gent.png', cartoons: 'img/dragon.png'},
    {id: 9, cars: 'img/infiniti.png', football: 'img/inter.png', cartoons: 'img/emocii.png'},
    {id: 10, cars: 'img/jaguar.png', football: 'img/juventus.png', cartoons: 'img/emojif.png'},
    {id: 11, cars: 'img/lamborghini.png', football: 'img/leicester.png', cartoons: 'img/emojigivefive.png'},
    {id: 12, cars: 'img/lexus.png', football: 'img/lion.png', cartoons: 'img/filex.png'},
    {id: 13, cars: 'img/mercedes.png', football: 'img/liverpool.png', cartoons: 'img/frozen.png'},
    {id: 14, cars: 'img/mazda.png', football: 'img/psg.png', cartoons: 'img/lenivec.png'},
    {id: 15, cars: 'img/mg.png', football: 'img/realmadrid.png', cartoons: 'img/masha.png'},
    {id: 16, cars: 'img/mini.png', football: 'img/stutgard.png', cartoons: 'img/moana.png'},
    {id: 17, cars: 'img/mitsubishi.png', football: 'img/torino.png', cartoons: 'img/nemo.png'},
    {id: 18, cars: 'img/nissan.png', football: 'img/tottenham.png', cartoons: 'img/olaf.png'},
    {id: 19, cars: 'img/opel.png', football: 'img/vilareal.png', cartoons: 'img/oldcar.png'},
    {id: 20, cars: 'img/porsche.png', football: 'img/wolf.png', cartoons: 'img/ralph.png'},
    {id: 21, cars: 'img/romeo.png', football: 'img/loko.png', cartoons: 'img/rapuncel.png'},
    {id: 22, cars: 'img/rover.png', football: 'img/betis.png', cartoons: 'img/tiger.png'},
    {id: 23, cars: 'img/subaru.png', football: 'img/valencia.png', cartoons: 'img/tigress.png'},
    {id: 24, cars: 'img/suzuki.png', football: 'img/nice.png', cartoons: 'img/venelopa.png'},
    {id: 25, cars: 'img/tesla.png', football: 'img/marsel.png', cartoons: 'img/white.png'},
    {id: 26, cars: 'img/toyota.png', football: 'img/standart.png', cartoons: 'img/zootiger.png'},
    {id: 27, cars: 'img/volkswagen.png', football: 'img/lazio.png', cartoons: 'img/zootopia.png'},
    
]

let usedObjects = []          //использованые объекты 
let usedCards = []            //использованые карточки

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

mixedMode.onclick = () => {
    isMixedModeActive = !isMixedModeActive;
    (isMixedModeActive === true) ? mixedMode.classList.add('active') :
    mixedMode.classList.remove('active');
}

sizeBtns.forEach((el) => {
    el.onclick = (event) => {
        start.style.pointerEvents = 'all'
        let id = (event.target.id)
        sizeBtns.forEach((el) => {
            el.classList.remove('active')
        })
        quantity = id
        remainingCards = id/2
        el.classList.add('active')
    }
})

function gameLoop() {
    startScreen.style.display = 'none'
    usedCards = []
    firstCardInner = null
    /* idOfElement = '' */
    checkDeskSize(quantity)
}

home = document.querySelector('.home')
home.onclick = () => {
    startScreen.style.display = 'block'
    if(desk.firstChild){
        while (desk.firstChild) {
            desk.removeChild(desk.firstChild);
            }
    }
    console.dir(quantity)
    desk.removeAttribute("style")
}

start.onclick = () => {
    gameLoop()
}

function checkDeskSize(quantity){         //подгоняем грид под количество карточек
    if(quantity === '12'){
        desk.style.gridTemplateColumns = 'repeat(4, 1fr)'
        renderGameDesk(quantity)
    }else if(quantity === '20'){
        desk.style.gridTemplateColumns = 'repeat(5, 1fr)'
        renderGameDesk(quantity)
    }else if(quantity === '30'){
        desk.style.gridTemplateColumns = 'repeat(6, 1fr)'
        renderGameDesk(quantity)
    }else if(quantity === '40'){
        desk.style.gridTemplateColumns = 'repeat(8, 1fr)'
        renderGameDesk(quantity)
    }else if(quantity === '4'){
        desk.style.gridTemplateColumns = 'repeat(8, 1fr)'
        randerGameDesk(quantity)
    }
}

function renderGameDesk(quantity) {            //рендерим игровое поле 
    for(let i = 0; i < quantity; i++){
    desk.insertAdjacentHTML("beforeend",
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

function randomCardLocation(x){          //случайное расположение картинок
    cards = Array.from(document.querySelectorAll('.card'))
    fronts = Array.from(document.querySelectorAll('.front'))
    backs = Array.from(document.querySelectorAll('.back'));
    
    (indexOfCategorie === 0) ? nameOfCategorie = 'cartoons' :
    (indexOfCategorie === 1) ? nameOfCategorie = 'flags' :
    (indexOfCategorie === 2) ? nameOfCategorie = 'cars' :
    nameOfCategorie = 'football';
    
    let selectedItems = []
    let randomNumber
    for (let i = 0; i < x/2; i++) {
        do {
            randomNumber = Math.floor(Math.random() * objects.length)
        } while (selectedItems.includes(objects[randomNumber]) === true);
        selectedItems.push(objects[randomNumber])
    }

    function addImage(i, mode){             //рандомно добавляем картинки к карточкам
        
    let randomNumber1, randomNumber2

        do {
            randomNumber1 = Math.floor(Math.random()*x)
        } while (usedCards.includes(randomNumber1) === true);
        usedCards.push(randomNumber1)

        do {
            randomNumber2 = Math.floor(Math.random()*x)
        } while (usedCards.includes(randomNumber2) === true);
        usedCards.push(randomNumber2)

        backs[randomNumber1].insertAdjacentHTML(            //добавляем img к первой карточке и ...
            "afterbegin",
            `
                <img src = "${selectedItems[i][mode]}">
            `
        )

        backs[randomNumber2].insertAdjacentHTML(            //...добавляем ко второй
            "afterbegin",
            `
                <img src = "${selectedItems[i][mode]}">
            `
        )
    }

    if(isMixedModeActive === false){            //рендеринг картинок в зависимости от режима
        for (let i = 0; i < x/2; i++) {
            addImage(i, nameOfCategorie)
        }
    }else{
        function getRandomCategorie(min, max) {
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
        for (let i = 0; i < x/2; i++) {
            let y = getRandomCategorie(1,3)
            let randomCategorie = Object.keys(selectedItems[i])[y]
            addImage(i, randomCategorie)
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
    gameScreen.style.pointerEvents = 'none'
    setTimeout(function(){
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
