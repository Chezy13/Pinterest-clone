// Выпадающий список выбора доски !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const btnBoardList = document.querySelector(".header-board__save");
const boardList = document.querySelector(".list");

btnBoardList.addEventListener("click", function(){
    boardList.style.display = "block";
})

window.addEventListener("click", function(event) {
    if (event.target === boardList) {
        boardList.style.display = "none";
    }
})



// Модальное окно для добавления на доску!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// const btnAddBoard = document.querySelector(".menu-content__add");
// const board = document.querySelector(".board");

// btnAddBoard.addEventListener("click", function(){
//     board.style.display = "block";
// })

// window.addEventListener("click", function(event) {
//     if (event.target === board) {
//         board.style.display = "none";
//     }
// })