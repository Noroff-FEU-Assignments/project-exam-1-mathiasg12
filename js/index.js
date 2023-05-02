const url= "https://exam1api.gamehubstore.live/wp-json/wp/v2/posts"
const urlPictures= "https://exam1api.gamehubstore.live/wp-json/wp/v2/media"
const latestPosts= document.querySelector(".latestCon")
async function getPost(){
    try{
        const resp= await fetch(url);
        const apiJson = await resp.json();
        return apiJson;
    }
    catch(error){
        console.log(error)
    }};
    async function getpictures(){
        try{
            const resp= await fetch(urlPictures);
            const apiJson = await resp.json();
            console.log(apiJson)
            return apiJson;
        }
        catch(error){
            console.log(error)
        }};
   async function renderPosts(){
            let postsArray= await getPost();
            let pictures= await getpictures()
            latestPosts.innerHTML="";
            for(let i= 0; i < postsArray.length; i++){
                let picture= pictures[i]
                let posts= postsArray[i]
                console.log(picture)
                latestPosts.innerHTML += `<div class="thumbnailLatest"><img src=""></img><h2>${posts.title.rendered}</h2><p>${posts.excerpt.rendered}</p></div>`
            }
    }
    renderPosts()

