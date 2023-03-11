const canvas = document.querySelector("canvas");
const pen = canvas.getContext('2d');
var audio = new Audio('Audio/hit.mp3');
var out = new Audio('Audio/marioout.mp3');
var bg = new Audio('Audio/duck.mp3');
window.onload = () => {
    bg.play();
// alert("play song");
// 
}
// setTimeout(() => {
    // bg.pause();
// },10000)
// document.addEventListener('load', () => {
//     // bg.play();
// })
pen.fillStyle = 'yellow';// used to define the color of the content we are creating
// pen.fillRect(100, 100, 90, 90);// used to create the rectange with (x,y,width,height)
let cs = 67;
let w = 1200;
let h = 735;
let food = null;
let score = 0;
const snake = {
    init_len: 5,
    direction: 'right',
    cells: [],
    createSnake: function (){
        for (let i = 1; i <= this.init_len; i++){
            this.cells.push({
                x: i,
                y: 0
            });
        }
    },
    drawsnake: function () {
        for (let cell of this.cells) {
            pen.fillRect(cell.x*cs, cell.y*cs, cs-1, cs-1);
        }
    },
    updatesnake: function () {
        // getting the value of head of snake from last call of array
        const headx = this.cells[this.cells.length - 1].x;
        const heady = this.cells[this.cells.length - 1].y;

        //collision of head of snake with food
        // if (headx === food.x -cs && heady === food.y-cs) {
        //     // food = getrandomfood();
        //     // score++;
        //     audio.play();

        // }
        if (headx === food.x && heady === food.y) {
            food = getrandomfood();
            score++;
            audio.play();

        } else {
            this.cells.shift();
        }

        let nextx;
        let nexty;
        if (this.direction === 'down'){
            nextx = headx;
            nexty = heady + 1;
            if (nexty * cs >= h) {
                pen.fillStyle = 'red';

                pen.fillText('Game Over', 100, 100);
                out.play();
                clearInterval(id);
            }
        } else if (this.direction === 'up') {
            nextx = headx;
            nexty = heady - 1;
            if (nexty * cs < 0) {
                pen.fillStyle = 'red';

                clearInterval(id);
                out.play();

                pen.fillText('Game Over',100,100);

            }
        }
        else if (this.direction === 'left') {
            nextx = headx - 1;
            nexty = heady;
            if (nextx * cs < 0) {    pen.fillStyle = 'red';

                clearInterval(id);
                out.play();

                pen.fillText('Game Over',100,100);

            }
        }
        else {
            nextx = headx + 1;
            nexty = heady;
            if (nextx * cs >= w) {
                pen.fillStyle = 'red';

                clearInterval(id);
                out.play();

                pen.fillText('Game Over', 100, 100);
                

            }
        }
       
        // this.cells.shift();// remove first cell
        this.cells.push({// puching the new cells inside the cells array
            x: nextx,
            y: nexty
        })
    }
}
function init() {
    snake.createSnake();
    food = getrandomfood();
    function keypressed(e) {
        if (e.key === 'ArrowDown') {
            snake.direction = 'down';
        }else  if (e.key === 'ArrowLeft') {
            snake.direction = 'left';
        }else  if (e.key === 'ArrowUp') {
            snake.direction = 'up';
        }else if (e.key === 'ArrowRight') {
            snake.direction = 'right';
        }
        console.log(e.key);
    }
    document.addEventListener('keydown', keypressed);
}
function update() { //update the property of the games time to time
  
    snake.updatesnake();
}
function draw() {// draw sonething on to the canvas
    pen.clearRect(0, 0, w, h);
    pen.font = '40px sans-serif';
    pen.fillStyle = 'Green';

    pen.fillText(`Score ${score}`, 100, 50);
    pen.fillStyle = 'blue';
    pen.fillRect(food.x*cs, food.y*cs, cs, cs);
    pen.fillStyle = 'yellow';
    snake.drawsnake();
}
function gameloop() {// running game loop
    draw();
    update();
}
function getrandomfood() {
    const foodx = Math.round(Math.random() * (w - cs) / cs);
    const foody = Math.round(Math.random() * (h - cs) / cs);
    food = {
        x: foodx,
        y:foody
    }
    return food;
}
init();
const id = setInterval(gameloop, 200);