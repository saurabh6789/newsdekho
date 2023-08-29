const NEWS_API = 'cacdae26d3e04137bc1520883b9621d0';
const URL = "https://newsapi.org/v2/everything?q="


window.addEventListener("load" , ()=>fetchNews("India"));


async function fetchNews(query){
    const res = await fetch(`${URL}=${query}&apikey=${NEWS_API}`);
    const data = await res.json();
    bindata(data.articles);
    // console.log(data);
}

function bindata(articles){
    const cardscontainer = document.getElementById("cards-container");
    const newcardtemplate = document.getElementById("template-news-card");

    cardscontainer.innerHTML ="";

    articles.forEach((article) => {
        if(!article.urlToImage){
            return;
        }
      const cardClone = newcardtemplate.content.cloneNode(true);
       fillDataInCard(cardClone, article);
      cardscontainer.appendChild(cardClone);
   });
}


function fillDataInCard(cardClone, article){

    const newImg = cardClone.getElementById("news-img");
    const newTitle = cardClone.getElementById("news-title");
    const newsSource = cardClone.getElementById("news-source");
    const newsDesc = cardClone.getElementById("news-desc");
 

    newImg.src = article.urlToImage;
    newTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });


     newsSource.innerHTML = `${article.source.name} . ${date}`;

     cardClone.firstElementChild.addEventListener("click", ()=>{window.open(article.url, "_blank");
  });

}

//NAVBAR TWO OR THREE DTATA
let curSelectedNav = null;
function onNavItemClick(id) {
    console.log("dekh bhai");
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}


//SEARCH BUTTON 
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");


searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

