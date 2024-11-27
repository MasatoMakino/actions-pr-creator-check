import { execa } from "execa";
import * as semver from "semver";
import { getTagVersion } from "./getTagVersion.js";

/**
 * Create a release draft on GitHub.
 * The created draft will be deleted when the command finishes.
 */
export async function previewRelease(): Promise<void> {
	const tag = await getTagVersion();
	const nextTag = semver.inc(tag, "prerelease", "preview");

	if (typeof nextTag !== "string") {
		throw new Error("Could not create a preview release");
	}

	await execa("gh", [
		"release",
		"create",
		nextTag,
		"--notes-start-tag",
		tag,
		"--generate-notes",
		"--draft",
	]);

	const viewResult = await execa("gh", ["release", "view", nextTag]);
	console.log(viewResult.stdout);

	await execa("gh", ["release", "delete", nextTag]);
}
