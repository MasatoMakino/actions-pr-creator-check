### trigger types

cd ~/Documents/projects
grep -lr "types\:\s*\[created\]" --include="npm_publish.yml" --exclude-dir=node_modules ./*

git checkout main && git pull && sed -i '' 's/types: \[created\]/types: \[published\]/g' .github/workflows/npm_publish.yml && git checkout -b fix_trigger_types && git add .github/workflows/npm_publish.yml && git commit -m "fix: trigger types" && git push --set-upstream origin fix_trigger_types && gh pr create --title "fix: trigger types" --body "fix: trigger types" --base main && gh pr merge fix_trigger_types --rebase --auto

### auto merge type

git checkout main && git pull && sed -i '' 's/gh pr merge --auto --merge "\$PR_URL"/gh pr merge --auto --rebase "\$PR_URL"/g' .github/workflows/dependabot-auto-merge.yml && git checkout -b fix_automerge_type && git add .github/workflows/dependabot-auto-merge.yml && git commit -m "fix: auto-merge type" && git push --set-upstream origin fix_automerge_type && gh pr create --title "fix: auto-merge type" --body "fix: auto-merge type" --base main && gh pr merge fix_automerge_type --rebase --auto

### script

git checkout main && git pull

#### update npm script !

git checkout -b add_release_script && git add package.json && git commit -m "add: release script" && git push --set-upstream origin add_release_script && gh pr create --title "add: release script" --body "add npm script for release package." --base main && gh pr merge add_release_script --rebase --auto
