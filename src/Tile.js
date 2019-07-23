class Tile {
  static isSolid(tile) {
    return ['B', '+', '-', 'G', 'U', 'Q'].includes(tile);
  }

  static isPickable(tile) {
    return ['T', 'P', 'D', 'R', 'J', 'Z', 'C', 'Y', 'E'].includes(tile);
  }

  static isLethal(tile) {
    return ['W', 'F', 'S'].includes(tile);
  }

  static scoreValue(tile) {
    const values = {
      P: 50,
      D: 100,
      R: 150,
      E: 200,
      C: 300,
      Y: 500,
      T: 1000
    }

    return values[tile];
  }
}

Tile.size = 32;
