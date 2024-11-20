import { execa } from "execa";
import { getTagBranchName } from "../getTagVersion.mjs";

/**
 * Push the branch to origin
 */
export async function push() {
  const resultBranchName = await getTagBranchName();
  await execa("git", ["push", "--set-upstream", "origin", resultBranchName]);
}

