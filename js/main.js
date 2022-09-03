// thumbnail load
fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res => res.json())
    .then(thumbnails => newsThumbnail(thumbnails.data.news_category))
    .catch(err => {
        console.log(err.message);
    });


// news load
const newsLoader = async (id, category) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
        const news = await res.json();
        displayAllNews(news.data, category);
    }
    catch (err) {
        console.log(err.message);
    }
}



// thumbnail item add
const newsThumbnail = (tnumbnails) => {

    const findNewsThumbnail = findElement("newsThumbnail")
    tnumbnails.forEach(element => {
        const li = document.createElement("li")
        li.innerHTML = `
        <a href="#" class="block py-2 pr-4 pl-3 text-gray-500 hover:text-teal-700 text-lg rounded md:bg-transparent "
        aria-current="page" id=${element.category_id}>${element.category_name}</a>
        `;

        // find thumbnail
        findNewsThumbnail.appendChild(li)
        findElement(`${element.category_id}`).addEventListener("click", (e) => {
            // e.target.style.backgroundColor = "teal"
            // e.target.style.color = "white";
            newsLoader(e.target.id, e.target.innerText);
            spinner(true)
        })
    });
}


// news add
const displayAllNews = (cartItems, category) => {

    findElement("dataCount").innerText = cartItems.length !== 0 && category ? `${cartItems.length} items found for ${category} category` : "news not found";

    spinner(false)
    const allNews = findElement("allNews");
    allNews.innerHTML = '';
    cartItems.forEach(items => {
        console.log(items);
        const div = document.createElement("div");

        div.classList.add('flex', 'flex-col', 'justify-between', 'items-center', 'w-full', 'bg-teal-50', 'rounded-lg', 'border', 'shadow-md', 'md:flex-row', 'mb-5', 'gap-5')
        div.innerHTML = `
        <img class= "w-4/12 ml-2 h-full" src = "${items.image_url}" alt = "" >
        <div class="flex flex-col justify-between p-4 leading-normal" >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Noteworthy
            technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${items.title}</p>

        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${items.details.slice(0, 400)}</p>

        <div class="flex justify-between items-center mt-5">
            <div class="flex items-center">
                <img class="w-12 rounded-full mr-3" src="${items.author.img} " alt="">
                    <div class="">
                        <h4 class="font-semibold">${items.author.name}</h4>
                        <p class="text-gray-500">${items.author.published_date} </p>
                    </div>
            </div>
            <div class="flex items-center gap-2">
                <i class="fa-regular fa-eye text-teal-500"></i>
                <p><span>${items.total_view}</span> M</p>
            </div>
            <div class="text-teal-500">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </div>
            <div>
                <button id="${items._id}"> <i class="fa-solid fa-arrow-right-long font-2xl text-teal-700"></i></button>
            </div>
            </div>
        </div>
    `
        allNews.appendChild(div)

        findElement("navImage").setAttribute("src", `${items.author.img}`)
    });

}
newsLoader("")


// spinner
const spinner = (condition) => {
    const findSpinner = findElement("spinner");
    if (condition) {
        findSpinner.style.display = ("block")
    }
    else {
        findSpinner.style.display = ("none")
    }
}


// common function

const findElement = (elementId) => {
    const element = document.getElementById(elementId)
    return element
}
