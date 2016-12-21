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
   vec4 c = texture2D(uSampler, uv);
   float mx = mousex;
   float my = mousey;
   float time = u_time;
   float r1 = random1;
   float r2 = random2;
   float r3 = random3;

   vec4 nc = vec4(c.rgba);
   
   nc.r = texture2D(uSampler, vec2(uv.x*0.9, uv.y*0.6)).g;
   nc.g = texture2D(uSampler, vec2(uv.x*0.3, uv.y*0.9)).b;
   nc.b = texture2D(uSampler, vec2(uv.x*0.2, uv.y*0.4)).r;


   gl_FragColor = nc;

}