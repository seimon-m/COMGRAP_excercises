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

    function defineEdges(gl) { // define the edges for the cube , there are 12 edges in a cube

        var vertexIndices = [
            0, 1, 2, 0, 2, 3,    // front
            4, 5, 6, 4, 6, 7,    // back
            8, 9, 10, 8, 10, 11,   // top
            12, 13, 14, 12, 14, 15,   // bottom
            16, 17, 18, 16, 18, 19,   // right
            20, 21, 22, 20, 22, 23,   // left
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
            [0.0, 1.0, 0.0, 1.0],    // Top face: green
            [0.0, 0.0, 1.0, 1.0],    // Bottom face: blue
            [1.0, 1.0, 0.0, 1.0],    // Right face: yellow
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

    return {
        bufferVertices: defineVertices(gl),
        bufferEdges: defineEdges(gl),
        colorBuffer: defineColors(gl),
        draw: function (gl, aVertexPositionId, aVertexColorId) {

            // Position übergeben
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);

            // Farben übergeben
            gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
            gl.vertexAttribPointer(aVertexColorId, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexColorId);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferEdges);

            gl.drawElements(gl.TRIANGLES, 36 /* Anzahl Indices */, gl.UNSIGNED_SHORT, 0);
        }
    }
}