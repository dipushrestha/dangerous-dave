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
}

Tile.size = 32;
