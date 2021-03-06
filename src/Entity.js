class Entity {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.bullet = null;
  }

  draw() { }

  update() { }

  kill() {
    return false;
  }

  getCorners() {
    const offset = 1;

    const xs = [this.x + offset, this.x + this.width - offset];
    const ys = [this.y, this.y + this.height - offset];

    const corners = [];
    for (let i = 0; i < ys.length; ++i) {
      for (let j = 0; j < xs.length; ++j) {
        corners.push([xs[j], ys[i]]);
      }
    }

    return corners;
  }

  getTouchedTiles() {
    const touchedTiles = [];
    const corners = this.getCorners();

    for (let i = 0; i < corners.length; ++i) {
      touchedTiles.push({
        x: corners[i][0],
        y: corners[i][1],
        tile: this.game.level.getTile(corners[i][0], corners[i][1])
      });
    }

    return touchedTiles;
  }

  clipped(direction) {
    const tiles = this.getTouchedTiles();

    const mapping = {
      up: [tiles[0].tile, tiles[1].tile],
      down: [tiles[2].tile, tiles[3].tile],
      left: [tiles[0].tile, tiles[2].tile],
      right: [tiles[1].tile, tiles[3].tile]
    };

    return mapping[direction].map(Tile.isSolid).reduce((acc, cur) => acc || cur);
  }

  static pointInRect(x, y, rect) {
    return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
  }

  onScreen() {
    return Entity.pointInRect(this.x, this.y, this.game.canvas.view);
  }

  pointCollision(x, y) {
    return Entity.pointInRect(x, y, this);
  }

  hasCollided(entity) {
    return (this.x < entity.x + entity.width &&
      this.x + this.width > entity.x &&
      this.y < entity.y + entity.height &&
      this.y + this.height > entity.y);
  }

  shoot(vel) {
    let x, y;
    if (this.bullet) return;
    x = this.direction === 1 ? this.x + this.width : this.x;
    y = this.y + this.height / 2;
    this.bullet = new Bullet(this.game, this, x, y, this.direction, vel);
    this.game.level.entities.push(this.bullet);
  }
}
