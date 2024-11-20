import { execa } from "execa";
import { getTagBranchName } from "../getTagVersion.mjs";

const tag = await getTagBranchName();
await execa("gh", ["release", "view", tag, "--web"]);
