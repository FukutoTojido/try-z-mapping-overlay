import NowPlayingHandler from './NowPlayingHandler';
import StatsHandler from './StatsHandler';
import './style.css'
import ZEngine from '@fukutotojido/z-engine';

const engine = new ZEngine("ws://127.0.0.1:24050/websocket/v2");
new NowPlayingHandler(engine);
new StatsHandler(engine);