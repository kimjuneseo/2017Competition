
const meun = document.querySelector('.nav')
const content = document.querySelector('.contents')
const jsonLocation = '../music_data.json';
const create = (tag) => document.createElement(tag);
$.getJSON(jsonLocation, init);
const a = Array.from(new Set(jsonLocation))
console.log(a)
let music;

const getMusicData = url => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", jsonLocation);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                resolve(xhr.response);
            };
        };
    });
};

const createMenu = function (text) {
    const li = create("li");
    li.innerHTML = `
    <a href="#"><i class="fa fa-youtube-play fa-2x"></i> <span>${text}</span></a>
    `
    meun.append(li)
}

function init({ data }) {
    // const { data } = await getMusicData();

    meun.childNodes[5].remove()
    Array.from(new Set(data.map(data => data.category))).forEach(createMenu)
    Array.from(new Set(data.map(data => data))).forEach(({ albumJaketImage, albumName, artist, release, price }) => {
        const div = create('div');
        div.innerHTML = `
            <div class="col-md-2 col-sm-2 col-xs-2 product-grid">
                            <div class="product-items">
                                    <div class="project-eff">
                                        <img class="img-responsive" src="images/${albumJaketImage}" alt=${albumName} >
                                    </div>
                                <div class="produ-cost">
                                    <h5>${albumName}</h5>
                                    <span>
                                        <i class="fa fa-microphone"> </i> 
                                        <p>${artist}</p>
                                    </span>
                                    <span>
                                        <i class="fa  fa-calendar"> 발매일</i> 
                                         
                                        <p>${release}</p>
                                    </span>
                                    <span>
                                        <i class="fa fa-money"> 가격</i>
                                        <p>￦${price}</p>
                                    </span>
                                    <span class="shopbtn">
                                        <button class="btn btn-default btn-xs">
                                            <i class="fa fa-shopping-cart"></i> 쇼핑카트담기
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>`
        content.appendChild(div)
    })
};
// init();
console.log(meun.children[2])

meun.addEventListener('click', function ({ target }) {
    if (target.innerHTML === "발라드") {
        console.log(target)
    }
})
// const highlight = () =>{
// }

console.log(meun.children);

// highlight()