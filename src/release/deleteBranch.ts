import { execa } from "execa";
import { getTagBranchName } from "../getTagVersion.js";

/**
 * delete the version branch
 * @param defaultBranch - The default branch of the repository
 */
export async function deleteBranch(): Promise<void> {
	const branchName = await getTagBranchName();
	await execa("git", ["branch", "-d", branchName]);
}
