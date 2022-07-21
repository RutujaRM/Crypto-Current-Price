//*************** fetch data for search (put at bottom api) ***************************************

function convertToJson(response)   //to convert fetch data into json
{
    return response.json();
}

function showResult(data)     //show the result after conversion
{

    for( i=0 ; i< data.coins.length; i++)   //to execute upto coins length whatever present
    { 
          const single_data=data.coins[i];  //show each coin single with there values
          //console.log(single_data); 
 
           //Here we are create Elements because (then its created by default as per data)
           
           
           //here we create a row by using tr
            const new_row = document.createElement("tr"); 

           //here we create columns by using td

             //############### serial number column #################
             const new_no   = document.createElement("td"); //pass serial no as per data number coins data by i
             new_no.innerText=i+1; 
           

             //############### logo  column #################
             const new_logo = document.createElement("td");
             const new_img  = document.createElement("img");
             new_img.src = single_data.thumb;  //for logo create image src and pass the path of logo from data
             new_logo.appendChild(new_img);   //here we push that image on logo


             //############### name column #################
              const new_name = document.createElement("td");
              new_name.innerText = single_data.name ; 


              //############### Symbol column #################
              const new_symbol = document.createElement("td");
              new_symbol.innerText =single_data.symbol;


              
              //############### Rank column #################
              const new_rank = document.createElement("td");
              new_rank.innerText =single_data.market_cap_rank;



             //############### link column #################
               const new_link = document.createElement("td");
               
               const new_a = document.createElement("a");  //create ancher tag
               new_a.innerText = "Read More";   
               new_a.href=`detail.html?coin=${single_data.id}`; // give detail page path then (single data)variable with there id by using query also here we set query parameter here we use "coin"
               new_link.appendChild(new_a);               //here we push anchar tag on link

            
           // here we have to push all td/columns data on row
                new_row.appendChild(new_no);
                new_row.appendChild(new_logo);
                new_row.appendChild(new_name);
                new_row.appendChild(new_symbol);
                new_row.appendChild(new_rank);
                new_row.appendChild(new_link);
               

               
            //here we have to push this row into body
             const tbody_showdata = document.getElementById("tbody_showdata");
             tbody_showdata.appendChild(new_row); 
             

    }
    //console.log(data);
   
}

//******************** TO get url to know what exactly we search***************************************************** */


 // Here we use BOM(Browser object model)
 /* 
    so in this window is an object and there have multiple values or parametre present 
     here we pass location parameter and href(hypertext reference) to know the current URL
     because as per search our query parameter change
     
     http://127.0.0.1:5500/search.html?q=bitcoin
     http://127.0.0.1:5500/search.html?q=ethe
 */ 
 console.log(window.location.href);   //to get url or a query parameter or current location

 
 var url        = new URL(window.location.href);    // http://127.0.0.1:5500/search.html?q=bitcoin 
 var params     = new URLSearchParams(url.search);  // q=bitcoin&a=hiiiii   
 let search_key = params.get("q");                  // bitcoin
 
 // search_key variable holds whatever data we search and this variable we pass to the api in fetch
 console.log(search_key)

 
 
 //########## to hold the string whatever we are search in that seach box #######

 let search_field = document.getElementById("search_field"); //get id of search
 search_field.value = search_key ;                           //on search box put value whater search





 //***************************/ API to show all the data *******************************************

fetch(`https://api.coingecko.com/api/v3/search?query=${search_key}`).then(convertToJson).then( showResult);
