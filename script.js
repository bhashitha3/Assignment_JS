const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
    let offset = 0;

    // Function to fetch Pikachu data from the PokeAPI
    function fetchPikachuData(offset, limit) {
      return fetch(`${baseUrl}?offset=${offset}&limit=${limit}`)
        .then(response => response.json())
        .then(data => data.results);
    }

    // Function to render Pikachu images
    function renderPikachus(pikachus) {
      const galleryElement = document.getElementById('pikachuGallery');
      galleryElement.innerHTML = '';

      pikachus.forEach(pikachu => {
        const pikachuId = pikachu.url.split('/')[6];
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pikachuId}.png`;
        const img = document.createElement('img');
        img.src = imgUrl;
        galleryElement.appendChild(img);
      });
    }

    // Function to load the initial 3 Pikachu images on page load
    function loadInitialPikachus() {
      fetchPikachuData(offset, 3)
        .then(pikachus => renderPikachus(pikachus));
    }

    // Function to handle NEXT button click
    function handleNextClick() {
      offset += 3;
      fetchPikachuData(offset, 3)
        .then(pikachus => renderPikachus(pikachus));
    }

    // Function to handle PREV button click
    function handlePrevClick() {
      if (offset >= 3) {
        offset -= 3;
        fetchPikachuData(offset, 3)
          .then(pikachus => renderPikachus(pikachus));
      }
    }
    function renderPikachus(pikachus) {
      const galleryElement = document.getElementById('pikachuGallery');
      galleryElement.innerHTML = '';

      pikachus.forEach(pikachu => {
        const pikachuId = pikachu.url.split('/')[6];
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pikachuId}.png`;
        const pikachuName = pikachu.name;
        const card = document.createElement('div');
        card.classList.add('pikachu-card');

        const img = document.createElement('img');
        img.src = imgUrl;
        card.appendChild(img);

        const pikachuInfo = document.createElement('div');
        pikachuInfo.classList.add('pikachu-info');

        const nameElement = document.createElement('div');
        nameElement.classList.add('pikachu-name');
        nameElement.textContent = pikachuName;
        pikachuInfo.appendChild(nameElement);

        const idElement = document.createElement('div');
        idElement.classList.add('pikachu-id');
        idElement.textContent = `ID: ${pikachuId}`;
        pikachuInfo.appendChild(idElement);

        card.appendChild(pikachuInfo);

        galleryElement.appendChild(card);
      });
    }

    // Event listeners for buttons
    $(document).ready(() => {
      loadInitialPikachus();

      $('#nextButton').click(() => {
        handleNextClick();
      });

      $('#prevButton').click(() => {
        handlePrevClick();
      });
    });