const clone = $(".contents>div:first-child").clone();
const meun = document.querySelector('.nav');
const meunLi = document.querySelector('.nav');
const content = document.querySelector('.contents');
const jsonLocation = 'music_data.json';
const input = document.querySelectorAll('.form-control');
const create = (tag) => document.createElement(tag);
let current_category = "ALL";
$.getJSON(jsonLocation, init);
// const elbum = document.querySelector('') 

function init({ data }) {
    // function controllDisplay(This) {
    //     // console.log(meun.children.classList.contains('active-menu'));
    //     return
    //     [...meunLi.children].forEach((element) => {
    //         console.log(element)
    //         element.classList.remove("active-menu");
    //     });
    //     This.classList.add("active-menu");
    // }

    // HTMLElement.prototype.parent = function(selector) {
    //     let parent = this;
    //     let check = true;
    
    //     const type = selector.match("#");
    
    //     if(type !== null) {
    //        while(check) {
    //           if(parent.id !== selector.replace("#", ""))
    //              parent = parent.parentNode;
    //           else
    //              check = false;
    //        };
    
    //        return parent;
    //     };
    
    //     while(check) {
    //        if(parent.classList.contains(selector.replace(".", ""))) {
    //           check = false;
    //        }else
    //           parent = parent.parentNode;
    //     };
    
    //     return parent;
    //  };
    
    //  HTMLElement.prototype.find = function(target) {
    
    //     return this.querySelector(target);
    // };
    function item({ category, albumJaketImage, albumName, artist, release, price }) {
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
        meun.append(li)
    }

    meun.childNodes[5].remove();
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
    console.log(input[0])
    input[1].addEventListener("keydown", function ({ key }) {
        console.log(this.value)
        if (key === "Enter") {
            content.innerHTML = "";
            // s.innerText.includes(this.value)
            const b = [...data].filter(({ albumName, artist, release, price }) => albumName.includes(this.value) || artist.includes(this.value) || release.includes(this.value) || price.includes(this.value)).forEach(item)

            // const b = [...content.children].filter((s) => s.innerText === input.value ).forEach((e) => console.log(e))
        }
    })

};

