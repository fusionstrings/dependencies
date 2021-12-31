import { Generator } from "./dist/deno/jspm.js";

async function main(subpath = "./js/main.js") {
    const generator = new Generator();

    await generator.install([
        {
            alias: "@fusionstrings/river",
            target: "./",
            subpath,
        },
    ]);
    const importMap = JSON.stringify(generator.getMap(), null, 2);
    return importMap;
}

if (import.meta.main) {
    const importmap = await main();
    console.log('importmap: ', importmap);
}

export { main }