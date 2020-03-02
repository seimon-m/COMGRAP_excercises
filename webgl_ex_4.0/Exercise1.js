//
// Computer Graphics
//
// WebGL Exercises
//

// Register function to call after document has loaded
window.onload = startup;

// the gl object is saved globally
var gl;
var globalAngle = 0;

// we keep all local parameters for the program in a single object with the name ctx (for context)
var ctx = {
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
    var canvas = document.getElementById("myCanvas");
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
    gl.clearColor(0.8, 0.8, 0.8, 1);

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


// we keep all the parameters for drawing aspecific object together
var rectangleObject = {
    vertexBuffer: -1,
    colorBuffer: -1,
    edgeBuffer: -1
};

/**
 * Setup the buffers to use. If more objects are needed this should be split into one file per object.
 */
function setupBuffers() {
    "use strict";
    rectangleObject.vertexBuffer = gl.createBuffer();
    var vertices = [
        0, 0, 0,
        1, 0, 0,
        1, 1, 0
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    rectangleObject.colorBuffer = gl.createBuffer();
    var colors = [
        1, 0, 0.4, 1,
        0.1, 0.2, 0.3, 1,
        0.3, 0.4, 0.5, 1,
        0.3, 1, 0.1, 1
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var vertexIndices = [
        0,1,
        1,2,
        0 ,2
    ];

    rectangleObject.edgeBuffer = gl.createBuffer ();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rectangleObject.edgeBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
}


/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Farben übergeben
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.vertexAttribPointer(ctx.aColorId, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aColorId);

    // draw
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.vertexBuffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aVertexPositionId);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rectangleObject.edgeBuffer);




    gl.uniformMatrix4fv()

    gl.drawElements(gl.LINES, 6 /* Anzahl Indices */, gl.UNSIGNED_SHORT, 0);
}

function drawAnimated() {
    if (globalAngle >= 2 * Math.PI) {
        globalAngle = 0;
    } else {
        globalAngle +=  0.1;
    }

    console.log(globalAngle);
    draw();
    window.requestAnimationFrame(drawAnimated);
}