/* eslint-disable no-console */
const url = 'https://api.punkapi.com/v2/beers?page=1&per_page=80';
let beers = []; //array for beers on main page
let popups = []; //array for popups

//helper function
const handleMainData = () =>
    fetchData()
        .then(res => addMainData(res));

//fetches data
const fetchData = () => fetch(url)
    .then(res => res.json());

const getBeerName = (data) => {
    let div = document.createElement('div');
    div.innerHTML = data;
    let val = '';
    if(div.querySelector('h1') !== null){
        val = div.querySelector('h1').innerText;
    }
    else {
        val = div.querySelector('p').innerText;
    }
    return val;
};

//adds initial values to beer array
const initBeers = (res) => {
    let output = '';
    let output2 = '';
    res.forEach(r => {
        //regular beers info
        output =
            `<div class="beerElem" id="beer" data-favorite="false">
                    <small id="star">&#9734</small>
                    <img src='${r.image_url}'>
                    <h1 class="textElem">${r.name}</h1>
                    <p class="textElem">${r.tagline}</p>
                </div>`;
        //popups info
        beers.push(output);
    });
    res.forEach(r => {
        output2 = `<div class="modal"  >
                        <div class="inner">
                            <span class="close">&times;</span>
                            <img src=${r.image_url}>
                            <h1 style="color: orange;"><strong>${r.name}</strong></h1>
                            <h4>${r.tagline}</h4>
                            <hr>
                            <p style="word-spacing: 3px;"><strong>IBU:</strong> ${r.ibu} <strong>ABV:</strong> ${r.abv}% <strong>EBC:</strong> ${r.ebc} </p>
                            <p>${r.description}</p>
                            <p><strong>Best served with:</strong></p> <!-- food pairings -->
                             ${renderList(r)}
                        </div>
                         <h2 style="color: orange; margin-left: 10px;"><strong>You might also like: </strong></h2>
                         ${renderSuggestions()}
                     </div>`;
        popups.push(output2);
    });
};

//initializes popup info
const initPopup = (d) => {
    let n1 = getBeerName(d);
    popups.forEach(p => {
        let n2 = getBeerName(p);

        if(n1 === n2) {
            let div = document.createElement('div');
            div.innerHTML = p;
            let mod = div.getElementsByClassName('modal')[0];
            mod.style.display = "block";

            if(document.getElementById('root') === null){
                document.getElementById('rootFavorite').appendChild(div)
            }
            else {
                document.getElementById('root').appendChild(div);
            }
            document.body.style.height = '100%';
            document.body.style.overflow = 'hidden';
        }
    });
};

//renders lists of food pairings
const renderList = (r) => {
    let ul = document.createElement('ul');
    for(let elem in r.food_pairing){
        let li = document.createElement('li');
        li.innerHTML = r.food_pairing[elem];
        ul.appendChild(li);
    }
    return ul.outerHTML;
};

//renders beer suggestions
const renderSuggestions = () => {
    let div1 = document.createElement('div');
    for(let i = 0; i < 3; i++){
        let b = beers[Math.floor(Math.random() * 79)];
        let div = document.createElement('div');
        let n = getBeerName(b);

        let div3 = document.createElement('div');
        div3.innerHTML = b;
        let img = div3.querySelector('img').src;

        div.innerHTML = `<div class="suggestion">
                            <img src="${img}">
                            <p>${n}</p>
                        </div>`;

        div1.innerHTML += div.innerHTML;
    }

    return div1.innerHTML;

};

//adds each beer to index.html
const addMainData = (res) => {
    let output = '';
    initBeers(res);
    modFavorite();
    beers.forEach(b => {
        output += b;
    });
    if(document.getElementById('root') !== null)
        document.getElementById('root').innerHTML = output;
};

//renders favorites after refresh
const modFavorite = () => {
    for(let i = 0; i < beers.length; i++){
        let n1 = getBeerName(beers[i]);
        faves.forEach(f => {
            let n2 = getBeerName(f);

            if(n1 === n2){
                beers[i] = f;
            }
        });
    }
};

//loads data onto favorites.html
const initFavoritesPage = () => {
    let output = '';
    faves.forEach(b => {
        output += b;
    });
    if(document.getElementById('rootFavorite') !== null)
        document.getElementById('rootFavorite').innerHTML = output;
};

/** MAIN **/
//loads data onto index.html
window.onload = () => {
    //loads data onto index.html
    setTimeout(() => handleMainData(), 0);
    //loads data onto favorites.html
    initFavoritesPage();
};
if(document.getElementById('root') !== null) {
    setTimeout(() => document.getElementById('root').scrollIntoView(), 1000);
}
else {
    setTimeout(() => document.getElementById('rootFavorite').scrollIntoView(), 1000);
}