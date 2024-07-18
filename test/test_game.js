test("Displays game over screen when player is hit by enemy bullets", () => {
  // Arrange
  const enemyBulletController = new BulletController(canvas, 4, "white", false);
  const playerBulletController = new BulletController(canvas, 10, "red", true);
  const player = new Player(canvas, 3, playerBulletController);
  const enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController
  );

  // Act
  enemyBulletController.bullets.push({ x: player.x, y: player.y });
  game();

  // Assert
  const gameOverText = ctx.getImageData(0, canvas.height / 2 - 35, canvas.width, 70);
  const gameOverTextData = gameOverText.data;
  const isGameOverTextVisible = gameOverTextData.some((value) => value !== 0);
  expect(isGameOverTextVisible).toBe(true);
});
test("Displays game over screen when player collides with an enemy", () => {
  // Arrange
  const enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController
  );
  const player = new Player(canvas, 3, playerBulletController);

  // Act
  enemyController.enemyRows[0][0].x = player.x;
  enemyController.enemyRows[0][0].y = player.y;
  game();

  // Assert
  const gameOverText = ctx.getImageData(0, canvas.height / 2 - 35, canvas.width, 70);
  const gameOverTextData = gameOverText.data;
  const isGameOverTextVisible = gameOverTextData.some((value) => value !== 0);
  expect(isGameOverTextVisible).toBe(true);
});
test("Displays game over screen when all enemies are defeated", () => {
  // Arrange
  const enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController
  );

  // Act
  enemyController.enemyRows = [];
  game();

  // Assert
  const gameOverText = ctx.getImageData(0, canvas.height / 2 - 35, canvas.width, 70);
  const gameOverTextData = gameOverText.data;
  const isGameOverTextVisible = gameOverTextData.some((value) => value !== 0);
  expect(isGameOverTextVisible).toBe(true);
});
test("Displays 'You Win' when all enemies are defeated", () => {
  // Arrange
  const enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController
  );

  // Act
  enemyController.enemyRows = [];
  game();

  // Assert
  const gameOverText = ctx.getImageData(0, canvas.height / 2 - 35, canvas.width, 70);
  const gameOverTextData = gameOverText.data;
  const isWinTextVisible = gameOverTextData.some((value, index) => {
    if (index % 4 === 3) {
      return value === 255; // Alpha channel (transparency)
    }
    return value === 255 && index % 4 !== 3; // RGB channels
  });
  expect(isWinTextVisible).toBe(true);
});
test("Does not display game over screen when game is not over", () => {
  // Arrange
  const enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController
  );

  // Act
  game();

  // Assert
  const gameOverText = ctx.getImageData(0, canvas.height / 2 - 35, canvas.width, 70);
  const gameOverTextData = gameOverText.data;
  const isGameOverTextVisible = gameOverTextData.some((value) => value !== 0);
  expect(isGameOverTextVisible).toBe(false);
});
