import {createContentCard} from "./content";
import {contentSection} from "./content";

const dropDownMenu = document.querySelector(".list");

// Отрисовка картинок-пинов в зависимости от клика на одну из досок (различаются по ID).
// Происходит очистка всего контента. В случае если доска пуста происходит добавление
// текста "На доску ещё не добавлены пины".
dropDownMenu.addEventListener("click", (event) => {
    console.log(event.target)
    switch (event.target.id) {
        case "listBtn1":
            contentSection.innerHTML = ""
            const board1 = JSON.parse(localStorage.getItem("board1"))
            board1 === null ? contentSection.innerText = "На доску ещё не добавлены пины"
                : board1.map(item => createContentCard(item))
            break
        case "listBtn2":
            contentSection.innerHTML = ""
            const board2 = JSON.parse(localStorage.getItem("board2"))
            board2 === null ? contentSection.innerText = "На доску ещё не добавлены пины"
                : board2.map(item => createContentCard(item))
            break
        case "listBtn3":
            contentSection.innerHTML = ""
            const board3 = JSON.parse(localStorage.getItem("board3"))
            board3 === null ? contentSection.innerText = "На доску ещё не добавлены пины"
                : board3.map(item => createContentCard(item))
            break
        default:
    }
})