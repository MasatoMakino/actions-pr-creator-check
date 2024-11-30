import type { CommonCommandOptions } from "CommandOptions.js";
import {
	addPackageFiles,
	checkout,
	pullRequest,
	push,
	watchMerged,
} from "./postVersion/index.js";
import { release } from "./release.js";

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
	if (!options.useAutoMerge || !prURL) {
		return;
	}

	const marged = await watchMerged(prURL);
	if (marged) {
		await release(options);
	}
}
