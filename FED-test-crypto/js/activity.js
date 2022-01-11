function Activity(){
    let _this = this;

    const total = 6;
    let id = 1;

    let date = new Date();
    let preDate = `${date.getDate()-1}-0${date.getMonth()+1}-${date.getFullYear()}`

    const data = [
        {name: "Sugu", id: "1542", age: "42", level: "1", avg: "88"},
        {name: "Pavi", id: "1319", age: "23", level: "5", avg: "74"},
        {name: "Vinoth", id: "4328", age: "25", level: "3", avg: "75"},
        {name: "Siva", id: "9534", age: "64", level: "6", avg: "98"},
        {name: "Ishwarya", id: "2864", age: "35", level: "2", avg: "65"},
        {name: "Raj", id: "2864", age: "76", level: "3", avg: "46"},
        {name: "Saranya", id: "2864", age: "32", level: "6", avg: "70"},
        {name: "Govindh", id: "2864", age: "30", level: "1", avg: "32"},
        {name: "Ragu", id: "2864", age: "28", level: "5", avg: "40"}
    ]

    this.init = function(){
        _this.fetchData();
        console.log("JS Activated");
        let newArr = data.sort((elem1, elem2)=> elem2.avg-elem1.avg);
        for(let i=0; i<6; i++){
            $('.board ul').append(`<li class='list-group-item list-group-item-action bg-transparent'><a href='#'>${newArr[i].name}</a></li>`)
        }

        $('.wishList').click(e =>{
            let emailID = prompt("Please enter email ID");
            console.log(emailID.substring(emailID.length-10,emailID.length))
            if(emailID !== ""){
                if(emailID.substring(emailID.length-10,emailID.length) == "@gmail.com"){
                    alert("Thank you!!");
                    sessionStorage.setItem(id, emailID);
                    id++;
                }else{alert("Enter a valid ID")}
            }else{
                alert("Enter a valid ID")
            }
        })
    }

    this.fetchData = function(){
            async function getDatass(){
                await fetch("https://api.coingecko.com/api/v3/coins/",{
                    method: "GET"
                }).then((response)=>{
                    if(response.status == 200 & response.ok){
                        console.log("Success call");
                        return response.json();
                    }else{
                        throw "Invalid URL";
                    }
                }).then(actualData => {
                    console.log(actualData)
                    _this.prepareCoinDatas(actualData);
                }).catch(err => console.error(err));
            }
            getDatass();
    }

    this.prepareCoinDatas = function(coinData){
        for(let index=0; index<=total; index++){
            let coinName = coinData[index].name,
                symbol = coinData[index].symbol,
                imageUrl = coinData[index].image.thumb,
                currentCoinRate = coinData[index].market_data.current_price.usd,
                coinID = coinData[index].id;

                async function gerPreData(callbck){
                    await fetch(`https://api.coingecko.com/api/v3/coins/${coinID}/history?date=${preDate}&localization=false`, {
                        method: "GET"
                    }).then((response)=>{
                        if(response.status == 200 & response.ok){
                            return response.json();
                        }else{
                            throw "Invalid URL";
                        }
                    }).then(actualData => {
                        let x = actualData.market_data.current_price.usd;

                        callbck(coinName,symbol,imageUrl,currentCoinRate, x);
                    }).catch(err => console.error(err));
                }
                gerPreData(_this.showCoinDatas);
        }
    }

    this.showCoinDatas = function(coinName, symbol, imageUrl, currentCoinRate, preCoinRate){
        let difference = (currentCoinRate-preCoinRate).toFixed(2),
            flag = (difference<=0)? "redFlag" : "greenFlag";
            $('.crypto-costs ul').append(`
            <li>
                <img src="${imageUrl}" alt="${coinName}">
                <p>${symbol.toUpperCase()}</p>
                <p>$${currentCoinRate}</p>
                <p class="${flag}">${difference}</p>
            </li>`
            )
    }
}