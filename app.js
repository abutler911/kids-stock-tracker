// let newStockPrice;

const stockQuoteContainer = document.getElementById('stockquote-container');

const hStockCards = document.getElementsByClassName('stock-card');
const hStockNames = document.querySelectorAll('.h-stock-name');
const hStockPrices = document.querySelectorAll('.h-stock-price');
const hSharesOwned = document.querySelectorAll('.h-shares-owned');
const hAvgPrice = document.querySelectorAll('.h-avg-price');
const hGainLoss = document.querySelectorAll('.h-gain-loss');
const hTotalInvestment = document.querySelectorAll('.h-total-investment');
const hTotalPortfolioValue = document.querySelector('#h-total-portfolio-value')
const hTotalInvested = document.querySelector('#h-total-invested');
const hTotalGainLoss = document.querySelector('#h-total-gain-loss');

const jStockCards = document.getElementsByClassName('stock-card');
const jStockNames = document.querySelectorAll('.j-stock-name');
const jStockPrices = document.querySelectorAll('.j-stock-price');
const jSharesOwned = document.querySelectorAll('.j-shares-owned');
const jAvgPrice = document.querySelectorAll('.j-avg-price');
const jGainLoss = document.querySelectorAll('.j-gain-loss');
const jTotalInvestment = document.querySelectorAll('.j-total-investment');
const jTotalPortfolioValue = document.querySelector('#j-total-portfolio-value')
const jTotalInvested = document.querySelector('#j-total-invested');
const jTotalGainLoss = document.querySelector('#j-total-gain-loss');


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4799f1a6b5msh2524eb4f30aaee4p118153jsn4bba6da3d36e',
		'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
	}
};

async function requestPrice(symbol) {
    try {
        const response = await axios.get(`https://realstonks.p.rapidapi.com/${symbol}`, options);
        const stockPrice = await response.data.price;
        return stockPrice;

    } catch (error) {
        console.error(error);
    }
}


let hStockArray = [
    {
        name: 'GoPro, Inc.',
        symbol: 'GPRO',
        price: 0,
        shares: 1,
        avgPrice: 6.39,
        totalInvestment: (shares, avgPrice) => {
            return shares * avgPrice;
        },
        marketPrice: 0
    },
    {
        name: 'Sofi, Inc.',
        symbol: 'SOFI',
        price: 0,
        shares: 1,
        avgPrice: 5.98,
        totalInvestment: (shares, avgPrice) => {
            return parseFloat(shares) * parseFloat(avgPrice);
        },
        marketPrice: 0
    }
]

let jStockArray = [
    {
        name: 'Ford Motor, Inc.',
        symbol: 'F',
        price: 0,
        shares: 1,
        avgPrice: 13.85,
        totalInvestment: (shares, avgPrice) => {
            return shares * avgPrice;
        },
        marketPrice: 0
    },
    {
        name: 'LifeVantage, Inc.',
        symbol: 'LFVN',
        price: 0,
        shares: 1,
        avgPrice: 4.29,
        totalInvestment: (shares, avgPrice) => {
            return parseFloat(shares) * parseFloat(avgPrice);
        },
        marketPrice: 0
    }
]


for(let i=0; i < hStockArray.length; i++) {
    hSharesOwned[i].innerText = `Shares Owned: ${hStockArray[i].shares}`;
    hAvgPrice[i].innerText = `Average Price Paid: $${hStockArray[i].avgPrice}`;
}

for(let i=0; i < jStockArray.length; i++) {
    jSharesOwned[i].innerText = `Shares Owned: ${jStockArray[i].shares}`;
    jAvgPrice[i].innerText = `Average Price Paid: $${jStockArray[i].avgPrice}`;
}

async function hUpdateArray() {
    try {
        for(let i=0; i < hStockArray.length; i++) {
            const price = await requestPrice(hStockArray[i].symbol);
            hStockPrices[i].innerText = `Current Price: $${price.toFixed(2)}`;
            let total = hStockArray[i].totalInvestment(hStockArray[i].shares, hStockArray[i].avgPrice);

            let marketValue = price * hStockArray[i].shares;
            let gainLoss = (marketValue - total).toFixed(2);
            if(gainLoss > 0) {
                hGainLoss[i].classList.add('green');
            } else {
                hGainLoss[i].classList.add('red');
            }
            hGainLoss[i].innerText = `$${gainLoss}`;
            hStockNames[i].innerText = hStockArray[i].name;
            hTotalInvestment[i].innerText = `Total Investment: $${total.toFixed(2)}`;
        }
        
    } catch (error) {
        console.error(error);
    }
}

async function jUpdateArray() {
    try {
        for(let i=0; i < jStockArray.length; i++) {
            const price = await requestPrice(jStockArray[i].symbol);
            jStockPrices[i].innerText = `Current Price: $${price.toFixed(2)}`;
            let total = jStockArray[i].totalInvestment(jStockArray[i].shares, jStockArray[i].avgPrice);

            let marketValue = price * jStockArray[i].shares;
            let gainLoss = (marketValue - total).toFixed(2);
            if(gainLoss > 0) {
                jGainLoss[i].classList.add('green');
            } else {
                jGainLoss[i].classList.add('red');
            }
            jGainLoss[i].innerText = `$${gainLoss}`;
            jStockNames[i].innerText = jStockArray[i].name;
            jTotalInvestment[i].innerText = `Total Investment: $${total.toFixed(2)}`;
        }
        
    } catch (error) {
        console.error(error);
    }
}

async function hUpdateTotals() {
    try {
            const price = await requestPrice(hStockArray[0].symbol);
            let totalPortfolioValue = price * hStockArray[0].shares;
            let totalInvested = hStockArray[0].avgPrice * hStockArray[0].shares;
            
            const price2 = await requestPrice(hStockArray[1].symbol);
            totalPortfolioValue = (totalPortfolioValue + (price2 * hStockArray[1].shares)).toFixed(2);
            totalInvested = (totalInvested + hStockArray[1].avgPrice * hStockArray[1].shares).toFixed(2);
            
            let totalGainLoss = (totalPortfolioValue - totalInvested).toFixed(2);
            if(totalGainLoss < 0 ) {
                hTotalGainLoss.classList.add('red');
            } else {
                hTotalGainLoss.classList.add('green');
            }
            hTotalPortfolioValue.innerText = `$${totalPortfolioValue}`;
            hTotalInvested.innerText = `$${totalInvested}`;
            hTotalGainLoss.innerText = `$${totalGainLoss}`;
        } catch (error) {
        console.error(error);
    }
}

async function jUpdateTotals() {
    try {
            const price = await requestPrice(jStockArray[0].symbol);
            let totalPortfolioValue = price * jStockArray[0].shares;
            let totalInvested = jStockArray[0].avgPrice * jStockArray[0].shares;
            
            const price2 = await requestPrice(jStockArray[1].symbol);
            totalPortfolioValue = (totalPortfolioValue + (price2 * jStockArray[1].shares)).toFixed(2);
            totalInvested = (totalInvested + jStockArray[1].avgPrice * jStockArray[1].shares).toFixed(2);
            
            let totalGainLoss = (totalPortfolioValue - totalInvested).toFixed(2);
            if(totalGainLoss < 0 ) {
                jTotalGainLoss.classList.add('red');
            } else {
                jTotalGainLoss.classList.add('green');
            }
            jTotalPortfolioValue.innerText = `$${totalPortfolioValue}`;
            jTotalInvested.innerText = `$${totalInvested}`;
            jTotalGainLoss.innerText = `$${totalGainLoss}`;
        } catch (error) {
        console.error(error);
    }
}

hUpdateTotals();
hUpdateArray();
jUpdateArray();
jUpdateTotals();



