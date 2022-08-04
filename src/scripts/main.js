import {createBlurElements} from "./blur_menu";

export const contentSection = document.querySelector(".content")

async function getImg () {
    try {
        const response = await fetch("https://62e0272398dd9c9df60ec690.mockapi.io/usersImages");
        const images = await response.json()
        console.log(images);
        images.forEach(element => {
            createContentCard(element)
        })
    }
    catch (err) {
        alert(err.name + err.message)
    }
}

export function createElement (elementTagName, elementClassName) {
    const element = document.createElement(elementTagName);
    element.className = elementClassName;

    return element;
}

function createContentCard (element) {
    const contentCard = createElement("div", "content-cart")
    contentCard.append(createContentCardWrapper(element))
    contentSection.append(contentCard)

    // return contentCard
}

function createContentCardWrapper(element) {
    const contentCardWrapper = createElement("div", "content-cart__wrapper")
    contentCardWrapper.append(createBlurElements())
    contentCardWrapper.append(createContentCardElements(element))
    contentCardWrapper.append(createContentCardDescription(element))
    return contentCardWrapper
}

function createContentCardElements(element) {
    const contentCardElements = createElement("div", "content-cart__elements")
    contentCardElements.append(createImg(element))
    contentCardElements.append(createCardDotsBlock(element))
    contentCardElements.append(createDotsMenu(element))

    return contentCardElements;
}

function createContentCardDescription(element) {
    const contentCardDescription = createElement("div", "content-cart__description")
    contentCardDescription.append(createAvatar(element))
    contentCardDescription.append(createDescripton(element))


    return contentCardDescription;
}

function createImg (element) {
    const image = new Image();
    image.src= element.image;
    image.className = "content-cart__img"

    return image
}

function createCardDotsBlock (element) {
    const cardDotsBlock = createElement("div", "content-cart__dots--block");
    cardDotsBlock.appendChild(createCardDotsBtn(element))

    return cardDotsBlock
}

function createCardDotsBtn(element) {
    const cardDotsBtn = createElement("div", "content-cart__dots--btn")
    const cardDotsBtnInner = createElement("i", "fa-solid fa-ellipsis")
    cardDotsBtn.setAttribute("id", `${element.ID}`)
    cardDotsBtnInner.setAttribute("id", `${element.ID}`)
    cardDotsBtn.appendChild(cardDotsBtnInner)

    return cardDotsBtn
}

function createAvatar (element) {
    const avatar = new Image();
    avatar.src = element.name;
    avatar.className = "content-cart__author-img"

    return avatar;
}

function createDescripton(element) {
    const descr = createElement("p", "content-cart__text");
    descr.innerText = element.description

    return descr;
}

getImg()

function createDotsMenu(element) {
    const dotsMenu = createElement("div", "menu")
    dotsMenu.setAttribute("id", `${element.ID}`)
    dotsMenu.appendChild(createMenuContent())

    return dotsMenu
}

function createMenuContent() {
    const menuContent = createElement("div", "menu-content")
    menuContent.appendChild(createMenuAddButton())
    menuContent.appendChild(createMenuHideButton())
    menuContent.appendChild(createMenuComplainButton())

    return menuContent
}

function createMenuAddButton() {
    const board = document.querySelector(".board");

    const menuAddButton = createElement("button", "menu-content__add")
    menuAddButton.innerText = "Добавить на доску"

    menuAddButton.onclick = function () {
        board.style.display = "block";
    }

    window.addEventListener("click", function(event) {
        if (event.target === board) {
            board.style.display = "none";
        }
    })

    return menuAddButton
}

function createMenuHideButton() {
    const menuHideButton = createElement("button", "menu-content__hide")
    menuHideButton.innerText = "Скрыть пин со страницы"

    menuHideButton.addEventListener("click", (event) => {
        if (event.target.className === "menu-content__hide") {
            event.target.closest(".content-cart__elements").classList.add("blur")
            event.target.closest(".content-cart__elements").nextElementSibling.classList.add("blur")
            event.target.closest(".content-cart__wrapper").firstElementChild.classList.add("active")
        }
    })

    return menuHideButton
}

function createMenuComplainButton() {
    const complainWindow = document.querySelector(".complain");
    const cancelComplain = document.querySelector(".cancel");
    const complainBtn = document.querySelector(".complain-content__btn-send");
    
    const menuComplainButton = createElement("button", "menu-content__complain")
    menuComplainButton.innerText = "Пожаловаться"

    menuComplainButton.onclick = function () {
        complainWindow.style.display = "block";
    }

    complainBtn.onclick = function () {
        complainWindow.style.display = "none";
    }

    cancelComplain.onclick = function () {
        complainWindow.style.display = "none";
    }
    
    window.onclick = function (event) {
        if (event.target === complainWindow) {
            complainWindow.style.display = "none";
        }
    }
    return menuComplainButton
}




