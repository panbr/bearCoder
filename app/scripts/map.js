/**
 * map
 */
class Map {
    constructor() {
        this._init();
    }

    _init() {
        // 百度地图API功能
        var map = new BMap.Map("l-map");
        map.centerAndZoom(new BMap.Point(113.30764967515182,23.12004910207623), 13);
        map.enableScrollWheelZoom(true);
        var index = 0;
        var myGeo = new BMap.Geocoder();

        $.get("/api/schoolList?pageIndex=0&pageNum=10", function(res){
            console.log('res: ', res)
            let adds = [];
            if (res && res.data.length) {
                for(let i=0; i < res.data.length; i++) {
                    adds.push(new BMap.Point(res.data[i].position.split(',')[0],res.data[i].position.split(',')[1]))
                }
            }

            for(var i = 0; i<adds.length; i++){
                let marker = new BMap.Marker(adds[i]);
                map.addOverlay(marker);
                marker.setLabel(new BMap.Label(res.data[i].name, {offset:new BMap.Size(20,-10)}));
            }
        })
    }
}


$(function() {
    let map = new Map();
})