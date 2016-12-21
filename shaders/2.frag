// circle-y bounce
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
   

   float nx = r1 > .5 ? uv.x - r3*mx/2. : uv.x + r3*mx/2.;
   float ny = r2 > .5 ? uv.y - r3*my/2. : uv.y + r3*my/2.;

   nx = nx > 1.0 ? fract(nx) : nx;
   ny = ny > 1.0 ? fract(ny) : ny;
   
   vec2 np = vec2(nx,ny);
   vec4 fg = texture2D(uSampler, np);

   gl_FragColor = fg;

}