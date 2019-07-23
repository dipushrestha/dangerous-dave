class Level {
  static initClass() {
    this.maps = [
      {
        player: {
          x: 2,
          y: 8
        },
        tiles: [
          'BBBBBBBBBBBBBBBBBBBG',
          'BP               RBG',
          'B  D   D   T   D  BG',
          'B  B   B   B   B  BG',
          'BD   D   D   D   DBG',
          'BB   B   B   B   BBG',
          'BD     D          BG',
          'B   BBBB   BBBBBB BG',
          'B+         B=     BG',
          'BBBBBBBBBBBBBBBBBBBG'
        ]
      },
      {
        player: {
          x: 1,
          y: 8
        },
        tiles: [
          'BBBBBBBBBBBBBBBBBBBBBBBBBBBB  BB  BBBBBBBBBBBBBBBB      ',
          'BR     D            P         BB               =BB      ',
          'B                       BBBBB BB BBBBBBBBBBBBBBBBB      ',
          'B-  -        -         BB     BB     B                  ',
          'B       ---   B       BB  BBBBBBBBB  B                  ',
          'B --     B   TB ----- B  BB PB    B  B                  ',
          'B        B -  B       B B    B  B B BB                  ',
          'B   --- RB    B DDDDD B B BB B BB    B                  ',
          'B        BD  -B       B   BP   PB  BPB                  ',
          'BBBFFFFFFBFFFFBWWWWWWWBBBBBBBBBBBBBBBBFFFFFFFFFFFFFFFFFF        G'
        ]
      },
      {
        player: {
          x: 2,
          y: 5
        },
        tiles: [
          'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG Y   GGGG',
          'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGE    =GG  Y  GGG',
          'GQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ         GG   Y  Y',
          'GD   D    D   Z    D    D      D    D    D      D    D              GGGGGGGGG',
          'G                                                           G  G    C       W',
          'G+   S   S   SS    S   S   S   SS   S   S  S    SS                  Y       W',
          'GQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQFF      FFGG     W',
          'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGFF    FFGG      W',
          'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGFFJTFFGG       W',
          'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGFFFFFFFFF'
        ],
        enemies: [
          {
            x: 37,
            y: 3.5
          },
          {
            x: 55,
            y: 3.5
          }
        ]
      }
    ];
  }

  constructor(game, n) {
    this.game = game;
    this.map = Level.maps[n];
    this.tiles = [];
    this.entities = [];
    this.player = new Player(this.game, this.map.player);
    this.entities.push(this.player);
    if (Level.maps[n].enemies) {
      for (let enemy of Level.maps[n].enemies) {
        this.entities.push(new Enemy(this.game, enemy.x * Tile.size, enemy.y * Tile.size));
      }
    }
  }

  getCoords(x, y) {
    const i = Math.floor(x / Tile.size);
    const j = Math.floor(y / Tile.size);
    return [i, j];
  }

  inBounds(i, j) {
    if (i < 0 || i >= this.map.tiles[0].length) {
      return false;
    }
    if (j < 0 || j >= this.map.tiles.length) {
      return false;
    }
    return true;
  }

  getTile(x, y) {
    const [i, j] = this.getCoords(x, y);

    if (!this.inBounds(i, j)) {
      return ' ';
    }
    return this.map.tiles[j][i];
  }

  clearTile(x, y) {
    const [i, j] = this.getCoords(x, y);

    if (this.inBounds(i, j)) {
      const line = this.map.tiles[j];
      this.map.tiles[j] = line.slice(0, +(i - 1) + 1 || undefined) + ' ' + line.slice(i + 1);
    }
  }

  update() {
    this.entities.map(entity => entity.update());
  }

  draw() {
    let w = 18 * Tile.size;
    let dx = Math.floor(this.player.x / w) * w;
    this.game.canvas.setScroll(dx);

    for (let j = 0; j < this.map.tiles.length; j++) {
      const line = this.map.tiles[j];
      for (let i = 0; i < line.length; i++) {
        const tile = line[i];
        this.drawTile(tile, i, j);
      }
    }

    for (let entity of this.entities) {
      if (entity.dead) {
        let index = this.entities.indexOf(entity);
        this.entities.splice(index, 1);
      }
    }

    this.entities.map(entity => entity.draw());
  }

  drawTile(tile, i, j) {
    this.game.canvas.drawTile(tile, i, j);
  }
}
Level.initClass();
