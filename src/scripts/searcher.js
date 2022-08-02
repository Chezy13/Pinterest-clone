document.querySelector("#main-search").oninput = function () {
    let val = this.value.trim();
    let elasticItems = document.querySelectorAll(".content-cart")
    if (val != '') {
        elasticItems.forEach(function (elem) {
            if (elem.innerText.search(RegExp(val,"gi")) == -1) {  // флаги: i - С этим флагом поиск не зависит от регистра: нет разницы между A и a.
                elem.classList.add("hide");                       //  g - С этим флагом поиск ищет все совпадения, без него – только первое.
            }
            else{
                elem.classList.remove("hide");
            }
        });
    }
    else {
        elasticItems.forEach(function (elem) {
            elem.classList.remove("hide");
        });
    }
}
