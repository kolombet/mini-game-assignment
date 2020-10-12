# mini-game-assignment


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Game developer assignment</h3>

  <p align="center">
    Mini game implemented using PixiJS WebGL library and typescript.
  </p>
</p>


<a href="https://pixi-ts-minimal.vercel.app/">View Demo</a>

<!-- ABOUT THE PROJECT -->
## About The Project
<br />
This project doesn't use any slow heavy bundlers/transpilers like webpack with babel, to provide the advantageous quick build/restart speed for more agile development iteration by building source with tsc only in watch mode.
<br />
Libraries are not bundled and cached by the browser, which allows update game code without loading dependencies again, which provides a better user experience.
<br />
Only game logic code is bundled with the typescript compiler to es6, which provides human-readable javascript and makes it easy to debug.
<br />
<br />

Features exciting experience for the user with:
* Tweens and animations
* A lot of particles
* Animated big win scene
* Rich graphics
* 60 FPS perfomance on any devices

### Built With

* PixiJS
* Typescript compiler
* [Greensock tween library](https://github.com/greensock/GSAP)
* [Pixi Particles library and editor](https://github.com/pixijs/pixi-particles)
* Gstats


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo
```sh
git clone https://github.com/kolombet/mini-game-assignment.git
```
2. Install NPM packages
```sh
npm install
```

<!-- USAGE EXAMPLES -->
## How to run on local machine

- Launch build and launch version
```sh
npm run start
```

- Launch dev environment
```sh
npm run watch:code - to build code
npm run watch:styles - to build styles
npm run dev - live reloading
```

- [Or just run built static version](https://pixi-ts-minimal.vercel.app/)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Kirill Kolombet - [@kolombet](https://twitter.com/twitter_handle) - email

Project Link: [https://github.com/kolombet/mini-game-assignment](https://github.com/kolombet/mini-game-assignment)
