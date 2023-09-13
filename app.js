document.addEventListener('DOMContentLoaded',() =>{
    const grid = document.querySelector(".grid");
    let squares = document.querySelectorAll(".grid div");
    const width = 25;
    let curr = 4;

    const dashTatris = [1,2,3,4];
    const words = ["We","design","develop","applications","that","run","the","world","and","showcase" ,"future"];

    //get random word from the given array
    let random = Math.floor(Math.random()*words.length);
    let randomWordLength = words[random].length;


    //generate rectangle of size random word lenght
    function draw(){
        for(let i = 0;i<randomWordLength;i++){
            squares[curr+i].innerHTML = words[random].charAt(i);
            squares[curr+i].classList.add('tetromino');
        }
    }

    //function to undraw
    function unDraw(){
        for(let i = 0;i<randomWordLength;i++){
            squares[curr+i].innerHTML = "";
            squares[curr+i].classList.remove('tetromino');
        }
    }

    draw();
    //unDraw();

    //make tetromino fall form top
    timerId = setInterval(moveDown,1000);
    function moveDown(){
        unDraw();
        curr += width;
        draw();
        freeze();
    }

    //key control
    function control(key){
        if(key.keyCode === 37){
            moveLeft();
        }
        else if(key.keyCode === 39){
            moveRight();
        }
        else if(key.keyCode === 40){
            //moveDown();
        }
    }
    document.addEventListener('keyup',control);

    //freeze the blocks
    function freeze(){
        for(let i=0;i<randomWordLength;i++){

            //if reached above last row
            if(squares[curr+i+width].classList.contains('taken')){
                for(let j=0;j<randomWordLength;j++){
                    squares[curr+j].classList.add('taken');
                }
                random = Math.floor(Math.random()*words.length);
                randomWordLength = words[random].length;
                curr = 4;
                draw(); 
                break;
            }
        }
    }

    //move the word to the left if not already at leftmost col
    function moveLeft(){
        unDraw();
        let isAtLeftEdge = false; 
        if(curr % width === 0){
            isAtLeftEdge = true;
        }

        if(!isAtLeftEdge){
            curr -= 1;
        }

        //if the left one moves to a taken square
        if(squares[curr].classList.contains('taken')){
            //move all squares to right
            curr += 1;
        }

        draw();
    }

    //move word to right if not already at leftMost col
    function moveRight(){
        unDraw();
        let isAtRightEdge = false;
        if((curr+randomWordLength-1) % width === width-1){
            isAtRightEdge = true;
        }

        if(!isAtRightEdge)
            curr += 1;

        if(squares[curr+randomWordLength-1].classList.contains('taken')){
            curr -= 1;
        }
        draw();
    }

    // function addScore(){
    //     for(let i=0;i<375;i+=width){
    //         const row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9,i+10,i+11,i+12,i+13,i+14];

    //         //for each taken boxes of each row
    //         for(let j=0;j<25;j++){
    //             let phrase = "";
    //             while(squares[i+j].classList.contains('taken') && (i+j-1)%width <= width-1){
    //                 phrase += squares[i+j].innerText;
    //                 j++;
    //             }

    //             if(phrase !== ""){
    //                 //check pattern using kmp;
    //             }
    //         }
    //     }
    // }

})