class Game {
  constructor(containerId, options) {
    this.frame = 1;
    this.animator;
    this.lives = 3;
    this.restart = false;
    this.nextLevel = false;
    this.currentLevel = 2;
    this.lastLevel = 2;
    this.input = new Input();
    this.sound = new Sound();
    this.level = new Level(this, this.currentLevel);
    this.score = new Score(containerId, this);
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
    if (this.lives < 0) {
      console.log('you are totally dead now');
      window.cancelAnimationFrame(this.animator);
      return false;
    }

    if (this.nextLevel) {
      this.currentLevel++;
      if (this.currentLevel > this.lastLevel) {
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
    this.score.update();
    this.level.update();
    this.frame++;
    return true;
  }

  render() {
    this.level.draw();
  }
}
