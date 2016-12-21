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

   float v1 = (mx*14.)+2.;
   float v2 = (my*14.)+2.;
   

   float nx = .8*abs(sin(v1*uv.x));
   float ny = .8*abs(cos(v2*uv.y));

   nx = nx < 0.0 ? 1.+nx : nx;
   ny = ny < 0.0 ? 1.+ny : ny;
   
   vec2 np = vec2(nx,ny);
   vec4 fg = texture2D(uSampler, np);


   gl_FragColor = fg;

}