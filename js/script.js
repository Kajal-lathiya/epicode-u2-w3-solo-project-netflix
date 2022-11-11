const BASE_URL = 'https://striveschool-api.herokuapp.com/api';
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2NjgwODUzMjEsImV4cCI6MTY2OTI5NDkyMX0.-w-mNxtbLWxs9FTT-Wp27ksHjG6PpT8b7kZVdHl4GBw";

onFormSubmit = async(event) => {
    event.preventDefault();
    const newMovie = {
        name: document.getElementById('movie-name').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        imageUrl: 'https://bit.ly/3cMc2IH'
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(newMovie),
    };
    try {
        const endpoint = `${BASE_URL}/movies`;
        const response = await fetch(endpoint, requestOptions);
        if (response.ok) {
            let result = confirm('Movie added succssfully');
            result && window.location.assign('./index.html')
        } else {
            throw new Error("ERROR WHILE EXECUTING THE TRY BLOCK!");
        }
    } catch (error) {
        console.log('error:', error);
    }
}

getCategoryMovies = async() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const options = {
        method: 'GET',
        headers: myHeaders,
    }
    const response = await fetch(`${BASE_URL}/movies`, options);
    const categories = await response.json();
    return categories;
}

getCategoryOfMovies = async(category) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const options = {
        method: 'GET',
        headers: myHeaders,
    }
    const response = await fetch(`${BASE_URL}/movies/${category}`, options);
    const movies = await response.json();
    return movies;
}

renderMovies = ({ name, description, imageUrl }) => {
    let rowDiv = document.querySelector('.row');
    let div = document.createElement('div');
    div.classList.add('col-md-2');
    div.innerHTML = `<img class="movie-cover" src=${imageUrl} />`
    rowDiv.appendChild(div)
}

renderCategories = async(categories) => {
        let divNode = document.querySelector('#category-list');
        categories.map(async(category, index) => {
                    const movies = await getCategoryOfMovies(category);
                    let div = document.createElement('div');
                    div.classList.add('movie-gallery');
                    div.classList.add('m-2');
                    div.innerHTML = (`<h5 class="text-light mt-2 mb-2">${category}</h5>
                             <div id="trending-now" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                <div class="carousel-item active">
                                <div class="movie-row">
                                    <div class="row">
                                    ${movies?.map((movie) => (`
                                        <div class="col-md-2">
                                            <img class="movie-cover" src=${movie.imageUrl} />
                                        </div>
                                        `))}
                                    </div>
                            </div>
                            </div>
                                </div>
                             <button class="carousel-control-prev" type="button" data-bs-target="#trending-now" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                             </button>
                             <button class="carousel-control-next" type="button" data-bs-target="#trending-now" data-bs-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Next</span>
                             </button>
                             </div>`);
        divNode.appendChild(div);

    })
}

window.onload = async () => {
    const categories = await getCategoryMovies();
    renderCategories(categories);
}

{
    /* <div class="carousel-item active">
    <div class="movie-row">
        <div class="row">
            <div class="col-md-2">
                <img class="movie-cover" src="./assets/media/media0.jpg" />
            </div>
            <div class="col-md-2">
                <img class="movie-cover" src="./assets/media/media1.jpg" />
            </div>
            <div class="col-md-2">
                <img class="movie-cover" src="./assets/media/media2.jpg" />
            </div>
            <div class="col-md-2">
                <img class="movie-cover" src="./assets/media/media3.jpg" />
            </div>
            <div class="col-md-2">
                <img class="movie-cover" src="./assets/media/media4.jpg" />
            </div>
            <div class="col-md-2">
                <img class="movie-cover" src="./assets/media/media5.jpg" />
            </div>
        </div>
    </div>
    </div>
    <div class="carousel-item">
    <div class="movie-row">
        <div class="row">
            <div class="col-md-2">
                <img class="movie-cover" src="./assets/media/media0.jpg" />
            </div>
            <div class="col-md-2">
                <img class="movie-cover" src="./assets/media/media1.jpg" />
            </div>
            <div class="col-md-2">
                <img class="movie-cover" src="./assets/media/media2.jpg" />
            </div>
            <div class="col-md-2">
                <img class="movie-cover" src="./assets/media/media3.jpg" />
            </div>
            <div class="col-md-2">
                <img class="movie-cover" src="./assets/media/media4.jpg" />
            </div>
            <div class="col-md-2">
                <img class="movie-cover" src="./assets/media/media5.jpg" />
            </div>
        </div>
    </div>
    </div> */
}