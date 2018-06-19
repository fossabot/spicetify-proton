# spicetify-proton
Standalone Spicetify with native UI.  
Barely working right now.

![demo](https://i.imgur.com/aOmBKjM.png)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fkhanhas%2Fspicetify-proton.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fkhanhas%2Fspicetify-proton?ref=badge_shield)

## Req:
1. Git/Github Desktop
2. NodeJS
3. [Yarn](https://yarnpkg.com/en/docs/install#windows-stable)

## Setup
1. Install [Git](https://git-scm.com/)
2. Open up console
3. `git clone https://github.com/khanhas/spicetify-proton`  
4. `cd spicetify-proton`  
  
or download repository zip from Github and extract somewhere, then  
```
cd just-extracted-folder
```
  
Finally, install necessary packages:  
```
yarn
```

### Run
```
yarn start
```


### Test
```
yarn test
```

Check coverage:
```
yarn test --coverage
```

### Lint
```
yarn lint
```

### Build
Compile all *.tsx to ./build/*.js
```
yarn build
```

### Watch
```
yarn build:watch
```

### Package
Currently, it also packs Electron dependencies too.
```
yarn package
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fkhanhas%2Fspicetify-proton.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fkhanhas%2Fspicetify-proton?ref=badge_large)