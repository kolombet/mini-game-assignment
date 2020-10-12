const pulseAnimation = (
  sprite: PIXI.Sprite,
  maximumSize: number = 1.3,
  pulseTime: number = 0.3,
  pulsesCount: number = 4
) => {
  const timeline = gsap.timeline();
  const target = sprite.scale;
  for (let i = 0; i < pulsesCount; i++) {
    timeline.to(target, {
      y: maximumSize,
      x: maximumSize,
      duration: pulseTime,
      ease: "ease.in",
    });
    timeline.to(target, {
      y: 1,
      x: 1,
      duration: pulseTime,
      ease: "ease.out",
    });
  }

  return timeline;
};
export default pulseAnimation;
