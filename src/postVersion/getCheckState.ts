import { execa } from "execa";

/**
 * watch the status of the checks on a pull request
 *
 * @param prURL - The URL or number of the pull request
 */
export async function getCheckStatus(prURL: string) {
	const interval = 10_000; // 10 seconds
	const timeout = 180_000; // 180 seconds
	const startTime = Date.now();

	return new Promise((resolve, reject) => {
		const checkStatus = async () => {
			try {
				const checkResult = await execa("gh", [
					"pr",
					"checks",
					prURL,
					"--required",
					"--json",
					"state",
				]);
				const result: [{ state: string }] = JSON.parse(checkResult.stdout);

				// if checks are failed, return
				if (result.some((check) => check.state === "FAILURE")) {
					console.log("Some checks are failed");
					clearInterval(intervalId);
					resolve("failed");
				}

				// all checks are successful
				if (result.every((check) => check.state === "SUCCESS")) {
					console.log("All required checks are successful");
					clearInterval(intervalId);
					resolve("success");
				}

				if (Date.now() - startTime >= timeout) {
					console.log(
						`Timeout: Checks did not complete within ${timeout / 1000} seconds`,
					);
					clearInterval(intervalId);
					resolve("timeout");
				}
			} catch (e) {
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				if ((e as any).stderr.includes("no required checks reported")) {
					console.log("No required checks reported");
					clearInterval(intervalId);
					resolve("failed");
				}
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				if ((e as any).stderr.includes("no checks reported")) {
					return;
				}

				if (Date.now() - startTime >= timeout) {
					console.log(
						`Timeout: Checks did not complete within ${timeout / 1000} seconds`,
					);
					clearInterval(intervalId);
					resolve("timeout");
				}

				clearInterval(intervalId);
				reject(e);
			}
		};

		const intervalId = setInterval(checkStatus, interval);
		checkStatus();
	});
}
