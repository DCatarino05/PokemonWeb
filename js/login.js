document.getElementById("teamForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const selectedTeam = document.querySelector('input[name="team"]:checked').value;
    localStorage.setItem('pokemonTeam', selectedTeam);
    window.location.href = "pokedex.html"; 
  });

  // Certifique-se de que o código JavaScript seja executado após o carregamento completo do DOM
  document.addEventListener("DOMContentLoaded", function() {
    const pokedexImage = document.querySelector('.pokedex');
    const teamRed = document.getElementById('teamRed');
    const teamBlue = document.getElementById('teamBlue');
    const teamYellow = document.getElementById('teamYellow');
    
    document.querySelectorAll('input[name="team"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
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