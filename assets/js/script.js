const clone = $(".contents>div:first-child").clone();
const menu = document.querySelector('.nav');
const menuLi = document.querySelector('.nav');
const content = document.querySelector('.contents');
const jsonLocation = 'music_data.json';
const input = document.querySelectorAll('.form-control');
const categoryTitle = document.querySelectorAll('.col-md-12');
const create = (tag) => document.createElement(tag);
const addBtn = document.querySelectorAll('.btn')
let current_category = "ALL";
$.getJSON(jsonLocation, init);
categoryTitle[0].innerHTML = "";
categoryTitle[0].innerHTML = `<h2>ALL</h2>`

function init({ data }) {
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
    //  parent(selector) {
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
        const li = create("li");
        li.innerHTML = `
                        <a href="#"><i class="fa fa-youtube-play fa-2x"></i> <span>${text}</span></a>
                        `;
        menu.append(li)
    }

    menu.childNodes[5].remove();
    Array.from(new Set(data.map(data => data.category))).forEach(createMenu)


    const menuSelection = [...document.querySelectorAll("#main-menu li:not(:first-child)")].forEach(li => {
        li.addEventListener("click", function ({ target }) {
            content.innerHTML = "";
            current_category = this.textContent.trim();
            data.forEach(item);
            categoryTitle[0].innerHTML = "";
            categoryTitle[0].innerHTML = `<h2>${this.textContent}</h2>`
            // 메뉴 클릭시 하아라이트
           const menuHeight = [...li.parentNode.children].forEach((ff) => ff.children[0].classList.remove('active-menu'))
            if(!target.classList.contains('active-menu')){    
            this.children[0].classList.add('active-menu');
        }
        })
    })


    content.innerHTML = "";
    data.forEach(item);
    input[1].addEventListener("keydown", function ({ key, target }) {
        if (key === "Enter") {
            content.innerHTML = "";
            // const fullScan = [...data].filter(({ albumName, artist }) => albumName.includes(this.value) || artist.includes(this.value)).forEach(item);
            const fullScan = [...data].filter(({ albumName, artist }) => albumName.includes(this.value) || artist.includes(this.value)).map(data => {
                data.albumName = data.albumName.replaceAll(this.value, `<p>${this.value}</p>`);
                data.artist = data.artist.replaceAll(this.value, `<p style="color: red;">${this.value}</p>`);
                return data;
            }).forEach(item)
        }
    })

    content.addEventListener('click',function({ target }){
        if(target.classList.contains('btn')){
            target.innerHTML = ""
            target.innerHTML = `<i class="fa fa-shopping-cart"></i> 추가하기 (1개) `
            console.log(target.parentNode.closest('span'))
        }
    })
};

