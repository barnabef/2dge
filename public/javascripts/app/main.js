/**
 * Created by barnabef on 2/8/17.
 */

define(function (require) {
    var tileset = require('./tileset');
    var fabric = require('fabric');
    var jquery = require('jquery');
    var uiScreen = require('./ui-screen');
    // var engine = require('engine');

    var canvas = new fabric.Canvas('canvas', {
        hoverCursor: 'pointer',
        selection: false,
        perPixelTargetFind: true,
        targetFindTolerance: 5
    });
    var hero;
    var currentScreen;
    var left = canvas.getWidth() / 2;
    var top = canvas.getHeight() / 2;

    function drawScreen(screen) {
        // jquery.each(screen.def, function (index, t) {
        //     var x2 = t.x + (t.width ? t.width : 1);
        //     var y2 = t.y + (t.height ? t.height : 1);
            for (var i = 0; i < 20; i++) {
                for (var j = 0; j < 15; j++) {
                    var family = "cave";
                    var t = screen.getTileAt(i, j).data;
                    var name = t.tile;
                    var tile = tileset.get(family, name);
                    tile.set({left: i * 32, top: j * 32}).setCoords();
                    canvas.add(tile);
                }
            }
        // });
    }

    function getTile(x, y) {
        var tx = x/16;
        var ty = y/16;
        var tile;

        jquery.each(screen.def, function() {
            // if(tx >= )
        });
    }

    function setHero(image, l, t) {
        canvas.remove(hero);
        hero = image;
        hero.set({
            left: l,
            top: t,
            originX: "center",
            originY: "bottom"
        });
        canvas.add(hero);
    }

    tileset.ready.then(
        function(){
            var hero_down = tileset.get("hero", "down");
            var hero_up = tileset.get("hero", "up");
            var hero_left = tileset.get("hero", "left");
            var hero_right = tileset.get("hero", "right");

            jquery.ajax("/screen").then(
                function(screen) {
                    currentScreen = uiScreen.wrap(screen);
                    // currentScreen = screen;
                    drawScreen(currentScreen);
                    setHero(hero_down, left, top);
                }
            );


            document.onkeydown = checkKey;

            function checkKey(e) {

                e = e || window.event;

                function changePosition(l, t) {
                    if (currentScreen.isWalkable(l / 32, (t - 8) / 32)) {
                        left = l;
                        top = t;
                    }
                }

                if (e.keyCode == '38') {
                    changePosition(left, top - 16);
                    setHero(hero_up, left, top);
                    e.preventDefault();
                }
                else if (e.keyCode == '40') {
                    changePosition(left, top + 16);
                    setHero(hero_down, left, top);
                    e.preventDefault();
                }
                else if (e.keyCode == '37') {
                    changePosition(left - 16, top);
                    setHero(hero_left, left, top);
                    e.preventDefault();
                }
                else if (e.keyCode == '39') {
                    changePosition(left + 16, top);
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