import { execa } from "execa";

/**
 *
 * @param prURL - The URL of the pull request
 */
export async function watchMerged(prURL: string) {
	const result = await execa("gh", [
		"pr",
		"view",
		prURL,
		"--json",
		"state",
		"-q",
		".state",
	]);
	console.log(result);
}
