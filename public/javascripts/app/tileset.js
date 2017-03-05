define (function(require){

    var fabric = require("fabric");
    var tileset = {
        loaded: false,
        tiles: {}
    };

    var promiseReady;
    tileset.ready =  new Promise(function (resolve, reject) {
        if(tileset.loaded) {
            resolve();
        } else {
            promiseReady = resolve;
        }
    });

    tileset.get = function(family, name){
        return fabric.util.object.clone(tileset.tiles.tile_families[family].sprites[name].image);
    };

    var request = new Request("tiles/zelda/tiles-def.json");
    fetch(request).then(function (response) {
        return response.json();
    }).then(function (response) {
        var tiles = response;
        tileset.tiles = tiles;
        for (var i in response.tile_families) {
            var family = response.tile_families[i];

            fabric.Image.fromURL('tiles/zelda/sprites/' + family.filename, function (caveImg) {

                // temp canvas to generate planet images
                var tempCanvas = new fabric.StaticCanvas();

                // only to fit one planet onto temp canvas
                tempCanvas.setDimensions({
                    width: family.tile_size.width,
                    height: family.tile_size.height
                });

                // make sure image is drawn from left/top corner
                caveImg.originX = 'left';
                caveImg.originY = 'top';

                // add it onto temp canvas
                tempCanvas.add(caveImg);


                for (var j in family.sprites) {
                    var sprite = family.sprites[j];
                    caveImg.left = -family.tile_size.width * sprite.position.x;
                    caveImg.top = -family.tile_size.height * sprite.position.y;
                    caveImg.setCoords();
                    tempCanvas.renderAll();
                    // get data url for that planet
                    var img = new Image;
                    img.src = tempCanvas.toDataURL();
                    sprite.image = new fabric.Image(img, {

                        width: 32,
                        height: 32,

                        name: sprite.name,
                        index: 0,
                        left: 0,
                        top: 0,
                        // remove borders and corners but leaving object available for events
                        hasBorders: false,
                        hasControls: false
                    });
                }
                tiles.loaded = true;
                console.info(tiles);
                if(promiseReady) {
                    promiseReady();
                }

            });
        }
    });
    return tileset;
});