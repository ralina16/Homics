// Бургер меню
const burgerMenuButton = document.getElementById('burgerMenuButton');
const closeBurgerMenuButton = document.getElementById('closeBurgerMenu');
const burgerMenu = document.getElementById('burgerMenu');

burgerMenuButton.addEventListener('click', () => {
    burgerMenu.classList.add('active');
});

closeBurgerMenuButton.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
});

document.addEventListener('click', (event) => {
    if (!burgerMenu.contains(event.target) && !burgerMenuButton.contains(event.target)) {
        burgerMenu.classList.remove('active');
    }
});


// Слайдер
const slidesContainer = document.getElementById('slidesContainer');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentIndex = 0;
const totalSlides = slidesContainer.children.length;

function getVisibleSlides() {
    if (window.innerWidth <= 480) {
        return 1;
    } else if (window.innerWidth <= 768) {
        return 2;
    } else {
        return 3;
    }
}

function updatePosition() {
    const visibleSlides = getVisibleSlides();
    const slideWidth = 100 / visibleSlides;
    slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
}

updatePosition();

nextButton.addEventListener('click', () => {
    const visibleSlides = getVisibleSlides();
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updatePosition();
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalSlides - 1;
    }
    updatePosition();
});

setInterval(() => {
    const visibleSlides = getVisibleSlides();
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updatePosition();
}, 4000);

window.addEventListener('resize', () => {
    currentIndex = 0;
    updatePosition();
});


// Аккордеон
const accardions = document.querySelectorAll(".accardion");

accardions.forEach(accardion => {
    const button = accardion.querySelector(".accardion_txt");
    const content = accardion.querySelector(".cc");

    button.addEventListener("click", () => {
        accardions.forEach(otherAccardion => {
            if (otherAccardion !== accardion) {
                otherAccardion.querySelector(".cc").style.display = "none";
            }
        });

        content.style.display = content.style.display === "block" ? "none" : "block";
    });
});

// Вкладки
const paginationTabs = document.querySelectorAll('.pagination-tab');
const pages = document.querySelectorAll('.review-page');

function showPage(targetId) {
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
}

paginationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        paginationTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target');
        showPage(targetId);
    });
});

const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');

let currentPage = 0;

function updatePagination() {
    paginationTabs.forEach((tab, index) => {
        if (index === currentPage) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    showPage(paginationTabs[currentPage].getAttribute('data-target'));
}

prevBtn.addEventListener('click', () => {
    currentPage = (currentPage - 1 + paginationTabs.length) % paginationTabs.length;
    updatePagination();
});

nextBtn.addEventListener('click', () => {
    currentPage = (currentPage + 1) % paginationTabs.length;
    updatePagination();
});

updatePagination();