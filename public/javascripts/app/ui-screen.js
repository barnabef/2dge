/**
 * Created by barnabef on 3/5/17.
 */
define (function(require){
    var jquery = require('jquery');
    var api = {
        wrap : function (screen) {
            var wrapper = {
                data: [],
                getTileAt: function (x, y) {
                    var result = null;
                    jquery.each(this.data, function (index, tile) {
                        if(tile.isInside(x, y)) {
                            result = tile;
                        }
                    });
                    return result;
                },
                isWalkable: function (x, y) {
                    var tile = this.getTileAt(x, y);
                    return tile && tile.data.walkable;
                }
            };
            jquery.each(screen.def, function (index, tile) {
               wrapper.data.push(wrapTile(tile));
            });
            return wrapper;
        }
    };

    function wrapTile(tile) {
        var tileWrapper = {
            data: tile,
            isInside: function(x,y) {
                var data = this.data;
                return (x >= data.x && x < data.x + data.width && y >= data.y && y < data.y + data.height);
            }
        }
        return tileWrapper;
    }

    return api;
});

