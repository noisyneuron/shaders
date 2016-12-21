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
   
   nc.r = mix(texture2D(uSampler, vec2(uv.y, uv.x)).r, c.r, r1);
   nc.g = mix(texture2D(uSampler, vec2(uv.y, uv.x)).g, c.g, r1);
   nc.b = mix(texture2D(uSampler, vec2(uv.y, uv.x)).b, c.b, r1);


   gl_FragColor = nc;

}