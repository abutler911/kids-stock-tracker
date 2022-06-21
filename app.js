let newMarketValue;
let stockPrice;
let hTotalValue;

const searchBtn = document.querySelector('#searchBtn');
const refreshBtn = document.querySelector('#refresh');

const hStockOneName = document.querySelector('#hStockOneName');
const hStockOneShares = document.querySelector('#hStockOneShares');
const hStockOneAveragePrice = document.querySelector('#hStockOneAveragePrice');
const hStockOneTotalInvestment = document.querySelector('#hStockOneTotalInvestment');
const hStockOneMarketPrice = document.querySelector('#hStockOneMarketPrice');
const hStockOneGainLoss = document.querySelector('#hStockOneGainLoss');

const hStockTwoName = document.querySelector('#hStockTwoName');
const hStockTwoShares = document.querySelector('#hStockTwoShares');
const hStockTwoAveragePrice = document.querySelector('#hStockTwoAveragePrice');
const hStockTwoTotalInvestment = document.querySelector('#hStockTwoTotalInvestment');
const hStockTwoMarketPrice = document.querySelector('#hStockTwoMarketPrice');
const hStockTwoGainLoss = document.querySelector('#hStockTwoGainLoss');

const hTotalInvested = document.querySelector('#hTotalInvested');

const jStockOneName = document.querySelector('#jStockOneName');
const jStockOneShares = document.querySelector('#jStockOneShares');
const jStockOneAveragePrice = document.querySelector('#jStockOneAveragePrice');
const jStockOneTotalInvestment = document.querySelector('#jStockOneTotalInvestment');
const jStockOneMarketPrice = document.querySelector('#jStockOneMarketPrice');
const jStockOneGainLoss = document.querySelector('#jStockOneGainLoss');

const jStockTwoName = document.querySelector('#jStockTwoName');
const jStockTwoShares = document.querySelector('#jStockTwoShares');
const jStockTwoAveragePrice = document.querySelector('#jStockTwoAveragePrice');
const jStockTwoTotalInvestment = document.querySelector('#jStockTwoTotalInvestment');
const jStockTwoMarketPrice = document.querySelector('#jStockTwoMarketPrice');
const jStockTwoGainLoss = document.querySelector('#jStockTwoGainLoss');

const jTotalInvested = document.querySelector('#jTotalInvested');



const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4799f1a6b5msh2524eb4f30aaee4p118153jsn4bba6da3d36e',
		'X-RapidAPI-Host': 'yahoofinance-stocks1.p.rapidapi.com'
	}
};


const requestStockPrice = async (stockSymbol) => {
    const response = await fetch(`https://yahoofinance-stocks1.p.rapidapi.com/stock-metadata?Symbol=${stockSymbol}`, options)
    const data = await response.json()
    stockPrice = data.result.regularMarketPrice;
    return stockPrice;
};

const requestStockName = async (stockSymbol) => {
    const response = await fetch(`https://yahoofinance-stocks1.p.rapidapi.com/stock-metadata?Symbol=${stockSymbol}`, options)
    const data = await response.json()
    stockName = data.result.shortName;
    return stockName;
};

// // Hudson Stock Objects

let hudsonStocks = [
    {
        name: "Sofi",
        symbol: "SOFI",
        shares: 1,
        price: 5.98,
        totalPaid: function(shares, price) {
            return (this.shares * this.price).toFixed(2);
        },
        gainLoss: 0
    },

    {
        name: "GoPro",
        symbol: "GPRO",
        shares: 1,
        price: 6.39,
        totalPaid: function(shares, price) {
            return this.shares * this.price;
        },
        gainLoss: 0
    }
]

let jackStocks = [
    {
        name: "LifeVantage",
        symbol: "LVFN",
        shares: 1,
        price: 4.29,
        totalPaid: function(shares, price) {
            return (this.shares * this.price).toFixed(2);
        },
        gainLoss: 0
    },

    {
        name: "Ford",
        symbol: "F",
        shares: 1,
        price: 13.85,
        totalPaid: function(shares, price) {
            return this.shares * this.price;
        },
        gainLoss: 0
    }
]

// Hudson's Value and Gain Loss Functions
requestStockPrice(hudsonStocks[0].symbol).then(x => {
    stockPrice = ((parseFloat(x).toFixed(2)) * hudsonStocks[0].shares).toFixed(2);
    hStockOneMarketPrice.innerText = stockPrice;
    
    hStockOneGainLoss.innerText = (stockPrice - hudsonStocks[0].totalPaid()).toFixed(2);
    if(parseFloat(hStockOneGainLoss.innerText) < 0) {
        hStockOneGainLoss.classList.add('red');
    } else {
        hStockOneGainLoss.classList.add('green');
    }
});

requestStockPrice(hudsonStocks[1].symbol).then(x => {
    stockPrice = ((parseFloat(x).toFixed(2)) * hudsonStocks[1].shares).toFixed(2);
    hStockTwoMarketPrice.innerText = stockPrice;
    
    hStockTwoGainLoss.innerText = (stockPrice - hudsonStocks[1].totalPaid()).toFixed(2);
    if(parseFloat(hStockTwoGainLoss.innerText) < 0) {
        hStockTwoGainLoss.classList.add('red');
    } else {
        hStockTwoGainLoss.classList.add('green');
    }
});


// Jack's Value and Gain Loss Functions
// setTimeout(    
//     requestStockPrice(jackStocks[0].symbol).then(x => {
//     stockPrice = ((parseFloat(x).toFixed(2)) * jackStocks[0].shares).toFixed(2);
//     jStockOneMarketPrice.innerText = stockPrice;
    
//     jStockOneGainLoss.innerText = (stockPrice - jackStocks[0].totalPaid()).toFixed(2);
//     if(parseFloat(jStockOneGainLoss.innerText) < 0) {
//         jStockOneGainLoss.classList.add('red');
//     } else {
//         jStockOneGainLoss.classList.add('green');
//     }
// }), 5000);

// setTimeout(
//     requestStockPrice(jackStocks[1].symbol).then(x => {
//         stockPrice = ((parseFloat(x).toFixed(2)) * jackStocks[1].shares).toFixed(2);
//         jStockTwoMarketPrice.innerText = stockPrice;
        
//         jStockTwoGainLoss.innerText = (stockPrice - jackStocks[1].totalPaid()).toFixed(2);
//         if(parseFloat(jStockTwoGainLoss.innerText) < 0) {
//             jStockTwoGainLoss.classList.add('red');
//         } else {
//             jStockTwoGainLoss.classList.add('green');
//         }
//     }), 5000);

    

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let inputStockSymbol = document.querySelector('#inputStockSymbol').value.toUpperCase();
    if(inputStockSymbol.length > 4 || inputStockSymbol.length < 1) {
        alert('Invalid Symbol - Stock Symbol Must Be 1 to 4 Characters');
    } else {
        requestStockPrice(inputStockSymbol).then(x => {
            const stockSymbolDisplay = document.querySelector('#stock-symbol-display');
            const para = document.createElement("p");
            para.innerText = `Quote for ${inputStockSymbol} is $${stockPrice}`;
            stockSymbolDisplay.prepend(para);
        });

        
    }
});

refreshBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload();
})

const hTotalInvestment = (parseFloat(hudsonStocks[0].totalPaid()) + parseFloat(hudsonStocks[1].totalPaid())).toFixed(2);
hTotalInvested.innerText = `$${hTotalInvestment}`;

const jTotalInvestment = (parseFloat(jackStocks[0].totalPaid()) + parseFloat(jackStocks[1].totalPaid())).toFixed(2);
jTotalInvested.innerText = `$${jTotalInvestment}`;

hStockOneName.innerText = hudsonStocks[0].name;
hStockOneShares.innerText = hudsonStocks[0].shares;
hStockOneAveragePrice.innerText = hudsonStocks[0].price;
hStockOneTotalInvestment.innerText = hudsonStocks[0].totalPaid();

hStockTwoName.innerText = hudsonStocks[1].name;
hStockTwoShares.innerText = hudsonStocks[1].shares;
hStockTwoAveragePrice.innerText = hudsonStocks[1].price;
hStockTwoTotalInvestment.innerText = hudsonStocks[1].totalPaid();



jStockOneName.innerText = jackStocks[0].name;
jStockOneShares.innerText = jackStocks[0].shares;
jStockOneAveragePrice.innerText = jackStocks[0].price;
jStockOneTotalInvestment.innerText = jackStocks[0].totalPaid();

jStockTwoName.innerText = jackStocks[1].name;
jStockTwoShares.innerText = jackStocks[1].shares;
jStockTwoAveragePrice.innerText = jackStocks[1].price;
jStockTwoTotalInvestment.innerText = jackStocks[1].totalPaid();