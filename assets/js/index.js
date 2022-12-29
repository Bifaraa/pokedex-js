document.addEventListener('DOMContentLoaded', async () => {
   
  

    const contenedor = document.querySelector('.contenedor_cards');
    // la cantidad de pokemones que va a traer de la api
    const CANTIDAD_DE_POKEMONES = 1000;
    const coloresTipo = {
        fire: '#FDDFDF',
        grass: '#DEFDE0',
        electric: '#FCF7DE',
        water: '#DEF3FD',
        ground: '#f4e7da',
        rock: '#d5d5d4',
        fairy: '#fceaff',
        poison: '#c00080',
        bug: '#f8d5a3',
        dragon: '#97b3e6',
        psychic: '#eaeda1',
        flying: '#F5F5F5',
        fighting: '#E6E0D4',
        normal: '#F5F5F5',
        ghost: '#5b61a1',
        ice: '#dfe9f5'
    };
    
    // Object.keys: {'fire', 'grass'...}
    const tipos = Object.keys(coloresTipo);
    
    const traerPokemones = async () => {
        for (let id_pokemon = 1; id_pokemon <= CANTIDAD_DE_POKEMONES; id_pokemon++) {
            fetchPokemones(id_pokemon);
        }
    }

    const fetchPokemones = async (id=0) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const dato = await res.json();
        crearPokemon(dato);
    }

    const crearPokemon = (datos) =>{
         // toma el nombre del pokemon, en caso del Array tener varios toma solo el primero
        const nombre = datos.name[0].toUpperCase() + datos.name.slice(1);

        const id = datos.id.toString();

        // a cada elemento del array que crea el map le toma el nombre, creando un arreglo con los tipos
        const tipos = datos.types.map( tipo => tipo.type.name);

        //busca en la lista de tipos para luego tener la key y devolver el color correspondiente por tipo
        const color = coloresTipo[tipos.find(tipo => tipos.indexOf(tipo) > -1)];

        const pokemon = {
            nombre: nombre,
            id: id,
            tipos: tipos,
            color: color
        }

        insertarHTML(pokemon);
    }

    // crea cada card
    const insertarHTML = (pokemon) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.background = pokemon.color;
        const pokemonInnnerHtml = 
        `
        <div class="contenedor__img">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${pokemon.nombre}">
        </div>
        <hr>
        <div class="contenedor__info">
            <span class="codigo">${pokemon.id.padStart(3, '0')}</span>
            <h3 class="name">${pokemon.nombre}</h3>
            <small class="tipo">Type: <span>${pokemon.tipos}</span> </small>
        </div>
        `
        card.innerHTML = pokemonInnnerHtml;
        contenedor.appendChild(card);
    }

    traerPokemones();
    window.onload = () => {
        const loader = document.querySelector('.loader');
        loader.parentNode.removeChild(loader);
        const body = document.querySelector('.hidden');
        body.classList.remove('hidden');
    }
});

function main(){
    
}
