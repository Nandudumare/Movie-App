// fetch vali link
//https://www.omdbapi.com/?s=endgame&page&apikey=3df83f7c




let movie_search = document.getElementById("search-box")


async function loadMovies(search) {
    try {
        let URL = `https://www.omdbapi.com/?s=${search}&page&apikey=3df83f7c`;
    // console.log(URL)
       let res = await fetch(`${URL}`)
        let data = await res.json();
    //  console.log(data)
    

    if (data.Response == "True") {
    //    console.log('data:', data.Response)
        let y = data.Search[0].imdbID
       
        mainData(y)

        slow(data.Search)
         console.log('data:', data.Search)
        // console.log('y:', y)
    }
    else if (data.Search == null) {
        galat(search)
    }  
    }
    catch (error) {   
    }
}

async function mainData(id) {
    try {
        let url = `https://www.omdbapi.com/?i=${id}&page&apikey=3df83f7c`;
        let res = await fetch(`${url}`)
        let pdata = await res.json();
        //console.log('data:', pdata)
        displayData(pdata)
    }
    catch (er) {
        
    }
}

function galat(search) {
    var img = "https://media4.giphy.com/media/3ohA2ZD9EkeK2AyfdK/200w.webp?cid=ecf05e47adgq2n88c3kmsa52f9l3049cz30dcsatl02nhy2l&rid=200w.webp&ct=g"
    document.getElementById("container").innerHTML = "";
    let container = document.getElementById("container");
    let imgee = document.createElement("img")
    imgee.setAttribute("src", img)
    let h2 = document.getElementById("error");
    h2.innerText = `I DON'T HAVE MOVIE LIKE ${search}`
    container.append(imgee)
    console.log(img)
    container.style.height = "300px";
    container.style.width = "80%"
}

function displayData(data) {
    document.getElementById("container").innerHTML = "";
    document.getElementById("error").innerHTML = "";
    let el = data;
    let container = document.getElementById("container");
    let imgDiv = document.createElement("div")
    imgDiv.setAttribute("id","imgDiv")
    let image = document.createElement("img")
    image.src = el.Poster;
    imgDiv.append(image)
    let matterDiv = document.createElement("div")
    matterDiv.setAttribute("id", "matter")
    let h21 = document.createElement("h2")
    h21.innerText = `${el.Title}`
    let h22 = document.createElement("h3")
    h22.innerText = `Released Date: ${el.Released}`
    let h23 = document.createElement("h3")
    h23.innerText = `Type: ${el.Type}`
    let h24 = document.createElement("h3")
    h24.innerText = `Time: ${el.Runtime}`;
    let h25 = document.createElement("h3")
    h25.innerText = `Director: ${el.Director}`;
    let h26 = document.createElement("h3")
    h26.innerText = `Writer: ${el.Writer}`;
    let h27 = document.createElement("h3")
    h27.innerText = `Rating: ${el.imdbRating}/10`;
    
    if (el.imdbRating > 8.5) {
        let recImg = "https://toppng.com/uploads/preview/recommended-stamp-11523435657gjfa9orylw.png"
        let recommended = document.createElement("div");
        recommended.setAttribute("id","rec")
        let Rimg = document.createElement("img")
        Rimg.src = recImg;
        Rimg.style.width = "100%"
        recommended.append(Rimg)
        h21.style.margin = "-60px 100px 0px"
        matterDiv.append(h21,h22,h23,h24,h25,h26,h27,recommended)
        container.append(imgDiv, matterDiv,)
    }
    matterDiv.append(h21,h22,h23,h24,h25,h26,h27)
    container.append(imgDiv, matterDiv)
    

}
function myfunction() {
    let x = document.getElementById("search-box").value.trim();
    console.log('x:', x)
    loadMovies(x)
}






 async function slow() {
    //console.log('data:', data)
     try {
         let x = document.getElementById("search-box").value.trim();
         
        let URL = `https://www.omdbapi.com/?s=${x}&page&apikey=3df83f7c`;
  
       let res = await fetch(`${URL}`)
        let data = await res.json();
    
    
   
        return data.Search
         console.log('data:', data.Search)
       

     } catch(error) {
         
    }
   
     
}



function list(data) {
    document.getElementById("movies").innerHTML = "";
    data.forEach(function (el) {

        let movies = document.getElementById("movies");


        let small = document.createElement("div")

        small.setAttribute("id", "small")
        small.addEventListener("click", function () {
            // displayData(el)
            // console.log('el:', el)
            mainData(el.imdbID)
            clear();
        })

        let big = document.createElement("div")

        big.setAttribute("id","big")

        let img = document.createElement("img")
        
        img.src = el.Poster;

        big.append(img)
        
        let p = document.createElement("p");
        
        p.setAttribute("class", "title")
        
        p.innerText = el.Title; 

        let p1 = document.createElement("p")

        p1.setAttribute("class", "title")
        
        p1.innerText = el.Year; 

        small.append(big, p, p1)
        
        movies.append(small)
    })
}



async function main(){
    
    try {
        document.getElementById("movies").innerHTML = "";
        let data5 = await slow();
        console.log('data5:', data5)
        if (data5 == undefined) {
            return false;
        }
        list(data5)
    } catch (error) {
        
    }
}

let timerid;

function debounce(func, delay) {
    if (timerid) {
        clearTimeout(timerid)
    }

    timerid = setTimeout(function () {
        func();
    },delay)
}

function clear() {
    let movies = document.getElementById("movies");
    movies.style.height = "0px"
    movies.style.width = "0%"
    
}


document.getElementById("search-box").addEventListener("keyup", function () {
    let movies = document.getElementById("movies");
    movies.style.height = "250px"
    movies.style.width = "60%"
})

document.getElementById("searchBtn").addEventListener("click", function () {
    let movies = document.getElementById("movies");
    movies.style.height = "0px"
    movies.style.width = "0%"
})

document.querySelector("body").addEventListener("mouseup", function () {
    let movies = document.getElementById("movies");
    movies.style.height = "0px"
    movies.style.width = "0%"
})

document.getElementById("trend").addEventListener("click", function () {
    window.location.href = "./trending.html"
})