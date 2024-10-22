/* 
	This is a script for compiling the plugins.
	We need to remove the first line (the haraka import)
	because otherwise, it would trigger an error during
	production. We are searching for directorys within
	the /src/ folder. Every plugin.ts file in such a directory
	has to have an special export, where the name and the
	hook is exported. In this file, we are compiling this special
	plugin.ts file into an .js file in the `./plugin`-directory for 
	haraka. Every normal file will be exported in a `./helper` directory,
	also as an .js file. We are also editing the imports, to match the 
	new folder structure, and we are removing every haraka import,
	if not an error will be triggered from haraka.
*/

import { ConsolaInstance } from "consola";
import { transform } from "esbuild";
import { statSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

type hook = "rcpt"
	| "rcpt_to"
	| "data"
	| "data_post"


// object of the default export from a plugin.ts file
type Plugin = {
	// name of this plugin
	name: string;
	// code which is inside of this plugin
	code: string;
	// hook
	hook: hook,
};

// compile ts to js, used for compiling the plugins from the /src/ folder to js into the plugins folder
async function compileTypeScript(code: string) {
	let resultCode: string;
	const result = await transform(code, {
		loader: "ts",
		format: "cjs",
	})
	return result.code;
}

// compile a plugin.ts file into a js file, for the haraka plugin system
async function compilePlugin(code: string) {

}

// get the content of every plugin.ts file inside the /src/ folder
async function getAllPluginFiles({
	dirPath = "./src",
	pluginArray = [],
	consola
}: {
	dirPath?: string,
	pluginArray?: string[],
	consola: ConsolaInstance
}) {
	const files = await readdir(dirPath);
	for (const file of files) {
		const filePath = path.join(dirPath, file);

		if (statSync(filePath).isDirectory()) {
			// every plugin.ts file is a plugin
			const subfolder = await readdir(filePath);
			for await (const subfolderFile of subfolder) {
				// check if the file is an plugin, if not, go to the next file
				if (subfolderFile === "plugin.ts") {
					const pluginFile = (await readFile(`./${filePath}/plugin.ts`)).toString()
					consola.log(`Read file plugin.ts in ${filePath}`)
					// modify this plugin file
					const plugin = await compilePlugin(pluginFile)
					consola.success("Successfully modified the plugin: ", subfolderFile);
					pluginArray.push(plugin)
				}
			}
		} else {
		}
	}
	return pluginArray;
}

// save the plugin into the /plugins/ folder
async function savePlugins() {

}

// function to use consola and the other async functions
(async () => {
	const consola = (await import("consola")).default;
	consola.info("Starting the compiling process.")
	const plugins = await getAllPluginFiles({
		consola
	})

})();
