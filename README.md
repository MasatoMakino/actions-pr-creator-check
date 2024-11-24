# Release Helper

This is a simple script to help with the release process of a project. It will create a new release branch, update the version number in the project files, and create a release of GitHub.

## Installation

This script is intended to be used as a devDependency in a Node.js project.

### Requirements

You will need the following installed on your system to use this script:

- [Node.js](https://nodejs.org/en/) is required to run this script.
- [Git](https://git-scm.com/) is required to create a release branch.
- [GitHub CLI](https://cli.github.com/) is required to create a pull request.

### Install

Install the package

```bash
npm install -D @masatomakino/release-heler
```

add the following to your `package.json`

```json
    "preversion": "npx @masatomakino/release-heler preversion",
    "postversion": "npx @masatomakino/release-heler postversion",
    "release": "npx @masatomakino/release-heler release",
```

## Usage

`npm version patch` will create a new release branch, update the version number in the project files, and create a pull request of GitHub.

`npm run release` will push a tag, and create druft release of GitHub.

## Options

```console
preversion Options:
  --dry-run                         skip commit and tag (default: false)
  --default-branch <defaultBranch>  default branch name (default: "main")
  --test-command <testCommand>      test command (default: "npm test")
  -h, --help                        display help for command

postversion Options:
  --dry-run                         skip commit and tag (default: false)
  --default-branch <defaultBranch>  default branch name (default: "main")
  -h, --help                        display help for command

release Options:
  --dry-run                         skip commit and tag (default: false)
  --default-branch <defaultBranch>  default branch name (default: "main")
  -h, --help                        display help for command  
```