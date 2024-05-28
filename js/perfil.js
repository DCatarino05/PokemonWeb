// Seleciona o elemento HTML onde os Pokémon serão exibidos
const pokemonContainer = document.getElementById('pokemon-container');

// Array que armazenará os Pokémon do usuário
let myPokemon = [];

// Objeto que define os IDs dos Pokémon de cada equipe
const teamPokemons = {
    valor: [4, 5, 6, 45, 46, 47, 98, 99, 100, 101, 118, 119, 124, 126, 129, 136, 146, 218, 219, 224, 225],
    instinct: [14, 15, 18, 172, 25, 26, 27, 28, 38, 54, 63, 64, 65, 69, 70, 71, 77, 78, 96, 97, 125],
    mystic: [7, 8, 9, 29, 30, 31, 55, 60, 61, 62, 66, 67, 68, 72, 147, 148, 144, 501, 502, 503, 393]
};

// Função assíncrona para buscar os Pokémon da equipe do usuário
const fetchMyPokemon = async () => {
    // Obtém a equipe do usuário do localStorage
    const team = localStorage.getItem('pokemonTeam');
    // Verifica se uma equipe foi selecionada, caso contrário, redireciona para a página de escolha de equipe
    if (!team || !teamPokemons[team]) {
        alert('Nenhuma equipe selecionada!');
        window.location.href = 'escolha-de-time.html';
        return;
    }

    // Obtém os IDs dos Pokémon da equipe
    const pokemonIds = teamPokemons[team];
    // Cria uma lista de promessas para buscar os dados dos Pokémon na API
    const requests = pokemonIds.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
    // Espera até que todas as requisições sejam concluídas
    const responses = await Promise.all(requests);

    // Mapeia as respostas para um formato mais simples
    myPokemon = responses.map(response => ({
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.front_default
    }));

    // Exibe os Pokémon na tela
    displayMyPokemon();
};

// Função para exibir os Pokémon na tela
const displayMyPokemon = () => {
    // Gera o HTML para cada Pokémon e insere no container
    pokemonContainer.innerHTML = myPokemon.map(pokemon => `
        <div class="pokemon-item" data-pokemon-id="${pokemon.id}" onclick="selectPokemon(event, ${pokemon.id})">
            <img class="pokemon-image" src="${pokemon.image}" alt="${pokemon.name}" />
            <p class="pokemon-name">${pokemon.name}</p>
            <button class="edit-button" style="display: none;">Editar</button>
            <button class="delete-button" style="display: none;">Eliminar</button>
        </div>
    `).join('');
};

// Função chamada quando um Pokémon é selecionado
const selectPokemon = (event, pokemonId) => {
    // Esconde os botões de edição e exclusão antigos
    clearOldButtons();
    
    // Encontra o Pokémon selecionado no array myPokemon
    const pokemon = myPokemon.find(p => p.id === pokemonId);
    // Obtém o elemento HTML do Pokémon selecionado
    const pokemonItem = event.currentTarget;
    // Seleciona os botões de edição e exclusão
    const editButton = pokemonItem.querySelector('.edit-button');
    const deleteButton = pokemonItem.querySelector('.delete-button');
    // Exibe os botões de edição e exclusão
    editButton.style.display = 'inline-block';
    deleteButton.style.display = 'inline-block';
    // Adiciona event listeners aos botões de edição e exclusão
    editButton.addEventListener('click', () => editPokemon(pokemon));
    deleteButton.addEventListener('click', () => confirmDeletePokemon(pokemon));
};

// Função para esconder os botões de edição e exclusão antigos
const clearOldButtons = () => {
    const oldButtons = document.querySelectorAll('.edit-button, .delete-button');
    oldButtons.forEach(button => button.style.display = 'none');
};

// Função para exibir a mensagem de confirmação de exclusão
const confirmDeletePokemon = (pokemon) => {
    const confirmationMessage = `
        <div class="confirmation-message">
            <img class="pokemon-image" src="${pokemon.image}" alt="${pokemon.name}" />
            <p class="confirmarel">Tem certeza que deseja excluir o Pokémon ${pokemon.name}?</p>
            <div class="confirmation-buttons">
                <button class="confirmation-button confirm" onclick="deletePokemon(${pokemon.id})">Confirmar</button>
                <button class="confirmation-button cancel" onclick="cancelDelete()">Cancelar</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', confirmationMessage);
};

// Função para excluir um Pokémon
const deletePokemon = (pokemonId) => {
    // Remove a mensagem de confirmação
    removeConfirmationMessage();
    // Remove o Pokémon do array myPokemon
    myPokemon = myPokemon.filter(p => p.id !== pokemonId);
    // Atualiza a exibição dos Pokémon
    displayMyPokemon();
};

// Função para editar um Pokémon
const editPokemon = (pokemon) => {
    // Seleciona os elementos HTML relacionados à edição
    const editConfirmationMessage = document.querySelector('.edit-confirmation-message');
    const editPokemonImage = document.getElementById('edit-pokemon-image');
    const editPokemonNameInput = document.getElementById('edit-pokemon-name');

    // Define a imagem e o nome do Pokémon a ser editado
    editPokemonImage.src = pokemon.image;
    editPokemonImage.alt = pokemon.name;

    // Exibe a mensagem de confirmação de edição
    editConfirmationMessage.style.display = 'block';
    editPokemonNameInput.value = pokemon.name;

    // Define a função para confirmar a edição
    window.confirmEdit = () => {
        const newName = editPokemonNameInput.value;
        pokemon.name = newName;
        displayMyPokemon();
        editConfirmationMessage.style.display = 'none';
    };

    // Define a função para cancelar a edição
    window.cancelEdit = () => {
        editConfirmationMessage.style.display = 'none';
    };
};

// Função para cancelar a exclusão de um Pokémon
const cancelDelete = () => {
    removeConfirmationMessage();
};

// Função para remover a mensagem de confirmação
const removeConfirmationMessage = () => {
    const confirmationMessage = document.querySelector('.confirmation-message');
    if (confirmationMessage) {
        confirmationMessage.remove();
    }
};

// Chama a função para buscar os Pokémon do usuário quando a página carrega
fetchMyPokemon();

// Adiciona event listener ao botão de voltar
const buttonBack = document.querySelector('.btn-back');
buttonBack.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Adiciona event listener ao botão da Pokédex
const buttonPokedex = document.querySelector('.btn-pokedex');
buttonPokedex.addEventListener('click', () => {
    window.location.href = 'pokedex.html';
});
