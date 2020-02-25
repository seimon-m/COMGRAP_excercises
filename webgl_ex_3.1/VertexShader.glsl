attribute vec2 aVertexPosition;
varying vec4 vColor;
attribute vec4 aColor;
uniform mat3 uProjectionMat;
uniform mat3 uModelMat;

void main() {
    vec3 position = uProjectionMat * uModelMat * vec3(aVertexPosition, 1);
    gl_Position = vec4(position.xy / position[2], 0, 1);
    vColor = aColor;
}