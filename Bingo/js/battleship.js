const BattleshipGame = {
  create(context, tryRestore) {
    context.elements.bingoStatus.style.display = "none";
    context.elements.shipInfo.style.display = "flex";
    this.renderShipInfo(context);

    const restored = tryRestore ? BingoStorage.loadGameState() : null;

    if (restored && restored.gameType === "battleship") {
      context.ownShipMap = this.rehydrateShipMap(restored.ownShipMap || this.createEmptyMap(null), context.ships);
      context.attackStateMap = restored.attackStateMap || this.createEmptyMap("");
      context.ownHitMap = restored.ownHitMap || this.createEmptyMap(false);
    } else {
      context.ownShipMap = this.createEmptyMap(null);
      context.attackStateMap = this.createEmptyMap("");
      context.ownHitMap = this.createEmptyMap(false);
      this.placeShipsOnOwnMap(context);
    }

    context.elements.gameBoard.className = "battle-layout";

    const attackPanel = document.createElement("div");
    attackPanel.className = "battle-panel";

    const attackTitle = document.createElement("div");
    attackTitle.className = "battle-title";
    attackTitle.textContent = "攻擊紀錄板：紅色＝命中，白色＝沒中";

    const attackBoard = this.createBattleBoard(context, "attack");

    attackPanel.appendChild(attackTitle);
    attackPanel.appendChild(attackBoard);

    const ownPanel = document.createElement("div");
    ownPanel.className = "battle-panel";

    const ownTitle = document.createElement("div");
    ownTitle.className = "battle-title";
    ownTitle.textContent = "自己的船板：點擊船格可標記被命中";

    const ownBoard = this.createBattleBoard(context, "own");

    ownPanel.appendChild(ownTitle);
    ownPanel.appendChild(ownBoard);

    context.elements.gameBoard.appendChild(attackPanel);
    context.elements.gameBoard.appendChild(ownPanel);

    requestAnimationFrame(function () {
      BingoResize.resizeBoard(context);
    });

    context.saveGameState();
  },

  renderShipInfo(context) {
    context.elements.shipInfo.innerHTML = "";

    context.ships.forEach(function (ship) {
      const badge = document.createElement("span");
      badge.className = "ship-badge " + ship.badgeClassName;
      badge.textContent = ship.code + " " + ship.name + " " + ship.size + "格";

      context.elements.shipInfo.appendChild(badge);
    });
  },

  createBattleBoard(context, type) {
    const board = document.createElement("div");
    board.className = "battle-board";
    board.dataset.boardType = type;

    this.addBattleHeaderCell(board, "");

    for (let c = 0; c < 10; c++) {
      this.addBattleHeaderCell(board, BingoUtils.getColumnLetter(c));
    }

    for (let r = 0; r < 10; r++) {
      this.addBattleHeaderCell(board, String(r + 1));

      for (let c = 0; c < 10; c++) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "battle-cell";
        cell.dataset.row = r;
        cell.dataset.col = c;

        if (type === "attack") {
          this.applyAttackCellState(cell, context.attackStateMap[r][c]);

          cell.addEventListener("click", function () {
            BattleshipGame.toggleAttackCell(context, this);
          });
        }

        if (type === "own") {
          const ship = context.ownShipMap[r][c];

          if (ship) {
            cell.textContent = ship.code;
            cell.classList.add(ship.className);
            cell.title = ship.name;
          }

          if (context.ownHitMap[r][c]) {
            cell.textContent = "●";
            cell.classList.add("own-hit");
          }

          cell.addEventListener("click", function () {
            BattleshipGame.toggleOwnShipCell(context, this);
          });
        }

        board.appendChild(cell);
      }
    }

    return board;
  },

  addBattleHeaderCell(board, text) {
    const cell = document.createElement("div");
    cell.className = text === "" ? "battle-cell battle-corner" : "battle-cell battle-header";
    cell.textContent = text;
    board.appendChild(cell);
  },

  toggleAttackCell(context, cell) {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    const current = context.attackStateMap[row][col];

    if (current === "") {
      context.attackStateMap[row][col] = "miss";
    } else if (current === "miss") {
      context.attackStateMap[row][col] = "hit";
    } else {
      context.attackStateMap[row][col] = "";
    }

    this.applyAttackCellState(cell, context.attackStateMap[row][col]);
    context.saveGameState();
  },

  applyAttackCellState(cell, state) {
    cell.classList.remove("attack-miss", "attack-hit");
    cell.textContent = "";

    if (state === "miss") {
      cell.textContent = "○";
      cell.classList.add("attack-miss");
    }

    if (state === "hit") {
      cell.textContent = "●";
      cell.classList.add("attack-hit");
    }
  },

  toggleOwnShipCell(context, cell) {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    const ship = context.ownShipMap[row][col];

    if (!ship) {
      return;
    }

    context.ownHitMap[row][col] = !context.ownHitMap[row][col];

    if (context.ownHitMap[row][col]) {
      cell.textContent = "●";
      cell.classList.add("own-hit");
    } else {
      cell.textContent = ship.code;
      cell.classList.remove("own-hit");
      cell.classList.add(ship.className);
    }

    context.saveGameState();
  },

  createEmptyMap(defaultValue) {
    return Array.from({ length: 10 }, function () {
      return Array(10).fill(defaultValue);
    });
  },

  placeShipsOnOwnMap(context) {
    context.ships.forEach((ship) => {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 1000) {
        attempts++;

        const isHorizontal = Math.random() < 0.5;
        const startRow = Math.floor(Math.random() * 10);
        const startCol = Math.floor(Math.random() * 10);

        if (this.canPlaceShip(context, startRow, startCol, ship.size, isHorizontal)) {
          for (let i = 0; i < ship.size; i++) {
            const row = isHorizontal ? startRow : startRow + i;
            const col = isHorizontal ? startCol + i : startCol;

            context.ownShipMap[row][col] = ship;
          }

          placed = true;
        }
      }
    });
  },

  canPlaceShip(context, startRow, startCol, size, isHorizontal) {
    if (isHorizontal && startCol + size > 10) {
      return false;
    }

    if (!isHorizontal && startRow + size > 10) {
      return false;
    }

    for (let i = 0; i < size; i++) {
      const row = isHorizontal ? startRow : startRow + i;
      const col = isHorizontal ? startCol + i : startCol;

      if (context.ownShipMap[row][col]) {
        return false;
      }
    }

    return true;
  },

  rehydrateShipMap(savedMap, ships) {
    const shipByCode = {};

    ships.forEach(function (ship) {
      shipByCode[ship.code] = ship;
    });

    return savedMap.map(function (row) {
      return row.map(function (cell) {
        if (!cell) {
          return null;
        }

        return shipByCode[cell.code] || null;
      });
    });
  }
};
