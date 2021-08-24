'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const movieDB = {
    movies: [
        "Логан",
        "Лига чемпионов",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против...",
    ]
  };

  const promoAdv = document.querySelectorAll('.promo__adv img');
  const promoGenre = document.querySelector('.promo__genre');
  const promoBg = document.querySelector('.promo__bg');
  const movieList = document.querySelector('.promo__interactive-list');
  const addForm = document.querySelector('form.add');
  const addInput = addForm.querySelector('.adding__input');
  const checkbox = addForm.querySelector('[type="checkbox"]');

  addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let newFilm = addInput.value;

    const favorite = checkbox.checked;
    
    if (newFilm) {
      
      if (newFilm.length > 21) {
        newFilm = `${newFilm.slice(0, 22)}...`;
      }

      if (favorite) {
        console.log('It is a favorite film!')
      }

      movieDB.movies.push(newFilm);

      sortArr(movieDB.movies);
      createMovieList(movieDB.movies, movieList);
    }
    
    event.target.reset();
  })

  const deleteAdv = (arr) => {
    arr.forEach(item => {
      item.remove();
    });
  };

  const makeChanges = () => {
    promoGenre.textContent = 'драма';

    promoBg.style.backgroundImage = 'url("img/bg.jpg")';
  };
   
  const sortArr = (arr) => {
    arr.sort();
  };
  
  function createMovieList(films, parent) {
    sortArr(films);

    parent.innerHTML = '';

    films.forEach((film, i) => {
      parent.innerHTML += `
        <li class="promo__interactive-item"> ${i + 1} ${film}
          <div class="delete"></div>
        </li>
      `
    });

    document.querySelectorAll('.delete').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1);

        createMovieList(films, parent);
      });
    });
  }
 
  makeChanges(); 
  deleteAdv(promoAdv);
  createMovieList(movieDB.movies, movieList);
})
