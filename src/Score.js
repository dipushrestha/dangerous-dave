class Score {
  constructor(containerId, game) {
    this.value = 0;
    this.game = game;
    this.canvas = document.createElement('canvas');
    this.container = document.getElementById(containerId);
    this.canvas.width = 640;
    this.canvas.height = 40;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.sprites = {
      R: new Sprite(1, 0)
    };
  }

  update() {
    if (isNaN(this.value)) console.log('nan');
    this.drawBoard();
  }

  drawSprite(x, y, sprite) {
    this.sprites[sprite].draw(this.ctx, x, y);
  }

  drawBoard() {
    let info = `SCORE: ${this.value}     
      LEVEL: ${this.game.currentLevel + 1}
      DAVES: ${this.game.lives}`;
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#90ee90';
    this.ctx.font = '30px sans-serif'
    this.ctx.textAlign = 'center';
    this.ctx.fillText(info, this.canvas.width / 2, 30);
  }
}