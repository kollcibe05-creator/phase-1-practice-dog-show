const tbody = document.getElementById("table-body")
let Dogs= []
const form = document.getElementById("dog-form")

fetch("http://localhost:3000/dogs")
.then(r => r.json())
.then(dogs => {
    Dogs = dogs

    makeDogs(Dogs)    
})

function makeDogs (dogs) {
    dogs.forEach(dog => makeDog(dog))
} 

function makeDog(dog) {
    const tr = document.createElement("tr")

    
    
    const tname = document.createElement("td")
    tname.className= "tdname"
    tname.textContent = dog.name
    tr.append(tname)
    
    const tbreed = document.createElement("td")
    tbreed.className= "tdbreed"
    tbreed.textContent = dog.breed
    tr.append(tbreed)
    
    const tsex = document.createElement("td")
    tsex.className= "tdsex"
    tsex.textContent = dog.sex
    tr.append(tsex)

    const tEdit= document.createElement("td")
    const button = document.createElement("button")

    button.textContent = "Edit Dog"

    tEdit.appendChild(button)

    tr.append(tEdit)
    
    tr.id = dog.id

    tbody.append(tr)



    button.addEventListener("click", () => {
        fillForm(tr)
    })
    
} 


function fillForm (dogData) {

    const name = document.querySelector("input[name = name]")
    const breed = document.querySelector("input[name = breed]")
    const sex = document.querySelector("input[name = sex]")

    const tdName = dogData.querySelector(".tdname").textContent
    const tdBreed = dogData.querySelector(".tdbreed").textContent
    const tdSex = dogData.querySelector(".tdsex").textContent

    form.id = 
    
    name.value = tdName
    breed.value = tdBreed
    sex.value = tdSex


    handleForm(dogData)
}


function handleForm (dogData) {
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        patchedObj = {
            name: e.target.name.value,
            breed: e.target.breed.value, 
            sex: e.target.sex.value
        }

        handlePatch(dogData, patchedObj)
    })
}


function handlePatch(dogData, patchedObj) {
    fetch(`http://localhost:3000/dogs/${dogData.id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify(patchedObj)

    })
    .then(r => r.json())
    .then(newObj => {
        patchedObj = newObj
        
        const index = Dogs.findIndex(dog => dog.id === dogData.id)
        if (index !== -1) {
            Dogs[index] = newObj
        }

        dogData.querySelector(".tdname").textContent = newObj.name
        dogData.querySelector(".tdbreed").textContent = newObj.breed
        dogData.querySelector(".tdsex").textContent = newObj.sex

        form.reset()
    })
    .catch(err => console.error(err))
}


