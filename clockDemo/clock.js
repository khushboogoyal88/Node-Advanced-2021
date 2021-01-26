'use strict';

(function() {
    let drawingCanvas;
    let ctx;
    let timer;
    let bgColor;
    let angleInRad;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        drawingCanvas = document.getElementById('drawingcanvas');
        ctx = drawingCanvas.getContext('2d');

        bgColor=ctx.createRadialGradient(200,200,200,200,200,50);
        bgColor.addColorStop(0.0, "green");
        bgColor.addColorStop(0.5, 'greenyellow');
        bgColor.addColorStop(1.0,'lightgreen');

        angleInRad=0;
        timer=setInterval(draw, 1000);
        // draw();
    }

    function draw() {
        ctx.fillStyle=bgColor;
        ctx.fillRect(0,0,drawingCanvas.width,drawingCanvas.height);
        ctx.save();
            ctx.translate(200,200);
            angleInRad+=6*Math.PI/180;
            ctx.rotate(angleInRad);
            ctx.fillStyle='darkorange';
            ctx.fillRect(0,-5,200,10);
            ctx.strokeStyle='yellow';
            ctx.strokeRect(0,-5,200,10);
            ctx.save();
                ctx.font='40pt Serif';
                ctx.strokeStyle='black';
                ctx.strokeText('Time is', 10, -7);
            ctx.restore();
            ctx.arc(0,0,10,0,2*Math.PI);
            ctx.fill();
            ctx.stroke();
        ctx.restore();
        
    }

})();