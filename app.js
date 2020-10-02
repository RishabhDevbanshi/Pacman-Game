document.addEventListener('DOMContentLoaded', () => {
  const scoreDisplay = document.getElementById('score');
  const width = 28;
  let score = 0;
  const grid = document.querySelector('.grid');
  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const squares = [];

  //create your board
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div');
      grid.appendChild(square);
      squares.push(square);

      //add layout to the board
      if (layout[i] === 0) {
        squares[i].classList.add('pac-dot');
      } else if (layout[i] === 1) {
        squares[i].classList.add('wall');
      } else if (layout[i] === 2) {
        squares[i].classList.add('ghost-lair');
      } else if (layout[i] === 3) {
        squares[i].classList.add('power-pellet');
      }
    }
  }
  createBoard();

  //create Characters
  //draw pacman onto the board
  let pacmanCurrentIndex = 490;
  let pacmanVelocity = {
    x: 0,
    y: 0,
  };
  const pacmanSpeed = 200;
  squares[pacmanCurrentIndex].classList.add('pac-man');
  //get the coordinates of pacman on the grid with X and Y axis
  // function getCoordinates(index) {
  //   return [index % width, Math.floor(index / width)]
  // }

  // console.log(getCoordinates(pacmanCurrentIndex))

  // set pacman velocity
  function setPacmanVelocity(e) {
    switch (e.keyCode) {
      case 37:
        if (
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')
        ) {
          pacmanVelocity.y = 0;
          pacmanVelocity.x = 1;
        }
        break;
      case 38:
        if (
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
        ) {
          pacmanVelocity.y = 0;
          pacmanVelocity.x = -1;
        }
        break;
      case 39:
        if (
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
        ) {
          pacmanVelocity.y = 1;
          pacmanVelocity.x = 0;
        }
        break;
      case 40:
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
        ) {
          pacmanVelocity.y = -1;
          pacmanVelocity.x = 0;
        }
        break;
    }
    checkForGameOver();
    console.log(pacmanVelocity, e.keyCode);
  }

  //move pacman
  function movePacman() {
    squares[pacmanCurrentIndex].classList.remove('pac-man');
    setInterval(() => {
      if (pacmanVelocity.x === 1 && pacmanVelocity.y == 0) {
        if (
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')
        ) {
          squares[pacmanCurrentIndex].classList.remove('pac-man');

          pacmanCurrentIndex -= 1;
        }
        if (squares[pacmanCurrentIndex - 1] === squares[363]) {
          pacmanCurrentIndex = 391;
        }
      }
      if (pacmanVelocity.x === -1 && pacmanVelocity.y == 0) {
        if (
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
        ) {
          squares[pacmanCurrentIndex].classList.remove('pac-man');

          pacmanCurrentIndex -= width;
        }
      }
      if (pacmanVelocity.x === 0 && pacmanVelocity.y == 1) {
        if (
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
        ) {
          squares[pacmanCurrentIndex].classList.remove('pac-man');

          pacmanCurrentIndex += 1;
        }
        if (squares[pacmanCurrentIndex + 1] === squares[392]) {
          pacmanCurrentIndex = 364;
        }
      }
      if (pacmanVelocity.x === 0 && pacmanVelocity.y == -1) {
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
        ) {
          squares[pacmanCurrentIndex].classList.remove('pac-man');
          pacmanCurrentIndex += width;
        }
      }

      squares[pacmanCurrentIndex].classList.add('pac-man');
      pacDotEaten();
      powerPelletEaten();
    }, pacmanSpeed);
  }
  document.addEventListener('keyup', setPacmanVelocity);
  movePacman();
  // what happens when you eat a pac-dot
  function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      score++;
      if (score < 50) {
        document.getElementById('score').classList.add('low-score');
      } else if (score > 100) {
        document.getElementById('score').classList.add('mid-score');
      } else if (score > 200) {
        document.getElementById('score').classList.add('high-score');
      }
      scoreDisplay.innerHTML = score;
      squares[pacmanCurrentIndex].classList.remove('pac-dot');
      checkForWin();
    }
  }

  //what happens when you eat a power-pellet
  function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
      score += 10;
      ghosts.forEach((ghost) => {
        ghost.isScared = true;
        clearTimeout(modeTimerId);
        ghost.direction = (ghost.direction + 2) % directions.length;
      });
      setTimeout(unScareGhosts, 10000);
      squares[pacmanCurrentIndex].classList.remove('power-pellet');
      checkForWin();
    }
  }

  //make the ghosts stop flashing
  function unScareGhosts() {
    ghosts.forEach((ghost) => {
      ghost.isScared = false;
      modeTimerId = setTimeout(modeSwitch, timers[0] * 1000);
    });
  }

  const directions = [-width, -1, width, 1];

  //create ghosts using Constructors
  class Ghost {
    constructor(
      className,
      startIndex,
      speed,
      scatterTarget,
      lairTarget,
      getTarget,
    ) {
      this.className = className;
      this.startIndex = startIndex;
      this.speed = speed;
      this.currentIndex = startIndex;
      this.isScared = false;
      this.timerId = NaN;
      // 0 = up, 1 = left, 2 = down, 3 = right.
      this.direction = 0;

      this.scatterTarget = scatterTarget;
      this.lairTarget = lairTarget;
      this.target = lairTarget;
      // 0 = scatter, 1 = chase.
      this.mode = 0;

      this.getTarget = getTarget;
    }
  }

  //all my ghosts
  ghosts = [
    new Ghost('blinky', 348, 200, width - 1, 294, () => pacmanCurrentIndex),

    new Ghost('stinky', 376, 200, 0, 294, () => {
      if (pacmanVelocity.y === -1) {
        return pacmanCurrentIndex - 4 - width * 4;
      }

      return (
        pacmanCurrentIndex + pacmanVelocity.x * 4 + pacmanVelocity.y * width * 4
      );
    }),

    new Ghost('inky', 351, 200, squares.length - 1, 293, () => {
      let intermidiate = 0;

      if (pacmanVelocity.y === -1) {
        intermidiate = pacmanCurrentIndex - 2 - width * 2;
      } else {
        intermidiate =
          pacmanCurrentIndex +
          pacmanVelocity.x * 2 +
          pacmanVelocity.y * width * 2;
      }

      const interX = intermidiate % width;
      const interY = Math.floor(intermidiate / width);

      const blinkyPos = ghosts[0].currentIndex;
      let reverseX = -((blinkyPos % width) - interX);
      let reverseY = -(Math.floor(blinkyPos / width) - interY);

      return reverseX + interX + (reverseY + interY) * width;
    }),

    new Ghost('clyde', 379, 200, squares.length - width, 292, () => {
      const pacmanX = pacmanCurrentIndex % width;
      const pacmanY = Math.floor(pacmanCurrentIndex / width);

      const currentX = ghosts[3].currentIndex % width;
      const currentY = Math.floor(ghosts[3].currentIndex / width);

      let dist =
        Math.pow(pacmanX - currentX, 2) + Math.pow(pacmanY - currentY, 2);

      if (dist < 64) {
        return ghosts[3].scatterTarget;
      }

      return pacmanCurrentIndex;
    }),
  ];

  //draw my ghosts onto the grid
  ghosts.forEach((ghost) => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
  });

  const timers = [7, 20, 5];
  let modeTimerId = null;

  function modeSwitch() {
    timers.shift();

    ghosts.forEach((ghost) => {
      ghost.mode = 1 - ghost.mode;
      ghost.direction = (ghost.direction + 2) % directions.length;
    });

    if (timers.length > 0) {
      modeTimerId = setTimeout(modeSwitch, timers[0] * 1000);
    }
  }

  modeTimerId = setTimeout(modeSwitch, timers[0] * 1000);

  //move the Ghosts randomly
  ghosts.forEach((ghost) => moveGhost(ghost));

  function moveGhost(ghost) {
    ghost.timerId = setInterval(() => {
      // If in ghost lair, get out.
      if (squares[ghost.currentIndex].classList.contains('ghost-lair')) {
        ghost.target = ghost.lairTarget;
      } else if (ghost.mode === 0) {
        ghost.target = ghost.scatterTarget;
      } else {
        ghost.target = ghost.getTarget();
      }

      let possibleDirs = [
        ghost.direction,
        (ghost.direction + 1) % directions.length,
        (ghost.direction - 1 + directions.length) % directions.length,
      ];

      let possiblePos = possibleDirs
        .map((value, index) => [ghost.currentIndex + directions[value], index])
        .filter(
          ([pos, _posIndex]) =>
            pos >= 0 &&
            pos < squares.length &&
            !squares[pos].classList.contains('wall'),
        );

      let nextDir = 0;
      let nextPos = 0;

      if (!ghost.isScared) {
        const targetPosArr = [
          ghost.target % width,
          Math.floor(ghost.target / width),
        ];

        let minDist = Infinity;

        possiblePos.forEach(([pos, posIndex]) => {
          const dist = [pos % width, Math.floor(pos / width)].reduce(
            (acc, curr, index) => acc + Math.pow(curr - targetPosArr[index], 2),
            0,
          );

          if (dist < minDist) {
            minDist = dist;
            nextDir = possibleDirs[posIndex];
            nextPos = pos;
          }
        });
      } else if (squares[ghost.currentIndex].classList.contains('pac-man')) {
        nextPos = ghost.startIndex;
        nextDir = 0;
        score += 100;
      } else {
        let rand = possiblePos[Math.floor(Math.random() * possiblePos.length)];
        nextPos = rand[0];
        nextDir = possibleDirs[rand[1]];
      }

      // Update direction
      ghost.direction = nextDir;

      if (nextPos === 364) {
        nextPos += width - 1;
      } else if (nextPos === 391) {
        nextPos -= width - 1;
      }

      // Remove from current position.
      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
      // Add into next position.
      ghost.currentIndex = nextPos;
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');

      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost');
      }

      checkForGameOver();
    }, ghost.speed);
  }

  //check for a game over
  function checkForGameOver() {
    if (
      squares[pacmanCurrentIndex].classList.contains('ghost') &&
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
    ) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener('keyup', movePacman);
      setTimeout(function () {
        alert('Game Over');
      }, 500);
    }
  }

  //check for a win - more is when this score is reached
  function checkForWin() {
    if (score === 274) {
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener('keyup', movePacman);
      setTimeout(function () {
        alert('You have WON!');
      }, 500);
    }
  }
});
