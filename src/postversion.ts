import type { CommonCommandOptions } from "CommandOptions.js";
import {
	addPackageFiles,
	checkout,
	pullRequest,
	push,
	watchMerged,
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
		watchMerged(prURL);
	}
}
