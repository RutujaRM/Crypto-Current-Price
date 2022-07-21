//here we fetch data for to kmown the current value of currency

fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cpolkadot%2Cdogecoin%2Ctether%2Cbinancecoin%2Chelium%2Ccardano%2Csolana%2Clitecoin%2Cstellar&vs_currencies=inr').then(convertToJson).then(showData)  // it needs function


// create function for fetch to convert data into json

function convertToJson(response)    //pass parameter
{  
  return response.json();
}

//create function for to show data

function showData(data)
{
   const bitcoin_price      = document.getElementById("bitcoin_price_container") ;      //here we take id to show data on html
   const binancecoin_price  = document.getElementById("binancecoin_price_container");
   const dogecoin_price     = document.getElementById("dogecoin_price_container");
   const ethereum_price     = document.getElementById("ethereum_price_container");
   const helium_price       = document.getElementById("helium_price_container");
   const litecoin_price     = document.getElementById("litecoin_price_container");
   const polkadot_price     = document.getElementById("polkadot_price_container");
   const solana_price       = document.getElementById("solana_price_container");
   const tether_price       = document.getElementById("tether_price_container");
   const stellar_price      = document.getElementById("stellar_price_container");
   const cardano_price      = document.getElementById("cardano_price_container");


   
   bitcoin_price.innerText      =data.bitcoin.inr;  //this format of api this are keys present in object 
   binancecoin_price.innerText  =data.binancecoin.inr;
   dogecoin_price.innerText     =data.dogecoin.inr;
   ethereum_price.innerText     =data.ethereum.inr;
   helium_price.innerText       =data.helium.inr;
   litecoin_price.innerText     =data.litecoin.inr;
   polkadot_price.innerText     =data.polkadot.inr;
   solana_price.innerText       =data.solana.inr;
   tether_price.innerText       =data.tether.inr;
   stellar_price.innerText      =data.stellar.inr;
   cardano_price.innerText      =data.cardano.inr;
   
   
    console.log(data);
}

// video slide show

   //here we get id of all videos 
    var box1 = document.getElementById('vd1');
    var box2 = document.getElementById('vd2');
    var box3 = document.getElementById('vd3');
    var box4 = document.getElementById('vd4');
 
     box1.onended = function ()
      {
         box2.play();
         box1.style.opacity=0;
         box2.style.opacity=1;
     }
     box2.onended = function () 
     {
         box3.play();
         box2.style.opacity=0;
         box3.style.opacity=1;
     }
     box3.onended = function () 
     {
         box4.play();
         box3.style.opacity=0;
         box4.style.opacity=1;
     }
     box4.onended = function()
     {
      box1.play();
      box4.style.opacity=0;
      box1.style.opacity=1;

     }
  