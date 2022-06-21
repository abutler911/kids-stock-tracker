let stats;
let newMarketValue;
let stockPrice;

const searchBtn = document.querySelector('#searchBtn');

const stockOneName = document.querySelector('#stockOneName');
const stockOneShares = document.querySelector('#stockOneShares');
const stockOneAveragePrice = document.querySelector('#stockOneAveragePrice');
const stockOneTotalInvestment = document.querySelector('#stockOneTotalInvestment');
const stockOneMarketPrice = document.querySelector('#stockOneMarketPrice');
const stockOneGainLoss = document.querySelector('#stockOneGainLoss');

const stockTwoName = document.querySelector('#stockTwoName');
const stockTwoShares = document.querySelector('#stockTwoShares');
const stockTwoAveragePrice = document.querySelector('#stockTwoAveragePrice');
const stockTwoTotalInvestment = document.querySelector('#stockTwoTotalInvestment');
const stockTwoMarketPrice = document.querySelector('#stockTwoMarketPrice');
const stockTwoGainLoss = document.querySelector('#stockTwoGainLoss');

const hTotalValue = document.querySelector('#hTotalValue');
console.log(searchBtn);



const requestStockData = async (stockSymbol) => {
    const response = await fetch(`https://yahoofinance-stocks1.p.rapidapi.com/stock-metadata?Symbol=${stockSymbol}`, {
        method: 'GET',
	    headers: {
		'X-RapidAPI-Key': '4799f1a6b5msh2524eb4f30aaee4p118153jsn4bba6da3d36e',
		'X-RapidAPI-Host': 'yahoofinance-stocks1.p.rapidapi.com'
    }
}



);


const data = await response.json()
stats = data;
console.log(stats);
stockName = stats.result.shortName;
console.log(stockName);

stockPrice = stats.result.regularMarketPrice;

return {
    name: stockName,
    price: stockPrice
};


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

requestStockData(hudsonStocks[0].symbol).then(x => {
    stockPrice = ((parseFloat(x).toFixed(2)) * hudsonStocks[0].shares).toFixed(2);
    stockOneMarketPrice.innerText = stockPrice;
    stockOneGainLoss.innerText = (stockPrice - hudsonStocks[0].totalPaid()).toFixed(2);
    if(parseFloat(stockOneGainLoss.innerText) < 0) {
        stockOneGainLoss.classList.add('red');
    } else {
        stockOneGainLoss.classList.add('green');
    }
});

requestStockData(hudsonStocks[1].symbol).then(x => {
    stockPrice = ((parseFloat(x).toFixed(2)) * hudsonStocks[1].shares).toFixed(2);
    stockTwoMarketPrice.innerText = stockPrice;
    stockTwoGainLoss.innerText = (stockPrice - hudsonStocks[1].totalPaid()).toFixed(2);
    if(parseFloat(stockTwoGainLoss.innerText) < 0) {
        stockTwoGainLoss.classList.add('red');
    } else {
        stockTwoGainLoss.classList.add('green');
    }
});



stockOneName.innerText = hudsonStocks[0].name;
stockOneShares.innerText = hudsonStocks[0].shares;
stockOneAveragePrice.innerText = hudsonStocks[0].price;
stockOneTotalInvestment.innerText = hudsonStocks[0].totalPaid();

stockTwoName.innerText = hudsonStocks[1].name;
stockTwoShares.innerText = hudsonStocks[1].shares;
stockTwoAveragePrice.innerText = hudsonStocks[1].price;
stockTwoTotalInvestment.innerText = hudsonStocks[1].totalPaid();



searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let inputStockSymbol = document.querySelector('#inputStockSymbol').value.toUpperCase();
    if(inputStockSymbol.length > 4 || inputStockSymbol.length < 1) {
        alert('Invalid Symbol - Stock Symbol Must Be 1 to 4 Characters');
    } else {
        requestStockData(inputStockSymbol).then(x => {

            const stockSymbolDisplay = document.querySelector('#stock-symbol-display');
            const para = document.createElement("p");
            para.innerText = `Quote for ${inputStockSymbol} is $${stockPrice}`;
            stockSymbolDisplay.appendChild(para);
        });

        
    }
});




















// stockOneMarketPrice.innerText = requestStockData('SOFI').then(x => {
//     stockPrice = x;
//     console.log(`Current Price is = ${stockPrice}`);
// });

// stockOneGainLoss.innerText = hudsonStocks[0].gainLoss();


// requestStockData(hudsonStocks[0].symbol).then(() => {
//     stockPrice = stats.result.regularMarketPrice;
//     stockOneMarketPrice.innerText = `$${stats.result.regularMarketPrice}`;
//     console.log(stats.result.regularMarketPrice);
//     console.log(stockPrice);
//     console.log(typeof(stockPrice));
//     return stockPrice;
// });


// console.log(stockPrice);
