input.onButtonPressed(Button.A, function () {
    delay += 100
})
function isCollision () {
    x = snake[0]
    y = snake[1]
    collided = 0
    for (let index = 0; index <= snake.length / 2 - 1; index++) {
        if (index == 0 || snake.length <= 2) {
            continue;
        } else {
            if (x == snake[index * 2] && y == snake[index * 2 + 1]) {
                collided = 1
                break;
            }
        }
    }
    return collided
}
function genFruit () {
    while (true) {
        x = randint(0, 4)
        y = randint(0, 4)
        collided = 0
        for (let index = 0; index <= snake.length / 2 - 1; index++) {
            if (x == snake[index * 2] && y == snake[index * 2 + 1]) {
                collided = 1
            }
        }
        if (collided == 0) {
            fruit[0] = x
            fruit[1] = y
            break;
        }
    }
}
function growSnake () {
    if (snake[0] == fruit[0] && snake[1] == fruit[1]) {
        game.setScore(game.score() + 1)
        snake.push(snake[snake.length - 2])
        snake.push(snake[snake.length - 2])
        genFruit()
    }
}
function moveSnake () {
    angle = 25
    minusAngle = angle * -1
    if (input.rotation(Rotation.Roll) > angle || input.rotation(Rotation.Roll) < minusAngle || (input.rotation(Rotation.Pitch) > angle || input.rotation(Rotation.Pitch) < minusAngle)) {
        x = snake[0]
        y = snake[1]
        snake.pop()
        snake.pop()
        if (input.rotation(Rotation.Roll) > angle && x < 4) {
            x += 1
        } else if (input.rotation(Rotation.Roll) > angle && x == 4) {
            x = 0
        } else {
            if (input.rotation(Rotation.Roll) < minusAngle && x > 0) {
                x += -1
            } else if (input.rotation(Rotation.Roll) < minusAngle && x == 0) {
                x = 4
            } else {
                if (input.rotation(Rotation.Pitch) > angle && y < 4) {
                    y += 1
                } else if (input.rotation(Rotation.Pitch) > angle && y == 4) {
                    y = 0
                } else {
                    if (input.rotation(Rotation.Pitch) < minusAngle && y > 0) {
                        y += -1
                    } else if (input.rotation(Rotation.Pitch) < minusAngle && y == 0) {
                        y = 4
                    }
                }
            }
        }
        snake.unshift(y)
        snake.unshift(x)
    }
}
input.onButtonPressed(Button.B, function () {
    if (delay > 200) {
        delay += -100
    }
})
function drawSnake () {
    basic.clearScreen()
    led.plotBrightness(fruit[0], fruit[1], 255)
    for (let index = 0; index <= snake.length / 2 - 1; index++) {
        if (index == 0) {
            led.plotBrightness(snake[index * 2], snake[index * 2 + 1], 134)
        } else {
            led.plotBrightness(snake[index * 2], snake[index * 2 + 1], 56)
        }
    }
}
let minusAngle = 0
let angle = 0
let collided = 0
let y = 0
let x = 0
let snake: number[] = []
let fruit: number[] = []
let delay = 0
led.setDisplayMode(DisplayMode.Greyscale)
delay = 500
fruit = [0, 0]
snake = [2, 2]
genFruit()
drawSnake()
basic.forever(function () {
    basic.pause(delay)
    growSnake()
    moveSnake()
    collided = isCollision()
    if (collided == 0) {
        drawSnake()
    } else {
        game.gameOver()
    }
})
