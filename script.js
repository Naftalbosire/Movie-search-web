const API_KEY = '32a3d856';

document.getElementById('searchBtn').addEventListener('click', searchMovies);

document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') searchMovies();
});

function searchMovies() {
  const query = document.getElementById('searchInput').value.trim();
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (!query) {
    resultsContainer.innerHTML = '<p>Please enter a movie name.</p>';
    return;
  }

  fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      if (data.Response === "True") {
        data.Search.forEach(movie => {
          const movieEl = document.createElement('div');
          movieEl.className = 'movie-card';
          movieEl.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/80x120?text=No+Image'}" alt="${movie.Title}">
            <div class="movie-info">
              <div class="movie-title">${movie.Title}</div>
              <div class="movie-year">${movie.Year}</div>
            </div>
          `;
          resultsContainer.appendChild(movieEl);
        });
      } else {
        resultsContainer.innerHTML = `<p>${data.Error}</p>`;
      }
    })
    .catch(err => {
      console.error(err);
      resultsContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    });
}
