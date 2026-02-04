const book = document.querySelector("#book");
const papers = document.querySelectorAll(".paper");
const nextBtns = document.querySelectorAll(".btn-next");
const prevBtns = document.querySelectorAll(".btn-prev");

let currentLocation = 1;
let numOfPapers = papers.length;
let maxLocation = numOfPapers + 1;

// Inicializar z-index al cargar
function init() {
    papers.forEach((paper, index) => {
        paper.style.zIndex = numOfPapers - index;
    });
}
init();

function openBook() {
    book.style.transform = "translateX(50%)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        const paper = document.querySelector(`#p${currentLocation}`);
        paper.classList.add("flipped");
        
        // El z-index cambia después de la animación para que se apilen bien
        setTimeout(() => {
            paper.style.zIndex = currentLocation;
        }, 300);

        if(currentLocation === 1) openBook();
        if(currentLocation === numOfPapers) closeBook(false);

        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        currentLocation--;
        const paper = document.querySelector(`#p${currentLocation}`);
        paper.classList.remove("flipped");
        
        // Al volver, se pone encima inmediatamente
        paper.style.zIndex = numOfPapers - currentLocation + 1;

        if(currentLocation === 1) closeBook(true);
        if(currentLocation === numOfPapers) openBook();
    }
}

// Eventos
nextBtns.forEach(btn => btn.addEventListener("click", goNextPage));
prevBtns.forEach(btn => btn.addEventListener("click", goPrevPage));