// html, css
// getRandomUser fetch, dole result za 3 usera
// napravi objekat newUser sa kojim ces da radis, ime, prezime, novac
// taj objekat treba da ti je u arr da bi radio arrMethods
// prikazi random user na strani
// formatiraj valutu
// klikom na addUserBtn dodaj novog usera
// double money
// sort money
// filter money
// reduce money, kreiras ispod novi el total, sa podvucenom crtom

const addUserBtn = document.querySelector('#add')
const doubleBtn = document.querySelector('#double')
const sortBtn = document.querySelector('#sort')
const showMillionersBtn = document.querySelector('#show')
const calculateWealthBtn = document.querySelector('#calculate')
const main = document.querySelector('#main')


let data = []

getRandomUser()
getRandomUser()
getRandomUser()

function getRandomUser() {


  fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(data => {


        const user = data.results[0]

        const newUser = {

          name: `${user.name.first} ${user.name.last}`,
          money: Math.floor(Math.random() * 1000000)

        }

        addData(newUser)
      }

    )
}

function addData(newUser) {

  data.push(newUser)

  updateDOM()


}

function updateDOM(providedData = data) {

  //console.log(providedData)

  const numberFormatter = new Intl.NumberFormat('en-US', {

    style: 'currency',
    currency: 'USD'
  })


  //console.log(providedData)

  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`

  providedData.forEach(item => {

    const element = document.createElement('div')

    element.classList.add('person')

    element.innerHTML = `<strong>${item.name}</strong> ${numberFormatter.format(item.money)}`

    main.appendChild(element)

  })

}

function doubleMoney(){

  console.log(data)

   data= data.map(user=>{

     return {...user, money:user.money * 2}

    })

   
 updateDOM()
 

}



function sortMoney(){

  data= data.sort((a,b)=> b.money - a.money)

   
 updateDOM()
 

}


function showMillioners(){


    data = data.filter(user=> user.money > 800000)

  updateDOM()

}


function calculate(){

  const numberFormatter = new Intl.NumberFormat('en-US', {

    style: 'currency',
    currency: 'USD'
  })

 let wealth = data.reduce((acc, curr)=> acc + curr.money, 0)

 console.log(numberFormatter.format(wealth))


 const wealthEl = document.createElement('div')
 wealthEl.innerHTML = `<h3>Total Wealth: <strong>${numberFormatter.format(wealth)}<strong></h3>`

 main.appendChild(wealthEl)

}





addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortMoney)
showMillionersBtn.addEventListener('click', showMillioners)
calculateWealthBtn.addEventListener('click', calculate)