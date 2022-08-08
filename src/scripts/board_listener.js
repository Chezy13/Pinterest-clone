const boardMenu = document.querySelector(".board")

boardMenu.addEventListener("click", (event) => {
    const buffer = JSON.parse(localStorage.getItem("buffer"))

    switch (event.target.id) {
        case "btnBoard1":
            const board1 = JSON.parse(localStorage.getItem("board1"))
            board1 === null ? localStorage.setItem("board1", JSON.stringify([buffer]))
                : localStorage.setItem("board1", JSON.stringify([...board1, buffer]))
            break
        case "btnBoard2":
            const board2 = JSON.parse(localStorage.getItem("board2"))
            board2 === null ? localStorage.setItem("board2", JSON.stringify([buffer]))
                : localStorage.setItem("board2", JSON.stringify([...board2, buffer]))
            break
        case "btnBoard3":
            const board3 = JSON.parse(localStorage.getItem("board3"))
            board3 === null ? localStorage.setItem("board3", JSON.stringify([buffer]))
                : localStorage.setItem("board3", JSON.stringify([...board3, buffer]))
            break
        default:
    }
})