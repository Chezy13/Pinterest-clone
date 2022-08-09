import {createBlurElements} from "./blur_menu";

export const contentSection = document.querySelector(".content")

// Асинхронная функция для получения массива данных из mockAPI (картинок, аватаров, ID, описаний)
async function getImg () {
    try {
        const response = await fetch("https://62e144bde8ad6b66d845e960.mockapi.io/pinterest");
        const images = await response.json()
        localStorage.setItem("images", JSON.stringify(images)) // Сохранение массива карточек-пинов в localstorage
        console.log(images);
        // Отрисовка созданных карточек-пинов и с помощью метода forEach передача объекта массива в функцию,
        // которая создаёт карточки-пины
        images.forEach(element => {
            createContentCard(element)
        })
    }
    catch (err) {
        alert(err.name + err.message)
    }
}

// Функция для создания элементов с возможностью задать тэг и класс элементу
export function createElement (elementTagName, elementClassName) {
    const element = document.createElement(elementTagName);
    element.className = elementClassName;

    return element;
}

// Создание структуры карточки-пина с добавлением в секцию "content"
export function createContentCard (element) {
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

// Создание картинки через функцию-конструктор в карточке-пине и получение картинки из mockAPI c помощью метода src
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

// Создание аватара через функцию-конструктор в карточке-пине и получение аватара из mockAPI c помощью метода src
function createAvatar (element) {
    const avatar = new Image();
    avatar.src = element.name;
    avatar.className = "content-cart__author-img"

    return avatar;
}

// Создание описания к картинке и получение описания из mockAPI
function createDescripton(element) {
    const descr = createElement("p", "content-cart__text");
    descr.innerText = element.description

    return descr;
}

// Создание структуры меню, отображающегося при клике на кнопку с тремя точками
function createDotsMenu(element) {
    const dotsMenu = createElement("div", "menu")
    dotsMenu.setAttribute("id", `${element.ID}`)
    dotsMenu.appendChild(createMenuContent(element))

    return dotsMenu
}

function createMenuContent(element) {
    const menuContent = createElement("div", "menu-content")
    menuContent.appendChild(createMenuAddButton(element))
    menuContent.appendChild(createMenuHideButton())
    menuContent.appendChild(createMenuComplainButton())

    return menuContent
}

function createMenuAddButton(element) {
    const board = document.querySelector(".board");

    const menuAddButton = createElement("button", "menu-content__add")
    menuAddButton.innerText = "Добавить на доску"
    // Добавление аттрибута ID к кнопке "Добавить на доску"
    menuAddButton.setAttribute("id", `${element.ID}`)

    menuAddButton.addEventListener("click", (event) => {
        board.style.display = "block";
        // Получение объекта карточки-пина по ID из localstorage и сохранение объекта в localstorage
        // с ключом buffer для последующего сохранения на одну из досок
        const images = JSON.parse(localStorage.getItem("images"))
        const result = images.find(item => item.ID === event.target.id)
        console.log(result)
        localStorage.setItem("buffer", JSON.stringify(result))

    })

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
    // Обработчик события при клике на кнопку "Скрыть пин со страницы". Появляется эффект замыливания
    // на карточке-пине и отображается меню с кнопками "Удалить пин" и "Отмена" с добавлением
    // соответствующих классов элементам
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

getImg()




