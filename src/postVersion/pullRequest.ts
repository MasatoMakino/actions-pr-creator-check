import { execa, ExecaError } from "execa";
import { getTagBranchName } from "../getTagVersion.js";

/**
 * create pull request and merge it
 * @param defaultBranch - The default branch of the repository
 */
export async function pullRequest(defaultBranch: string): Promise<void> {
  const branchName = await getTagBranchName();
  const prResult = await execa("gh", [
    "pr",
    "create",
    "--fill",
    "--base",
    defaultBranch,
    "--head",
    branchName,
  ]);

  try {
    const result = await execa("gh", [
      "pr",
      "merge",
      branchName,
      "--merge",
      "--auto",
    ]);
  } catch (e: unknown) {
    if (isExecaError(e) && e.stderr.includes("(enablePullRequestAutoMerge)")) {
      const match = prResult.stdout.match(/\/pull\/(\d+)$/);
      if (match) {
        const prNumber = match[1];
        await execa("gh", ["browse", prNumber]);
      } else {
        throw e;
      }
    } else {
      throw e;
    }
  }
}

function isExecaError(e: unknown): e is ExecaError {
  return (e as ExecaError).name === "ExecaError";
}
