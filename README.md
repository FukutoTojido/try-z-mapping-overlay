# Try-Z Mapping Overlay
Yet another tosu overlay from me, this time is for mapping. Using [Z-Engine](https://www.npmjs.com/package/@fukutotojido/z-engine) and [osu-parsers](https://www.npmjs.com/package/osu-parsers)

![](https://fukutotojido.s-ul.eu/Y3YIg0Lj)

## Installing
- Make sure you have [tosu](https://github.com/tosuapp/tosu) installed. (duh!)
- Download the latest file from the Release tab of GitHub (`try-z-mapping-overlay.zip`)
- Extract everything in the zip and put them in tosu's `/static` folder
  - Your file structure should be like this
```
static/
└── try-z-mapping-overlay/
    ├── assets/
    ├── icons/
    ├── Background.png
    └── index.html
```
- Now the overlay is ready to be used at `http://127.0.0.1:24050/try-z-mapping-overlay`

## Development
- Install [Bun](https://bun.sh/docs/installation)
- Install all dependencies and start development server
```
git clone https://github.com/FukutoTojido/try-z-mapping-overlay
cd try-z-mapping-overlay
bun install
bun dev
```
- The overlay will now be hosted at `http://localhost:5173`
- If you need to use any URLs that is relative to tosu's base URL, please use the environment variable `VITE_BASE_URL` instead of `./`

## Build
```
bun run build
```
- The overlay will be built to `/dist`

## FAQs
- Just make an issue on this repo if you have any question or contact me by [**ANON TOKYO**](https://osu.ppy.sh/users/8266808) on osu or [**@FukutoTojido**](https://twitter.com/FukutoTojido) or **@fukutotojido** on Discord.