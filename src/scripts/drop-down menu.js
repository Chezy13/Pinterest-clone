// Выпадающий список выбора доски !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const btnBoardList = document.querySelector(".header-board__arrow");
const boardList = document.querySelector(".list");

btnBoardList.addEventListener("click", function(){
    boardList.classList.toggle("show");
})

window.addEventListener("click", function(event) {
    if (event.target === boardList) {
        let dropdowns = document.getElementsByClassName("list");
        console.log(dropdowns)
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
})


// Модальное окно для добавления на доску!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const btnAddBoard = document.querySelector(".menu-content__add");
const board = document.querySelector(".board");

btnAddBoard.addEventListener("click", function(){
    board.style.display = "block";
})

window.addEventListener("click", function(event) {
    if (event.target === board) {
        board.style.display = "none";
    }
})