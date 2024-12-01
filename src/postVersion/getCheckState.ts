import { execa } from "execa";

/**
 * watch the status of the checks on a pull request
 *
 * @param prURL - The URL or number of the pull request
 */
export async function getCheckStatus(
	prURL: string,
): Promise<"success" | undefined> {
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
		const result: [{ state: string }] = JSON.parse(checkResult.stdout);

		if (result.every((check) => check.state === "SUCCESS")) {
			// all checks are successful
			console.log("All required checks are successful");
			return "success";
		}

		console.log("Some checks are failed");
		return;
	} catch (e) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		if ((e as any).stderr.includes("no required checks reported")) {
			console.log("No required checks reported");
			return;
		}
		throw e;
	}
}
