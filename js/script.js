// Adiciona um event listener para quando o conteúdo da página estiver carregado
document.addEventListener("DOMContentLoaded", function() {
  // Seleciona elementos HTML que serão manipulados
  const pokemonName = document.querySelector('.pokemon__name');
  const pokemonNumber = document.querySelector('.pokemon__number');
  const pokemonImage = document.querySelector('.pokemon__image');
  const form = document.querySelector('.form');
  const input = document.querySelector('.input__search');
  const buttonPrev = document.querySelector('.btn-prev');
  const buttonNext = document.querySelector('.btn-next');
  const buttonStats = document.querySelector('.btn-stats');
  
  // Variável para manter o ID do Pokémon atual
  let searchPokemon = 1;

  // Função assíncrona para buscar os dados de um Pokémon pela API
  const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    // Verifica se a resposta da API é válida
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
  }

  // Função assíncrona para buscar as estatísticas de um Pokémon pela API
  const fetchPokemonStats = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    // Verifica se a resposta da API é válida
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      // Exibe as estatísticas do Pokémon
      displayPokemonStats(data);
    } else {
      console.error('Erro ao buscar estatísticas do Pokémon');
    }
  }

  // Função para exibir as estatísticas do Pokémon em um alerta
  const displayPokemonStats = (pokemonData) => {
    const stats = pokemonData.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`);
    alert(`Estatísticas do ${pokemonData.name}:\n${stats.join('\n')}`);
  }

  // Função para renderizar os dados do Pokémon na página
  const renderPokemon = async (pokemon) => {
    // Exibe mensagem de carregamento
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    // Busca os dados do Pokémon
    const data = await fetchPokemon(pokemon);

    // Se os dados do Pokémon forem encontrados, exibe-os
    if (data) {
      pokemonImage.style.display = 'block';
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      input.value = '';
      searchPokemon = data.id;
    } else {
      // Se o Pokémon não for encontrado, exibe mensagem de erro
      pokemonImage.style.display = 'none';
      pokemonName.innerHTML = 'Not found :c';
      pokemonNumber.innerHTML = '';
    }
  }

  // Adiciona um event listener ao formulário para buscar o Pokémon ao submeter o formulário
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
  });

  // Adiciona um event listener ao botão "Prev" para buscar o Pokémon anterior
  buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }
  });

  // Adiciona um event listener ao botão "Next" para buscar o próximo Pokémon
  buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  });

  // Adiciona um event listener ao botão "Stats" para buscar e exibir as estatísticas do Pokémon atual
  buttonStats.addEventListener('click', () => {
    fetchPokemonStats(searchPokemon);
  });

  // Renderiza o Pokémon inicial ao carregar a página
  renderPokemon(searchPokemon);
});
