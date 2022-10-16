# ts-boilerplate

Typescript set up for different types of projects. Examples:

- Library
- React

Husky config is missing, run:

```sh
# husky setup
> yarn run prepare

# prepare git hooks
> npx husky add .husky/pre-commit "yarn lint"
> npx husky add .husky/pre-push "yarn test"

# commit your hooks
> git add ./husky/*
```

[Create github page](https://pages.github.com/)
