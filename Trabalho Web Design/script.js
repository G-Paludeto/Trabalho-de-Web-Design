const carousel = document.querySelector(".carousel");
const dots = document.querySelectorAll(".dot");

let page = 0;
const totalPages = 2;          // só 2 páginas
const slidesPerPage = 5;       // 5 slides por página
const slideGap = 40;           // gap entre slides
const slideWidth = 330 + slideGap; // largura do slide + gap

function goToPage(p) {
    page = p;

    const offset = -(p * slidesPerPage * slideWidth);
    carousel.style.transition = "transform .5s ease";
    carousel.style.transform = `translateX(${offset}px)`;

    updateDots();
}

function updateDots() {
    dots.forEach((d, i) => d.classList.toggle("active", i === page));
}

// Botões
document.querySelector(".next").addEventListener("click", () => {
    if (page === totalPages - 1) {
        goToPage(0);  // 👉 se estiver no último, volta com animação pra direita
    } else {
        goToPage(page + 1);
    }
});

document.querySelector(".prev").addEventListener("click", () => {
    if (page === 0) {
        goToPage(totalPages - 1);
    } else {
        goToPage(page - 1);
    }
});

// Dots
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goToPage(i));
});

goToPage(0);

const headerBg = document.querySelector(".header-bg");
const carouselTop = document.querySelector(".carousel-container").offsetTop;

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // calcula opacidade da imagem conforme se aproxima do carrossel
    let opacity = 1 - scrollY / (carouselTop - 50);
    if (opacity < 0) opacity = 0;
    if (opacity > 1) opacity = 1;

    headerBg.style.opacity = opacity;
});
