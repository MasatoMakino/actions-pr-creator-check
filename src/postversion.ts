import type { CommonCommandOptions } from "CommandOptions.js";
import { watchMerged } from "postVersion/watchMerged.js";
import {
	addPackageFiles,
	checkout,
	pullRequest,
	push,
} from "./postVersion/index.js";

interface PostversionOptions extends CommonCommandOptions {
	useAutoMerge: boolean;
}

export async function postversion(options: PostversionOptions): Promise<void> {
	if (options.dryRun) {
		console.log("Dry run enabled");
		return;
	}
	await addPackageFiles();
	await checkout();
	await push();
	const prURL = await pullRequest(options.defaultBranch, options.useAutoMerge);
	console.log(prURL);
	if (prURL) {
		watchMerged(options.defaultBranch, prURL);
	}
}
