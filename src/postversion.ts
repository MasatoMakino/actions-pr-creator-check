import type { CommonCommandOptions } from "CommandOptions.js";
import {
	addPackageFiles,
	checkout,
	pullRequest,
	push,
} from "./postVersion/index.js";

export async function postversion(
	options: CommonCommandOptions,
): Promise<void> {
	if (options.dryRun) {
		console.log("Dry run enabled");
		return;
	}
	await addPackageFiles();
	await checkout();
	await push();
	await pullRequest(options.defaultBranch);
}
