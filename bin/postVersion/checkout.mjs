import { execa } from "execa";
import { getTagBranchName } from "../getTagVersion.mjs";
const resultBranchName = await getTagBranchName();

await execa("git", ["checkout", "-b", resultBranchName]);
