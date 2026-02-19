export function spawnTarget(canvas) {

  const radius = 20;

  const x = radius + Math.random() * (canvas.width - radius * 2);
  const y = radius + Math.random() * (canvas.height - radius * 2);

  const spawnTime = performance.now();

  return { x, y, radius, spawnTime };

}
