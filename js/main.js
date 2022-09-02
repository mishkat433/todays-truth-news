// thumbnail load
fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res => res.json())
    .then(thumbnails => newsThumbnail(thumbnails.data.news_category))
    .catch(err => {
        console.log(err.message);
    })


// thumbnail item add
const newsThumbnail = (tnumbnails) => {

    const findNewsThumbnail = document.getElementById("newsThumbnail");
    tnumbnails.forEach(element => {
        const li = document.createElement("li")
        li.innerHTML = `
        <a href="#" class="block py-2 pr-4 pl-3 text-gray-500 hover:text-teal-700 text-lg rounded md:bg-transparent "
        aria-current="page" id=thumbnail-${element.category_id}>${element.category_name}</a>
        `;
        // find thumbnail
        findNewsThumbnail.appendChild(li)
        document.getElementById(`thumbnail-${element.category_id}`).addEventListener("click", (e) => {
            const selectItem = document.getElementById('selectItem')
            selectItem.innerText = e.target.innerText
            e.target.style.backgroundColor = "teal"
            e.target.style.color = "white";
            console.log(e.target.innerText);

        })
    });



}

