## personal-page

Webpage which contains personal info and contacts.
This page is available here: [iivanovw7.github.io](https://iivanovw7.github.io/)

### Table of Contents

- [Requirements](#requirements)
- [Libs](#libs)
- [Clone](#clone)
- [Installation and usage](#installation)
- [License](#license)

---

### Requirements

- [NodeJS 14.x](https://nodejs.org/en/)
- [NPM 6.14.0](https://www.npmjs.com/get-npm)

---

### Libs

Technologies used
- [Babel](http://babeljs.io)
- [PixiJS](https://www.pixijs.com/)
- [PostCSS](https://postcss.org/)
- [Webpack](https://webpack.js.org/)
- [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)
- [Gulp](https://gulpjs.com/)
- [ESLint](https://eslint.org)
- [stylelint](https://stylelint.io)
- [Redux](https://redux.js.org/)
- [Jest](https://jestjs.io/)
- [Prettier](https://prettier.io/)

---

### Clone

- Clone this repo to your local machine using `https://github.com/iivanovw7/personal-page.git`

### Installation

For Ubuntu or Debian-based Linux distributions. <br />
Tested on: Ubuntu 16.04.6 LTS (Xenial Xerus), Ubuntu 18.04.2 LTS (Bionic Beaver), Manjaro Linux

[Node.js](https://nodejs.org) should be installed.
All commands should be run in project root directory:

Install packages:
```
npm install
```
Remove ```node_modules```:
```
npm run clean
```
Remove ```node_modules``` and ```dist``` folder:
```
npm run reset
```
Run tests:
```
npm run test
```
Run tests coverage check:
```
npm run coverage
```
Run lint:
```
npm run lint
```
Run lint postcss:
```
npm run lint:pcss
```
Run lint js:
```
npm run lint:js
```
Generate jsDocs in ```./dist/doc``` folder:
```
npm run doc
```
Run dev server:
```
npm run dev
```
Run dev server with dashboard:
```
npm run dev:dashboard
```
Create production build in ```./dist``` folder:
```
npm run build
```
Serve production build at ```4449``` port:
```
npm run serve
```

---

### License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2019 © <a href="/" target="_blank">personal-page</a>
