import { execa } from "execa";

/**
 * watch the status of the checks on a pull request
 *
 * @param prURL - The URL or number of the pull request
 */
export async function getCheckStatus(
	prURL: string,
): Promise<"success" | undefined> {
	const started = await getCheckStarted(prURL);
	if (started !== "started") {
		return;
	}

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

/**
 * wait until the checks are started
 * @param prURL
 * @returns
 */
async function getCheckStarted(prURL: string) {
	const interval = 3_000; // 3 seconds
	const timeout = 180_000; // 180 seconds
	const startTime = Date.now();

	return new Promise((resolve, reject) => {
		const checkStarted = async () => {
			try {
				const checkResult = await execa("gh", [
					"pr",
					"checks",
					prURL,
					"--required",
					"--json",
					"state",
				]);
				if (checkResult) {
					resolve("started");
				} else if (Date.now() - startTime >= timeout) {
					console.log("Timeout: Checks did not complete within 180 seconds");
					clearInterval(intervalId);
					resolve("timeout");
				}
			} catch (e) {
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				if ((e as any).stderr.includes("no checks reported")) {
					return;
				}

				clearInterval(intervalId);
				reject(e);
			}
		};

		const intervalId = setInterval(checkStarted, interval);
		checkStarted();
	});
}
