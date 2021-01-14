const cards = Array.from(document.querySelectorAll('.card'))
const fronts = Array.from(document.querySelectorAll('.front'))
const backs = Array.from(document.querySelectorAll('.back'))

let firstCardInner, firstCardId, secondCardInner, secondCardId

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

const usedObjects = []

function randomCardLocation(){
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

        el.onclick = (event) => {
            let idOfElement = cards.indexOf(event.target.parentNode)

            //console.log('Index of card is ' + idOfElement)
            
                if(firstCardInner === undefined){
                    firstCardInner = backs[idOfElement].innerHTML
                    firstCardId = idOfElement
                    console.log('First card id is ' + firstCardId)
                    console.log('First card innerHTML is ' + firstCardInner)
                }else{
                    secondCardInner = backs[idOfElement].innerHTML
                    secondCardId = idOfElement
                    console.log('Second card id is ' + secondCardId)
                    console.log('Second card innerHTML is ' + secondCardInner)
                    compareCards(idOfElement/* firstCardInner, secondCardInner, firstCardId, secondCardId */)
                }

                if(isCardVisible === false){
                    fronts[index].classList.add('front-clicked')
                    backs[index].classList.add('back-clicked')
                }else{
                    fronts[index].classList.remove('front-clicked')
                    backs[index].classList.remove('back-clicked')
                }
                isCardVisible = !isCardVisible
                //console.log(firstCardInner, secondCardInner)
        }
    })
}

function compareCards(idOfElement/* firstCardInner, secondCardInner, firstCardId, secondCardId */){
    console.log('fInner: ' + firstCardInner + ' sInner: ' + secondCardInner)
    console.log(firstCardId, secondCardId)
    if(firstCardInner === secondCardInner){
        cards[firstCardId].style.visibility = 'hidden'
        cards[secondCardId].style.visibility = 'hidden'
        firstCardInner = undefined
        secondCardInner = undefined
        firstCardId = ''
        secondCardId = ''
        console.log('fInner: ' + firstCardInner + ' sInner: ' + secondCardInner + ' after reset')
    }else{
        fronts[firstCardId].classList.remove('front-clicked')
        backs[firstCardId].classList.remove('back-clicked')
        fronts[secondCardId].classList.remove('front-clicked')
        backs[secondCardId].classList.remove('back-clicked')
        cards[firstCardId].isCardVisible = false
        cards[secondCardId].isCardVisible = false
        firstCardInner = undefined
        secondCardInner = undefined
        firstCardId = ''
        secondCardId = ''
        console.log('fInner: ' + firstCardInner + ' sInner: ' + secondCardInner + ' after reset')
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