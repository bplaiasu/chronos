/*  
*   *******************************************
*   inspired by <Coding with Adam>
*   https://www.youtube.com/watch?v=KsLChm2MIQY
*   *******************************************
*/

// here define the x, y coordinates of each platforms of the level
// as well as the "LOOK" (the map) of the platform
level_platforms = {
    platform1: {
        'x': 0,
        'y': 64,
        'map': [
            [11, 13, 11, 13, 11, 13, 11, 13, 11, 13, 11],
            [1, 2, 14, 2, 2, 15, 2, 2, 14, 2, 3],
            [4, 5, 100, 101, 102, 103, 104, 103, 105, 5, 6],
            [7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9],
        ],
    },
    platform2: {
        'x': 0,
        'y': 481,
        'map': [
            [1, 2, 14, 2, 2, 15, 2, 2, 14, 2, 3],
            [4, 106, 103, 103, 107, 5, 108, 109, 100, 110, 6],
            [7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9],
            [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]
        ]
    },
    platform3: {
        'x': 1000,
        'y': 260,
        'map': [
            [0, 16, 17],
            [0, 18, 19],
            [20, 21, 21, 22],
        ],
        'make_big': 1
    },
    platform4: {
        'x': 1750,
        'y': 64,
        'map': [
            [23, 23],
            [23, 23],
            [23, 23],
            [23, 23],
            [23, 23],
            [23, 23],
            [23, 23],
            [23, 23],
            [23, 23],
            [23, 23],
            [23, 23],
            [23, 23],
        ]
    }
}