// Ejercicio 1: Recuperar la información de pikachu del API de pokemon y mostrar en la web su imagen frontal y su nombre

// async function getPokemon() {
//     const r = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
//     const d = await r.json();
//     const pokemon = d.results;
//     console.log(pokemon);
//     const selectedPokemon = pokemon[24];
//     async function getSelectedPokemon() {
//         const r = await fetch(`${selectedPokemon.url}`);
//         const d = await r.json();
//         const pokemonSprite = d.sprites.front_default;
//         const pPokemonImg = document.createElement('img');
//         const pPokemonName = document.createElement('p');
//         pPokemonName.textContent = selectedPokemon.name;
//         pPokemonImg.setAttribute('src', `${pokemonSprite}`);
//         document.body.appendChild(pPokemonImg);
//         document.body.appendChild(pPokemonName);
//     }
//     getSelectedPokemon();

// }
// getPokemon();


// Ejercicio 2: Construcción de la aplicación de POKEDEX:
// Vamos a construir una aplicación para mostrar una pokedex (ver imagen de ejemplo de diseño). La pokedex:
//  - Mostrará el listado con los primeros 150 pokemons en orden. Para cada pokemon se mostrará:
//        * Imagen frontal del pokemon
//        * Nombre del pokemon
//        * Tipo del pokemon
//         * Número de ID del pokemon
//  - Se añadirá un buscador que cuando el usuario vaya escribiendo el nombre, en la lista solo aparecerán los que contengan el texto buscado en su nombre.
//  - (NO ES TRIVIAL) Al hacer click en un pokemon desaparecerá el listado y se mostrará información detallada de ese pokemon (Elegir algunos datos como el ataque)
//  Para obtener los datos utilizaremos el API de https://pokeapi.co/. En concreto necesitaremos obtener datos de las siguientes URL’s:
//  - https://pokeapi.co/api/v2/pokemon?limit=150 => devuelve el listado de los 150 primeros pokemon con su nombre y la URL del API que contiene su información.
//  - Con la URL de cada pokemon obtendremos la información detallada de ese pokemon. Tendremos que utilizar esa URL para obtener esos datos para la pokedex (edited) 

async function fetchListPokemon() {
    const r = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const d = await r.json();
    return d.results;
}

async function getAllPokemon(url) {
    const r = await fetch(url);
    const d = await r.json();
    return d;

}

// function getThePokemon(name){
//     if(){}
// }

fetchListPokemon().then(listPokemon => { //hay que trabajar con then para poder utilizar d.results //listPokemon es igual a d.results
    listPokemon.forEach(e => {
        const pokeName = e.name;
        const pokeUrl = e.url;
        getAllPokemon(pokeUrl).then(infoIndPokemon => {//infoIndPokemon es igual a d de getAllPokemon
            const pPokemonContainer = document.createElement('div');
            pPokemonContainer.classList.add('pokemon__container');
            pPokemonContainer.classList.add(`${infoIndPokemon.name}__name`);
            const pName = document.createElement('h2');
            pName.textContent = infoIndPokemon.name;
            pName.classList.add(`${infoIndPokemon.name}__name`);
            pName.classList.add('pokemon__name');
            const imgPokemon = document.createElement('img');
            imgPokemon.setAttribute('src', infoIndPokemon.sprites.front_default);
            imgPokemon.classList.add(`${infoIndPokemon.name}__img`);
            imgPokemon.classList.add('pokemon__img');
            const idPokemon = document.createElement('p');
            idPokemon.textContent = infoIndPokemon.id;
            idPokemon.classList.add(`${infoIndPokemon.name}__id`);
            idPokemon.classList.add('pokemon__id');
            const typePokemonContainer = document.createElement('ul');
            typePokemonContainer.classList.add(`${infoIndPokemon.name}__type__container`);
            pPokemonContainer.appendChild(imgPokemon);
            pPokemonContainer.appendChild(pName);
            pPokemonContainer.appendChild(idPokemon);
            infoIndPokemon.types.forEach(e => {
                const typePokemon = document.createElement('li');
                typePokemon.classList.add(`${infoIndPokemon.name}__type`);
                typePokemon.classList.add('pokemon__type');
                typePokemon.textContent = e.type.name;
                typePokemonContainer.appendChild(typePokemon);
            })
            pPokemonContainer.appendChild(typePokemonContainer);
            const pokedexContainer = document.querySelector('.pokedex__container');
            pokedexContainer.appendChild(pPokemonContainer);
        })
    })
})

const searchForm = document.querySelector('.search__input');
searchForm.addEventListener('keyup', (e) => {
    e.preventDefault();
    const inputPokemon = e.target.value;
    console.log(inputPokemon)
    // getThePokemon(inputPokemon);
})

// fetchListPokemon().then(listPokemon => { //hay que trabajar con then para poder utilizar d.results //listPokemon es igual a d.results
//     listPokemon.forEach(e => {
//         const pokeName = e.name;
//         const pokeUrl = e.url;
//         getAllPokemon(pokeUrl).then(infoIndPokemon => { })
//     })
// })
