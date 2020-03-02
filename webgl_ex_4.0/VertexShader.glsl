attribute vec3 aVertexPosition;
varying vec4 vColor;
attribute vec4 aColor;
uniform mat4 uProjectionMat;
uniform mat4 uModelMat;

void main() {
    vec4 position = uProjectionMat * uModelMat * vec4(aVertexPosition, 1);
    gl_Position = vec4(position.xy / position[2], 0, 1);
    vColor = aColor;
}