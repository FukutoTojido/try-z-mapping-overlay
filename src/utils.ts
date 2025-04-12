export const encodeURL = (s: string) =>
	s
		.replace(/%/g, "%25")
		.replace(/#/g, "%23")
		.replace(/\\/g, "/")
		.replace(/'/g, "%27");
