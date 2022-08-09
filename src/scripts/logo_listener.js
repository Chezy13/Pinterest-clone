import {createContentCard} from "./content";
import {contentSection} from "./content";

const headerLogo = document.querySelector(".header-logo");

// При клике на лого получаем массив с карточками-пинами, очищаем контент и заново отрисовываем все карточки,
// для того, чтобы вернуться из доски к изначальному контенту
headerLogo.addEventListener("click", (event) => {
    const images = JSON.parse(localStorage.getItem("images"))
    contentSection.innerHTML = ""
    images.map(item => createContentCard(item))
})
