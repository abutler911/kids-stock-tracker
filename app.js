let stats;
let newMarketValue;

const requestStockData = async () => {
    const response = await fetch(`https://yahoofinance-stocks1.p.rapidapi.com/stock-metadata?Symbol=${hudsonStocks[0].symbol}`, {
        method: 'GET',
	    headers: {
		'X-RapidAPI-Key': '4799f1a6b5msh2524eb4f30aaee4p118153jsn4bba6da3d36e',
		'X-RapidAPI-Host': 'yahoofinance-stocks1.p.rapidapi.com'
    }
});
const data = await response.json();
stats = data;
}

// Hudson Stock Objects

let hudsonStocks = [
    {
        name: "Sofi",
        symbol: "SOFI",
        shares: 1,
        price: 5.98,
        marketValue: 3.43,
        totalPaid: function(shares, price) {
            return this.shares * this.price;
        },
        gainLoss: function(shares, price, value) {
            return ((this.price * this.shares) - (this.marketValue * this.shares)).toFixed(2);
        }
    },
    {
        name: "GoPro",
        symbol: "GPRO",
        shares: 1,
        price: 6.39,
        marketValue: 5.24,
        totalPaid: function(shares, price) {
            return this.shares * this.price;
        },
        gainLoss: function(shares, price, value) {
            return ((this.price * this.shares) - (this.marketValue * this.shares)).toFixed(2);
        }
    }
]

for (let i = 0; i < hudsonStocks.length; i++) {
    console.log(`${hudsonStocks[i].name}: ${hudsonStocks[i].symbol}`);
}



// let hudsonStockOne = {
//     name: "Sofi",
//     symbol: "SOFI",
//     shares: 1,
//     price: 5.98,
//     marketValue: 3.43,
//     totalPaid: function(shares, price) {
//         return this.shares * this.price;
//     },
//     gainLoss: function(shares, price, value) {
//         return ((this.price * this.shares) - (this.marketValue * this.shares)).toFixed(2);
//     }
// };

// const hudsonStockTwo = {
//     name: "GoPro",
//     shares: 1,
//     price: 6.39,
//     marketValue: 5.24,
//     totalPaid: function(shares, price) {
//         return this.shares * this.price;
//     },
//     gainLoss: function(shares, price, value) {
//         return ((this.price * this.shares) - (this.marketValue * this.shares)).toFixed(2);
//     }
// };

// Jack Stock Objects

const jackStockOne = {
    name: "LifeVantage",
    shares: 1,
    price: 5.98,
    marketValue: 5.24,
    totalPaid: function(shares, price) {
        return this.shares * this.price;
    },
    gainLoss: function(shares, price, value) {
        return ((this.price * this.shares) - (this.marketValue * this.shares)).toFixed(2);
    }
};

const jackStockTwo = {
    name: "Ford Motor Co.",
    shares: 1,
    price: 6.39,
    marketValue: 5.24,
    totalPaid: function(shares, price) {
        return this.shares * this.price;
    },
    gainLoss: function(shares, price, value) {
        return ((this.price * this.shares) - (this.marketValue * this.shares)).toFixed(2);
    }
};
requestStockData().then(() => {
    console.log(stats.result.regularMarketPrice);
    document.querySelector("#hudsonShareValueOne").innerText = `$${stats.result.regularMarketPrice}`;
    document.querySelector("#hudsonGainLossOne").innerText = `$${hudsonStocks[0].gainLoss()}`;
});


document.querySelector("#jackNameOne").innerText = jackStockOne.name;
document.querySelector("#jackNumberOfSharesOne").innerText = jackStockOne.shares;
document.querySelector("#jackSharePriceOne").innerText = `$${jackStockOne.price}`;
document.querySelector("#jackTotalOne").innerText = `$${jackStockOne.totalPaid()}`;
document.querySelector("#jackShareValueOne").innerText = `$${jackStockOne.marketValue}`;
document.querySelector("#jackGainLossOne").innerText = `$${jackStockOne.gainLoss()}`;

document.querySelector("#jackNameTwo").innerText = jackStockTwo.name;
document.querySelector("#jackNumberOfSharesTwo").innerText = jackStockTwo.shares;
document.querySelector("#jackSharePriceTwo").innerText = `$${jackStockTwo.price}`;
document.querySelector("#jackTotalTwo").innerText = `$${jackStockTwo.totalPaid()}`;
document.querySelector("#jackShareValueTwo").innerText = `$${jackStockTwo.marketValue}`;
document.querySelector("#jackGainLossTwo").innerText = `$${jackStockTwo.gainLoss()}`;

document.querySelector("#hudsonNameOne").innerText = hudsonStocks[0].name;
document.querySelector("#hudsonNumberOfSharesOne").innerText = hudsonStocks[0].shares;
document.querySelector("#hudsonSharePriceOne").innerText = `$${hudsonStocks[0].price}`;
document.querySelector("#hudsonTotalOne").innerText = `$${hudsonStocks[0].totalPaid()}`;


// document.querySelector("#hudsonNameTwo").innerText = hudsonStockTwo.name;
// document.querySelector("#hudsonNumberOfSharesTwo").innerText = hudsonStockTwo.shares;
// document.querySelector("#hudsonSharePriceTwo").innerText = `$${hudsonStockTwo.price}`;
// document.querySelector("#hudsonTotalTwo").innerText = `$${hudsonStockTwo.totalPaid()}`;
// document.querySelector("#hudsonShareValueTwo").innerText = `$${hudsonStockTwo.marketValue}`;
// document.querySelector("#hudsonGainLossTwo").innerText = `$${hudsonStockTwo.gainLoss()}`;



