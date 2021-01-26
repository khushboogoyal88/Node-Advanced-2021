'use strict';

(function(){
    let drawingCanvas;
    let ctx;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        drawingCanvas = document.getElementById('drawingcanvas');
        ctx=drawingCanvas.getContext('2d');

        draw();
    }

    function draw() {
        
        ctx.translate(  Math.floor(drawingCanvas.width/2),
                        Math.floor(drawingCanvas.height/2));
        ctx.moveTo(-200,0);
        ctx.lineTo(200,0);
        ctx.stroke();
        ctx.moveTo(0,-200);
        ctx.lineTo(0,200);
        ctx.stroke();

        ctx.font='40pt monospace';
        ctx.fillText('test',0,-30);

        ctx.scale(1,-1);
        ctx.fillText('test2', 0, -30);

        ctx.scale(1,-1);
        ctx.fillText('test3', 0, -60);

        ctx.scale(1,0.25);
        ctx.beginPath();
        ctx.arc(-100,-200,60,0,2*Math.PI);
        ctx.stroke();
    }

})();