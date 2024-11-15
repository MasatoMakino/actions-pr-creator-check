import { execa } from "execa";

/**
 * get current version with git describe
 * @returns {ResultPromise} The tag version
 */
export async function getTagVersion() {
  return await execa("git", ["describe", "--tags", "--abbrev=0"]);
}

/**
 * create a branch name based on current tag
 * @returns {Promise<string>} The branch name to be created
 */
export async function getTagBranchName() {
  const result = await getTagVersion();
  return `version/${result.stdout}`;
}