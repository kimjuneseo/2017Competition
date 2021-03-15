const meun = document.querySelector('.nav')
var jsonLocation = '../music_data.json';
const create = (tag) => document.createElement(tag)
$.getJSON(jsonLocation, init)


function init({ data }) {
    meun.childNodes[5].remove()
    Array.from(new Set(data.map(data => data.category))).forEach(createMenu)
}

function createMenu(text) {
    const li = create("li");
    li.innerHTML = `
        <a href="#"><i class="fa fa-youtube-play fa-2x"></i> <span>${text}</span></a>
    `
    meun.append(li)
}


