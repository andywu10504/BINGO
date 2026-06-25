const BingoGame = {
  create(context, tryRestore) {
    context.elements.bingoStatus.style.display = "block";
    context.elements.shipInfo.style.display = "none";

    const restored = tryRestore ? BingoStorage.loadGameState() : null;

    if (
      restored &&
      restored.gameType === context.config.gameType &&
      restored.rows === context.config.rows &&
      restored.cols === context.config.cols
    ) {
      context.boardData = restored.boardData || [];
      context.selectedMap = restored.selectedMap || [];
    } else {
      context.boardData = this.generateBoardData(context);
      context.selectedMap = Array.from({ length: context.config.rows }, function () {
        return Array(context.config.cols).fill(false);
      });
    }

    const gameBoard = context.elements.gameBoard;

    gameBoard.className = "bingo-board";
    gameBoard.style.gridTemplateColumns = `repeat(${context.config.cols}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${context.config.rows}, 1fr)`;

    for (let r = 0; r < context.config.rows; r++) {
      for (let c = 0; c < context.config.cols; c++) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "bingo-cell";
        cell.dataset.row = r;
        cell.dataset.col = c;

        this.setCellContent(cell, context.boardData[r][c], context.config.gameType);

        if (context.selectedMap[r][c]) {
          cell.classList.add("active");
        }

        cell.addEventListener("click", function () {
          const row = parseInt(this.dataset.row, 10);
          const col = parseInt(this.dataset.col, 10);

          context.selectedMap[row][col] = !context.selectedMap[row][col];
          this.classList.toggle("active", context.selectedMap[row][col]);

          BingoGame.updateLineCount(context);
          context.saveGameState();
        });

        gameBoard.appendChild(cell);
      }
    }

    BingoResize.resizeBoard(context);
    this.updateLineCount(context);
    context.saveGameState();
  },

  setCellContent(cell, value, gameType) {
    if (gameType === "emt" && value && typeof value === "object") {
      cell.innerHTML = "";

      const wrapper = document.createElement("div");
      wrapper.className = "emt-item";

      const icon = document.createElement("i");
      icon.className = "fa-solid " + value.icon;

      const text = document.createElement("span");
      text.textContent = value.text;

      wrapper.appendChild(icon);
      wrapper.appendChild(text);
      cell.appendChild(wrapper);
      return;
    }

    cell.textContent = value;
  },

  generateBoardData(context) {
    const total = context.config.rows * context.config.cols;
    const values = [];

    if (context.config.gameType === "emt") {
      const words = BingoUtils.shuffleArray([...context.emtWords]);

      while (values.length < total) {
        values.push(words[values.length % words.length]);
      }

      return BingoUtils.toMatrix(values, context.config.rows, context.config.cols);
    }

    for (let i = context.config.min; i <= context.config.max; i++) {
      values.push(i);
    }

    BingoUtils.shuffleArray(values);

    return BingoUtils.toMatrix(values, context.config.rows, context.config.cols);
  },

  updateLineCount(context) {
    const count = this.calculateCurrentLines(context);

    context.elements.lineCount.textContent = count;

    if (!context.hasCelebrated && count >= context.config.targetLines) {
      context.hasCelebrated = true;
      BingoFireworks.start();
    }
  },

  calculateCurrentLines(context) {
    let count = 0;

    for (let r = 0; r < context.config.rows; r++) {
      if (context.selectedMap[r].every(function (x) { return x; })) {
        count++;
      }
    }

    for (let c = 0; c < context.config.cols; c++) {
      let complete = true;

      for (let r = 0; r < context.config.rows; r++) {
        if (!context.selectedMap[r][c]) {
          complete = false;
          break;
        }
      }

      if (complete) {
        count++;
      }
    }

    if (context.config.rows === context.config.cols) {
      let diagonal1 = true;
      let diagonal2 = true;

      for (let i = 0; i < context.config.rows; i++) {
        if (!context.selectedMap[i][i]) {
          diagonal1 = false;
        }

        if (!context.selectedMap[i][context.config.cols - 1 - i]) {
          diagonal2 = false;
        }
      }

      if (diagonal1) {
        count++;
      }

      if (diagonal2) {
        count++;
      }
    }

    return count;
  }
};
