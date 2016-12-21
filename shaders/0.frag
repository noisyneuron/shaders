// invert colors
precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float u_time;
uniform float mousex;
uniform float mousey;
uniform float random1;
uniform float random2;
uniform float random3;

void main(void)
{
   vec2 uv = vTextureCoord.xy;
   float mx = mousex;
   float my = mousey;
   float time = u_time;
   float r1 = random1;
   float r2 = random2;
   float r3 = random3;

   vec4 c = texture2D(uSampler, uv);
   vec4 nc = vec4(abs(1.-c.r), abs(1.-c.g), abs(1.-c.b), 1.);

   gl_FragColor = nc;

}