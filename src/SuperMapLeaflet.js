//export version
import {version} from '../package.json';
export {version}

//export core
export {Util} from './Util';

//export mappings
export {TiledMapLayer, tiledMapLayer} from './layer/TiledMapLayer';


window.L.supermap = exports;