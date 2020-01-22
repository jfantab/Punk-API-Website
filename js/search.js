//displays searches
const findBeers = (form) => {
    let val = form.value;

    let root = null;

    if(document.getElementById('root') !== null){
        root = document.getElementById('root').childNodes;
    }
    else {
        root = document.getElementById('rootFavorite').childNodes;
    }

    beers.map(b => {
        let n1 = getBeerName(b);
        if(n1.toLowerCase() === val.toLowerCase()) {
            for(let i = 0; i < root.length; i++){
                if(getBeerName(root.item(i).innerHTML) === n1){
                    root.item(i).scrollIntoView('center');
                    root.item(i).style.boxShadow = '0 0 30px orange';
                    root.item(i).style.mozBoxShadow = '0 0 30px orange';
                    root.item(i).style.oBoxShadow = '0 0 30px orange';
                }
            }
        }
    });
};

//finds beer in suggestions
const findBeerSuggestion = (s) => {
    let n = getBeerName(s)
    let val = '';
    popups.forEach(p => {
        let n1 = getBeerName(p);
        if(n1.toLowerCase() === n.toLowerCase()) {
            val += p;
        }
    });
    return val;
};