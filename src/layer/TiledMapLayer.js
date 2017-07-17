/**
 * Class: TiledMapLayer
 * For SuperMap iServer REST map service (since SuperMap iServer Java 6R).Get tiles from tileImage resource
 * UseAge:
 *    L.supermap.tiledMapLayer("http://<server>:<port>/iserver/services/<serviceName>/rest/maps/<mapName>").addTo(map);
 */
import {TileLayer, Util} from "leaflet";
import {SuperMapUtil} from "../Util";
export var TiledMapLayer = TileLayer.extend({

    options: {
        //@option token
        //token of the map service
        token: null,
        //@option layersID
        //If not empty, mean use thematic map
        layersID: null,
        //@option redirect
        //If true , it will direct to the image's real url address;
        //If false，it will be byte stream in response
        redirect: false,
        //@option transparent
        //If true ,response image will be transparent
        transparent: null,
        //@option cacheEnabled
        //Whether to use the server cache
        cacheEnabled: null,
        //@option prjCoordSys
        //Map's projection coordinate system. e.g.: {"epsgCode":3857}
        prjCoordSys: null,
        //@option overlapDisplayed
        //Whether the map objects are overlap display in the same range
        overlapDisplayed: true,
        //@option overlapDisplayedOptions
        //Overlap display filter options,valid only if 'overlapDisplayed' is false.
        overlapDisplayedOptions: null,
        //tile set version,valid only if 'cacheEnabled' is true.
        tileversion: null,

        attribution: 'Powered by <a href="http://www.supermap.com">SuperMap</a> | Map Data <a href="http://support.supermap.com.cn/product/iServer.aspx">SuperMap iServer</a>'
    },

    initialize: function (url, options) {
        this.url = this._url = url;
        TileLayer.prototype.initialize.apply(this, arguments);
        Util.setOptions(this, options);
        Util.stamp(this);
    },

    onAdd: function (map) {
        this._initLayerUrl();
        TileLayer.prototype.onAdd.call(this, map);
    },

    //Override TileLayer methods
    getTileUrl: function (coords) {
        let scale = this._getScaleFromCoords(coords);
        let tileUrl = this._layerUrl + "&scale=" + scale + "&x=" + coords.x + "&y=" + coords.y;
        return tileUrl;
    },

    //Set fixed scale before add to map
    setScales: function (scales) {
        this.scales = scales || this.scales;
    },

    //Get scale by zoom
    getScale: function (zoom) {
        let me = this;
        let z = zoom || me._map.getZoom();
        return me.scales[z];
    },

    _getScaleFromCoords: function (coords) {
        let me = this, scale;
        if (me.scales && me.scales[coords.z]) {
            return me.scales[coords.z];
        }
        me.scales = me.scales || {};
        scale = me._getDefaultScale(coords);
        me.scales[coords.z] = scale;
        return scale;
    },

    _getDefaultScale: function (coords) {
        let me = this, crs = me._map.options.crs;
        let resolution;
        if (crs.options && crs.options.resolutions) {
            resolution = crs.options.resolutions[coords.z];
        } else {
            let tileBounds = me._tileCoordsToBounds(coords);
            let ne = crs.project(tileBounds.getNorthEast());
            let sw = crs.project(tileBounds.getSouthWest());
            let tileSize = me.options.tileSize;
            resolution = Math.max(
                Math.abs(ne.x - sw.x) / tileSize,
                Math.abs(ne.y - sw.y) / tileSize
            );
        }

        let mapUnit = "METER";
        if (crs.code) {
            let array = crs.code.split(':');
            if (array && array.length > 1) {
                let code = parseInt(array[1]);
                mapUnit = code && code >= 4000 && code <= 5000 ? "DEGREE" : "METER";
            }
        }
        return SuperMapUtil.resolutionToScale(resolution, 96, mapUnit);
    },

    _initLayerUrl: function () {
        let me = this;
        let layerUrl = me.url + "/tileImage.png?";
        layerUrl += me._initAllRequestParams().join('&');
        this._layerUrl = layerUrl;
    },

    _initAllRequestParams: function () {
        let me = this, options = me.options || {}, params = [];

        let tileSize = this.options.tileSize;
        params.push("width=" + tileSize);
        params.push("height=" + tileSize);

        let redirect = (options.redirect === true) ? options.redirect : false;
        params.push("redirect=" + redirect);

        let transparent = (options.transparent === true) ? options.transparent : false;
        params.push("transparent=" + transparent);

        let cacheEnabled = (options.cacheEnabled === false) ? options.cacheEnabled : true;
        params.push("cacheEnabled=" + cacheEnabled);

        if (options.prjCoordSys) {
            params.push("prjCoordSys=" + JSON.stringify(options.prjCoordSys));
        }

        if (options.token) {
            params.push("token=" + options.token);
        }

        if (options.layersID) {
            params.push("layersID=" + options.layersID);
        }

        //The starting reference point of the tile, which defaults to the top left corner of the map range.
        let crs = me._map.options.crs;
        if (crs.projection && crs.projection.bounds) {
            let bounds = crs.projection.bounds;
            let tileOrigin = L.point(bounds.min.x, bounds.max.y);
            params.push("origin={\"x\":" + tileOrigin.x + "," + "\"y\":" + tileOrigin.y + "}");
        }

        if (options.overlapDisplayed === false) {
            params.push("overlapDisplayed=false");
            if (options.overlapDisplayedOptions) {
                params.push("overlapDisplayedOptions=" + me.overlapDisplayedOptions.toString());
            }
        } else {
            params.push("overlapDisplayed=true");
        }

        if (options.cacheEnabled === true && options.tileversion) {
            params.push("tileversion=" + options.tileversion)
        }

        return params;
    },
});

export var tiledMapLayer = function (url, options) {
    return new TiledMapLayer(url, options);
};