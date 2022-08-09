import {contentSection} from "./content";

// Обработчик события при клике на кнопку с тремя точками, для отображения меню
contentSection.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-solid")) {
        event.target.parentElement.parentElement.nextElementSibling.classList.toggle("menu-active")
    }
})

// Клик вне меню и вне кнопки с тремя точками для закрытия меню
window.addEventListener("click", (event) => {
    const target = event.target;
    const dotsMenu = document.querySelectorAll(".menu")

    Array.from(dotsMenu).map(menu => {
        if (!target.closest('.menu-active') && !target.closest('.content-cart__dots--btn')) {
            menu.classList.remove('menu-active')
        }
    })
})
