const teamPokemons = {
  valor: [4, 5, 6, 45, 46, 47, 98, 99, 100, 101, 118, 119, 124, 126, 129, 136, 146, 218, 219, 224, 225],
  instinct: [14, 15, 18, 172, 25, 26, 27, 28, 38, 54, 63, 64, 65, 69, 70, 71, 77, 78, 96, 97, 125],
  mystic: [7, 8, 9, 29, 30, 31, 55, 60, 61, 62, 66, 67, 68, 72, 147, 148, 144, 501, 502, 503, 393]
};

let searchPokemon = 0;
let currentTeamPokemonIds = [];

document.addEventListener("DOMContentLoaded", async () => {
  const buttonBack = document.querySelector('.btn-back');
  buttonBack.addEventListener('click', () => {
    window.location.href = "perfil.html";
  });

  const buttonPerfil = document.querySelector('.btn-perfil');
  buttonPerfil.addEventListener('click', () => {
    window.location.href = "perfil.html";
  });

  const pokedexImage = document.querySelector('.pokedex');
  const pokemonTeam = localStorage.getItem('pokemonTeam');

  if (pokemonTeam && teamPokemons[pokemonTeam]) {
    currentTeamPokemonIds = teamPokemons[pokemonTeam];
    searchPokemon = currentTeamPokemonIds[0]; // Start with the first Pokémon of the team

    switch (pokemonTeam) {
      case 'valor':
        pokedexImage.src = "./images/pokedex.png";
        break;
      case 'instinct':
        pokedexImage.src = "./images/pokedexamarela.png";
        break;
      case 'mystic':
        pokedexImage.src = "./images/pokedexazul.png";
        break;
      default:
        pokedexImage.src = "./images/pokedex.png";
    }

    await renderPokemon(searchPokemon);
    await fetchAndDisplayStats(searchPokemon); // Fetch and display stats for the first Pokémon
  } else {
    alert('Nenhuma equipe selecionada!');
    window.location.href = 'escolha-de-time.html';
  }
});

const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonStats = document.querySelector('.btn-stats');
const pokemonStatsContainer = document.querySelector('.pokemon-stats-container');
const statsList = document.querySelector('.pokemon-stats');

const fetchPokemon = async (pokemonId) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const fetchPokemonDescription = async (pokemonId) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
  
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    const descriptionEntry = data.flavor_text_entries.find(entry => entry.language.name === 'en');
    return descriptionEntry ? descriptionEntry.flavor_text : 'Description not available';
  } else {
    console.error('Error fetching Pokémon description');
    return 'Description not available';
  }
};

const fetchPokemonStats = async (pokemonId) => {
  const data = await fetchPokemon(pokemonId);

  if (data) {
    return data.stats;
  } else {
    console.error('Erro ao buscar estatísticas do Pokémon');
    return [];
  }
};

const renderPokemon = async (pokemonId) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemonId);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data.sprites.front_default;
    input.value = '';
    searchPokemon = data.id;

    // Fetch and display the Pokémon description
    const description = await fetchPokemonDescription(pokemonId);
    const pokemonDescriptionElement = document.querySelector('.pokemon-description');
    pokemonDescriptionElement.innerHTML = description;

  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    const pokemonDescriptionElement = document.querySelector('.pokemon-description');
    pokemonDescriptionElement.innerHTML = 'Description not available';
  }
};

const fetchAndDisplayStats = async (pokemonId) => {
  const stats = await fetchPokemonStats(pokemonId);
  displayPokemonStats(stats);
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const inputValue = input.value.toLowerCase();
  const foundPokemon = currentTeamPokemonIds.find(id => id == inputValue || id == inputValue);

  if (foundPokemon) {
    await renderPokemon(foundPokemon);
    fetchAndDisplayStats(foundPokemon); // Fetch and display stats for the searched Pokémon
  } else {
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
    pokemonStatsContainer.style.display = 'none'; // Hide stats container
    const pokemonDescriptionElement = document.querySelector('.pokemon-description');
    pokemonDescriptionElement.innerHTML = 'Description not available';
  }
});

buttonPrev.addEventListener('click', async () => {
  const currentIndex = currentTeamPokemonIds.indexOf(searchPokemon);
  if (currentIndex > 0) {
    searchPokemon = currentTeamPokemonIds[currentIndex - 1];
    await renderPokemon(searchPokemon);
    fetchAndDisplayStats(searchPokemon); // Fetch and display stats for the previous Pokémon
  }
});

buttonNext.addEventListener('click', async () => {
  const currentIndex = currentTeamPokemonIds.indexOf(searchPokemon);
  if (currentIndex < currentTeamPokemonIds.length - 1) {
    searchPokemon = currentTeamPokemonIds[currentIndex + 1];
    await renderPokemon(searchPokemon);
    fetchAndDisplayStats(searchPokemon); // Fetch and display stats for the next Pokémon
  }
});

buttonStats.addEventListener('click', async () => {
  if (!statsVisible) {
    const stats = await fetchPokemonStats(searchPokemon);
    displayPokemonStats(stats);
    statsVisible = true; // Now stats are visible
  } else {
    pokemonStatsContainer.style.display = 'none'; // Hide stats
    statsVisible = false; // Now stats are hidden
  }
});

const displayPokemonStats = (stats) => {
  statsList.innerHTML = '';

  const orderedStats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

  orderedStats.forEach(statName => {
    const stat = stats.find(s => s.stat.name === statName);
    if (stat) {
      const statElement = document.createElement('div');
      statElement.classList.add('stat-bar');

      const statNameDiv = document.createElement('div');
      statNameDiv.textContent = statName === 'special-attack' ? 'Special Attack' : capitalizeFirstLetter(statName);
      statNameDiv.classList.add('stat-name');

      const statValue = document.createElement('div');
      statValue.classList.add('stat-value');
      const statValueSpan = document.createElement('span');
      statValueSpan.style.width = `${stat.base_stat * 2}px`;
      statValueSpan.dataset.stat = statName;
      statValueSpan.textContent = stat.base_stat;
      statValue.appendChild(statValueSpan);

      statElement.appendChild(statNameDiv);
      statElement.appendChild(statValue);

      statsList.appendChild(statElement);
    }
  });

  pokemonStatsContainer.style.display = stats.length > 0 ? 'flex' : 'none';
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

let cachedStats = []; // Variável global para armazenar temporariamente as estatísticas
let statsVisible = false; // Inicialmente, as estatísticas estão ocultas

const displayCachedStats = () => {
  if (cachedStats.length > 0) {
    displayPokemonStats(cachedStats);
  }
};


// Função para obter a cor da barra com base na estatística
const getColorForStat = (statName) => {
  switch (statName) {
    case 'hp':
      return 'green'; // Verde para HP
    case 'attack':
      return 'red'; // Vermelho para Ataque
    case 'defense':
      return 'blue'; // Azul para Defesa
    case 'special-attack':
      return 'orange'; // Laranja para Ataque Especial
    case 'special-defense':
      return 'purple'; // Roxo para Defesa Especial
    case 'speed':
      return 'yellow'; // Amarelo para Velocidade
    default:
      return 'gray'; // Cinza para outras estatísticas
  }
};
