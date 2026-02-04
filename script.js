const book = document.querySelector("#book");
const papers = document.querySelectorAll(".paper");
const nextBtns = document.querySelectorAll(".btn-next");
const prevBtns = document.querySelectorAll(".btn-prev");

let currentLocation = 1;
let numOfPapers = papers.length;
let maxLocation = numOfPapers + 1;

// Fecha del matrimonio: 04 de diciembre de 2025
const startDate = new Date("2025-12-04T00:00:00");

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30.44);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("months").innerText = months;
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCounter, 1000);
updateCounter();

function init() {
    papers.forEach((paper, index) => {
        paper.style.zIndex = numOfPapers - index;
    });
}
init();

function openBook() { book.style.transform = "translateX(50%)"; }
function closeBook(isAtBeginning) {
    if(isAtBeginning) book.style.transform = "translateX(0%)";
    else book.style.transform = "translateX(100%)";
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        const paper = document.querySelector(`#p${currentLocation}`);
        paper.classList.add("flipped");
        setTimeout(() => { paper.style.zIndex = currentLocation; }, 300);
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
        paper.style.zIndex = numOfPapers - currentLocation + 1;
        if(currentLocation === 1) closeBook(true);
        if(currentLocation === numOfPapers) openBook();
    }
}

nextBtns.forEach(btn => btn.addEventListener("click", goNextPage));
prevBtns.forEach(btn => btn.addEventListener("click", goPrevPage));