const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const container = $('.container')
const loadBtn = $('.loadmore-btn')
const searchInput = $('#search')

let currentIndex = 0

const getPokemon = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json()
        return data
    }
    catch(error) {
        console.log('Lỗi : ', error)

    }
}



function resetContainer(){
    container.innerHTML = ''
}

async function createCard(obj){
    const response = await fetch(obj.url)
    const data = await response.json()
    
    const div = document.createElement('div')
    div.className = 'card'
     
    div.innerHTML = `<p>#${data.id}</p>
    <h3>${data.name}</h3>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="pic">`
    
    const types = document.createElement('div')
    types.innerHTML = '<div class="labels"></div>'
    data.types.forEach((value) => {
        const type = document.createElement('div')
        type.innerHTML = `<div class="label ${value.type.name}">${value.type.name}</div>`
        types.appendChild(type)
    }) 
    div.appendChild(types)
    container.appendChild(div)

}
function render(data ,start, end){
    for (let i = start; i <= end; i++){
        createCard(data.results[i])
    }
}

async function loadPokemon(){
    const api = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898'
    const data = await getPokemon(api)
    console.log('Dữ liệu trả về : ', data);

    render(data,currentIndex, currentIndex + 35)
    currentIndex += 35
    searchPokemon(data)

    
}

function loadMorePokemon(){
    loadBtn.addEventListener('click', debounce(loadPokemon(), 500))
}

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Tìm kiếm pokemon theo tên
function searchPokemon(data){
    function searchHandle(value){
        if (searchInput.value == "") {
            resetContainer()
            render(data, 0, currentIndex)
        }
        else {
            resetContainer()
            const searchResults = data.results.filter((value) => {
                return value.name.includes(searchInput.value)
            })
            searchResults.forEach((value) => {
                createCard(value)
            })
        }
    }

    searchInput.addEventListener('input', debounce(searchHandle, 500))

}


function app(){
    loadPokemon()
    loadMorePokemon()
}

app()
