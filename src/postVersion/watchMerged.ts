import { execa } from "execa";

/**
 *
 * @param prURL - The URL of the pull request
 */
export async function watchMerged(defaultBranch: string, prURL: string) {
	const prNumber = prURL.split("/").pop();
	const prBranch = `pr/${prNumber}`;

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
