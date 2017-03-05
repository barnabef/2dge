/**
 * Created by barnabef on 2/8/17.
 */

define(function (require) {
    var tileset = require('./tileset');
    var fabric = require('fabric');
    // var engine = require('engine');

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
                        name += "_top";
                    }
                    if ( j == 14 ) {
                        name += "_bottom";
                    }
                    if ( i == 0 ) {
                        name += "_left";
                    }
                    if ( i == 19 ) {
                        name += "_right";
                    }
                    var tile = tileset.get(family, name);
                    tile.set({ left: i * 32, top: j * 32 }).setCoords();
                    canvas.add(tile);
                }
            }
            var hero_down = tileset.get("hero", "down");
            var hero_up = tileset.get("hero", "up");
            var hero_left = tileset.get("hero", "left");
            var hero_right = tileset.get("hero", "right");
            var left = canvas.getWidth() / 2;
            var top = canvas.getHeight() / 2;
            var hero = hero_down;

            function setHero(image, l, t) {
                canvas.remove(hero);
                hero = image;
                hero.set({
                    left: l,
                    top: t
                });
                canvas.add(hero);
            }

            setHero(hero_down, left, top);
            document.onkeydown = checkKey;

            function checkKey(e) {

                e = e || window.event;

                if (e.keyCode == '38') {
                    top -= 16;
                    setHero(hero_up, left, top);
                    e.preventDefault();
                }
                else if (e.keyCode == '40') {
                    top += 16;
                    setHero(hero_down, left, top);
                    e.preventDefault();
                }
                else if (e.keyCode == '37') {
                    left -= 16;
                    setHero(hero_left, left, top);
                    e.preventDefault();
                }
                else if (e.keyCode == '39') {
                    left += 16;
                    setHero(hero_right, left, top);
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