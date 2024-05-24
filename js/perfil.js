const pokemonContainer = document.getElementById('pokemon-container');
let myPokemon = [];

const fetchMyPokemon = async () => {
    const randomPokemonIds = _.sampleSize(_.range(1, 898), 21);

    const requests = randomPokemonIds.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
    const responses = await Promise.all(requests);

    myPokemon = responses.map(response => ({
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.front_default
    }));

    displayMyPokemon();
};


const displayMyPokemon = () => {
    pokemonContainer.innerHTML = myPokemon.map(pokemon => `
        <div class="pokemon-item" data-pokemon-id="${pokemon.id}" onclick="selectPokemon(event, ${pokemon.id})">
            <!-- Adicionado o evento onclick e o atributo data-pokemon-id -->
            <img class="pokemon-image" src="${pokemon.image}" alt="${pokemon.name}" />
            <p class="pokemon-name">${pokemon.name}</p>
            <button class="edit-button">Editar</button>
            <button class="delete-button">Eliminar</button>
        </div>
    `).join('');
};

const selectPokemon = (event, pokemonId) => {

clearOldButtons();

const pokemon = myPokemon.find(p => p.id === pokemonId);
const pokemonItem = event.currentTarget;
const editButton = pokemonItem.querySelector('.edit-button');
const deleteButton = pokemonItem.querySelector('.delete-button');
editButton.style.display = 'inline-block';
deleteButton.style.display = 'inline-block';
editButton.addEventListener('click', () => editPokemon(pokemon));
deleteButton.addEventListener('click', () => confirmDeletePokemon(pokemon));
};


const clearOldButtons = () => {
const oldButtons = document.querySelectorAll('.edit-button, .delete-button');
oldButtons.forEach(button => button.style.display = 'none');
};

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

const deletePokemon = (pokemonId) => {
    removeConfirmationMessage(); 
    myPokemon = myPokemon.filter(p => p.id !== pokemonId);
    displayMyPokemon();
};

const editPokemon = (pokemon) => {
const editConfirmationMessage = document.querySelector('.edit-confirmation-message');
const editPokemonImage = document.getElementById('edit-pokemon-image');
const editPokemonNameInput = document.getElementById('edit-pokemon-name');

editPokemonImage.src = pokemon.image;
editPokemonImage.alt = pokemon.name;

editConfirmationMessage.style.display = 'block';
editPokemonNameInput.value = pokemon.name;

window.confirmEdit = () => {
    const newName = editPokemonNameInput.value;
    pokemon.name = newName;
    displayMyPokemon();
    editConfirmationMessage.style.display = 'none'; // Esconder o pop-up de edição
};

window.cancelEdit = () => {
    editConfirmationMessage.style.display = 'none'; // Esconder o pop-up de edição
};
};




const cancelDelete = () => {
    removeConfirmationMessage(); 
};

const removeConfirmationMessage = () => {
    const confirmationMessage = document.querySelector('.confirmation-message');
    if (confirmationMessage) {
        confirmationMessage.remove();
    }
};

fetchMyPokemon();

const buttonBack = document.querySelector('.btn-back');
buttonBack.addEventListener('click', () => {
window.location.href = "pokedex.html"; 
});
