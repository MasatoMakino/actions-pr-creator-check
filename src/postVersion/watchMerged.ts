import { execa } from "execa";

/**
 * watch the pull request until it is merged.
 * Inerval is 3 seconds.
 * Wait for up to 180 seconds.
 *
 * @param prURL - The URL of the pull request
 */
export async function watchMerged(prURL: string) {
	const interval = 3000; // 3 seconds
	const timeout = 180000; // 180 seconds
	const startTime = Date.now();

	return new Promise((resolve, reject) => {
		console.log("Watching PR state...");

		const checkPRState = async () => {
			try {
				const result = await execa("gh", [
					"pr",
					"view",
					prURL,
					"--json",
					"state",
					"-q",
					".state",
				]);

				if (result.stdout === "MERGED") {
					clearInterval(intervalId);
					resolve("merged");
				} else if (result.stdout === "CLOSED") {
					clearInterval(intervalId);
					reject(new Error("PR was closed without merging"));
				} else if (Date.now() - startTime >= timeout) {
					clearInterval(intervalId);
					reject(new Error("Timeout: PR was not merged within 180 seconds"));
				}
			} catch (error) {
				clearInterval(intervalId);
				reject(error);
			}
		};

		const intervalId = setInterval(checkPRState, interval);
		checkPRState(); // Initial check
	});
}
