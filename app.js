const begin = document.querySelector('.begin');
const game = document.querySelector('.game');
const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const pop = document.querySelector('.pop');
const papanskor = document.querySelector('.skor');
const waktu = document.querySelector('.waktu');

let tanahSebelumnya;
let selesai;
let skor;



function play() {
    begin.classList.add('clear');
    game.classList.remove('clear');
    mulai();
    time();
}

function time() {
    let finish = new Date().getSeconds() + 10;
    let x = setInterval(() => {
        let sekarang = new Date().getSeconds();
        let distance = finish - sekarang;
    
        if (distance < 0) {
            clearInterval(x);
        }
    
        waktu.textContent = distance;
    
    }, 1000);
}
function randomTanah(tanah) {
    const t = Math.floor(Math.random() * tanah.length);
    const tRandom = tanah[t];
    if (tRandom == tanahSebelumnya) {
        randomTanah(tanah);
    }
    tanahSebelumnya = tRandom;
    return tRandom;
}

function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
    const tRandom = randomTanah(tanah);
    const wRandom = randomWaktu(300, 1000);
    tRandom.classList.add('muncul');

    setTimeout(() => {
        tRandom.classList.remove('muncul');
        if (!selesai) {
            munculkanTikus();
        }
    }, wRandom);
}

function mulai() {
    selesai = false;
    skor = 0;
    papanskor.textContent = 0;
    waktu.textContent = 10;
    munculkanTikus();
    setTimeout(() => {
        begin.classList.remove('clear');
        game.classList.add('clear');
        selesai = true;
    }, 10000);
}

function pukul() {
    skor++;
    this.parentNode.classList.remove('muncul');
    pop.play();
    papanskor.textContent = skor;
}

tikus.forEach(t => {
    t.addEventListener('click', pukul);
});

