/**
 * Created by barnabef on 3/5/17.
 */
define (function(require){
    var engine = {};

    var tileset = require("tileset");
    var fabric = require("fabric");
    var canvas = new fabric.Canvas('canvas', {
        hoverCursor: 'pointer',
        selection: false,
        perPixelTargetFind: true,
        targetFindTolerance: 5
    });
    engine.start = function() {

    };

    return engine;
});