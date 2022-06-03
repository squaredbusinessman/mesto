(()=>{"use strict";var e={inputSelector:".popup__input",submitButtonSelector:".popup__save-btn",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_visible"};function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var n=function(){function e(t,n,r,o){var i=o.handleCardClick,a=o.handleLikeClick,c=o.handleDeleteClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t.name,this._link=t.link,this._likes=t.likes,this._id=t._id,this._ownerId=t.owner._id,this._userId=r,this._templateClass=n,this._handleCardClick=i,this._handleLikeClick=a,this._handleDeleteClick=c}var n,r;return n=e,(r=[{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".card__like").addEventListener("click",(function(){e._handleLikeClick(e)})),this._element.querySelector(".card__remove").addEventListener("click",(function(){e._handleDeleteClick(e)})),this._element.querySelector(".card__pic").addEventListener("click",(function(){e._handleCardClick()}))}},{key:"_checkLike",value:function(){var e=this;this._likes.forEach((function(t){t._id===e._userId?e._element.querySelector(".card__like").classList.add("card__like_active"):e._element.querySelector(".card__like").classList.remove("card__like_active")}))}},{key:"_checkOwner",value:function(){this._ownerId!==this._userId&&this._element.querySelector(".card__remove").remove()}},{key:"activateLike",value:function(e){this._element.querySelector(".card__like").classList.toggle("card__like_active"),this._element.querySelector(".card__likes-counter").textContent=e.length}},{key:"getId",value:function(){return this._id}},{key:"returnDomElement",value:function(){return this._element}},{key:"deleteCard",value:function(){this._element.remove(),this._element=null}},{key:"_getTemplate",value:function(){return document.querySelector(this._templateClass).content.querySelector(".card").cloneNode(!0)}},{key:"getCard",value:function(){return this._element=this._getTemplate(),this._setEventListeners(),this._checkLike(),this._checkOwner(),this._element.querySelector(".card__pic").src=this._link,this._element.querySelector(".card__pic").alt=this._name,this._element.querySelector(".card__title").textContent=this._name,this._element.querySelector(".card__likes-counter").textContent=this._likes.length,this._element}}])&&t(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(t,n){var r=t.inputSelector,o=t.submitButtonSelector,i=t.inputErrorClass,a=t.errorClass;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._inputSelector=r,this._inputErrorClass=i,this._errorClass=a,this._validateForm=n,this._submitButton=this._validateForm.querySelector(o),this._inputList=Array.from(this._validateForm.querySelectorAll(this._inputSelector))}var t,n;return t=e,(n=[{key:"_handleDisableSubmit",value:function(){this._submitButton.setAttribute("disabled","disabled")}},{key:"_showInputError",value:function(e){var t=this._validateForm.querySelector(".".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._validateForm.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_toggleButtonState",value:function(){this._validateForm.checkValidity()?this._submitButton.removeAttribute("disabled"):this._submitButton.setAttribute("disabled","disabled")}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"prepareForm",value:function(){var e=this;Array.from(this._validateForm.querySelectorAll(this._inputSelector)).forEach((function(t){e._hideInputError(t)})),this._validateForm.reset(),this._handleDisableSubmit()}},{key:"enableValidation",value:function(){this._validateForm.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t){var n=t.popupSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(n),this._handleEscCloseBind=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleOverlayClose",value:function(e){e.stopPropagation(),e.target.classList.contains("popup")&&this.close()}},{key:"getDomElement",value:function(){return this._popup}},{key:"open",value:function(){this._popup.classList.add("popup_visible"),document.addEventListener("keyup",this._handleEscCloseBind)}},{key:"close",value:function(){this._popup.classList.remove("popup_visible"),document.removeEventListener("keyup",this._handleEscCloseBind)}},{key:"setEventListeners",value:function(){var e=this;this._buttonClose=this._popup.querySelector(".popup__close-btn"),this._popup.addEventListener("click",(function(t){return e._handleOverlayClose(t)})),this._buttonClose.addEventListener("click",(function(){return e.close()}))}}])&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(){return l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=s(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},l.apply(this,arguments)}function s(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}function p(e,t){return p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},p(e,t)}function f(e,t){if(t&&("object"===c(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&p(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(r);if(o){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return f(this,e)});function a(e,t){var n,r=e.popupSelector,o=t.submitCallback;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,{popupSelector:r}))._submitCallback=o,n._form=n._popup.querySelector(".popup__form"),n}return t=a,(n=[{key:"_getInputValues",value:function(){this._inputs=this._form.querySelectorAll(".popup__input");var e={};return this._inputs.forEach((function(t){return e[t.name]=t.value})),e}},{key:"close",value:function(){l(d(a.prototype),"close",this).call(this),this._form.reset()}},{key:"setEventListeners",value:function(){var e=this;this._form.addEventListener("submit",(function(t){t.preventDefault(),e.dataFromInputs=e._getInputValues(),e._submitCallback(e.dataFromInputs)})),l(d(a.prototype),"setEventListeners",this).call(this)}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(a);function _(e){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_(e)}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=v(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},m.apply(this,arguments)}function v(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=k(e)););return e}function b(e,t){return b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},b(e,t)}function g(e,t){if(t&&("object"===_(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},k(e)}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&b(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(r);if(o){var n=k(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return g(this,e)});function a(e){var t,n=e.popupSelector;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,{popupSelector:n}))._picElement=t._popup.querySelector(".popup__img"),t._picTitle=t._popup.querySelector(".popup__name"),t}return t=a,(n=[{key:"open",value:function(e){this._picElement.src=e.link,this._picElement.alt=e.name,this._picTitle.textContent=e.name,m(k(a.prototype),"open",this).call(this)}}])&&y(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(a);function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var w=function(){function e(t,n){var r=t.rendererFunction;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=n}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){return t._renderer(e)}))}},{key:"addItem",value:function(e){var t=e.element,n=e.place;"prepend"===n?this._container.prepend(t):"append"===n&&this._container.append(t)}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var C=function(){function e(t){var n=t.userNameSelector,r=t.userAboutSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(n),this._aboutElement=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,about:this._aboutElement.textContent}}},{key:"setUserInfo",value:function(e){this._nameElement.textContent=e.name,this._aboutElement.textContent=e.about}}])&&O(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function L(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function P(e,t,n){return t&&L(e.prototype,t),n&&L(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var q=P((function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),j(this,"getCards",(function(){return fetch(n._cardsUrl,{method:"GET",headers:n._headers}).then(n._handleResponse)})),j(this,"addCard",(function(e){return fetch(n._cardsUrl,{method:"POST",headers:n._headers,body:JSON.stringify(e)}).then(n._handleResponse)})),j(this,"deleteCard",(function(e){return fetch("".concat(n._cardsUrl,"/").concat(e),{method:"DELETE",headers:n._headers}).then(n._handleResponse)})),j(this,"getProfile",(function(){return fetch(n._profileUrl,{method:"GET",headers:n._headers}).then(n._handleResponse)})),j(this,"updateProfile",(function(e){return fetch(n._profileUrl,{method:"PATCH",headers:n._headers,body:JSON.stringify(e)}).then(n._handleResponse)})),j(this,"updateAvatar",(function(e){return fetch("".concat(n._profileUrl,"/avatar"),{method:"PATCH",headers:n._headers,body:JSON.stringify({avatar:e})}).then(n._handleResponse)})),j(this,"cardLike",(function(e){return fetch("".concat(n._cardsUrl,"/").concat(e,"/likes"),{method:"PUT",headers:n._headers}).then(n._handleResponse)})),j(this,"cardDislike",(function(e){return fetch("".concat(n._cardsUrl,"/").concat(e,"/likes"),{method:"DELETE",headers:n._headers}).then(n._handleResponse)})),j(this,"getAllData",(function(){return Promise.all([n.getProfile(n._profileUrl),n.getCards(n._cardsUrl)])})),this._profileUrl=t.userUrl,this._cardsUrl=t.cardsUrl,this._headers=t.headers,this._handleResponse=function(e){return e.ok?e.json():Promise.reject("Произошла ошибка при обработке данных ".concat(e.status))}}));function D(e){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(e)}function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function I(){return I="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=T(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},I.apply(this,arguments)}function T(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=x(e)););return e}function B(e,t){return B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},B(e,t)}function U(e,t){if(t&&("object"===D(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function x(e){return x=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},x(e)}var F=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&B(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=x(r);if(o){var n=x(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return U(this,e)});function a(e){var t,n=e.popupSelector;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,{popupSelector:n}))._form=t._popup.querySelector(".popup__form"),t}return t=a,(n=[{key:"setSubmitHandler",value:function(e){var t=e.submitHandler;this._submitHandler=t}},{key:"setEventListeners",value:function(){var e=this;this._form.addEventListener("submit",(function(t){t.preventDefault(),e._submitHandler()})),I(x(a.prototype),"setEventListeners",this).call(this)}}])&&R(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(a),A=document.querySelector(".popup_id_profile-edit"),V=document.querySelector(".popup_id_new-post"),H=A.querySelector(".popup__form"),N=H.querySelector(".popup__input_type_name"),J=H.querySelector(".popup__input_type_about"),G=V.querySelector(".popup__form"),z=document.querySelector(".popup__form_type_avatar"),M=document.querySelector(".user"),K=M.querySelector(".user__avatar-editor-btn"),Q=M.querySelector(".user__nick-editor-btn"),W=M.querySelector(".user__add-post-btn"),X=M.querySelector(".user__avatar"),Y=document.querySelector(".cards"),Z="";function $(e){var t=e.isLoading,n=e.popupDomElement,r=e.originalTextOnButton,o=void 0===r?"Сохранить":r,i=e.loadingTextOnButton,a=void 0===i?"Сохранение...":i;n.querySelector(".popup__save-btn").textContent=t?a:o}var ee=new w({rendererFunction:function(e){var t=ne(e);ee.addItem({element:t,place:"append"})}},Y),te=new E({popupSelector:".popup_id_big-picture"});function ne(e){return new n(e,"#card-template",Z,{handleCardClick:function(){te.open(e)},handleLikeClick:function(e){e.returnDomElement().querySelector(".card__like_active")?ue.cardDislike(e.getId()).then((function(t){e.activateLike(t.likes)})).catch((function(e){return console.log("Произошла ошибка при удалении лайка - Error: ".concat(e))})):ue.cardLike(e.getId()).then((function(t){e.activateLike(t.likes)})).catch((function(e){return console.log("Произошла ошибка при установке лайка - Error: ".concat(e))}))},handleDeleteClick:function(e){re.open(),re.setSubmitHandler({submitHandler:function(){$({isLoading:!0,popupDomElement:re.getDomElement(),loadingTextOnButton:"Удаление..."}),ue.deleteCard(e.getId()).then((function(){e.deleteCard()})).catch((function(e){return console.log("Произошла ошибка при удалении карточки ".concat(e))})).finally((function(){$({isLoading:!1,popupDomElement:re.getDomElement(),originalTextOnButton:"Да"})})),re.close()}})}}).getCard()}te.setEventListeners();var re=new F({popupSelector:".popup_id_delete-confirm"});re.setEventListeners();var oe=new h({popupSelector:".popup_id_new-avatar"},{submitCallback:function(){$({isLoading:!0,popupDomElement:oe.getDomElement()}),ue.updateAvatar(oe.dataFromInputs.newAvatarUrl).then((function(e){X.src=e.avatar})).catch((function(e){return console.log("Произошла ошибка при обновлении аватара ".concat(e))})).finally((function(){$({isLoading:!1,popupDomElement:oe.getDomElement()})})),oe.close()}});oe.setEventListeners();var ie=new C({userNameSelector:".user__name",userAboutSelector:".user__about"}),ae=new h({popupSelector:".popup_id_profile-edit"},{submitCallback:function(){$({isLoading:!0,popupDomElement:ae.getDomElement()}),ue.updateProfile(ae.dataFromInputs).then((function(e){ie.setUserInfo(e)})).catch((function(e){return console.log("Произошла ошибка при отправке новых данных пользователя ".concat(e))})).finally((function(){$({isLoading:!1,popupDomElement:ae.getDomElement()})})),ae.close()}});ae.setEventListeners();var ce=new h({popupSelector:".popup_id_new-post"},{submitCallback:function(){console.log(ce),$({isLoading:!0,popupDomElement:ce.getDomElement(),loadingTextOnButton:"Создание..."}),ue.addCard(ce.dataFromInputs).then((function(e){var t=ne(e);ee.addItem({element:t,place:"prepend"})})).catch((function(e){return console.log("Произошла ошибка при отправке данных новой карточки ".concat(e))})).finally((function(){$({isLoading:!1,popupDomElement:ce.getDomElement(),originalTextOnButton:"Создать"})})),ce.close()}});ce.setEventListeners();var ue=new q({cardsUrl:"https://mesto.nomoreparties.co/v1/cohort-42/cards",userUrl:"https://mesto.nomoreparties.co/v1/cohort-42/users/me",headers:{authorization:"7f1a4a53-4bab-4bd4-9a8f-30c3df078826","Content-Type":"application/json"}});ue.getProfile().then((function(e){var t;ie.setUserInfo(e),X.src=e.avatar,t=e._id,Z=t})).catch((function(e){return console.log("Произошла ошибка при получении данных о пользователе "+e)})),ue.getCards().then((function(e){ee.renderItems(e)})).catch((function(e){return console.log("Произошла ошибка при получении данных о карточках "+e)})),K.addEventListener("click",(function(){le.prepareForm(),oe.open()})),Q.addEventListener("click",(function(){se.prepareForm(),N.value=ie.getUserInfo().name,J.value=ie.getUserInfo().about,ae.open()})),W.addEventListener("click",(function(){pe.prepareForm(),ce.open()}));var le=new o(e,z);le.enableValidation();var se=new o(e,H);se.enableValidation();var pe=new o(e,G);pe.enableValidation()})();