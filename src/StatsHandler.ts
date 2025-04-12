import type ZEngine from "@fukutotojido/z-engine";
import type { Beatmap, DifficultyPoint } from "osu-classes";
import { BeatmapDecoder } from "osu-parsers";

export default class StatsHandler {
	elementIds = [
		["beatmap.stats.bpm.realtime", "bpm"],
		["beatmap.stats.objects.circles", "circles"],
		["beatmap.stats.objects.sliders", "sliders"],
		["beatmap.stats.maxCombo", "maxCombo"],
		["performance.accuracy.100", "ss"],
	];

	beatmapFile: string | null = null;
	decoder: BeatmapDecoder;

	raw = "";
	beatmap: Beatmap | null = null;

	static POOL_TIME = 500;

	constructor(engine: ZEngine) {
		this.decoder = new BeatmapDecoder();

		for (const [key, id] of this.elementIds) {
			engine.register(`${key}`, (_, newValue) => {
				const ele = document.querySelector(`#${id}`);
				if (!ele) return;

				switch (id) {
					default: {
						ele.textContent = newValue;
					}
				}
			});
		}

		engine.register("directPath.beatmapFile", async (_, newValue) => {
			this.beatmapFile = newValue as string;
		});

		engine.register("beatmap.time.live", (_, newValue: number) => {
			const time = newValue;	
			if (!this.beatmap) return;

			const currentPoint = [
				...this.beatmap.controlPoints.difficultyPoints,
				...this.beatmap.controlPoints.timingPoints,
			]
				.sort((a, b) => a.startTime - b.startTime)
				.findLast((point) => point.startTime <= time);
			const baseSV = this.beatmap.difficulty.sliderMultiplier;
			this.setSV((currentPoint as DifficultyPoint).sliderVelocity ?? 1, baseSV);
		});

		setInterval(() => this.beatmapPooling(), StatsHandler.POOL_TIME);
	}

	async beatmapPooling() {
		if (!this.beatmapFile) return;
		try {
			const res = await fetch(
				`${import.meta.env.VITE_BASE_URL}/Songs/${this.beatmapFile.replaceAll("\\", "/")}`,
			);
			if (!res.ok) {
				throw new Error(await res.text());
			}

			const raw = await res.text();
			if (this.raw === raw) return;

			this.raw = raw;
			this.beatmap = this.decoder.decodeFromString(this.raw);
		} catch (e) {
			console.error(e);
		}
	}

	setSV(current: number, base: number) {
		const multiplierEle = document.querySelector("#multiplier");
		const baseSVEle = document.querySelector("#baseSV");

		if (multiplierEle) {
			multiplierEle.textContent = current.toFixed(2);
		}

		if (baseSVEle) {
			baseSVEle.textContent = base.toFixed(2);
		}
	}
}
