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
uniform vec2 dim;

void main(void)
{
   vec2 uv = vTextureCoord.xy;
   float mx = mousex;
   float my = mousey;
   float time = u_time;
   float r1 = random1;
   float r2 = random2;
   float r3 = random3;
   
   vec2 coords = uv * dim;
   vec2 size = vec2(5.+(mx*30.),10.+(mx*30.));
   // vec2 size = vec2(10.,10.);
   vec2 gridStart = floor(coords/size) * size;
   vec2 np = gridStart + size - (coords - gridStart);
   np = np/dim;



   vec4 fg = texture2D(uSampler, np);

   gl_FragColor = fg;

}