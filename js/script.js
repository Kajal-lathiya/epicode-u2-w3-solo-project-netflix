const BASE_URL = 'https://striveschool-api.herokuapp.com/api';
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2NjgwODUzMjEsImV4cCI6MTY2OTI5NDkyMX0.-w-mNxtbLWxs9FTT-Wp27ksHjG6PpT8b7kZVdHl4GBw";
const movieImage = document.querySelector('.movie-cover');


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
            confirm('Movie added succssfully');
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
onUpdateClick = (id, name, description, category) => {
    console.log('ID-->', name);
    document.getElementById('movie-name').value = name
    document.getElementById('description').value = description
    document.getElementById('category').value = category
}
onDeleteClick = async(id) => {
    try {
        if (confirm("Do you really want to delete this product?")) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", token);
            const options = {
                method: 'DELETE',
                headers: myHeaders,
            }
            const response = await fetch(`${BASE_URL}/movies/${id}`, options);
            if (response.ok) {
                window.location.assign('./backOffice.html')
            } else {
                alert("Error while deleting!")
            }
        }
    } catch (error) {
        console.log(error);
    }
}

renderCategories = async(categories) => {
        let categoriesList = document.querySelector(".list-group");
        categories.map(async(category, index) => {
                    const movies = await getCategoryOfMovies(category);
                    const divNode = document.createElement("table");
                    const h3 = document.createElement("h3");
                    divNode.classList.add("shadow");
                    divNode.classList.add("table");
                    divNode.classList.add("bg-white");
                    divNode.classList.add("rounded");
                    divNode.classList.add('table-striped');
                    h3.textContent = category;
                    h3.style.color = '#fff';
                    divNode.innerHTML = `
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Image</th>
                            <th scope="col">Movie Name</th>
                            <th scope="col">Category</th>
                            </tr>
                            <tbody>
                            ${movies?.map((movie, index) => (`
                            <tr>
                            <th scope="row">${index + 1}</th>
                            <td><img src=${movie.imageUrl} alt='image' class="movie-cover" /></td>
                            <td>${movie.name}</td>
                            <td>${movie.category}</td>
                            <td> <button id="update-button" data-toggle="modal" data-target="#exampleModal" onclick="onUpdateClick('${movie._id, movie.name, movie.description, movie.category}')" type="submit" class="btn btn-warning rounded shadow border-0">
                            UPDATE
                          </button>
                          <button id="delete-button" type="submit" onclick="onDeleteClick('${String(movie._id)}')" class="btn btn-danger rounded shadow border-0">
                             DELETE
                          </button>
                          </td>
                            </tr>
                            `))}
                        </tbody>
                      </thead>`
        categoriesList.appendChild(h3);
        categoriesList.appendChild(divNode);
    })
}

renderCategoriesInCarousel = (categories) => {
    categories.map(async (category, index) => {
        console.log('category:', category);
    })
}
window.onload = async () => {
    const categories = await getCategoryMovies();
    renderCategories(categories);
    renderCategoriesInCarousel(categories);

}