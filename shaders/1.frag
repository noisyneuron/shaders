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
   
   float v1 = (mx+1.)*14.;
   float v2 = (my/2.) +0.5;

   // float nx = uv.y*.5*(abs(cos(uv.y*v1+u_time)));
   // float ny = uv.x*.5*(abs(sin(uv.x*v1-u_time)));
   // 
   float nx = v2*uv.y*(abs(cos(uv.y*v1+u_time)));
   float ny = v2*uv.x*(abs(sin(uv.x*v1-u_time)));
   
   nx = nx > 1.0 ? fract(nx) : nx;
   ny = ny > 1.0 ? fract(ny) : ny;

   vec2 np = vec2(nx,ny);
   vec4 fg = texture2D(uSampler, np);

   gl_FragColor = fg;

}