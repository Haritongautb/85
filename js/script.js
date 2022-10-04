
window.addEventListener("DOMContentLoaded", () => {

    const tabheaderItem = document.querySelectorAll(".tabheader__item"),
            tabContent = document.querySelectorAll(".tabcontent"),
            tabheaderItems = document.querySelector(".tabheader__items");

    tabheaderItems.addEventListener("click", event => {
        const target = event.target;

        if(target && target.classList.contains("tabheader__item")){
            tabheaderItem.forEach((item, index, arr) => {
                if(target === item){
                    removeClass();
                    addClass(index);
                }
            });
        }

    });

    function removeClass(){
        tabContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("fade");
        });

        tabheaderItem.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function addClass(index = 0){
        tabheaderItem.item(index).classList.add("tabheader__item_active");
        tabContent.item(index).classList.remove("hide");
        tabContent.item(index).classList.add("fade");
    }

    removeClass();
    addClass();




    const deadline = "2022-12-01";

    function getTimeRemaining(endtime){
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

     
        if(t <= 0){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            "total": t, 
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds,
        };
    }


    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector("#hours"),
        minutes = timer.querySelector("#minutes"),
        seconds = timer.querySelector("#seconds"),

        timeInterval = setInterval(updateClock, 1000);


        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            
            if(t.total <= 0){
                clearInterval(timeInterval);
            }
            
        }
    }

    setClock(".timer", deadline);


    const modalTrigger = document.querySelectorAll("[data-modal]"),
            modal = document.querySelector(".modal");

    modalTrigger.forEach(button => {
        button.addEventListener("click", openModal);
    });

    function closeModal(){
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }   

    function openModal(){
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }


    modal.addEventListener("click", event => {
        if(event.target === modal || event.target.getAttribute("data-close") == ""){
            closeModal();
        }
    });
    
    
    document.addEventListener("keydown", event => {

        if(event.code === "Escape" && modal.classList.contains("show")){
            closeModal();
        }
    });



    const modalTimerId = setTimeout(openModal, 300000);


    console.log(document.body.scrollHeight);

    console.log(window.scrollY || window.pageXOffset);

    console.log(document.documentElement.clientHeight);

    function showModalByScroll() {
        const windowScrollY = window.scrollY || window.pageXOffset;


        if(windowScrollY + document.documentElement.clientHeight >= document.body.scrollHeight - 1){
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }


    window.addEventListener("scroll", showModalByScroll);



    
    const cardVegy = {    
        "src": "img/tabs/vegy.jpg",
        "alt": "vegy",
        "title": 'Меню "Фитнес"',
        "descr": 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        "price": 9,
    };

    const cardElite = {    
        "src": "img/tabs/elite.jpg",
        "alt": "elite",
        "title": 'Меню "Премиум"',
        "descr": 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        "price": 14,
    };

    const cardPost = {    
        "src": "img/tabs/post.jpg",
        "alt": "post",
        "title": 'Меню "Постное"',
        "descr": 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        "price": 21,
    };

    class MenuCard{

        constructor(params, ...classes) {

            this.src = params.src;
            this.alt = params.alt;
            this.title = params.title;
            this.descr = params.descr;
            this.parent = document.querySelector(MenuCard.prototype.parent);
            this.classes = classes;
            

            this.price = params.price;


            this.transfer = 27;


            this.changeToUAH();
        }

 
        changeToUAH() {

            this.price = this.price * this.transfer;
        }
 
        render() {
            const element = document.createElement("div");
            if(this.classes.length == 0){
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    MenuCard.prototype.parent = ".menu__field>.container";


    new MenuCard(cardVegy).render();

    new MenuCard(cardElite).render();

    new MenuCard(cardPost).render();

     
    const forms = document.querySelectorAll("form");
    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так.....",
    };  

    forms.forEach(item => {
        postData(item);
    });


    function postData(form){
        form.addEventListener("submit", (event) => {
 
            event.preventDefault();
            let statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement("afterend", statusMessage);

            const request = new XMLHttpRequest();

            request.open("POST", "server.php"); 

            request.setRequestHeader("Content-type", "application/json; charset=uft-8");
            const formData = new FormData(form);


            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });


            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener("load", () => {
                if(request.status === 200){
                    console.log(request.response)
                    showThanksModal(message.success);
                    statusMessage.remove();
                    form.reset();
                } else {
                    showThanksModal(message.failure);
                }
            });
            
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide"); 

        // Здесь я убрал openModal(); и написал clearInterval(modalTimerId);
        // openModal();
        clearInterval(modalTimerId);

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }
});




