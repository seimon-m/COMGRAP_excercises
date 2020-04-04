/**
 *
 * Define a wire frame cube with methods for drawing it.
 *
 * @param gl the webgl context
 * @param color the color of the cube
 * @returns object with draw method
 * @constructor
 */

function WireFrameCube(gl) {
    function defineVertices(gl) { // define the vertices of the cube

        var vertices = [
            // Front face
            -1.0, -1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0,

            // Back face
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, -1.0, -1.0,

            // Top face
            -1.0, 1.0, -1.0,
            -1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, -1.0,

            // Bottom face
            -1.0, -1.0, -1.0,
            1.0, -1.0, -1.0,
            1.0, -1.0, 1.0,
            -1.0, -1.0, 1.0,

            // Right face
            1.0, -1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, 1.0, 1.0,
            1.0, -1.0, 1.0,

            // Left face
            -1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0,
            -1.0, 1.0, 1.0,
            -1.0, 1.0, -1.0,
        ];
        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return vertexBuffer;
    }

    function defineVertices2(gl) { // define the vertices of the cube

        var vertices = [
            3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 1, 3,
            3, 3, 3, 3, 1, 3, 3, 1, 1, 3, 3, 1,
            3, 3, 3, 3, 3, 1, 1, 3, 1, 1, 3, 3,
            1, 3, 3, 1, 3, 1, 1, 1, 1, 1, 1, 3,
            1, 1, 1, 3, 1, 1, 3, 1, 3, 1, 1, 3,
            3, 1, 1, 1, 1, 1, 1, 3, 1, 3, 3, 1
        ];
        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return vertexBuffer;
    }

    function defineEdges(gl) { // define the edges for the cube , there are 12 edges in a cube

        var vertexIndices = [
            0, 1, 2,
            2, 3, 0, // front
            4, 5, 6,
            6, 7, 4, // right
            8, 9, 10,
            10, 11, 8, // top
            12, 13, 14,
            14, 15, 12, // back
            16, 17, 18,
            18, 19, 16, // left
            20, 21, 22,
            22, 23, 20 // bottom
        ];

        var edgeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        return edgeBuffer;
    }

    function defineEdges2(gl) { // define the edges for the cube , there are 12 edges in a cube

        var vertexIndices = [
            0, 1, 3,
            2, 2, 0, // front
            4, 7, 6,
            6, 5, 4, // right
            8, 11, 10,
            10, 9, 8, // top
            12, 15, 14,
            14, 13, 12, // back
            16, 17, 18,
            18, 19, 16, // left
            20, 21, 22,
            22, 23, 20 // bottom
        ];

        var edgeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        return edgeBuffer;
    }

    function defineColors(gl) {

        var faceColors = [
            [1.0, 1.0, 1.0, 1.0],    // Front face: white
            [1.0, 0.0, 0.0, 1.0],    // Back face: red
            [1.0, 0.5, 0.0, 1.0],    // Top face:
            [0.0, 0.0, 1.0, 1.0],    // Bottom face: blue
            [0.0, 1.0, 0.7, 1.0],    // Right face:
            [1.0, 0.0, 1.0, 1.0],    // Left face: purple
        ];

        // Convert the array of colors into a table for all the vertices.
        var colors = [];
        for (var j = 0; j < faceColors.length; ++j) {
            const c = faceColors[j];
            // Repeat each color four times for the four vertices of the face
            colors = colors.concat(c, c, c, c);
        }

        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        return colorBuffer;
    }

    function defineColors2(gl) {

        var faceColors = [
            [1.0, 1.0, 1.0, 1.0],    // Front face: white
            [1.0, 1.0, 1.0, 1.0],    // Back face: red
            [1.0, 1.0, 1.0, 1.0],    // Top face:
            [1.0, 1.0, 1.0, 1.0],    // Bottom face: blue
            [0.0, 1.0, 0.7, 1.0],    // Right face:
            [1.0, 0.0, 1.0, 1.0],    // Left face: purple
        ];

        // Convert the array of colors into a table for all the vertices.
        var colors = [];
        for (var j = 0; j < faceColors.length; ++j) {
            const c = faceColors[j];
            // Repeat each color four times for the four vertices of the face
            colors = colors.concat(c, c, c, c);
        }

        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        return colorBuffer;
    }

    function defineTexture(gl) {

        var textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

        var textureCoordinates = [
            // Front
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Back
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Top
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Bottom
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Right
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
            // Left
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
        return textureCoordBuffer;
    }

    return {
        bufferVertices: defineVertices(gl),
        bufferVertices2: defineVertices2(gl),
        bufferEdges: defineEdges(gl),
        bufferEdges2: defineEdges2(gl),
        colorBuffer: defineColors(gl),
        colorBuffer2: defineColors2(gl),
        textureBuffer: defineTexture(gl),
        draw: function (gl, aVertexPositionId, aVertexColorId, aVertexTextureCoordId) {

            // Position übergeben
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);

            // Farben übergeben
            gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
            gl.vertexAttribPointer(aVertexColorId, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexColorId);

            // Textur
            gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
            gl.vertexAttribPointer(aVertexTextureCoordId, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexTextureCoordId);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, lennaTxt.textureObj);
            gl.uniform1i(ctx.uSampler2DId, 0);


            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferEdges);

            // z-Buffer
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            gl.drawElements(gl.TRIANGLES, 36 /* Anzahl Indices */, gl.UNSIGNED_SHORT, 0);


            // Position übergeben
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices2);
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);

            // Farben übergeben
            gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer2);
            gl.vertexAttribPointer(aVertexColorId, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexColorId);

            // Textur
            gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
            gl.vertexAttribPointer(aVertexTextureCoordId, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexTextureCoordId);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, lennaTxt.textureObj);
            gl.uniform1i(ctx.uSampler2DId, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferEdges2);

            // z-Buffer
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            gl.drawElements(gl.TRIANGLES, 36 /* Anzahl Indices */, gl.UNSIGNED_SHORT, 0);
        }
    }
}