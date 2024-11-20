import { execa } from "execa";
import { getTagBranchName } from "../getTagVersion.mjs";

const branchName = await getTagBranchName();
await execa("git", ["push", "--tags", "origin", branchName]);
