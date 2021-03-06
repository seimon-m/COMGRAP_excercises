
/*
* Computer Graphics
*
* PONG by Simon Müller
*/

// Test Test
// Computer Graphics
//
// WebGL Exercises
//

// Register function to call after document has loaded
window.onload = startup;

// the gl object is saved globally
let gl;
let globalAngle = 0;


// we keep all local parameters for the program in a single object with the name ctx (for context)
let ctx = {
    shaderProgram: -1,
    aVertexPositionId: -1,
    uColorId: -1,
    uProjectionMatId: -1,
    uModelMatId: -1
};

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    let canvas = document.getElementById("myCanvas");
    const height = canvas.height;
    const width = canvas.width;
    gl = createGLContext(canvas);
    initGL();

    draw();
    window.requestAnimationFrame(drawAnimated);
}



/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setupAttributesAndUniforms();
    setupBuffers();

    // set the clear color here
    gl.clearColor(0.1, 0.1, 0.1, 1);

    // add more necessary commands here
}

/**
 * Setup all the attribute and uniform variables
 */
function setupAttributesAndUniforms() {
    "use strict";
    // finds the index of the variable in the program
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aColorId = gl.getAttribLocation(ctx.shaderProgram, "aColor");
    ctx.uProjectionMatId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMat");
    ctx.uModelMatId = gl.getUniformLocation(ctx.shaderProgram, "uModelMat");
}


// we keep all the parameters for drawing a specific object together
let rectangleObject = {
    coordinateBuffer: -1,
    colorBuffer: -1
};

/**
 * Setup the buffers to use. If more objects are needed this should be split into one file per object.
 */
function setupBuffers() {
    "use strict";
    rectangleObject.coordinateBuffer = gl.createBuffer();
    let vertices = [
        -0.5, -0.5,
        -0.5, 0.5,
        0.5, 0.5,
        0.5, -0.5
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.coordinateBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    rectangleObject.colorBuffer = gl.createBuffer();
    let colors = [
        1, 0, 0.4, 1,
        0.1, 0.2, 0.3, 1,
        0.3, 0.4, 0.5, 1,
        1, 1, 0.1, 1
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

class Ball {
    constructor() {
        this.x = Math.floor(Math.random() * (200 - (-200)) ) + (-200);
        this.y = Math.floor(Math.random() * (100 - (-100))) + (-100);
        this.xSpeed = Math.floor(Math.random() * (5 - (2))) + (2);
        this.ySpeed = this.xSpeed;
        this.size = 15;
    }

    move() {
        this.x = this.x + this.xSpeed;
        this.y = this.y + this.ySpeed;
    }

    bounce() {
        if (this.y >= 300 || this.y <= -300) {
            this.ySpeed = this.ySpeed * -1;
        }
        if (this.x <= -400) {
            paddle2.lives--;
            document.location.reload();
        }
        if (this.x >= 400) {
            paddle1.lives--;
            document.location.reload();
        }
    }

    paddleCollision() {
        if ( (ball.y >= paddle1.y-30) &&
            (ball.y <= paddle1.y+30) &&
            (ball.x >= 360)) {
            this.xSpeed = this.xSpeed * -1;
        }
        if ( (ball.y >= paddle2.y-30) &&
            (ball.y <= paddle2.y+30) &&
            (ball.x <= -360)) {
            this.xSpeed = this.xSpeed * -1;
        }
    }
}

class Paddle {
    constructor(lives = 3) {
        this.y = 0;
        this.width = 10;
        this.height = 60;
        this.velocity = 30;
        this.lives = 3;
    }

}

let ball = new Ball();
let paddle1 = new Paddle();
let paddle2 = new Paddle();


/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Koordinaten übergeben
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.coordinateBuffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0); /* gl.vertexAttribPointer(ID, ??, datentyp, ??, stride in bytes, offset in bytes); */
    gl.enableVertexAttribArray(ctx.aVertexPositionId);

    // Farben übergeben
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.vertexAttribPointer(ctx.aColorId, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aColorId);

    // Set up the world coordinates
    let projectionMat = mat3.create();
    mat3.fromScaling(projectionMat, [2.0 / gl.drawingBufferWidth, 2.0 / gl.drawingBufferHeight]);
    gl.uniformMatrix3fv(ctx.uProjectionMatId, false, projectionMat);

    ball.bounce();
    ball.move();
    ball.paddleCollision();
    drawPaddles();
    drawLine();
    drawBall();
}

function drawPaddles() {
    var modelMat = mat3.create();
    mat3.fromTranslation(modelMat, [370, paddle1.y]);
    mat3.scale(modelMat, modelMat, [paddle1.width, paddle1.height]);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, modelMat);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    var modelMat = mat3.create();
    mat3.fromTranslation(modelMat, [-370, paddle2.y]);
    mat3.scale(modelMat, modelMat, [paddle2.width, paddle2.height]);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, modelMat);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function drawLine() {
    var modelMat = mat3.create();
    mat3.scale(modelMat, modelMat, [3, 600]);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, modelMat);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function drawBall() {
    var modelMat = mat3.create();
    mat3.fromTranslation(modelMat, [ball.x, ball.y]);
    mat3.scale(modelMat, modelMat, [ball.size, ball.size]);
    mat3.rotate(modelMat, modelMat, globalAngle);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, modelMat);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function drawAnimated() {
    if (globalAngle >= 2 * Math.PI) {
        globalAngle = 0;
    } else {
        globalAngle +=  0.05;
    }

    draw();
    // request the next frame
    window.requestAnimationFrame(drawAnimated);
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    // paddle 1
    if (keyName === 'ArrowUp') {
        //alert(`Key pressed ${keyName}`);
        if (paddle1.y <= 260) {
            paddle1.y += paddle1.velocity;
        }
    }
    if (keyName === 'ArrowDown') {
        if (paddle1.y >= -260) {
            paddle1.y -= paddle1.velocity;
        }
    }

    // paddle 2
    if (keyName === 'w') {
        if (paddle2.y <= 260) {
            paddle2.y += paddle2.velocity;
        }
    }
    if (keyName === 's') {
        if (paddle2.y >= -260) {
            paddle2.y -= paddle2.velocity;
        }
    }

}, false);



