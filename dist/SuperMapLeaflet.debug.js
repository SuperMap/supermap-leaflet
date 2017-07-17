/*!
 * 
 *     SuperMap Leaflet.(https://github.com/SuperMap/supermap-leaflet#readme)
 *     Copyright© 2000-2017 SuperMap Software Co. Ltd
 *     license: Apache-2.0
 *     version: v0.0.1
 * 
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolutionToScale = resolutionToScale;
exports.scaleToResolution = scaleToResolution;
exports.getMeterPerMapUnit = getMeterPerMapUnit;
//transform resolution to  scale.
function resolutionToScale(resolution, dpi, mapUnit) {
    var inchPerMeter = 1 / 0.0254;
    // radius of earth
    var meterPerMapUnit = getMeterPerMapUnit(mapUnit);
    var scale = resolution * dpi * inchPerMeter * meterPerMapUnit;
    scale = 1 / scale;
    return scale;
}

//transform scale to resolution.
function scaleToResolution(scale, dpi, mapUnit) {
    var inchPerMeter = 1 / 0.0254;
    var meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
    var resolution = scale * dpi * inchPerMeter * meterPerMapUnitValue;
    resolution = 1 / resolution;
    return resolution;
}

//mapUnit options <"METER", "DEGREE","KILOMETER","INCH","FOOT">
function getMeterPerMapUnit(mapUnit) {
    var earthRadiusInMeters = 6378137;
    var meterPerMapUnit;
    if (mapUnit === "METER") {
        meterPerMapUnit = 1;
    } else if (mapUnit === "DEGREE") {
        meterPerMapUnit = Math.PI * 2 * earthRadiusInMeters / 360;
    } else if (mapUnit === "KILOMETER") {
        meterPerMapUnit = 1.0E-3;
    } else if (mapUnit === "INCH") {
        meterPerMapUnit = 1 / 2.5399999918E-2;
    } else if (mapUnit === "FOOT") {
        meterPerMapUnit = 0.3048;
    }
    return meterPerMapUnit;
}

var SuperMapUtil = exports.SuperMapUtil = {
    resolutionToScale: resolutionToScale,
    scaleToResolution: scaleToResolution,
    getMeterPerMapUnit: getMeterPerMapUnit
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tiledMapLayer = exports.TiledMapLayer = undefined;

var _leaflet = __webpack_require__(4);

var _Util = __webpack_require__(0);

/**
 * Class: TiledMapLayer
 * For SuperMap iServer REST map service (since SuperMap iServer Java 6R).Get tiles from tileImage resource
 * UseAge:
 *    L.supermap.tiledMapLayer("http://<server>:<port>/iserver/services/<serviceName>/rest/maps/<mapName>").addTo(map);
 */
var TiledMapLayer = exports.TiledMapLayer = _leaflet.TileLayer.extend({

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

    initialize: function initialize(url, options) {
        this.url = this._url = url;
        _leaflet.TileLayer.prototype.initialize.apply(this, arguments);
        _leaflet.Util.setOptions(this, options);
        _leaflet.Util.stamp(this);
    },

    onAdd: function onAdd(map) {
        this._initLayerUrl();
        _leaflet.TileLayer.prototype.onAdd.call(this, map);
    },

    //Override TileLayer methods
    getTileUrl: function getTileUrl(coords) {
        var scale = this._getScaleFromCoords(coords);
        var tileUrl = this._layerUrl + "&scale=" + scale + "&x=" + coords.x + "&y=" + coords.y;
        return tileUrl;
    },

    //Set fixed scale before add to map
    setScales: function setScales(scales) {
        this.scales = scales || this.scales;
    },

    //Get scale by zoom
    getScale: function getScale(zoom) {
        var me = this;
        var z = zoom || me._map.getZoom();
        return me.scales[z];
    },

    _getScaleFromCoords: function _getScaleFromCoords(coords) {
        var me = this,
            scale = void 0;
        if (me.scales && me.scales[coords.z]) {
            return me.scales[coords.z];
        }
        me.scales = me.scales || {};
        scale = me._getDefaultScale(coords);
        me.scales[coords.z] = scale;
        return scale;
    },

    _getDefaultScale: function _getDefaultScale(coords) {
        var me = this,
            crs = me._map.options.crs;
        var resolution = void 0;
        if (crs.options && crs.options.resolutions) {
            resolution = crs.options.resolutions[coords.z];
        } else {
            var tileBounds = me._tileCoordsToBounds(coords);
            var ne = crs.project(tileBounds.getNorthEast());
            var sw = crs.project(tileBounds.getSouthWest());
            var tileSize = me.options.tileSize;
            resolution = Math.max(Math.abs(ne.x - sw.x) / tileSize, Math.abs(ne.y - sw.y) / tileSize);
        }

        var mapUnit = "METER";
        if (crs.code) {
            var array = crs.code.split(':');
            if (array && array.length > 1) {
                var code = parseInt(array[1]);
                mapUnit = code && code >= 4000 && code <= 5000 ? "DEGREE" : "METER";
            }
        }
        return _Util.SuperMapUtil.resolutionToScale(resolution, 96, mapUnit);
    },

    _initLayerUrl: function _initLayerUrl() {
        var me = this;
        var layerUrl = me.url + "/tileImage.png?";
        layerUrl += me._initAllRequestParams().join('&');
        this._layerUrl = layerUrl;
    },

    _initAllRequestParams: function _initAllRequestParams() {
        var me = this,
            options = me.options || {},
            params = [];

        var tileSize = this.options.tileSize;
        params.push("width=" + tileSize);
        params.push("height=" + tileSize);

        var redirect = options.redirect === true ? options.redirect : false;
        params.push("redirect=" + redirect);

        var transparent = options.transparent === true ? options.transparent : false;
        params.push("transparent=" + transparent);

        var cacheEnabled = options.cacheEnabled === false ? options.cacheEnabled : true;
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
        var crs = me._map.options.crs;
        if (crs.projection && crs.projection.bounds) {
            var bounds = crs.projection.bounds;
            var tileOrigin = L.point(bounds.min.x, bounds.max.y);
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
            params.push("tileversion=" + options.tileversion);
        }

        return params;
    }
});

var tiledMapLayer = exports.tiledMapLayer = function tiledMapLayer(url, options) {
    return new TiledMapLayer(url, options);
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
	"name": "supermap-leaflet",
	"version": "0.0.1",
	"description": "A Leafle plugins for working with  SuperMap service types. Requires Leaflet v1.0.0 or later.",
	"main": "/dist/SuperMapLeaflet.js",
	"scripts": {
		"release": "webpack && npm run compress",
		"compress": "uglifyjs --comments /Copyright©/i  ./dist/SuperMapLeaflet.debug.js  -c -m -o ./dist/SuperMapLeaflet.js",
		"build": "webpack",
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"repository": {
		"type": "git",
		"url": "https://github.com/SuperMap/supermap-leaflet.git"
	},
	"homepage": "https://github.com/SuperMap/supermap-leaflet#readme",
	"keywords": [
		"SuperMap",
		"Leaflet",
		"SuperMap-Leaflet",
		"leaflet plugin"
	],
	"author": "SuperMap",
	"license": "Apache-2.0",
	"dependencies": {
		"leaflet": "1.1.0"
	},
	"devDependencies": {
		"babel-core": "^6.24.1",
		"babel-loader": "^7.0.0",
		"babel-preset-es2015": "^6.24.1",
		"webpack": "^2.4.1",
		"json-loader": "^0.5.4",
		"uglify-js": "^3.0.15"
	}
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tiledMapLayer = exports.TiledMapLayer = exports.Util = exports.version = undefined;

var _Util = __webpack_require__(0);

Object.defineProperty(exports, 'Util', {
  enumerable: true,
  get: function get() {
    return _Util.Util;
  }
});

var _TiledMapLayer = __webpack_require__(1);

Object.defineProperty(exports, 'TiledMapLayer', {
  enumerable: true,
  get: function get() {
    return _TiledMapLayer.TiledMapLayer;
  }
});
Object.defineProperty(exports, 'tiledMapLayer', {
  enumerable: true,
  get: function get() {
    return _TiledMapLayer.tiledMapLayer;
  }
});

var _package = __webpack_require__(2);

exports.version = _package.version;

//export core
//export version

window.L.supermap = exports;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = L;

/***/ })
/******/ ]);
//# sourceMappingURL=SuperMapLeaflet.debug.js.map