document.addEventListener('DOMContentLoaded', () => {

    const toggleMobileMenu = document.querySelector('.mobile_burger.head');
    const mobileMenu = document.querySelector('.header_bottom__menu');

    toggleMobileMenu.addEventListener('click', function () {
        this.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        if(mobileMenu.classList.contains('open')){
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function(e) {
                    mobileMenu.classList.remove('open');
                    toggleMobileMenu.classList.remove('open');
                });
            });
        }
    });

    const toggleMobileMenuFixed = document.querySelector('.mobile_burger.fixed');
    const mobileMenuFixed = document.querySelector('.header_fixed .links');

    toggleMobileMenuFixed.addEventListener('click', function () {
        this.classList.toggle('open');
        mobileMenuFixed.classList.toggle('open');
        if(mobileMenuFixed.classList.contains('open')){
            mobileMenuFixed.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function(e) {
                    mobileMenuFixed.classList.remove('open');
                    toggleMobileMenuFixed.classList.remove('open');
                });
            });
        }
    });


    let fixedHead = document.querySelector('.header_fixed');
    function checkPosition() {
        const screenHeight = window.innerHeight
        const scrolled = window.scrollY;
        const threshold = screenHeight * 2;
        const position = scrolled + screenHeight;
        if (position >= threshold) {
            fixedHead.classList.add('active');
        } else {
            fixedHead.classList.remove('active');
        }
    }

    window.addEventListener('scroll', checkPosition);



    document.querySelectorAll('.scroll-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            let href = this.getAttribute('href').substring(1);
            const scrollTarget = document.getElementById(href);
            const topOffset = document.querySelector('.header_fixed').offsetHeight;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });


    const swiperSlider = document.querySelector('.training_photo__list');
    if(swiperSlider){
        const swiper = () => new Swiper(swiperSlider, {
            autoHeight: true,
            slidesPerView: 1,
            initialSlide: 1,
            spaceBetween: 0,
            loop: false,
            start: 1,
            autoplay: {
                delay: 3000,
            },
            speed: 600,
            breakpoints: {
                767: {
                    slidesPerView: 2,
                    spaceBetween: 28,
                }
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: '.swiper-pagination',
            },
        });

        swiper();
    }

    const swiperSliderTrainers = document.querySelector('.our_trainers__slider');
    if(swiperSliderTrainers){
        const swiperTrainers = () => new Swiper(swiperSliderTrainers, {
            slidesPerView: 1,
            initialSlide: 1,
            spaceBetween: 3,
            loop: false,
            start: 1,
            autoplay: {
                delay: 3000,
            },
            speed: 600,
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev'
            },
        });

        swiperTrainers();
    }

    const swiperSliderReviews = document.querySelector('.smart_list');
    if(swiperSliderReviews){
        const swiperReviews = () => new Swiper(swiperSliderReviews, {
            slidesPerView: 1,
            initialSlide: 1,
            spaceBetween: 3,
            loop: false,
            start: 1,
            autoplay: {
                delay: 3000,
            },
            speed: 600,
            navigation: {
                nextEl: '.swiper-rev-next',
                prevEl: '.swiper-rev-prev'
            },
        });

        swiperReviews();
    }


    let modalWindowClose = document.querySelectorAll('.modal_close');
    let openModalButton = document.querySelectorAll('.open-modal');

    function getBodyScrollTop() {
        return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
    }

    function openWindow(modalElement) {
        document.body.dataset.scrollY = getBodyScrollTop();
        document.body.style.top = `-${document.body.dataset.scrollY}px`;
        modalElement.classList.add('open');
        document.body.classList.add('lock');
    }

    openModalButton.forEach(function(item){
        item.addEventListener('click', function(event) {
            let modalID = this.getAttribute('data-modal');
            let modalElement = document.querySelector('.modal_window[data-modal="' + modalID + '"]');
            openWindow(modalElement);
        })
    });

    function closeWindow(modalElement) {
        modalElement.classList.remove('open');
        document.body.classList.remove('lock');
        window.scrollTo(0, parseInt(document.body.dataset.scrollY));
    }

    modalWindowClose.forEach(function(item){
        item.addEventListener('click', function(event) {
            let modalID = this.getAttribute('data-modal');
            let modalElement = document.querySelector('.modal_window[data-modal="' + modalID + '"]');
            closeWindow(modalElement);
        })
    });


    if(window.innerWidth < 767) {
        const spoilersParent = document.querySelectorAll(".age-groups__content .left_menu .parent");
        spoilersParent.forEach(function (item) {
            item.addEventListener("click", spoilersParentClick);
        });

        function spoilersParentClick() {
            this.classList.toggle("rotate");
            this.nextElementSibling.classList.toggle("active");
        }
    }

    const ageChanger = document.querySelectorAll(".age-groups__content .changer");
    ageChanger.forEach(function (el){
        el.addEventListener("click", ageChangerClick);
    });
    function ageChangerClick() {
        let changerTab = document.querySelector('.right_content[data-id="'+this.dataset.id+'"]');
        let allTabs = document.querySelectorAll('.right_content');
        allTabs.forEach(function (el){
           el.classList.remove('active','animate');
        });
        changerTab.classList.add('active');
        setTimeout(function(){changerTab.classList.add('animate');},200);
    }



    function reloadMap() {
        const mapContainer = document.querySelector('.frame_container');
        if(mapContainer){
            let mapObj = document.querySelector('.areas_changer');
            const mapSrc = mapObj.value;
            mapContainer.innerHTML = `
        <iframe
            src="${mapSrc}"
            width="100%" height="100%" frameBorder="0">
        </iframe>
        `;
        }
    }

    reloadMap();

    let mapObj = document.querySelector('.areas_changer');
    if (mapObj) {
        mapObj.addEventListener("change", reloadMap);
    }


    const quizChanger = document.querySelectorAll(".quiz_form__wrapper .next");
    const quizChangerPrev = document.querySelectorAll(".quiz_form__wrapper .prev");
    quizChanger.forEach(function (el){
        el.addEventListener("click", quizChangerClick);
    });
    quizChangerPrev.forEach(function (el){
        el.addEventListener("click", quizChangerClick);
    });
    function quizChangerClick() {
        let changerWindow = document.querySelector('.question[data-id="'+this.dataset.id+'"]');
        let allQuestions = document.querySelectorAll('.question');
        allQuestions.forEach(function (el){
            el.classList.remove('active', 'animate');
        });
        changerWindow.classList.add('active');
        setTimeout(function(){changerWindow.classList.add('animate');},100);
    }


});