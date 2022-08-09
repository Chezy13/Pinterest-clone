// Выпадающий список выбора доски !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const btnBoardList = document.querySelector(".header-board__save");
const boardList = document.querySelector(".list");


// слушатель события на кнопку btnBoardList
// при клике на кнопку добавляется класс "show", и показывается список
btnBoardList.addEventListener("click", function(){
    boardList.classList.toggle("show");                            //  c помощью toggle чередуются классы (добавляютя и удаляются)
    closeModalWindow()                                                   // вызов функции для закрытия окна со списками досок
})

// если пользователь кликнул вне списка, то список закрывается
window.addEventListener("click", function(event) {
    if (event.target === boardList) {
        let dropdowns = document.getElementsByClassName("list");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            // проверка: если класс 'show' присутствует, то класс удаляется и список закрывается
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
})


const btnBoard1 = document.querySelector("#listBtn1");
const btnBoard2 = document.querySelector("#listBtn2");
const btnBoard3 = document.querySelector("#listBtn3");

// функция для закрытия окна со списками досок при нажатии на одну из досок
function closeModalWindow () {
    btnBoard1.addEventListener("click", function(){
        boardList.classList.remove("show");
    })
    btnBoard2.addEventListener("click", function(){
        boardList.classList.remove("show");
    })
    btnBoard3.addEventListener("click", function(){
        boardList.classList.remove("show");
    })
}
