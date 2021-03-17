const clone = $(".contents>div:first-child").clone();
const menu = document.querySelector('.nav')
const content = document.querySelector('.contents')
const jsonLocation = '../music_data.json';
const create = (tag) => document.createElement(tag);
let current_category = "ALL";
$.getJSON(jsonLocation, init);


function init({ data }) {
    function item({ category, albumJaketImage, albumName, artist, release, price }) {
        [...data].filter(({ release }) => console.log(release.split('.')[1].sort()))
        const itemClone = clone.clone();
        itemClone
            .find(".project-eff img").attr("src", `images/${albumJaketImage}`).attr("alt", albumName).end()
            .find("h5").text(albumName).end()
            .find("span:nth-of-type(1) p").text(artist).end()
            .find("span:nth-of-type(2) p").text(release).end()
            .find("span:nth-of-type(3) p").text("\\ " + parseInt(price.replace("원", "")).toLocaleString());
        if (current_category == category || current_category == "ALL") {
            $(content).append(itemClone);
        }
    }

    const createMenu = function (text) {
        console.log(text)
        const li = create("li");
        li.innerHTML = `
    <a href="#"><i class="fa fa-youtube-play fa-2x"></i> <span>${text}</span></a>
    `;
        menu.append(li)
    }
    menu.childNodes[5].remove();
    Array.from(new Set(data.map(data => data.category))).forEach(createMenu)

    const a = [...document.querySelectorAll("#main-menu li:not(:first-child)")].forEach(li => {
        li.addEventListener("click", function (e) {
            content.innerHTML = "";
            current_category = this.textContent.trim();
            data.forEach(item);
        })
    })

    content.innerHTML = "";
    data.forEach(item);
};


