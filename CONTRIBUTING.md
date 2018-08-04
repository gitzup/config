# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change. This usually saves time & effort.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Pull Request process

Aside from the actual change in source code, please ensure your PR update any relevant tests and/or adds new tests as necessary. PRs that lower test coverage will not be accepted.

For cases where the change affects information displayed in the documentation, please ensure the PR updates the documentation as well (eg. `README.md`).

### Testing

PRs that fail any test will not be accepted. To run tests locally, run this command:

```sh
$ npm run test
```

## Releasing

Creating a new release is a breeze - just do this:

```sh
$ npm run release <version-spec>
```

Replace the `<version-spec>` argument (in either command) with `major`, `minor`, `patch`, or a concrete release number, as per the rules of the `npm version` command & [semver](https://github.com/npm/node-semver#functions). Next, make sure you create a GitHub release for the generated tag. The release must include references to any issues it fixes.
