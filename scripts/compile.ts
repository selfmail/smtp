/* 
	This is a script to compile every typescript file into
	javascript files for haraka. Haraka has some special 
	things we have to handle. For example, inputs and
	status codes as well as typesafety.
*/

import { ConsolaInstance } from "consola";
import { transform } from "esbuild";
import { statSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

// every hook you can call
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
	const result = await transform(code, {
		loader: "ts",
		format: "cjs",
	})
	return result.code;
}

// compile a plugin.ts file into a js file, for the haraka plugin system
async function compilePlugin(code: string, consola: ConsolaInstance): Promise<Plugin> {
	const js = await compileTypeScript(code)
	consola.log(js)
	return {
		name: "hey",
		code: "hey",
		hook: "data"
	}
}

// get the content of every plugin.ts file inside the /src/ folder
async function getAllPluginFiles({
	dirPath = "./src",
	pluginArray = [],
	consola
}: {
	dirPath?: string,
	pluginArray?: { name: string }[],
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
					const plugin = await compilePlugin(pluginFile, consola)
					consola.info("Successfully modified the plugin: ", subfolderFile);
					const pluginImport = await import(`../src/${file}/plugin.ts`)
					const pluginInformation = pluginImport.default.plugin
					console.log(pluginInformation)

					pluginArray.push({
						name: pluginInformation.name as string
					})
				}
			}
		} else {
		}
	}
	console.log(pluginArray)
	return pluginArray;
}

// save the plugin into the /plugins/ folder
async function savePlugins(plugins: any) {

}

// function to use consola and the other async functions
(async () => {
	const consola = (await import("consola")).default;
	consola.start("Starting the compiling process.")
	const plugins = await getAllPluginFiles({
		consola
	})
	consola.info("Got every plugin.ts files. Starting saving them.")
	await savePlugins(plugins)
	consola.success("Everything is compiled an stored successfully!")
})();
