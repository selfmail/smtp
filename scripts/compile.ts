/* 
This is a script for compiling the plugins.
We need to remove the first line (the haraka import)
because otherwise, it would trigger an error during
production.
*/
import { writeFile, readdir, readFile } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

type Plugin = {
	name: string,
}

function compileTypeScript(code: string): string {
	const result = ts.transpileModule(code, {
		compilerOptions: { module: ts.ModuleKind.CommonJS },
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
				const files = await readFile(subfolderFile)
				// modify this file
			}
		} else {
		}
	}
	return pluginArray;
}

async function writePlugins() {
	const files = await readdir("../src");
}
