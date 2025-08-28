let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".resetbtn");
let newbtn= document.querySelector(".newbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;

const winpatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
        
        if(turn0){
            box.innerText = "0";
            turn0 = false;
        }else{
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkwinner();
    } );
});

const showWinner = (winner, pattern)=>{
       let winSound = new Audio("winSound.wav");
        winSound.preload = "auto";
        winSound.currentTime = 0;
        winSound.play();

        pattern.forEach(index => {
          boxes[index].classList.add("glow");
    });
    

    setTimeout(()=>{
         msg.innerText = `Winner is ${winner}`;
         msgContainer.classList.remove("hide");
    },1500);

    // msg.innerText = `Winner is ${winner}`;
    // msgContainer.classList.remove("hide");

    disableBoxes();

};

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }

};
const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = ""
        box.classList.remove("glow");
        
    }

};

const checkwinner = ()=>{
    for( let pattern of winpatterns ){
         
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        
        if(pos1val !="" && pos2val !="" && pos3val !=""){
            if(pos1val === pos2val  && pos2val === pos3val){
                console.log("winner",pos1val);
                showWinner(pos1val , pattern);
                
            }
        }
        
    }
};

const resetGame = ()=>{
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    
};

newbtn.addEventListener("click" ,()=>{
    resetGame();
    let clicksound = new Audio("clicksound.wav");
    clicksound.preload = "auto";
    clicksound.currentTime = 0;
        clicksound.play();
});
resetbtn.addEventListener("click" ,()=>{
      resetGame();
    let clicksound = new Audio("retroclick.wav");
    clicksound.preload = "auto";
    clicksound.currentTime = 0;

        clicksound.play();
});