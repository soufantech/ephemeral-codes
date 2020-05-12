# ephemeral-codes

Manage CRUD operations on ephemeral token codes.

## Running the tests:

1. Copy the contents of the `.env.example` file to an `.env` file in the same directory.
1. Run `docker-compose up` to spin up a redis container.
2. Run `yarn test` to execute the tests.

## Building and publishing:

1. Log into npm with the `yarn login` command.
2. Run `yarn build` to build the project.
3. Run `yarn pack` and check the contents of the resultant tarball.
4. If possible, include the tarball in another project with `yarn add <path_to_tarball>` and check if it's okay.
5. Run `yarn publish` to publish the package (**Don't forget to set a tag** with the `--tag` option, if appropriate).
