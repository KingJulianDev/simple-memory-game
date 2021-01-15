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
            
                if(firstCardInner === null){
                    firstCardInner = backs[idOfElement].innerHTML
                    firstCardId = idOfElement

                    fronts[index].classList.add('front-clicked')
                    backs[index].classList.add('back-clicked')
                }else{
                    secondCardInner = backs[idOfElement].innerHTML
                    secondCardId = idOfElement

                    fronts[index].classList.add('front-clicked')
                    backs[index].classList.add('back-clicked')

                    compareCards()
                }
                isCardVisible = !isCardVisible
        }
    })
}

function compareCards(){
    if(firstCardInner === secondCardInner){
        cards[firstCardId].style.visibility = 'hidden'
        cards[secondCardId].style.visibility = 'hidden'
        firstCardInner = null
        secondCardInner = null
        firstCardId = ''
        secondCardId = ''
    }else{
        setTimeout(function(){
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