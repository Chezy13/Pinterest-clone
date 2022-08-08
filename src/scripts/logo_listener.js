import {createContentCard} from "./content";
import {contentSection} from "./content";

const headerLogo = document.querySelector(".header-logo");

headerLogo.addEventListener("click", (event) => {
    const images = JSON.parse(localStorage.getItem("images"))
    contentSection.innerHTML = ""
    images.map(item => createContentCard(item))
})
