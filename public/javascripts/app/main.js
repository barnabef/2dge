/**
 * Created by barnabef on 2/8/17.
 */

define(function (require) {
    var tileset = require('./tileset');
    var fabric = require('fabric');

    var canvas = new fabric.Canvas('canvas', {
        hoverCursor: 'pointer',
        selection: false,
        perPixelTargetFind: true,
        targetFindTolerance: 5
    });

    tileset.ready.then(
        function(){
            for (var i = 0; i < 20; i++) {
                for (var j = 0; j < 15; j++) {
                    var family = "cave";
                    var name = "floor";
                    if ( j == 0 ) {
                        name = "floor_top";
                    }
                    if ( j == 14 ) {
                        name = "floor_bottom";
                    }
                    var tile = tileset.get(family, name);
                    tile.set({ left: i * 32, top: j* 32 }).setCoords();
                    canvas.add(tile);
                }
            }
            var orbit = new fabric.Circle({
                radius: 15,
                left: canvas.getWidth() / 2,
                top: canvas.getHeight() / 2,
                fill: 'rgba(0,192,255,1)',
                stroke: 'rgba(0,192,255,1)',
                hasBorders: true,
                hasControls: false,
                lockMovementX: true,
                lockMovementY: true,
                index: 100
            });
            canvas.add(orbit);
            document.onkeydown = checkKey;

            function checkKey(e) {

                e = e || window.event;

                if (e.keyCode == '38') {
                    orbit.top -= 16;
                    e.preventDefault();
                }
                else if (e.keyCode == '40') {
                    orbit.top += 16;
                    e.preventDefault();
                }
                else if (e.keyCode == '37') {
                    orbit.left -= 16;
                    e.preventDefault();
                }
                else if (e.keyCode == '39') {
                    orbit.left += 16;
                    e.preventDefault();
                }
                canvas.renderAll();
            }
        }
    ).catch(
        function(reason){
            console.log(reason);
        });

});