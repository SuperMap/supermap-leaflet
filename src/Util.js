/**
 *SuperMap Leaflet Util class
 */

//transform resolution to  scale.
export function resolutionToScale(resolution, dpi, mapUnit) {
    var inchPerMeter = 1 / 0.0254;
    // radius of earth
    var meterPerMapUnit = getMeterPerMapUnit(mapUnit);
    var scale = resolution * dpi * inchPerMeter * meterPerMapUnit;
    scale = 1 / scale;
    return scale;
}

//transform scale to resolution.
export function scaleToResolution(scale, dpi, mapUnit) {
    var inchPerMeter = 1 / 0.0254;
    var meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
    var resolution = scale * dpi * inchPerMeter * meterPerMapUnitValue;
    resolution = 1 / resolution;
    return resolution;
}

//mapUnit options <"METER", "DEGREE","KILOMETER","INCH","FOOT">
export function getMeterPerMapUnit(mapUnit) {
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

export var SuperMapUtil = {
    resolutionToScale: resolutionToScale,
    scaleToResolution: scaleToResolution,
    getMeterPerMapUnit: getMeterPerMapUnit
};