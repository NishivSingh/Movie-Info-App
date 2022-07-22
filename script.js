const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5dde7e49a91ba680574b7096c7b46cc0&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w500'

const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=5dde7e49a91ba680574b7096c7b46cc0&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const home = document.getElementById('home');

getMovies(API_URL);
async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}

function showMovies(movies){
    main.innerHTML = "";

    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie;

        const movie_ele = document.createElement('div');
        movie_ele.classList.add("movie");
        movie_ele.innerHTML = `
            <img src="${IMG_PATH +  poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColorByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`

        main.appendChild(movie_ele);
        
    });
}

function getColorByRate(vote){
    if (vote >= 8){
        return "green";
    }
    else if(vote >= 5){
        return "orange";
    }
    else{
        return "red";
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchTerm = search.value

    if (searchTerm && searchTerm !== ''){
        getMovies(SEARCH_URL + searchTerm);

        search.value = "";
    }
    else{
        window.location.reload();
    }
})

home.addEventListener('click',(e)=>{
    getMovies(API_URL);
})