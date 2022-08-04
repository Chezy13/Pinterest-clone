import {createElement} from "./main";

export function createBlurElements () {
    const blurElements = createElement("div", "content-cart__blur--elements");
    blurElements.appendChild(createBlurDescr());
    blurElements.appendChild(createBlurButtonsWrapper());

    return blurElements
}

function createBlurDescr() {
    const blurDescr = createElement("div", "content-cart__blur--descr")
    blurDescr.innerText = "Понятно! Вы больше не увидите этот пин"

    return blurDescr
}

function createBlurButtonsWrapper() {
    const blurButtonsWrapper = createElement("div", "content-cart__blur--buttons")
    blurButtonsWrapper.appendChild(createBlurDeleteBtn())
    blurButtonsWrapper.appendChild(createBlurCancelBtn())

    return blurButtonsWrapper
}

function createBlurDeleteBtn() {
    const blurDeleteBtn = createElement("div", "content-cart__blur--delete")
    blurDeleteBtn.innerText = "Удалить пин"
    blurDeleteBtn.addEventListener("click", (event) => {
        if (event.target === blurDeleteBtn) {
            event.target.closest(".content-cart").style.display = "none"
        }
    })

    return blurDeleteBtn
}

function createBlurCancelBtn() {
    const blurCancelBtn = createElement("div", "content-cart__blur--cancel")
    blurCancelBtn.innerText = "Отмена"
    blurCancelBtn.addEventListener("click", (event) => {
        if (event.target === blurCancelBtn) {
            event.target.closest(".content-cart__blur--elements").nextElementSibling.classList.remove("blur")
            event.target.closest(".content-cart__wrapper").lastElementChild.classList.remove("blur")
            event.target.closest(".content-cart__blur--elements").classList.remove("active")
        }
    })

    return blurCancelBtn
}