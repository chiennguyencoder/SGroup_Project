const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const MAX_POKEMON = 898

const btn = $('.loadMoreButton')
const search_input = $('.search-input')
const container = $('.pokemon-container')
const app = $('#app')

let currentIndex = 0;
let multi = 1;

async function createCard(pokemon_url){
    const response = await fetch(pokemon_url)
    const data = await response.json()

    const name = data.name
    const id = data.id
    const img_href = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    const typesList = data.types

    const div = document.createElement('div')
    div.className = 'poke-card'
    div.setAttribute('id-pokemon', id)
    
    div.innerHTML = `<p class="poke-id">#${id}</p>
                <div class="poke-img" style="background-image: url('${img_href}')"></div>
                <h3 class="poke-name">${name}</h3>`
    
    const typesDiv = document.createElement('div')
    typesDiv.className = 'poke-types'

    typesList.forEach( types => {
        typesDiv.innerHTML += `<div class="type ${types.type.name}">${types.type.name}</div>`
    })

    div.appendChild(typesDiv)
    return div
}

// function clickCardHandle(){
//     const pageDetail = $('#detail-page')
//     const loadingText = $('.detail-loading')
//     app.style.display = 'none'
//     pageDetail.style.display = 'block'

// }

async function loadPokemon(allPokemons, start, end) {
    console.log(`Load pokemon từ ${start} đến ${end}`)

    const fragment = document.createDocumentFragment();
    const cardPromises = []

    for (let i = start; i <= end; i++){
        cardPromises.push(createCard(allPokemons[i - 1].url))
    }
    currentIndex = end;
    
    const cards = await Promise.all(cardPromises)
    cards.forEach((card) => {
        fragment.appendChild(card)
        // card.addEventListener('click', clickCardHandle)
    })

    container.appendChild(fragment)
} 


function loadMorePokemon(allPokemons){
    function loadMoreHandle(){
        const end = (currentIndex*2 <= MAX_POKEMON ? currentIndex*2 : currentIndex + (MAX_POKEMON - currentIndex))
        loadPokemon(allPokemons, currentIndex + 1, end)
    }

    btn.addEventListener('click', loadMoreHandle)
}

function resetContainer(){
    container.innerHTML = ''
}

function searchPokemon(allPokemons){
    let timeOut;
    async function searchHandle(){
        clearTimeout(timeOut)

        timeOut = setTimeout(async () => {
            if (search_input.value === ''){
                resetContainer()
                loadPokemon(allPokemons, 1, currentIndex)
                return
            }
    
            let searchResults = []
            searchResults = allPokemons.filter((pokemon) => {
                return  (pokemon.name.includes(search_input.value))
            })
    
            resetContainer()
    
            const fragment = document.createDocumentFragment()
            let cardsPromises = []
    
            searchResults.forEach(pokemon => {
                cardsPromises.push(createCard(pokemon.url))
            })
    
            const cards = await Promise.all(cardsPromises)
            // console.log(cards)
            if (cards.length === 0){
                console.log(`No pokemon matched with "${search_input.value}"`)
                container.innerHTML = `<div class="noFound">No pokemon matched with <b>"${search_input.value}"</b></div>`
                btn.style.display = 'none'
            }
            else {
            cards.forEach(card => {
                fragment.appendChild(card)
            })
            container.appendChild(fragment)
            }
    
            
        }, 200)
        
    }

    search_input.addEventListener('input', searchHandle)
}

async function getData(){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${MAX_POKEMON}`)
    const data = await response.json()

    const allPokemons = data.results
    loadPokemon(allPokemons, 1, currentIndex + 36)
    loadMorePokemon(allPokemons)
    searchPokemon(allPokemons)
    // clickHandle()
}


getData()
