import { execa } from "execa";
import { getPreviousTagVersion, getTagVersion } from "../getTagVersion.js";

/**
 * Create a draft release
 */
export async function createDraft(): Promise<void> {
	const tag = await getTagVersion();
	const prevTag = await getPreviousTagVersion();
	const optionNoteStartTag = prevTag ? ["--notes-start-tag", prevTag] : [];

	await execa("gh", [
		"release",
		"create",
		tag,
		...optionNoteStartTag,
		"--generate-notes",
		"--verify-tag",
		"--draft",
	]);

	const viewResult = await execa("gh", [
		"release",
		"view",
		tag,
		"--json",
		"body",
	]);
	const body = JSON.parse(viewResult.stdout).body;
	console.log(body);

	const dependenciesSectionRegex =
		/(### 🔧 Dependencies[\s\S]*?)(?=\n### |\n\n)/;
	const match = body.match(dependenciesSectionRegex);

	if (match) {
		const dependenciesContent = match[1].trim();
		const wrappedDependencies = `<details>
<summary>### 🔧 Dependencies</summary>
${dependenciesContent}
</details>
`;

		const replacedBody = body.replace(
			dependenciesSectionRegex,
			wrappedDependencies,
		);

		console.log("replaced body:");
		console.log(replacedBody);
		await execa("gh", ["release", "edit", tag, "--body", body]);
	}
}
