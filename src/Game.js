class Game {
  constructor(containerId, options) {
    this.frame = 1;
    this.animator;
    this.restart = false;
    this.nextLevel = false;
    this.currentLevel = 0;
    this.input = new Input();
    this.sound = new GameSound();
    this.level = new Level(this, this.currentLevel);
    this.canvas = new Canvas(containerId, options);
    this.loop();
  }

  loop() {
    if (this.update()) {
      this.render();
      this.animator = window.requestAnimationFrame(this.loop.bind(this));
    }
  }

  update() {
    if (this.nextLevel) {
      this.currentLevel++;
      if (this.currentLevel >= Level.maps.length) {
        console.log('level finished');
        window.cancelAnimationFrame(this.animator);
        return false;
      }
    }

    if (this.restart || this.nextLevel) {
      this.restart = false;
      this.nextLevel = false;
      this.level = new Level(this, this.currentLevel);
      this.input.clear();
      this.frame = 1;
    }

    this.input.update();
    this.level.update();
    this.frame++;
    return true;
  }

  render() {
    this.level.draw();
  }
}
