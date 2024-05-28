// Adiciona um event listener ao formulário com id "teamForm" para o evento "submit"
document.getElementById("teamForm").addEventListener("submit", function(event) {
  // Previne o comportamento padrão do formulário (recarregar a página)
  event.preventDefault();
  // Obtém o valor do time selecionado
  const selectedTeam = document.querySelector('input[name="team"]:checked').value;
  // Armazena o time selecionado no localStorage
  localStorage.setItem('pokemonTeam', selectedTeam);
  // Redireciona o usuário para a página "pokedex.html"
  window.location.href = "pokedex.html"; 
});

// Adiciona um event listener para quando o conteúdo da página estiver carregado
document.addEventListener("DOMContentLoaded", function() {
  // Seleciona a imagem da Pokédex
  const pokedexImage = document.querySelector('.pokedex');
  const teamRed = document.getElementById('teamRed');
  const teamBlue = document.getElementById('teamBlue');
  const teamYellow = document.getElementById('teamYellow');

  // Adiciona event listeners aos radio buttons do time
  document.querySelectorAll('input[name="team"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      // Quando o valor do radio button muda, verifica qual time foi selecionado
      if (radio.checked) {
        // Altera a imagem da Pokédex de acordo com o time selecionado
        switch (radio.value) {
          case 'red':
            pokedexImage.src = "./images/pokedex_red.png";
            break;
          case 'blue':
            pokedexImage.src = "./images/pokedex_blue.png";
            break;
          case 'yellow':
            pokedexImage.src = "./images/pokedex_yellow.png";
            break;
          default:
            pokedexImage.src = "./images/pokedex.png";
        }
      }
    });
  });
});

// Adiciona outro event listener para quando o conteúdo da página estiver carregado
document.addEventListener("DOMContentLoaded", function() {
  // Seleciona a imagem da Pokédex
  const pokedexImage = document.querySelector('.pokedex');

  // Adiciona event listeners aos radio buttons do time
  document.querySelectorAll('input[name="team"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      // Quando o valor do radio button muda, verifica qual time foi selecionado
      if (radio.checked) {
        // Altera a imagem da Pokédex de acordo com o time selecionado
        switch (radio.value) {
          case 'red':
            pokedexImage.src = "./images/timevalor.png";
            break;
          case 'blue':
            pokedexImage.src = "./images/timeazul.png";
            break;
          case 'yellow':
            pokedexImage.src = "./images/timeamarela.png";
            break;
          default:
            pokedexImage.src = "./images/pokedex.png";
        }

        // Exibe a imagem da Pokédex
        pokedexImage.style.display = "block";
      }
    });
  });

  // Adiciona um event listener ao formulário com id "teamForm" para o evento "submit"
  document.getElementById("teamForm").addEventListener("submit", function(event) {
    // Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();
    // Obtém o valor do time selecionado
    const selectedTeam = document.querySelector('input[name="team"]:checked').value;
    // Armazena o time selecionado no localStorage
    localStorage.setItem('pokemonTeam', selectedTeam);
    // Redireciona o usuário para a página "pokedex.html"
    window.location.href = "pokedex.html"; 
  });
});
