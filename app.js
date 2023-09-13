document.addEventListener('DOMContentLoaded',() =>{
    const grid = document.querySelector(".grid");
    let squares = document.querySelectorAll(".grid div");
    const startBtn = document.querySelector('#start-button')
    const width = 30;
    let curr = 10;
    let score = 0;
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
                addScore();
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

    startBtn.addEventListener('click', () => {
        if (timerId) {
          clearInterval(timerId)
          timerId = null
        } else {
          draw()
          timerId = setInterval(moveDown, 1000)
        //   nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        //   displayShape()
        }
      })

    function addScore(){
        for(let i=0;i<450;i+=width){
            // const row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9,i+10,i+11,i+12,i+13,i+14];

            //for each taken boxes of each row
            for(let j=0;j<30;j++){
                let phrase = "";
                while(squares[i+j].classList.contains('taken') && (i+j-1)%width <= width-1){
                    phrase += squares[i+j].innerText;
                    j++;
                }

                if(phrase !== ""){
                    //check pattern using kmp;
                    const phrases = ["Wedesignanddevelopapplications","thatruntheworldand","showcasethefuture"];
                    for(let k=0;k<3;k++){
                        // kmp
                        let patternIndex = strStr(phrase,phrase[k]);
                        //if phrase found
                        if(patternIndex !== -1){
                            score += 30;

                            //remove taken tag form all boxes 
                            for(let box = curr+patternIndex;box<(phrase.length+patternIndex+curr);box++){
                                squares[box].classList.remove('taken');
                                squares[box].classList.innerText = "";
                            }
                            squares = squares.splice(curr+patternIndex,phrase.length+patternIndex+curr);
                            squares.forEach(cell => grid.appendChild(cell))
                        }
                    }
                }
            }
        }
    }


    // ______________________________________________KMP______________________________________________________
    function strStr(str, pat) {
        let n = str.length;
        let m = pat.length;

        if (m > n)
            return -1;

        let lps = new Array(m);
        fillLPS(pat,lps);

        let i=0;
        let j=0;
        while(i < n){
            if(str.charAt(i) == pat.charAt(j)){
                i++;
                j++;

                //complete pattern matches
                if(j == m)
                    return i-m;
            }
            else{
                if(j==0){
                    i++;
                }
                else{
                    j = lps[j-1];
                }
            }
        }

        return -1;

    }

    function fillLPS(str,lps){
        let n = str.length;
        let i=1,len=0;

        while(i < n){
            if(str.charAt(i) === str.charAt(len)){
                len++;
                lps[i] = len;
                i++;
            }
            else{
                if(len === 0){
                    lps[i] = 0;
                    i++;
                }
                else{
                    len = lps[len-1];
                }
            }
        }
    }

})