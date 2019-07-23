class LevelMap {
  constructor(level) {
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

    return this.maps[level];
  }
}
