const pokedexContainer = document.querySelector('.pokedex__container');
const limitOffsetDOM = document.querySelector('.form__container');
let originalPokemonList = [];

function generatePokemonTypeListDOM(types) {
    //this function generates a list with all the types of a given pokemon and returns the list
    const pokemonTypeListDOM = document.createElement('ul');
    pokemonTypeListDOM.classList.add('pokemon__list-type');
    types.forEach(t => {
        const pokemonTypeItemDOM = document.createElement('li');
        pokemonTypeItemDOM.textContent = t.type.name;
        pokemonTypeListDOM.appendChild(pokemonTypeItemDOM);
    })
    return pokemonTypeListDOM;
}

function drawPokemon(pokemon) {
    //this function draws a given pokemon

    const pokemonContainerDOM = document.createElement('div');
    pokemonContainerDOM.classList.add('pokemon-card__container'); //General class
    pokemonContainerDOM.setAttribute('data-name', pokemon.name); //pokemon-specific class
    pokemonContainerDOM.addEventListener('click', e => {
        //creation of clone card
        const cardDOM = document.querySelector(`[data-name="${pokemon.name}"]`);
        //Create a deep clone of selected card
        const cardDOMCopy = cardDOM.cloneNode(true);
        pokedexContainer.style = 'display:none;'
        document.body.appendChild(cardDOMCopy);

        //added back button
        const buttonBack = document.createElement('button');
        buttonBack.textContent = 'back';
        buttonBack.classList.add('button__back');
        cardDOMCopy.insertAdjacentElement('beforebegin',buttonBack);

        //event listener back button
        buttonBack.addEventListener('click', () => {
            pokedexContainer.style = 'display:flex;';
            cardDOMCopy.style = 'display:none;'
            buttonBack.style.display = 'none'; //to revert the behavior of the button to the original state
        })

        //same events single-chosen card
        cardDOMCopy.addEventListener('mouseenter', e => { //added card flip on mouseenter
            pokemonImgBackDOM.style.display = 'inline';
            pokemonImgBackDOM.style.alignSelf = 'center';
            pokemonImgFrontDOM.style.display = 'none';

        })
        cardDOMCopy.addEventListener('mouseleave', e => { //added card flip on mouseleave
            pokemonImgBackDOM.style.display = 'none';
            pokemonImgFrontDOM.style.alignSelf = 'center';
            pokemonImgFrontDOM.style.display = 'inline';
        })
    })



    pokemonContainerDOM.addEventListener('mouseenter', e => { //added card flip on mouseenter
        pokemonImgBackDOM.style.display = 'inline';
        pokemonImgBackDOM.style.alignSelf = 'center';
        pokemonImgFrontDOM.style.display = 'none';

    })
    pokemonContainerDOM.addEventListener('mouseleave', e => { //added card flip on mouseleave
        pokemonImgBackDOM.style.display = 'none';
        pokemonImgFrontDOM.style.alignSelf = 'center';
        pokemonImgFrontDOM.style.display = 'inline';
    })


    const pokemonImgContainerDOM = document.createElement('div');

    const pokemonImgFrontDOM = document.createElement('img');
    pokemonImgFrontDOM.src = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default;
    const pokemonImgBackDOM = document.createElement('img');
    pokemonImgBackDOM.src = pokemon.sprites.versions["generation-v"]["black-white"].animated.back_default;
    pokemonImgContainerDOM.classList.add('pokemon-image__container');
    pokemonImgFrontDOM.classList.add('pokemon-front-image');
    pokemonImgBackDOM.classList.add('pokemon-back-image');

    const pokemonNameDOM = document.createElement('h2');
    pokemonNameDOM.classList.add('pokemon-name')
    pokemonNameDOM.textContent = `${pokemon.name}`;

    const pokemonIdDOM = document.createElement('p');
    pokemonIdDOM.textContent = pokemon.id;
    pokemonIdDOM.classList.add('pokemon-id');

    pokemonImgContainerDOM.appendChild(pokemonImgFrontDOM)
    pokemonImgContainerDOM.appendChild(pokemonImgBackDOM);
    pokemonContainerDOM.appendChild(pokemonImgContainerDOM);
    pokemonContainerDOM.appendChild(pokemonNameDOM);
    pokemonContainerDOM.appendChild(pokemonIdDOM);
    pokemonContainerDOM.appendChild(generatePokemonTypeListDOM(pokemon.types));

    pokedexContainer.appendChild(pokemonContainerDOM);
}

function undrawPokemonList() {
    pokedexContainer.innerHTML = '';
}

async function retrievePokemonList(limit = 151, offset = 0) {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const pokemonList = await r.json();
    return pokemonList.results;     //when the promise is fulfilled the function returs
    //an array of objects(name & url).
}

async function retrievePokemon(url) {
    //gets info from pokemon using URL
    const r = await fetch(url)
    const pokemonInfo = await r.json();
    return pokemonInfo;
    //when fulfilled returns a promise wiht an object with the pokemon info
}

async function retrievePokemonListFromAPI() {
    //saves in the global array a list of the pokemons 
    const pokemonList = await retrievePokemonList();
    //a list of pokemon when the asynchrony of retrievePokemonList() ends.
    const pokemonPromiseList = pokemonList.map(async p => {
        //searches the info from the pokemon its iterating. Returns a promise
        const pokemon = await retrievePokemon(p.url)
        //add pokemon to global list
        originalPokemonList.push(pokemon);
    });
    //wait for all promises to be fulfilled or rejected
    await Promise.allSettled(pokemonPromiseList)
}

async function drawPokemonListFromAPI() {
    await retrievePokemonListFromAPI();
    //global array is available now
    originalPokemonList.sort((a, b) => a.id - b.id);
    originalPokemonList.forEach(p => drawPokemon(p));
}
drawPokemonListFromAPI();

const searchInputDOM = document.querySelector('.search__input');
searchInputDOM.addEventListener('keyup', e => {
    const filteredPokemon = originalPokemonList.filter(p => p.name.includes(e.target.value));
    undrawPokemonList();
    filteredPokemon.forEach(p => drawPokemon(p));
});


//Test part

limitOffsetDOM.addEventListener('submit', e => {
    e.preventDefault();
    limit = e.target.limit.value;
    offset = e.target.offset.value;
    pokedexContainer.innerHTML = '';
    return retrievePokemonList(limit, offset);
})

