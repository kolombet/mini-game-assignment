const treasuresEmitterConfig = (
  particlesAmount: number = 100,
  emitterLifetime: number = 1,
  isOnBack: boolean = true
) => {
  return {
    alpha: {
      start: 1,
      end: 1,
    },
    scale: {
      start: 1,
      end: 1,
      minimumScaleMultiplier: 1,
    },
    color: {
      start: "#ffffff",
      end: "#ffffff",
    },
    speed: {
      start: 800,
      end: 500,
      minimumSpeedMultiplier: 1,
    },
    acceleration: {
      x: 0,
      y: 1498,
    },
    maxSpeed: 0,
    startRotation: {
      min: -150,
      max: -30,
    },
    noRotation: true,
    rotationSpeed: {
      min: 0,
      max: 0,
    },
    lifetime: {
      min: 1.5,
      max: 2,
    },
    blendMode: "normal",
    frequency: 0.005,
    emitterLifetime,
    maxParticles: particlesAmount,
    pos: {
      x: 0,
      y: 0,
    },
    addAtBack: isOnBack,
    spawnType: "circle",
    spawnCircle: {
      x: 0,
      y: 0,
      r: 100,
    },
  };
};

export default treasuresEmitterConfig;
