/* 
This is a script for compiling the plugins.
We need to remove the first line (the haraka import)
because otherwise, it would trigger an error during
production. We are searching for directorys within
the src folder. Every plugin.ts file in such a directory
has to have an special export, where the name and the
hook is exported. In this file, we are compiling this special
plugin.ts file into an .js file in the `./plugin`-directory for 
haraka. Every normal file will be exported in a `./helper` directory,
also as an .js file. We are also editing the imports, to match the 
new folder structure, and we are removing every haraka import,
if not an error will be triggered from haraka.
*/

import { writeFile, readdir, readFile } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";
import { transpileModule, ModuleKind } from "typescript";

type Plugin = {
	name: string,
}

function compileTypeScript(code: string): string {
	const result = transpileModule(code, {
		compilerOptions: { module: ModuleKind.CommonJS },
	});
	return result.outputText;
}

async function getAllPluginFiles(dirPath = "../src", pluginArray: string[] = []) {
	const files = await readdir(dirPath);

	for await (const file of files) {
		const filePath = path.join(dirPath, file);

		if (statSync(filePath).isDirectory()) {
			// every plugin.ts file is a plugin
			const subfolder = await readdir(filePath)
			for (const subfolderFile in subfolder) {
				// check if the file is an plugin, if not, go to the next file
				if (subfolderFile === "plugin.ts") {
					const pluginFile = await readFile(subfolderFile)
					// modify this plugin file
				}
			}
		} else {
		}
	}
	return pluginArray;
}

async function writePlugins() {
	const files = await readdir("../src");
}
