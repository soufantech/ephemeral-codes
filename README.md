# ephemeral-codes

Manage CRUD operations on ephemeral token codes.

## 🧪 Running the tests:

1. Copy the contents of the `.env.example` file to an `.env` file in the same directory.
1. Run `docker-compose up` to spin up a redis container.
2. Run `yarn test` to execute the tests.

## 📦 Publishing:

⚠️ **ATTENTION!** ⚠️ Do not use `yarn publish`, as it may bypass some of `.npmignore` rules if a `.gitignore` is also present in the project.

1. Log into npm with the `npm login` command.
2. Make sure the the package name is correclty scoped with `@soufantech` and that the `version` is set correctly in `package.json`.
3. Run `npm publish --dry-run` to check the files that will be included in the package.
4. If possible, generate a tarball with `npm pack` and include it in another project with `yarn add <path_to_tarball>` to check that your package exports are working fine.
5. Run `npm publish` to publish the package (**Don't forget to set a tag** with the `--tag` option, if appropriate).
