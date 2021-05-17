<div align="center">
  <img src="https://expresswebjs.com/logo.png" width="600px">
</div>

<br />
<hr>

# ExpressWebJs Preset Typescript

This is the base config files **(recommended by the core team)** for `typescript` to be extended to your ExpressWebJs typescript projects.

## Usage
Install the package from npm registry as follows

```sh
npm i -D expresswebjs-preset-ts

# yarn
yarn add -D expresswebjs-preset-ts
```

and then setup your config file to extend the base config

**tsconfig.json**

```json
{
  "extends": "./node_modules/expresswebjs-preset-ts/tsconfig",
  "compilerOptions": {
    "paths": {
      "App/*":["./App/*"],
      "Config/*":["./Config/*"],
      "Database/*":["./Database/*"],
      "Routes/*":["Routes/*"],
    }
  }
}
```