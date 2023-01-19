# ts-boilerplate

Typescript set up for different types of projects. Examples:

- Library
- React
- Express App

Husky config is missing, run:

```sh
# husky install
> yarn add -D husky

# husky setup
> yarn run prepare

# prepare git hooks
> npx husky add .husky/pre-commit "yarn lint"
> npx husky add .husky/pre-push "yarn test"

# commit your hooks
> git add ./husky/*
```

[Create github page](https://pages.github.com/) if documentation is needed

For the library example `ts-patch` and `typescript-transform-paths` are required in order to resolve paths aliases into the full path
