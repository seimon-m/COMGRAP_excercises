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
            -0.5, -0.5, -0.5,    // Modellkoordinaten
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5
        ];
        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return vertexBuffer;
    }

    function defineEdges(gl) { // define the edges for the cube , there are 12 edges in a cube

        var vertexIndices = [
            0, 1,
            1, 2,
            2, 3,
            3, 0,
            0, 5,
            1, 6,
            2, 7,
            3, 4,
            5, 6,
            6, 7,
            7, 4,
            4, 5
        ];

        var edgeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        return edgeBuffer;
    }

    function defineColors(gl) {

        var colors = [
            1, 0, 1, 1,
            0.1, 1, 0.3, 1,
            0.3, 0.4, 0.5, 1,
            0.3, 1, 1, 1,
            1, 0, 0.4, 1,
            0.1, 0.2, 0.3, 1,
            1, 0.4, 0.5, 1,
            0.3, 1, 0.5, 1
        ];

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

            gl.drawElements(gl.LINES, 24 /* Anzahl Indices */, gl.UNSIGNED_SHORT, 0);
        }
    }
}