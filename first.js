const API_KEY="79bfba95321b41d1bc55d649a55bbbb2";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchnews("india"));
async function fetchnews(query){
 const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
 const data= await res.json();
 console.log(data);
 bindData(data.articles);
}
function bindData(articles){
    const cardscontainer=document.getElementById("cards-container");
    const newscardtemplate=document.getElementById("template-news-cards");
    cardscontainer.innerHTML="";
    articles.forEach(article=>{
        if(!article.urlToImage) return;
        const cardclone=newscardtemplate.content.cloneNode(true);
        filldataincard(cardclone,article);
        cardscontainer.appendChild(cardclone);
    });

}
function filldataincard(cardclone,article){
    const newsimg=cardclone.querySelector("#news-image");
    const newstitle=cardclone.querySelector("#news-title");
    const newssource=cardclone.querySelector("#news-source");
    const newsdesc=cardclone.querySelector("#news-desc");
    newsimg.src=article.urlToImage;
    newstitle.innerHTML = article.title;
   
    newsdesc.innerHTML=article.description;
    //line to convert date format in local standard format using to localeString method
    const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
    newssource.innerHTML=`${article.source.name}.${date}`;

    cardclone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}
let curselectedNav=null;
function onnavitemclick(id){
    fetchnews(id); 
    const navitem=document.getElementById(id);
    curselectedNav?.classList.remove('active');
    curselectedNav=navitem;
    curselectedNav.classList.add('active');

}
const searchbutton=document.getElementById("search-button");
const searchtext=document.getElementById("searchtext");
searchbutton.addEventListener('click',()=>{
    const query=searchtext.value;
    if(!query) return;
    fetchnews(query);
    curselectedNav?.classList.remove("active");
})