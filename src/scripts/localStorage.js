// // Класс для работы с локальным хранилищем
// class LocalStorageUtil {
//
//     constructor() {
//         this.keyName = 'carts'; // в классе свойства задаются в конструкторе, имя keyName(ключ)
//     }
// // метод позволяет получить все карточки, которые хранятся в локальном хранилище
//     getCarts() {
//         const cartsLocalStorage = localStorage.getItem(this.keyName);
//         if (cartsLocalStorage !== null) {
//             return JSON.parse(cartsLocalStorage);                       //  если есть значения то распарсим строку и переведем её в массив
//         }
//         return [];                                                      // иначе вернется пустой массив
//     }
// // метод для добавления нового значения в локальное хранилище
//     putCarts(id) {                                              // передаем id карточки
//         let carts = this.getCarts();                            // в переменной теперь хранится всё что находится в локальном хранилище
//         let pushCart = false;                                   // проверка на новую карточку  - если не новая - то удалим
//         const index = carts.indexOf(id);                        //  определяем есть ли совпадение с id
//         if (index === -1) {                                     //  это новые данные?
//             carts.push(id);
//             pushCart = true;                                    // проверка на новую карточку- если новая - то добавим
//         } else {
//             carts.splice(index,1);                   // иначе удаляем элем если повторяется
//         }
//
//         localStorage.setItem(this.keyName, JSON.stringify(carts));    // устанавливаем в локальное хранилище(1 аргумент- ключ, 2 - carts, но локальное хранилище принимает только строку, поэтому преобразуем в строку
//         return { pushCart, carts }                                    // возвращаем 2 значения, в виде объекта, если у объекта ключ и значение совпадают, по пишем один ключ
//     }
// }
//
// const localStorageUtil = new LocalStorageUtil();         // для проверки делаем экземпляр класса
//
//
//
// // временная проверка вывода в application
// localStorageUtil.putCarts("check3");
//
