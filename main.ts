function moveSnake () {
    angle = 40
    x = snake[0]
    y = snake[1]
    snake.pop()
    snake.pop()
    if (input.rotation(Rotation.Roll) > angle && x < 4) {
        x += 1
    } else if (input.rotation(Rotation.Roll) > angle && x == 4) {
        x = 0
    } else {
        if (input.rotation(Rotation.Roll) < angle * -1 && x > 0) {
            x += -1
        } else if (input.rotation(Rotation.Roll) < angle * -1 && x == 0) {
            x = 4
        } else {
            if (input.rotation(Rotation.Pitch) > angle && y < 4) {
                y += 1
            } else if (input.rotation(Rotation.Pitch) > angle && y == 4) {
                y = 0
            } else {
                if (input.rotation(Rotation.Pitch) < angle * -1 && y > 0) {
                    y += -1
                } else if (input.rotation(Rotation.Pitch) < angle * -1 && y == 0) {
                    y = 4
                } else {
                	
                }
            }
        }
    }
    snake.unshift(y)
    snake.unshift(x)
}
function drawSnake () {
    basic.clearScreen()
    for (let index = 0; index <= snake.length / 2 - 1; index++) {
        led.plot(snake[index * 2], snake[index * 2 + 1])
    }
}
let y = 0
let x = 0
let angle = 0
let snake: number[] = []
snake = [
2,
2,
3,
2
]
basic.forever(function () {
    basic.pause(200)
    moveSnake()
    drawSnake()
})
