const convas = document.querySelector("canvas");
const ctx = convas.getContext("2d");




const size = 30;



const snake = [{ x: 270, y: 240 },];
const randleNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}
const randlePosition = () => {
    const number = randleNumber(0, convas.width - size);
    return Math.round(number / 30) * 30;
}

const randleColor = () => {
    const red = randleNumber(0, 255);
    const green = randleNumber(0, 255);
    const blue = randleNumber(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}



const food = {
    x: randlePosition(),
    y: randlePosition(),
    color: randleColor()

}

let direction, loopId;

const drowFood = () => {
    const { x, y, color } = food
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x, food.y, size, size);
    ctx.shadowBlur = 0;
}
const drowsnake = () => {
    ctx.fillStyle = "#ddd";
    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = "red";
        }
        ctx.fillRect(position.x, position.y, size, size);

    })
}
const movesnake = () => {
    if (!direction) return;
    const head = snake[snake.length - 1];
    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }

    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }


    snake.shift();
}
const drowGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";

    for (let i = 30; i < convas.width; i += 30) {
        ctx.beginPath();
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();


    }


}


const chackEat = () => {
    const head = snake[snake.length - 1];
    if (head.x == food.x && head.y == food.y) {
        snake.push(head);
        let  y= randlePosition();
        let x= randlePosition();
        food.color = randleColor();
        while (snake.find((position)=> position.x && position.y == y)) {
             y = randlePosition();
             x = randlePosition();
        }
        food. x = x
        food. y  = y
        food.color = randleColor();


        
    }
}
const gameLoop = () => {

    clearInterval(loopId);
    ctx.clearRect(0, 0, 600, 600);
    drowGrid();
    drowFood();
    movesnake();
    drowsnake();
    chackEat();
    loopId = setTimeout(() => {
        gameLoop()
    }, 100);




}

gameLoop();


document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right";
    }
    if (key == "ArrowLeft" && direction != "right") {
        direction = "left";
    }
    if (key == "ArrowDown" && direction != "up") {
        direction = "down";
    }
    if (key == "ArrowUp" && direction != "down") {
        direction = "up";
    }

})
