# Contributing

When contributing to this repository, please follow the pull request process.

## Pull Request Process

1. Make sure of your develop branch are updated.
```sh
$ git checkout develop
$ git pull origin develop
```
2. Always let your database updated running `npm run migrate:up`.
3. Create a new branch with feature, bugfix or hotfix prefix from the develop branch.
```sh
$ git checkout -b feature/yourBranchName
```
4. Create tests for the changes made. All the tests must be indentifier as a test or integration (if it will use the database on tests), examples: `example.unit.test.ts` or `example.integration.test.ts`.
5. Make sure that your changes don't break the code or another test. To verify this run `npm run test`, it will run all the tests and the lint. If some test break, verify why and try correct this.
6. Update the CHANGELOG.md with details of changes, in the section "Ongoing Changes".
7. Create a merge request at the repo between your branch and the develop branch. Check the option to delete your source branch when merged. Assign of the maintainers to review the changes.
8. Follow the [Style Guide](./STYLE.md)
