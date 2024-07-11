# typemon

`typemon` is a tool that help the typescript development process, does that typescript don't does at this time, synchronize all files and folders from `source` to `destination` and automatic restart the node application. Is like nodemon, but for typescript.

This is the best way to work with typescript, many tools compile typescript on the fly, but is not provide type checking, so you gonna lose all the benefits that typescript actually provides!

With this setup you have always an updated build without the need to stop the development process. And also all the benefits from typescript compiler.

# Watch
typemon is designed to watch all events so get the last updated version on the destination directory.

specifically:
  
> - change
> - add
> - delete
> - rename
> - addDir
> - deleteDir
> - renameDir

# Installation

install typemon global:
```bash
npm install -g typemon # or using yarn: yarn global add typemon
```

install typemon as dev dependency:
```bash
npm install --save-dev typemon # or using yarn: yarn add typemon -D
```

# Usage

use typemon on the fly:
```bash
npx -c 'tsc --watch & typemon' # run without install the package
```

use typemon locally like this:
```json

"scripts": {
	"start": "tsc --watch & typemon"
}
```

## Config

```typemon``` looks for configuration in ```package.json```, typemon config can declared by object ```typemonConfig```.

#### Options
```json
"typemonConfig": {
	"main": "string"
	"tsConfig": "string"
	"delay": "number"
}
```

typemon requires an ```entry point``` to execute, you can declare an entry point on ```package.json main``` or ```typemonConfig main```. If both are present default is package.json main .

```delay``` is configured in seconds, default 1,5.

Also, requires an ```tsconfig.json || tsconfig.anything.json```. default is ```tsconfig.json``` at the top level of project.

Is looking for the options ```rootDir``` and ```outDir```. if an option is not found, current working directory gonna used as default.

# Example

### package.json
```json
{
"main": "build/index.js"
"typemonConfig": {
    "tsConfig": "tsconfig.json",
    "delay": 5
  }
}
```
### tsconfig.json
```jsonc
{
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "build"
  }
}
```

# Recommend setup for scripts

```json
  "scripts":  {
    "prestart": "npm run build",
    "start":  "tsc --watch --sourceMap & typemon",
    "prebuild":  "rm -rf ./build",
    "build":  "tsc",
    "postbuild":  "rsync -a --exclude='*.ts' ./src/ ./build/"
  },
```

This way on a build process you have a new clear build directory with all the necessary files included, also you can see where is the error in typescript files.