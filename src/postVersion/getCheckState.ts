import { execa } from "execa";

/**
 * watch the status of the checks on a pull request
 *
 * @param prURL - The URL or number of the pull request
 */
export async function getCheckStatus(
	prURL: string,
): Promise<string | undefined> {
	try {
		const checkResult = await execa("gh", [
			"pr",
			"checks",
			prURL,
			"--required",
			"--watch",
			"--json",
			"state",
		]);
		// console.log(checkResult);
		const result = JSON.parse(checkResult.stdout);
		// console.log(result);
	} catch (e) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		if ((e as any).stderr.includes("no required checks reported")) {
			console.log("No required checks reported");
			return;
		}
		throw e;
	}
}

getCheckStatus("70");
