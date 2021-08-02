'use strict';

//select blocks container
let blocksContainer = document.querySelector('.memory-game-blocks');

//create array from blockContainer
let blocks = Array.from(blocksContainer.children); //the gain blocks

document.querySelector('.control-buttons span').onclick =function() {

    let yourName = prompt('whats your name!'); 

    if( yourName == null || yourName == "" ) { 

        document.querySelector(".name span").innerHTML = 'UnKnown' ;

    } else {

        document.querySelector(" .name span").innerHTML = yourName ;
       
    }

    document.querySelector('.control-buttons').remove();

    //show image for a second the remove 
    blocks.forEach((block,index) => {

        block.classList.add('is-flipped');
        });  

        //delete flip 
       setTimeout(() => {
        blocks.forEach((block,index) => {
            block.classList.remove('is-flipped');
        });     
       }, 1000);
};



 //effect duration 
let duration = 1000;



//create range of keys
let orderRange = Array.from(Array(blocks.length).keys());  //عشان يحطهملي ف اراي وياخد الاندكس بتاعهم كلهم ك فاليو بدل ما اعمل فور لوب 

//let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

//or by this way 
blocks.forEach((block,index) => {
    block.style.order =orderRange[index] ;

    //add click event 
    block.addEventListener('click',function() {
        FlipBlock(block);
    });
});


//flip-block function 
function FlipBlock(selectedBlock) {
    
    //add class is fliped
    selectedBlock.classList.add('is-flipped');

    //collect all fliped cards 
    let allFlipedBlocks = blocks.filter(FlippedBlock => FlippedBlock.classList.contains('is-flipped'));
    
     //if there is two selected blocks
     if(allFlipedBlocks.length === 2) {
      //   console.log('selected');

       //stop clicking function 
       stopClicking();

     //check method block function
      MatchedBlock(allFlipedBlocks[0], allFlipedBlocks[1]);
     }

}

//stop clicking function 
function stopClicking() {

    //add class no clicking on main container 
    blocksContainer.classList.add('no-clicking');

    setTimeout(()=>{

        //remove class no clicking after the duration 
        blocksContainer.classList.remove('no-clicking');

    },duration );

}

//check mathed block 
function MatchedBlock(firstBlocked, secondBlocked) {

    let tries = document.querySelector('.tries span');

    if(firstBlocked.dataset.technology === secondBlocked.dataset.technology ) {

        firstBlocked.classList.remove('is-flipped');
        secondBlocked.classList.remove('is-flipped');

        firstBlocked.classList.add('has-match');
        secondBlocked.classList.add('has-match');

    } else {
        
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        
        setTimeout(() => {
            
        firstBlocked.classList.remove('is-flipped');
        secondBlocked.classList.remove('is-flipped');

        }, 1000);
    }
}

//shuffle function = un ordered numbers

function shuffle(array) {

    //setting vars
    let current = array.length,
        temp,
        random ;
    
    while (current > 0) {

        //get random elememt
        random = Math.floor(Math.random() * current);

        //decrease length by one
        current-- ;

        //1 * save the current element in temp
        temp = array[current];

        //2* current element = random element 
        array[current] = array[random];

        //random element = get element from temp
        array[random] = temp ; 
    }
    
    return array ;

}


