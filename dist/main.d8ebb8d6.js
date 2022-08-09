// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/blur_menu.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBlurElements = createBlurElements;

var _content = require("./content");

// Создание структуры меню с кнопками "Удалить пин" и "Отмена", появляющегося
// при клике на кнопку "Cкрыть пин со страницы"
function createBlurElements() {
  var blurElements = (0, _content.createElement)("div", "content-cart__blur--elements");
  blurElements.appendChild(createBlurDescr());
  blurElements.appendChild(createBlurButtonsWrapper());
  return blurElements;
}

function createBlurDescr() {
  var blurDescr = (0, _content.createElement)("div", "content-cart__blur--descr");
  blurDescr.innerText = "Понятно! Вы больше не увидите этот пин";
  return blurDescr;
}

function createBlurButtonsWrapper() {
  var blurButtonsWrapper = (0, _content.createElement)("div", "content-cart__blur--buttons");
  blurButtonsWrapper.appendChild(createBlurDeleteBtn());
  blurButtonsWrapper.appendChild(createBlurCancelBtn());
  return blurButtonsWrapper;
}

function createBlurDeleteBtn() {
  var blurDeleteBtn = (0, _content.createElement)("div", "content-cart__blur--delete");
  blurDeleteBtn.innerText = "Удалить пин"; // Обработчик события при клике на кнопку "Удалить пин". Если целью является указанная кнопка, скрывается
  // ближайший родительский элемент, соответствующий классу .content-cart

  blurDeleteBtn.addEventListener("click", function (event) {
    if (event.target === blurDeleteBtn) {
      event.target.closest(".content-cart").style.display = "none";
    }
  });
  var response = fetch("https://62e144bde8ad6b66d845e960.mockapi.io/pinterest");
  console.log(response);
  return blurDeleteBtn;
}

function createBlurCancelBtn() {
  var blurCancelBtn = (0, _content.createElement)("div", "content-cart__blur--cancel");
  blurCancelBtn.innerText = "Отмена"; // Обработчик события при клике на кнопку "Отмена". Если целью является указанная кнопка, с пина отменяется
  // эффект замыливания с удалением соответствующих классов с элементов карточки

  blurCancelBtn.addEventListener("click", function (event) {
    if (event.target === blurCancelBtn) {
      event.target.closest(".content-cart__blur--elements").nextElementSibling.classList.remove("blur");
      event.target.closest(".content-cart__wrapper").lastElementChild.classList.remove("blur");
      event.target.closest(".content-cart__blur--elements").classList.remove("active");
    }
  });
  return blurCancelBtn;
}
},{"./content":"scripts/content.js"}],"scripts/content.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contentSection = void 0;
exports.createContentCard = createContentCard;
exports.createElement = createElement;

var _blur_menu = require("./blur_menu");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var contentSection = document.querySelector(".content"); // Асинхронная функция для получения массива данных из mockAPI (картинок, аватаров, ID, описаний)

exports.contentSection = contentSection;

function getImg() {
  return _getImg.apply(this, arguments);
} // Функция для создания элементов с возможностью задать тэг и класс элементу


function _getImg() {
  _getImg = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var response, images;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch("https://62e144bde8ad6b66d845e960.mockapi.io/pinterest");

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            images = _context.sent;
            localStorage.setItem("images", JSON.stringify(images)); // Сохранение массива карточек-пинов в localstorage

            console.log(images); // Отрисовка созданных карточек-пинов и с помощью метода forEach передача объекта массива в функцию,
            // которая создаёт карточки-пины

            images.forEach(function (element) {
              createContentCard(element);
            });
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            alert(_context.t0.name + _context.t0.message);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));
  return _getImg.apply(this, arguments);
}

function createElement(elementTagName, elementClassName) {
  var element = document.createElement(elementTagName);
  element.className = elementClassName;
  return element;
} // Создание структуры карточки-пина с добавлением в секцию "content"


function createContentCard(element) {
  var contentCard = createElement("div", "content-cart");
  contentCard.append(createContentCardWrapper(element));
  contentSection.append(contentCard);
}

function createContentCardWrapper(element) {
  var contentCardWrapper = createElement("div", "content-cart__wrapper");
  contentCardWrapper.append((0, _blur_menu.createBlurElements)());
  contentCardWrapper.append(createContentCardElements(element));
  contentCardWrapper.append(createContentCardDescription(element));
  return contentCardWrapper;
}

function createContentCardElements(element) {
  var contentCardElements = createElement("div", "content-cart__elements");
  contentCardElements.append(createImg(element));
  contentCardElements.append(createCardDotsBlock(element));
  contentCardElements.append(createDotsMenu(element));
  return contentCardElements;
}

function createContentCardDescription(element) {
  var contentCardDescription = createElement("div", "content-cart__description");
  contentCardDescription.append(createAvatar(element));
  contentCardDescription.append(createDescripton(element));
  return contentCardDescription;
} // Создание картинки через функцию-конструктор в карточке-пине и получение картинки из mockAPI c помощью метода src


function createImg(element) {
  var image = new Image();
  image.src = element.image;
  image.className = "content-cart__img";
  return image;
}

function createCardDotsBlock(element) {
  var cardDotsBlock = createElement("div", "content-cart__dots--block");
  cardDotsBlock.appendChild(createCardDotsBtn(element));
  return cardDotsBlock;
}

function createCardDotsBtn(element) {
  var cardDotsBtn = createElement("div", "content-cart__dots--btn");
  var cardDotsBtnInner = createElement("i", "fa-solid fa-ellipsis");
  cardDotsBtn.setAttribute("id", "".concat(element.ID));
  cardDotsBtnInner.setAttribute("id", "".concat(element.ID));
  cardDotsBtn.appendChild(cardDotsBtnInner);
  return cardDotsBtn;
} // Создание аватара через функцию-конструктор в карточке-пине и получение аватара из mockAPI c помощью метода src


function createAvatar(element) {
  var avatar = new Image();
  avatar.src = element.name;
  avatar.className = "content-cart__author-img";
  return avatar;
} // Создание описания к картинке и получение описания из mockAPI


function createDescripton(element) {
  var descr = createElement("p", "content-cart__text");
  descr.innerText = element.description;
  return descr;
} // Создание структуры меню, отображающегося при клике на кнопку с тремя точками


function createDotsMenu(element) {
  var dotsMenu = createElement("div", "menu");
  dotsMenu.setAttribute("id", "".concat(element.ID));
  dotsMenu.appendChild(createMenuContent(element));
  return dotsMenu;
}

function createMenuContent(element) {
  var menuContent = createElement("div", "menu-content");
  menuContent.appendChild(createMenuAddButton(element));
  menuContent.appendChild(createMenuHideButton());
  menuContent.appendChild(createMenuComplainButton());
  return menuContent;
}

function createMenuAddButton(element) {
  var board = document.querySelector(".board");
  var menuAddButton = createElement("button", "menu-content__add");
  menuAddButton.innerText = "Добавить на доску"; // Добавление аттрибута ID к кнопке "Добавить на доску"

  menuAddButton.setAttribute("id", "".concat(element.ID));
  menuAddButton.addEventListener("click", function (event) {
    board.style.display = "block"; // Получение объекта карточки-пина по ID из localstorage и сохранение объекта в localstorage
    // с ключом buffer для последующего сохранения на одну из досок

    var images = JSON.parse(localStorage.getItem("images"));
    var result = images.find(function (item) {
      return item.ID === event.target.id;
    });
    console.log(result);
    localStorage.setItem("buffer", JSON.stringify(result));
  });
  window.addEventListener("click", function (event) {
    if (event.target === board) {
      board.style.display = "none";
    }
  });
  return menuAddButton;
}

function createMenuHideButton() {
  var menuHideButton = createElement("button", "menu-content__hide");
  menuHideButton.innerText = "Скрыть пин со страницы"; // Обработчик события при клике на кнопку "Скрыть пин со страницы". Появляется эффект замыливания
  // на карточке-пине и отображается меню с кнопками "Удалить пин" и "Отмена" с добавлением
  // соответствующих классов элементам

  menuHideButton.addEventListener("click", function (event) {
    if (event.target.className === "menu-content__hide") {
      event.target.closest(".content-cart__elements").classList.add("blur");
      event.target.closest(".content-cart__elements").nextElementSibling.classList.add("blur");
      event.target.closest(".content-cart__wrapper").firstElementChild.classList.add("active");
    }
  });
  return menuHideButton;
}

function createMenuComplainButton() {
  var complainWindow = document.querySelector(".complain");
  var cancelComplain = document.querySelector(".cancel");
  var complainBtn = document.querySelector(".complain-content__btn-send");
  var menuComplainButton = createElement("button", "menu-content__complain");
  menuComplainButton.innerText = "Пожаловаться";

  menuComplainButton.onclick = function () {
    complainWindow.style.display = "block";
  };

  complainBtn.onclick = function () {
    complainWindow.style.display = "none";
  };

  cancelComplain.onclick = function () {
    complainWindow.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === complainWindow) {
      complainWindow.style.display = "none";
    }
  };

  return menuComplainButton;
}

getImg();
},{"./blur_menu":"scripts/blur_menu.js"}],"scripts/dots-menu_listener.js":[function(require,module,exports) {
"use strict";

var _content = require("./content");

// Обработчик события при клике на кнопку с тремя точками, для отображения меню
_content.contentSection.addEventListener("click", function (event) {
  if (event.target.classList.contains("fa-solid")) {
    event.target.parentElement.parentElement.nextElementSibling.classList.toggle("menu-active");
  }
}); // Клик вне меню и вне кнопки с тремя точками для закрытия меню


window.addEventListener("click", function (event) {
  var target = event.target;
  var dotsMenu = document.querySelectorAll(".menu");
  Array.from(dotsMenu).map(function (menu) {
    if (!target.closest('.menu-active') && !target.closest('.content-cart__dots--btn')) {
      menu.classList.remove('menu-active');
    }
  });
});
},{"./content":"scripts/content.js"}],"scripts/drop-down menu.js":[function(require,module,exports) {
// Выпадающий список выбора доски !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var btnBoardList = document.querySelector(".header-board__save");
var boardList = document.querySelector(".list"); // слушатель события на кнопку btnBoardList
// при клике на кнопку добавляется класс "show", и показывается список

btnBoardList.addEventListener("click", function () {
  boardList.classList.toggle("show"); //  c помощью toggle чередуются классы (добавляютя и удаляются)

  closeModalWindow(); // вызов функции для закрытия окна со списками досок
}); // если пользователь кликнул вне списка, то список закрывается

window.addEventListener("click", function (event) {
  if (event.target === boardList) {
    var dropdowns = document.getElementsByClassName("list");

    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i]; // проверка: если класс 'show' присутствует, то класс удаляется и список закрывается

      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
});
var btnBoard1 = document.querySelector("#listBtn1");
var btnBoard2 = document.querySelector("#listBtn2");
var btnBoard3 = document.querySelector("#listBtn3"); // функция для закрытия окна со списками досок при нажатии на одну из досок

function closeModalWindow() {
  btnBoard1.addEventListener("click", function () {
    boardList.classList.remove("show");
  });
  btnBoard2.addEventListener("click", function () {
    boardList.classList.remove("show");
  });
  btnBoard3.addEventListener("click", function () {
    boardList.classList.remove("show");
  });
}
},{}],"scripts/searcher.js":[function(require,module,exports) {
document.querySelector("#main-search").oninput = function () {
  var val = this.value.trim();
  var elasticItems = document.querySelectorAll(".content-cart");

  if (val !== '') {
    elasticItems.forEach(function (elem) {
      if (elem.innerText.search(RegExp(val, "gi")) === -1) {
        // флаги: i - С этим флагом поиск не зависит от регистра: нет разницы между A и a.
        elem.classList.add("hide"); //  g - С этим флагом поиск ищет все совпадения, без него – только первое.
      } else {
        elem.classList.remove("hide");
      }
    });
  } else {
    elasticItems.forEach(function (elem) {
      elem.classList.remove("hide");
    });
  }
};
},{}],"scripts/board_listener.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var boardMenu = document.querySelector(".board"); // Добавление объекта из буфера на одну из трех досок, в зависимости от того, какая из кнопок была нажата
// (кнопки различаются по ID). Если массив с доской пуст (=== null), то проиходит сохранение объекта из буфера
// в localstorage, в ином случае происходит сохранение объекта из буфера в массив с доской и в localstorage

boardMenu.addEventListener("click", function (event) {
  var buffer = JSON.parse(localStorage.getItem("buffer"));

  switch (event.target.id) {
    case "btnBoard1":
      var board1 = JSON.parse(localStorage.getItem("board1"));
      board1 === null ? localStorage.setItem("board1", JSON.stringify([buffer])) : localStorage.setItem("board1", JSON.stringify([].concat(_toConsumableArray(board1), [buffer])));
      break;

    case "btnBoard2":
      var board2 = JSON.parse(localStorage.getItem("board2"));
      board2 === null ? localStorage.setItem("board2", JSON.stringify([buffer])) : localStorage.setItem("board2", JSON.stringify([].concat(_toConsumableArray(board2), [buffer])));
      break;

    case "btnBoard3":
      var board3 = JSON.parse(localStorage.getItem("board3"));
      board3 === null ? localStorage.setItem("board3", JSON.stringify([buffer])) : localStorage.setItem("board3", JSON.stringify([].concat(_toConsumableArray(board3), [buffer])));
      break;

    default:
  }
});
},{}],"scripts/drop-down_listener.js":[function(require,module,exports) {
"use strict";

var _content = require("./content");

var dropDownMenu = document.querySelector(".list"); // Отрисовка картинок-пинов в зависимости от клика на одну из досок (различаются по ID).
// Происходит очистка всего контента. В случае если доска пуста происходит добавление
// текста "На доску ещё не добавлены пины".

dropDownMenu.addEventListener("click", function (event) {
  // console.log(event.target)
  switch (event.target.id) {
    case "listBtn1":
      _content.contentSection.innerHTML = "";
      var board1 = JSON.parse(localStorage.getItem("board1"));
      board1 === null ? _content.contentSection.innerText = "На доску ещё не добавлены пины" : board1.map(function (item) {
        return (0, _content.createContentCard)(item);
      });
      break;

    case "listBtn2":
      _content.contentSection.innerHTML = "";
      var board2 = JSON.parse(localStorage.getItem("board2"));
      board2 === null ? _content.contentSection.innerText = "На доску ещё не добавлены пины" : board2.map(function (item) {
        return (0, _content.createContentCard)(item);
      });
      break;

    case "listBtn3":
      _content.contentSection.innerHTML = "";
      var board3 = JSON.parse(localStorage.getItem("board3"));
      board3 === null ? _content.contentSection.innerText = "На доску ещё не добавлены пины" : board3.map(function (item) {
        return (0, _content.createContentCard)(item);
      });
      break;

    default:
  }
});
},{"./content":"scripts/content.js"}],"scripts/logo_listener.js":[function(require,module,exports) {
"use strict";

var _content = require("./content");

var headerLogo = document.querySelector(".header-logo"); // При клике на лого получаем массив с карточками-пинами, очищаем контент и заново отрисовываем все карточки,
// для того, чтобы вернуться из доски к изначальному контенту

headerLogo.addEventListener("click", function (event) {
  var images = JSON.parse(localStorage.getItem("images"));
  _content.contentSection.innerHTML = "";
  images.map(function (item) {
    return (0, _content.createContentCard)(item);
  });
});
},{"./content":"scripts/content.js"}],"scripts/main.js":[function(require,module,exports) {
"use strict";

require("./content");

require("./dots-menu_listener");

require("./blur_menu");

require("./drop-down menu");

require("./searcher");

require("./board_listener");

require("./drop-down_listener");

require("./logo_listener");
},{"./content":"scripts/content.js","./dots-menu_listener":"scripts/dots-menu_listener.js","./blur_menu":"scripts/blur_menu.js","./drop-down menu":"scripts/drop-down menu.js","./searcher":"scripts/searcher.js","./board_listener":"scripts/board_listener.js","./drop-down_listener":"scripts/drop-down_listener.js","./logo_listener":"scripts/logo_listener.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64690" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/main.js"], null)
//# sourceMappingURL=/main.d8ebb8d6.js.map