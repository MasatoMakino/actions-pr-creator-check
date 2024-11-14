import { execa } from "execa";
import { getTagVersion } from "../getTagVersion.mjs";
const resultTag = await getTagVersion();

await execa("git", ["checkout", "-b", `version/${resultTag.stdout}`]);
