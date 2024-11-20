import { execa } from "execa";
import { getTagBranchName } from "../getTagVersion.mjs";

const branchName = await getTagBranchName();
await execa("gh", [
  "pr",
  "create",
  "--fill",
  "--base",
  "main",
  "--head",
  branchName,
]);
await execa("gh", ["pr", "merge", branchName, "--merge", "--auto"]);
