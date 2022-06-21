let stats;
let newMarketValue;
let stockPrice;

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
stockPrice = stats.result.regularMarketPrice;
return stockPrice;


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
        // marketValue: requestStockData(this.symbol).then(() => {
        //     console.log(stats.result.regularMarketPrice);
        // }),
        totalPaid: function(shares, price) {
            return this.shares * this.price;
        },
        gainLoss: 1
    }
]

requestStockData(hudsonStocks[0].symbol).then(x => {
    stockPrice = ((parseFloat(x).toFixed(2)) * hudsonStocks[0].shares).toFixed(2);
    stockOneMarketPrice.innerText = stockPrice;
    stockOneGainLoss.innerText = (stockPrice - hudsonStocks[0].totalPaid()).toFixed(2);
});

requestStockData(hudsonStocks[1].symbol).then(x => {
    stockPrice = ((parseFloat(x).toFixed(2)) * hudsonStocks[1].shares).toFixed(2);
    stockTwoMarketPrice.innerText = stockPrice;
    stockTwoGainLoss.innerText = (stockPrice - hudsonStocks[1].totalPaid()).toFixed(2);
});



stockOneName.innerText = hudsonStocks[0].name;
stockOneShares.innerText = hudsonStocks[0].shares;
stockOneAveragePrice.innerText = hudsonStocks[0].price;
stockOneTotalInvestment.innerText = hudsonStocks[0].totalPaid();

stockTwoName.innerText = hudsonStocks[1].name;
stockTwoShares.innerText = hudsonStocks[1].shares;
stockTwoAveragePrice.innerText = hudsonStocks[1].price;
stockTwoTotalInvestment.innerText = hudsonStocks[1].totalPaid();

























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
