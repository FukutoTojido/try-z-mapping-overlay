import type ZEngine from "@fukutotojido/z-engine";
import { encodeURL } from "./utils";

export default class NowPlayingHandler {
	elementIds = [
		["artist","artist"],
		["title","title"],
		["mapper","mapper"],
		["version","version"],
		["stats.ar.original","ar"],
		["stats.cs.original","cs"],
		["stats.od.original","od"],
		["stats.hp.original","hp"],
		["stats.stars.total","stars"],
	];

	constructor(engine: ZEngine) {
        for (const [key, id] of this.elementIds) {
            engine.register(`beatmap.${key}`, (_, newValue) => {
                const ele = document.querySelector(`#${id}`);
                if (!ele) return;

                switch (id) {
                    default: {
                        ele.textContent = newValue;
                    }
                }
            })
        }

        engine.register("directPath.beatmapBackground", (_, newValue) => {
            const ele: HTMLDivElement | null = document.querySelector("#nowPlaying");
            if (!ele) return;

            ele.style.backgroundImage = `url("${import.meta.env.VITE_BASE_URL}/Songs/${encodeURL(newValue.replaceAll("\\", "/"))}")`;
        })
	}
}
