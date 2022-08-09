import {createElement} from "./content";

// Создание структуры меню с кнопками "Удалить пин" и "Отмена", появляющегося
// при клике на кнопку "Cкрыть пин со страницы"
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
    // Обработчик события при клике на кнопку "Удалить пин". Если целью является указанная кнопка, скрывается
    // ближайший родительский элемент, соответствующий классу .content-cart
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
    // Обработчик события при клике на кнопку "Отмена". Если целью является указанная кнопка, с пина отменяется
    // эффект замыливания с удалением соответствующих классов с элементов карточки
    blurCancelBtn.addEventListener("click", (event) => {
        if (event.target === blurCancelBtn) {
            event.target.closest(".content-cart__blur--elements").nextElementSibling.classList.remove("blur")
            event.target.closest(".content-cart__wrapper").lastElementChild.classList.remove("blur")
            event.target.closest(".content-cart__blur--elements").classList.remove("active")
        }
    })

    return blurCancelBtn
}