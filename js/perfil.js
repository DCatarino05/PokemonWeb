const pokedex = document.getElementById('pokedex');

const fetchPokemonStats = async (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const response = await fetch(url);
    const data = await response.json();
    const stats = data.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
    }));
    return stats;
};

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map((pokeman) => `
        <li class="card" onclick="fetchAndDisplayStats(${pokeman.id})" data-pokemon-id="${pokeman.id}">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
            <div class="stats-container" style="display:none;"></div>
        </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
};
const editPokemon = (pokemonId) => {
    console.log(`Editando Pokémon com ID ${pokemonId}`);
    // Adicione aqui o código para editar o Pokémon com o ID fornecido
};

const deletePokemon = (pokemonId) => {
    console.log(`Excluindo Pokémon com ID ${pokemonId}`);
    // Adicione aqui o código para excluir o Pokémon com o ID fornecido
};


const fetchAndDisplayStats = async (pokemonId) => {
    const card = document.querySelector(`.card[data-pokemon-id="${pokemonId}"]`);
    if (!card) {
        console.error(`Card with pokemon ID ${pokemonId} not found.`);
        return;
    }

    const statsContainer = card.querySelector('.stats-container');
    if (!statsContainer) {
        console.error(`Stats container not found for pokemon ID ${pokemonId}.`);
        return;
    }

    if (statsContainer.innerHTML.trim() === '') {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
        const response = await fetch(url);
        const data = await response.json();
        const stats = data.stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
        }));
        const statsHTML = stats.map((stat) => `<p>${stat.name}: ${stat.value}</p>`).join('');
        statsContainer.innerHTML = statsHTML;
        statsContainer.style.display = 'block';
    } else {
        statsContainer.style.display = statsContainer.style.display === 'none' ? 'block' : 'none';
    }
};


fetchPokemon();
