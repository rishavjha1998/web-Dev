// making a canva box for the game to be visible


let canvas=document.getElementById("id1")
let ctx=canvas.getContext("2d")
ctx.fillStyle = "white";
ctx.fillRect(0,0,500,500)


let canvas1=document.getElementById("id2")
let ctx1=canvas1.getContext("2d")
ctx1.fillStyle = "white";
ctx1.fillRect(0,0,100,100);
// ctx1.fillText(score,50,50);


// static snake 

snake_pos=[{x:100,y:150},{x:110,y:150},{x:120,y:150},{x:130,y:150}];

// obj=snake_pos[0]
// ctx.fillRect(obj.x,obj.y,5,5);

function f(obj){
    ctx.fillStyle = "white";
    ctx.lineWidth = 10;
    // ctx.strokeStyle = "black";
    ctx.fillRect(obj.x,obj.y,10,10);
}

function make_snake(){
    snake_pos.forEach(f);
}



// moving snake

let dx=10
let dy=0

function move_snake(){
    const obj={x: snake_pos[snake_pos.length-1].x+dx , y: snake_pos[snake_pos.length-1].y+dy};
    snake_pos.shift();
    snake_pos.push(obj);
    
}

// draw a border around the canvas
    function clear_board() {
      //  Select the colour to fill the drawing
      ctx.fillStyle = '#3B5998';
    //   //the colour for the border of the canvas
    //   ctx.strokestyle = board_border;
      //filled" rectangle to cover the entire canvas
      ctx.fillRect(0, 0, 500, 500);
      //border" around the entire canvas
      ctx.strokeRect(0, 0, 500, 500);
    }


    //when will the game end


function end(){
    for(let i=0;i<snake_pos.length;i++){
        let boundary_condn=snake_pos[snake_pos.length-1].x >= 500 || snake_pos[snake_pos.length-1].x <=0 ||
        snake_pos[snake_pos.length-1].y<=0 || snake_pos[snake_pos.length-1].y>=500;

        if(boundary_condn){
            alert('game ended');
            return;
        }

        for(let i=0;i<snake_pos.length-1;i++){
            let touch=snake_pos[i].x===snake_pos[snake_pos.length-1].x && snake_pos[i].y===snake_pos[snake_pos.length-1].y;

            if(touch){
                alert('game ended');
                return;
            }
        }
    }

    let check1=snake_pos[snake_pos.length-1].x === 500;
    let check2=snake_pos[snake_pos.length-1].x === 0;
    let check3=snake_pos[snake_pos.length-1].y === 500;
    let check4=snake_pos[snake_pos.length-1].y === 0;



    if(check1 || check2 || check3 || check4){
        alert("Game Over")
    }
    else{
        return;
    }

}



function show(){
    
        if(end()){
            return ;
        }
        clear_board();
        make_snake();
        show_food();
        move_snake();
        show_score();
        setTimeout(show,100);
}

// key pressing using event listener

function change_direction(event) 
{  
   const LEFT_KEY = 37;
   const RIGHT_KEY = 39;
   const UP_KEY = 38;
   const DOWN_KEY = 40;
 
   const keyPressed = event.keyCode;
   const goingUp = dy === -10;
   const goingDown = dy === 10;
   const goingRight = dx === 10;  
   const goingLeft = dx === -10;
 
     if (keyPressed === LEFT_KEY && !goingRight)
     {    
          dx = -10;
          dy = 0;  
     }
 
     if (keyPressed === UP_KEY && !goingDown)
     {    
          dx = 0;
          dy = -10;
     }
 
     if (keyPressed === RIGHT_KEY && !goingLeft)
     {    
          dx = 10;
          dy = 0;
     }
 
     if (keyPressed === DOWN_KEY && !goingUp)
     {    
          dx = 0;
          dy = 10;
     }
}

document.addEventListener("keydown", change_direction)

function random_food(min, max)
{  
//    return Math.floor(Math.random() * (max-min)) ;
      return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

let food_x;
let food_y;
let score=0;

function make_food() 
{  
    food_x = random_food(5, 495);
    food_y = random_food(5, 495);
   
   const check=snake_pos.some((obj)=>{
      return (obj.x===food_x) && (obj.y===food_y);
   })

   if(check){
     make_food();
   }
   
}

function eaten(){
    const check=snake_pos[snake_pos.length-1].x===food_x && snake_pos[snake_pos.length-1].y===food_y
    return check;
}

function show_food(){
    if(eaten()){
        score+=10;
        const obj=snake_pos[snake_pos.length-1];
        obj.x=obj.x+10;
        obj.y=obj.y+10;
        snake_pos.push(obj);
        make_food();
    }
    ctx.fillStyle="black";
    ctx.fillRect(food_x,food_y,10,10);
}

function show_score(){
    ctx1.clearRect(0, 0,100,100);
    ctx1.font='30px Arial';
    ctx1.fillStyle='black';
    ctx1.fillText(score,50,50);
    
    
}

make_food()
show()








// function snake_making(obj){
//     ctx.fillstyle="#FF0000";
//     ctx.fillRect(obj.x,obj.y,15,15);
//     ctx.stroke();
// }


// for(i in snake_pos){
//     snake_making(i)
// }



// // Blue rectangle
// ctx.beginPath();
// ctx.lineWidth = "1";
// ctx.strokeStyle = "blue";
// ctx.rect(50, 50, 15, 15);
// ctx.stroke();


// // context.moveTo(4,3)
// // context.lineTo(50,50)
// // context.stroke()

// to draw an arc

// context.beginPath();
// context.arc(50,50,50,0,2*Math.PI);
// context.stroke();


// context.font = "30px Arial";
// context.fillText("Hello World", 10, 50);

