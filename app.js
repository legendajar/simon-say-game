let gameSeq = [];
let userSeq = [];

// Adjusted btns array
let btns = ['red', 'yellow', 'green', 'purple']; 

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

document.addEventListener('keydown', function () { // Changed event to 'keydown'
    if (started == false) {
        console.log("Game is Started !!");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(() => {
        btn.classList.remove('flash');
    }, 250);
}

function userFlash(btn) {
    btn.classList.add('userFlash');
    setTimeout(() => {
        btn.classList.remove('userFlash');
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomNumber = Math.floor(Math.random() * 3);
    let randomColor = btns[randomNumber];
    let randomBtn = document.querySelector(`.${randomColor}`);
    
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b> ${level} </b>. <br> Press any key to start`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function() {
            document.querySelector('body').style.backgroundColor = 'white';
        }, 150);
        reset(); // Assuming reset() is defined elsewhere
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id"); // Declare userColor with let
    userSeq.push(userColor);
    console.log(userSeq);
    checkAnswer(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns) { // Use let for btn
    btn.addEventListener('click', btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
