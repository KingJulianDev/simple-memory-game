const cards = Array.from(document.querySelectorAll('.card'))
const fronts = Array.from(document.querySelectorAll('.front'))
const backs = Array.from(document.querySelectorAll('.back'))

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
]

const usedObjects = []          //использованые объекты 

function randomCardLocation(){          //случайное расположение карточек
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

randomCardLocation()

//cards.forEach((el) => {
    //let index = cards.indexOf(el)
    //let randomCardContent = Math.floor(Math.random()*objects.length)
    //let isCardVisible = false
    
    //usedObjects.push(randomCardContent)
    //backs[index].innerHTML = objects[randomCardContent].id
    //objects.splice(randomCardContent, 1) 
    //console.log(event.target.nextElementSibling.innerHTML)
    
//})