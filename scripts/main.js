var renderer, 
    stage, 
    video, 
    texture, 
    videoSprite, 
    filterCount = 16,
    videoCount = 6,
    currentVideo = 0,
    filters = [], 
    staticRandom = Math.random(),
    currentFilters = null,
    mousePos = {x:0, y:0},
    keysPressed = {},
    pause = false;

// setup video
video = document.createElement("video");
video.preload = "auto";
video.loop = true;  
video.src = "vids/"+currentVideo+".mp4";

          
// setup renderer and stage
renderer = PIXI.autoDetectRenderer(1024, 512);
document.body.appendChild(renderer.view);
stage = new PIXI.Container();
stage.interactive = true;


// setup texture
texture = PIXI.Texture.fromVideo(video);
texture.baseTexture.wrapMode = 1;
videoSprite = new PIXI.Sprite(texture);
videoSprite.width = renderer.width;
videoSprite.height = renderer.height;
stage.addChild(videoSprite);


// setup custom filters
function CustomFilter(fragmentSource) {
    PIXI.Filter.call(this, null, fragmentSource);
}
CustomFilter.prototype = Object.create(PIXI.Filter.prototype);
CustomFilter.prototype.constructor = CustomFilter;
for(var i=0; i<filterCount; i++) {
    if(i<10) {
        PIXI.loader.add('shader-'+i,'shaders/'+i+'.frag');
    } else {
        var letter = String.fromCharCode(i+55).toLowerCase();
        PIXI.loader.add('shader-'+letter,'shaders/'+letter+'.frag');
    }
    
}
PIXI.loader.once('complete',onLoaded);
PIXI.loader.load();


// handle events
stage.on('mousemove', updateMousePos);
window.addEventListener("keydown", handleKeyDown, false);
window.addEventListener("keyup", handleKeyUp, false);
document.getElementById("next").addEventListener("click", function(e) {
    e.preventDefault();
    currentVideo++;
    currentVideo = currentVideo == videoCount ? 0 : currentVideo;
    updateVideo();
});
document.getElementById("prev").addEventListener("click", function(e) {
    e.preventDefault();
    currentVideo--;
    currentVideo = currentVideo == -1 ? videoCount-1 : currentVideo;
    updateVideo();
});

function updateVideo() {
    pause = true;
    stage.removeChild(videoSprite);
    video = document.createElement("video");
    video.src = "vids/"+currentVideo+".mp4";
    video.loop = true;  
    texture = PIXI.Texture.fromVideo(video);
    videoSprite = new PIXI.Sprite(texture);
    stage.addChild(videoSprite);
    video.oncanplay = function() {
        // console.log('loaded');
        pause = false;
        requestAnimationFrame(animate);
    }
}

function handleKeyDown (e) {
    e.preventDefault();
    if(e.keyCode >= 48 && e.keyCode <= 57 && e.keyCode - 48 < filterCount) {
        keysPressed[e.keyCode] = e.key;
        updateFilters();
    } else if(e.keyCode >= 65 && e.keyCode <= 90 && e.keyCode - 55 < filterCount) {
        keysPressed[e.keyCode] = e.key.toLowerCase();
        updateFilters();
    }
    return false;
}

function handleKeyUp (e) {
    e.preventDefault();
    if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)) {
        delete keysPressed[e.keyCode];
        updateFilters();
    }
    return false;
}

function updateFilters() {
    currentFilters = [];
    var keys = Object.keys(keysPressed);
    for(var i=0; i<keys.length; i++) {
        var keyCode = keys[i];
        if(keyCode >= 48 && keyCode <= 57) {
            currentFilters.push(filters[keyCode - 48]);
        } else if(keyCode >= 65 && keyCode <= 90) {
            currentFilters.push(filters[keyCode - 55]);
        }
    }
    if(currentFilters.length == 0) {
        currentFilters = null;
    }
    stage.filters = currentFilters;
}

function updateMousePos (e) {
    var pos = e.data.getLocalPosition(stage);
    if(pos.x>=0 && pos.y>=0 && pos.x<=renderer.width && pos.y<=renderer.height) {
        mousePos.x = pos.x/renderer.width; mousePos.y = pos.y/renderer.height;
    }
}

function onLoaded (loader,res) {
    for(var i=0; i<filterCount; i++) {
        var f;
        if(i<10) {
            f = new CustomFilter(res['shader-'+i].data);
        } else {
            var letter = String.fromCharCode(i+55).toLowerCase();
            f = new CustomFilter(res['shader-'+letter].data);
        }
        f.padding = 0;
        f.uniforms.random3 = staticRandom;
        f.uniforms.dim = { type: 'vec2', x:renderer.width, y:renderer.height};
        filters.push(f);
    }
    animate();
}


function animate() {
    for(var i=0; i<filterCount; i++) {
        filters[i].uniforms.u_time += 0.04;
        filters[i].uniforms.mousex = mousePos.x;
        filters[i].uniforms.mousey = mousePos.y;
        filters[i].uniforms.random1 = Math.random();
        filters[i].uniforms.random2 = Math.random();
    }
    renderer.render(stage);
    if(!pause) requestAnimationFrame(animate);
}