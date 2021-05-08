$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    fetch("https://jokeapi-v2.p.rapidapi.com/joke/Any?type=single%2Ctwopart&format=json&contains=C%2523&idRange=0-150&blacklistFlags=nsfw%2Cracist", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "649a0db843msh027e962805d14d4p176ccfjsna37622a4394e",
            "x-rapidapi-host": "jokeapi-v2.p.rapidapi.com"
        }
    })
    .then(response => response.json())
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
});


/*Carousel*/
$('.carousel').owlCarousel({
    margin: 20,
    loop: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
        0:{
            items: 1,
            nav: false
        },
        600:{
            items: 1,
            nav: false
        },
        1000:{
            items: 2,
            nav: false
        }
    }
});


/*Packery */
var grid = document.querySelector('.grid');
var pckry = new Packery( grid, {
  itemSelector: '.tile',
  columnWidth: 100,
  transitionDuration: '0.3s'
});

pckry.getItemElements().forEach( function( itemElem ) {
  var draggie = new Draggabilly( itemElem );
  pckry.bindDraggabillyEvents( draggie );
});

// map items by their data-tile
var mappedItems = {};

pckry.items.forEach( function( item ) {
  var attr = item.element.getAttribute('data-tile');
  mappedItems[ attr ] = item;
});

( function() {

var orders = [
  'abcdefghijklm',
  'ecdibmhfajkgl',
  'ilckfgdebhjam'
];
var d = Object.keys( Packery.defaults ).sort( function( a, b ) {
  return b < a ? 1 : -1;
});
var i=3,j=9,o=Packery.namespace;
var orderIndex = 0;

function shuffleTiles() {
  // shuffle items
  orderIndex++;
  var order = orders[ orderIndex % 3 ];
  pckry.items = order.split('').map( function( attr ) {
    return mappedItems[ attr ];
  });
  // stagger transition
  pckry._resetLayout();
  pckry.items.forEach( function( item, i ) {
    setTimeout( function() {
      pckry.layoutItems( [ item ] );  
    }, i * 34 );
  });
}

var dialog = document.querySelector('.dialog');
var didWin = false;

function win() {
  if ( !didWin ) {
    document.querySelector('.dialog__text').innerHTML = 'Nice work!<br>';
  }
  didWin = true;
  showDialog();
}


function showDialog() {
  dialog.classList.remove('is-waiting');
}

function hideDialog() {
  dialog.classList.add('is-waiting');
}

dialog.querySelector('.try-again-button').onclick = function() {
  hideDialog();
  shuffleTiles();
}

dialog.querySelector('.close-dialog-button').onclick = hideDialog;

document.querySelector('.shuffle-button').onclick = shuffleTiles;

pckry.on( 'dragItemPositioned', function() {
  var order = pckry.items.map( function( item ) {
    return item.element.getAttribute('data-tile');
  }).join('');
  if ( pckry.maxY == 500 && order == 'fmgdbalkjihce' ) {
    win();
  }
});

})();








/*apis*/
(function onLoad()
{
    // set a function for each button
    setButtonFunctions();

    // fetch from each API when the page loads
    getJoke();
    getCurrencyExchangeRates();
    getLatestCOVID19Data();
})();

function setButtonFunctions()
{
    document.getElementById('buttonGetJoke').onclick = getJoke;
    document.getElementById('buttonCurrency').onclick = getCurrencyExchangeRates;
    document.getElementById('countries').onchange = function() {
        const selectedValue = document.getElementById('countries').value;
        const countryData = covid19data.filter(c => c.country == selectedValue)[0];

        // display data
        const newConfirmed = document.getElementById('covidNewConfirmed');
        const totalConfirmed = document.getElementById('covidTotalConfirmed');
        const covidNewDeaths = document.getElementById('covidNewDeaths');
        const covidTotalDeaths = document.getElementById('covidTotalDeaths');
        const lastUpdated = document.getElementById('covidLastUpdate');

        (countryData.cases.new) ? newConfirmed.innerHTML = 'New confirmed cases: ' + countryData.cases.new : newConfirmed.innerHTML = 'New confirmed cases: 0';
        (countryData.cases.total) ? totalConfirmed.innerHTML = 'Total confirmed cases: ' + countryData.cases.total : totalConfirmed.innerHTML = 'Total confirmed cases: 0';
        (countryData.deaths.new) ? covidNewDeaths.innerHTML = 'New deaths: ' + countryData.deaths.new : covidNewDeaths.innerHTML = 'New deaths: 0';
        (countryData.deaths.total) ? covidTotalDeaths.innerHTML = 'Total deaths: ' + countryData.deaths.total : covidTotalDeaths.innerHTML = 'Total deaths: 0';
        lastUpdated.innerHTML = 'Last updated: ' + countryData.day;
    };
}

// Chuck Norris jokes
async function getJoke()
{
    await fetch("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
            "x-rapidapi-key": MY_API_KEY,
            "accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Chuck Norris API object:");
        console.log(response);
        console.log("\n");

        // display data
        document.getElementById('joke').innerHTML = response.value;
        document.getElementById('jokeIcon').src = response.icon_url;
        document.getElementsByClassName('jokeTitle')[0].href = response.url;
    })
    .catch(err => {
        console.log(err);
    });
}

// Currency Exchange rates
async function getCurrencyExchangeRates()
{
    const from = document.getElementById('inputCurrencyFrom').value;
    const to = document.getElementById('inputCurrencyTo').value;
    await fetch("https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=" + from + "&to=" + to, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
            "x-rapidapi-key": MY_API_KEY
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Currency Exchange API object:");
        console.log(response);
        console.log("\n");

        // display data
        document.getElementById('currencyResult').innerHTML = 'Result: ' + response;
    })
    .catch(err => {
        console.log(err);
    });
}

// COVID 19 Data
async function getLatestCOVID19Data()
{
    await fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": MY_API_KEY
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("COVID 19 API object:");
        console.log(response);
        console.log("\n");

        // add all countries to select element
        response.response.forEach(c => {
            const option = document.createElement('option');
            option.innerHTML = c.country;
            document.getElementById('countries').appendChild(option);
        })

        // save covid data to global variable
        covid19data = response.response;
    })
    .catch(err => {
        console.log(err);
    });
}