let promesse_load = new Promise((resolve, reject) => {
    window.addEventListener("load", resolve);
});

let promesse_work = fetch("http://localhost:5678/api/works");
// remplir la galerie avec les données du serveur lorsque la page et chargé et que les données ont été reçu
Promise.all([promesse_load, promesse_work])
    .then((data) => {
        data[1].json()
            .then((work_list) => {
                let work_list_html = "";
                for (const elem of work_list) {
                    work_list_html = `${work_list_html}<figure data-category-id="${elem.category.id}"><img src="${elem.imageUrl}" alt="${elem.title}"><figcaption>${elem.title}</figcaption> </figure>`;
                }
                document.querySelector(".gallery").innerHTML = work_list_html;
            })
            .catch(console.error)
    })
    .catch((err) => {
        console.error(err);
    });

let promesse_category = fetch("http://localhost:5678/api/categories")
Promise.all([promesse_load, promesse_category])
    .then((data) => {
        data[1].json()
            .then((category_list) => {
                let category_list_html = `<button onclick="filter_select(this)" aria-checked data-category-id="*">Tous</button>`;
                for (const elem of category_list) {
                    category_list_html = `${category_list_html}<button onclick="filter_select(this)" data-category-id="${elem.id}">${elem.name}</button>`;
                }
                document.querySelector(".filters").innerHTML = category_list_html;
            })
            .catch(console.error)
    })
    .catch((err) => {
        console.error(err);
    });

function filter_select(target) { 
    //selection de la catégorie lors du clic
    document.querySelectorAll(".filters *").forEach(elem=>elem.removeAttribute("aria-checked"));
    target.setAttribute("aria-checked","");

    //récupération de l'id de la catégorie selectionné
    let selected_category = target.getAttribute("data-category-id");

    //Affichage des éléments de la gallerie pour la catégorie sélectionnée
    document.querySelectorAll(".gallery figure").forEach(elem => {
        if (selected_category == elem.getAttribute("data-category-id") || selected_category == "*") {
            elem.removeAttribute("aria-hidden");
        } else {
            elem.setAttribute("aria-hidden", "");
        }
    })
}