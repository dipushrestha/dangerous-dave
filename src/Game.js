class Game {
  constructor(containerId, options) {
    this.frame = 1;
    this.animator;
    this.lives = 3;
    this.restart = false;
    this.nextLevel = false;
    this.currentLevel = 0;
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
        this.end();
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

    if (!this.level.isLevelingUp) {
      this.input.update();
    }

    this.score.update();
    this.level.update();
    this.frame++;
    return true;
  }

  render() {
    this.level.draw();
  }

  end() {
    const endCanvas = document.createElement('canvas');
    this.canvas.canvas.insertAdjacentElement('afterend', endCanvas);
    const endCtx = endCanvas.getContext('2d');

    let inputBuffer = '';

    endCanvas.width = 600;
    endCanvas.height = 300;
    endCanvas.style.position = 'fixed';
    endCanvas.style.top = '50px';
    endCanvas.style.left = '25px';

    endCtx.fillStyle = '#fff';
    endCtx.fillRect(0, 0, 600, 300);
    endCtx.font = '20px GameFont';

    window.addEventListener('keydown', e => {
      let input = String.fromCharCode(e.keyCode);
      if (/[a-zA-Z]/.test(input)) {
        if (inputBuffer.length < 5) {
          inputBuffer += input;
        }
      }

      if (e.keyCode === 8) {
        inputBuffer = inputBuffer.slice(0, -1);
      }

      endCtx.fillStyle = '#fff';
      endCtx.fillRect(0, 0, 600, 300);
      endCtx.fillStyle = '#000';
      endCtx.fillText('NAME:' + inputBuffer + '  SCORE:' + this.score.value, 200, 100);
    });
  }
}
