const redSmokeEmitterConfig = {
    alpha: {
        list: [
            {
                value: 0.8,
                time: 0
            },
            {
                value: 0.1,
                time: 1
            }
        ],
        isStepped: false
    },
    scale: {
        list: [
            {
                value: 1,
                time: 0
            },
            {
                value: 0.3,
                time: 1
            }
        ],
        isStepped: false
    },
    color: {
        list: [
            {
                value: "fb1010",
                time: 0
            },
            {
                value: "f5b830",
                time: 1
            }
        ],
        isStepped: false
    },
    speed: {
        list: [
            {
                value: 200,
                time: 0
            },
            {
                value: 100,
                time: 1
            }
        ],
        isStepped: false
    },
    startRotation: {
        min: 0,
        max: 360
    },
    rotationSpeed: {
        min: 0,
        max: 0
    },
    lifetime: {
        min: 0.5,
        max: 0.5
    },
    frequency: 1,
    spawnChance: 1,
    particlesPerWave: -1,
    emitterLifetime: 1,
    maxParticles: 15,
    pos: {
        x: 0,
        y: 0
    },
    addAtBack: false,
    spawnType: "circle",
    spawnCircle: {
        x: 0,
        y: 0,
        r: 10
    }
}

const smokeEmitterConfig = {
	"alpha": {
		"start": 0.89,
		"end": 0
	},
	"scale": {
		"start": 1,
		"end": 3,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#a8a8a8",
		"end": "#ffffff"
	},
	"speed": {
		"start": 200,
		"end": 1,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 1,
		"y": 1
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 0,
		"max": 360
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 500
	},
	"lifetime": {
		"min": 1,
		"max": 1
	},
	"blendMode": "normal",
	"frequency": 0.01,
	"emitterLifetime": 1,
	"maxParticles": 20,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "burst",
	"particlesPerWave": 20,
	"particleSpacing": 0,
	"angleStart": 0
}

const smallBurst =
{
    "alpha": {
        "start": 1,
        "end": 0.8
    },
    "scale": {
        "start": 0.5,
        "end": 0.5
    },
    "color": {
        "start": "ffffff",
        "end": "ffffff"
    },
    "speed": {
        "start": 200,
        "end": 100
    },
    "startRotation": {
        "min": 0,
        "max": 0
    },
    "rotationSpeed": {
        "min": 0,
        "max": 0
    },
    "lifetime": {
        "min": 0.5,
        "max": 0.7
    },
    "frequency": 0.05,
    "emitterLifetime": 0.31,
    "maxParticles": 1000,
    "pos": {
        "x": 0,
        "y": 0
    },
    "addAtBack": false,
    "spawnType": "ring",
    "spawnCircle": {
        "x": 0,
        "y": 0,
        "r": 40,
        "minR": 39
    }
}


export default smokeEmitterConfig;