var faves = localStorage.getItem('beers') ? JSON.parse(localStorage.getItem('beers')) : [];

//sets favorite attribute and changes color of star
//changes localStorage
const toggleFavorite = (d) => {
    let star = d.querySelector('small');
    if(d.dataset.favorite === 'false') {
        d.dataset.favorite = 'true';
        star.innerHTML = '<small id="star" style="color: orange;">&#9733</small>';
        addBeer(d);
    }
    else {
        d.dataset.favorite = 'false';
        star.innerHTML = '<small id="star">&#9734</small>';
        removeBeer(d);
    }
};

const addBeer = (d) => {
    let flag = false;
    let div1 = document.createElement('div');
    let n1 = '';
    let n2 = d.querySelector('h1').innerText;
    for(let i = 0; i < faves.length; i++) {
        div1.innerHTML = faves[i];
        n1 = div1.querySelector('h1').innerText;

        if(n1 === n2){
            flag = true;
        }
    }
    if(!flag) {
        faves.push(d.outerHTML);
        localStorage.setItem('beers', JSON.stringify(faves));
    }
};

//removes a beer from local storage
const removeBeer = (d) => {
    if(faves.length === 1){
        faves.pop();
        window.localStorage.clear();
    }
    let div1 = document.createElement('div');
    let n2 = d.querySelector('h1').innerText;
    for(let i = 0; i < faves.length; i++) {
        div1.innerHTML = faves[i];
        let n1 = div1.querySelector('h1').innerText;

        if(n1 === n2){
            faves.splice(i, 1);
            localStorage.setItem('beers', JSON.stringify(faves));
        }
    }
};

/** MAIN **/
setTimeout(() =>  addEvents(document), 1000);

//removes modal
const removeModal = () => {
    let modal = document.querySelector('.modal');
    if(modal !== null) {
        modal.style.display = "none";
        modal.parentNode.removeChild(modal);
        document.body.style.height = '100%';
        document.body.style.overflow = 'auto';
    }
};

//function to add events to allow search results to use
const addEvents = (ev) => {
    let div = ev.querySelectorAll('div.beerElem');
    div.forEach(d => {
        let star = d.querySelector('small');
        star.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleFavorite(d);
        });
        //hovering effects
        d.addEventListener('mouseenter', function(event) {
            d.style.boxShadow = '0 0 20px lightgray';
            d.style.mozBoxShadow = '0 0 20px lightgray';
            d.style.oBoxShadow = '0 0 20px lightgray';
        });
        d.addEventListener('mouseleave', function(event) {
            d.style.boxShadow = '';
            d.style.mozBoxShadow = '';
            d.style.oBoxShadow = '';
        });
        d.addEventListener('click',function(event) {
            event.stopPropagation();
            if(document.querySelector('.modal') === null) {
                initPopup(d.outerHTML);
                let modal = document.querySelector('.modal');
                let span = modal.querySelector('span');
                let top = document.getElementById('top');
                modal.addEventListener('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    event.stopImmediatePropagation();

                    if(event.target.matches('.suggestion')) {
                        let div = document.createElement('div');
                        div.innerHTML = findBeerSuggestion(event.target.outerHTML);
                        modal.querySelector('.inner').innerHTML = div.querySelector('.inner').innerHTML;
                        modal.querySelector('span').onclick = () => removeModal();
                    }
                });
                span.addEventListener('click', removeModal);
                top.addEventListener('click', removeModal);
            }
            else {
                removeModal();
            }
        });
    });
};