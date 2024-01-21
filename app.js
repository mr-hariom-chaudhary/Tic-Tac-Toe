let boxes = document.querySelectorAll(".box");
let rstBtn = document.querySelector(".rstBtn");
let newBtn = document.querySelector(".newBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector(".msg");
let musicx = new Audio("baigan.mpeg");
let musicy = new Audio("bhupendra.mpeg");
let winmusic = new Audio("music.mpeg");
let drawmusic = new Audio("winning.mpeg");

let turnO = true;
let count = 0;

const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const rstGame = () => {
    turnO = true;
    count = 0;
    enableboxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO)
        {
            box.innerText = "O";
            musicy.play();
            turnO = false;
        }
        else
        {
            box.innerText = "X";
            musicx.play();
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        

        if(!isWinner && count === 9){
           gameDraw();
           winmusic.currentTime=0;
           winmusic.play();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game Is A Draw.`;
    msgContainer.classList.remove("hide");
    disableboxes();
};

    const disableboxes = () => {
        for(let box of boxes){
            box.disabled = true;
        }
    };

    const enableboxes = () => {
        for(let box of boxes){
            box.disabled = false;
            box.innerText = "";
            drawmusic.pause();
            winmusic.pause();
        }
    };

  
    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner Is ${winner}`;
        msgContainer.classList.remove("hide");
        disableboxes();
    }

    const checkWinner = () => {
        for(let pattern of winPattern) {
        let pos0val = boxes[pattern[0]].innerText;
        let pos1val = boxes[pattern[1]].innerText;
        let pos2val = boxes[pattern[2]].innerText;

        if(pos0val != "" && pos1val != "" && pos2val != ""){
            if(pos0val === pos1val && pos1val ===  pos2val && pos2val === pos0val){
                showWinner(pos0val);
                drawmusic.currentTime=0;
                drawmusic.play();
                return true;
            }
        }
    }
};



    newBtn.addEventListener("click",rstGame);
    rstBtn.addEventListener("click",rstGame);