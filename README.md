<div align="center">
  <img src="https://avatars2.githubusercontent.com/u/61063724?s=200&v=4" width="100px">
</div>

<br />

<div align="center">
  <h1>@soufantech/ephemeral-codes</h1>
  <p>Generates and manages token codes suitable to be used in password recovery, registration and many other use cases.</p>
  <p></p>
</div>

<br />

<div align="center">

[![jest-image]][jest-url] [![npm-image]][npm-url] 

</div>

## 💾 Install:

ATTENTION: This is currently a private package, and you'll need an access token in order to install it.

You can install this package with yarn:

```
yarn add @soufantech/ephemeral-codes
```

or npm:

```
npm install @soufantech/ephemeral-codes
```

## 🚴 Usage:

Usage documentation is not currently available. Please, refer to the tests for usage examples.

## 🔤 API:

Detailed API documentation is not currenlty available. Please, refer to the source code if you are feeling adventurous.

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

## Todo:

- [ ] Add and configure semantic-release.

---

<div align="center">
  <sub>Built with ❤︎ by <a href="http://soufan.com.br">SouFan</a>
</div>

[npm-image]: https://img.shields.io/npm/v/@soufantech/ephemeral-codes.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@soufantech/ephemeral-codes "npm"

[jest-image]: https://img.shields.io/badge/tested_with-jest-99424f.svg?style=for-the-badge&logo=jest
[jest-url]: https://github.com/facebook/jest "jest"
