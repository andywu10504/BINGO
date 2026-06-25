const BingoResize = {
  resizeBoard(context) {
    const gameBoard = context.elements.gameBoard;
    const wrap = gameBoard.parentElement;

    if (!wrap) {
      return;
    }

    if (context.config.gameType === "battleship") {
      this.resizeBattleBoards(gameBoard);
      return;
    }

    const style = window.getComputedStyle(gameBoard);
    const gap = parseFloat(style.gap) || 0;
    const size = Math.floor(Math.min(wrap.clientWidth, wrap.clientHeight));

    gameBoard.style.width = size + "px";
    gameBoard.style.height = size + "px";

    const cellWidth = (size - gap * (context.config.cols - 1)) / context.config.cols;
    const cellHeight = (size - gap * (context.config.rows - 1)) / context.config.rows;
    const cellSize = Math.floor(Math.min(cellWidth, cellHeight));

    const cells = gameBoard.querySelectorAll(".bingo-cell");

    cells.forEach(function (cell) {
      cell.style.fontSize = BingoResize.getBingoFontSize(cellSize, context.config.gameType) + "px";
    });
  },

  resizeBattleBoards(gameBoard) {
    const boards = gameBoard.querySelectorAll(".battle-board");

    boards.forEach(function (board) {
      board.removeAttribute("style");

      const panel = board.parentElement;
      const availableWidth = panel.clientWidth;
      const availableHeight = panel.clientHeight - 34;
      const size = Math.floor(Math.min(availableWidth, availableHeight));

      board.style.width = size + "px";
      board.style.height = size + "px";

      const cellSize = Math.floor((size - 3 * 10) / 11);
      const cells = board.querySelectorAll(".battle-cell");

      cells.forEach(function (cell) {
        cell.style.fontSize = Math.max(8, Math.min(18, Math.floor(cellSize * 0.36))) + "px";
      });
    });
  },

  getBingoFontSize(cellSize, gameType) {
    if (gameType === "emt") {
      return Math.max(9, Math.min(22, Math.floor(cellSize * 0.22)));
    }

    return Math.max(16, Math.min(36, Math.floor(cellSize * 0.42)));
  }
};
