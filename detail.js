/*   To get url or a query parameter or current location
     so by using that we can get the current search coin information or details 

*/
  
var url        = new URL(window.location.href);       // http://127.0.0.1:5500/search.html?q=bitcoin 
var params     = new URLSearchParams(url.search);     // q=bitcoin&a=hiiiii   
let coin_id   = params.get("coin");                  // bitcoin  also here i get query"coin" from where i am set in search.js(58) 
console.log(coin_id);

// so here as per that search coin id/key we get that particular coin details



//************* 1) here we are use the fetch data for to show the currency detail info ***************************
 

fetch(`https://api.coingecko.com/api/v3/coins/${coin_id}?localization=false&tickers=false&market_data=false&community_data=true&developer_data=false&sparkline=true`).then(converToJson).then(showInfo)

 // here we create function to convert json
 function converToJson(response)     //respnse is just like vaiable name as parameter
 {
     return response.json();
 }
 
 //here we create a function to show data
 function showInfo(info)
 {
 
   //DOM manipulation
  const coin_image= document.getElementById("coin_image"); //to show coin image get id
  coin_image.src=info.image.large;                        //here we given the image path store in fetch data in console
 
  const coin_name=document.getElementById("coin_name");    //to show name of coin get id
  coin_name.innerText=info.name;                           //use name key from data we are fetch
 
  const coin_description=document.getElementById("coin_description"); //to show coin information get id
  coin_description.innerHTML=info.description.en;             //in description object en key from data we are fetch
   
  console.log(info);
 }
 
 //**************************** 2) here we are using the fetch data to show the simple price ******************************** 
 
 
 fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin_id}&vs_currencies=inr%2Cusd%2Ceur`).then(converToJson).then(showPrice)
 
 //create function to show the price
 function showPrice(data)
 {
 
   const inr_price=document.getElementById("inr_price");
   inr_price.innerText=data[coin_id].inr;   //coin id is variable which holds the key or values of prices Ex:object

   const usd_price=document.getElementById("usd_price");
   usd_price.innerText=data[coin_id].usd;          //parameter .path where data store
 
   const eur_price=document.getElementById("eur_price");
   eur_price.innerText=data[coin_id].eur;
     
   console.log(data);
 }
 
 
 //*****************3) here we are using the fetch to get market data history **************************************** 
 
 //
 
 fetch(`https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart?vs_currency=inr&days=15&interval=daily`).then(converToJson).then(marketData)
 
 //create function to show market data history
 function marketData(data)
 {
     showGraph(data); //here we pass function of graph because after getting market dataas per we can draw it
 }

  
 //*********************4) here showing the graph ************************************************** 
 

 //create function inside that put graph format

  function showGraph(graph)
  {
     console.log(graph)
     console.log(graph.prices)  
    
     
    // C) convert unix timestamp into human readable (labels are present in this format) like date and month

       
        function convertUnixToReadable(timestamp)
    {
         const date         = new Date(timestamp);
        const date_string  = date.getDate();
        const month_string = date.getMonth() + 1;

        const readable     = date_string + ' - ' + month_string; //concatenate date and month 
         return readable;  //print it
    }


      // B) here to store separeted label and price with array declaration
        let label =[];
        let price =[];
   
     // A) here we are using loop to show one by one price with seperate label and price

        for(let i=0 ; i<graph.prices.length ; i++)  //upto prices value length loop executed
        {
     
            const single_price=graph.prices[i];  //here we are showing single price
            
            const readable_label = convertUnixToReadable(single_price[0]);//pass the values of labels at this 0 index
            
            label.push( readable_label);  //pass the convertable label from time to date and month   
            price.push(single_price[1]);  //pass the values of prices at this 1 index
             
        }
       
        
 
     // D) here we get predefined graph data directly from grapth website 
      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
             labels: label,           //here we pass the label array
             datasets: [{
                label: '# of Votes',
                data: price,          //here we pass price array
                backgroundColor: [
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(255, 206, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)'
                ],
             borderColor: [
                 'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)'
             ],
             borderWidth: 1
         }]
     },
     options: {
         scales: {
             y: {
                 beginAtZero: true
             }
         }
     }
  });
  
  
 }
