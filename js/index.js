const BingoApp = {
  config: { ...BingoConfig.defaultConfig },
  emtWords: [],
  ships: [],
  boardData: [],
  selectedMap: [],
  ownShipMap: [],
  attackStateMap: [],
  ownHitMap: [],
  hasCelebrated: false,

  elements: {},

  async init() {
    this.bindElements();

    const fallbackEmtWords = window.BingoFallbackEmtWords || [];
    const fallbackShips = window.BingoFallbackShips || [];

    this.emtWords = await BingoUtils.loadJson(BingoConfig.dataPaths.emt, fallbackEmtWords);
    this.ships = await BingoUtils.loadJson(BingoConfig.dataPaths.ships, fallbackShips);

    this.initSettingForm();

    this.elements.gameType.value = this.config.gameType;
    this.elements.targetLineText.textContent = this.config.targetLines;

    BingoFireworks.init(this.elements.fireworksCanvas);

    this.createBoard(true);
    this.bindEvents();
  },

  bindElements() {
    this.elements.gameBoard = document.getElementById("gameBoard");
    this.elements.lineCount = document.getElementById("lineCount");
    this.elements.targetLineText = document.getElementById("targetLineText");
    this.elements.gameType = document.getElementById("gameType");
    this.elements.bingoStatus = document.getElementById("bingoStatus");
    this.elements.shipInfo = document.getElementById("shipInfo");
    this.elements.settingRows = document.getElementById("settingRows");
    this.elements.settingCols = document.getElementById("settingCols");
    this.elements.settingMin = document.getElementById("settingMin");
    this.elements.settingMax = document.getElementById("settingMax");
    this.elements.settingTargetLines = document.getElementById("settingTargetLines");
    this.elements.settingAlert = document.getElementById("settingAlert");
    this.elements.btnStart = document.getElementById("btnStart");
    this.elements.btnSaveSetting = document.getElementById("btnSaveSetting");
    this.elements.fireworksCanvas = document.getElementById("fireworksCanvas");
  },

  bindEvents() {
    this.elements.btnStart.addEventListener("click", () => {
      BingoStorage.clearGameState();
      this.createBoard(false);
    });

    this.elements.btnSaveSetting.addEventListener("click", () => {
      this.applySetting();
    });

    this.elements.gameType.addEventListener("change", () => {
      this.config.gameType = this.elements.gameType.value;
      BingoStorage.clearGameState();
      this.createBoard(false);
    });

    window.addEventListener("resize", () => {
      BingoResize.resizeBoard(this);
      BingoFireworks.resizeCanvas();
    });
  },

  initSettingForm() {
    this.elements.settingRows.value = this.config.rows;
    this.elements.settingCols.value = this.config.cols;
    this.elements.settingMin.value = this.config.min;
    this.elements.settingMax.value = this.config.max;
    this.elements.settingTargetLines.value = this.config.targetLines;
  },

  resetGameBoardElement() {
    this.elements.gameBoard.innerHTML = "";
    this.elements.gameBoard.className = "";
    this.elements.gameBoard.removeAttribute("style");
  },

  applySetting() {
    const rows = parseInt(this.elements.settingRows.value, 10);
    const cols = parseInt(this.elements.settingCols.value, 10);
    const min = parseInt(this.elements.settingMin.value, 10);
    const max = parseInt(this.elements.settingMax.value, 10);
    const targetLines = parseInt(this.elements.settingTargetLines.value, 10);
    const total = rows * cols;
    const maxLines = BingoUtils.calculateMaxPossibleLines(rows, cols);

    if (!rows || !cols || rows < 2 || cols < 2 || rows > 10 || cols > 10) {
      this.showSettingAlert("列與欄需介於 2 到 10。");
      return;
    }

    if (min >= max) {
      this.showSettingAlert("最小值必須小於最大值。");
      return;
    }

    if ((max - min + 1) < total) {
      this.showSettingAlert("最大值與最小值範圍不足，無法產生不重複數字。");
      return;
    }

    if (!targetLines || targetLines < 1 || targetLines > maxLines) {
      this.showSettingAlert("完成連線數需介於 1 到 " + maxLines + "。");
      return;
    }

    this.config.rows = rows;
    this.config.cols = cols;
    this.config.min = min;
    this.config.max = max;
    this.config.targetLines = targetLines;
    this.config.gameType = this.elements.gameType.value;

    this.hideSettingAlert();
    this.elements.targetLineText.textContent = this.config.targetLines;

    BingoStorage.clearGameState();
    this.createBoard(false);

    const modalElement = document.getElementById("settingModal");
    const modal = bootstrap.Modal.getInstance(modalElement);

    if (modal) {
      modal.hide();
    }
  },

  showSettingAlert(message) {
    this.elements.settingAlert.textContent = message;
    this.elements.settingAlert.classList.remove("d-none");
  },

  hideSettingAlert() {
    this.elements.settingAlert.textContent = "";
    this.elements.settingAlert.classList.add("d-none");
  },

  createBoard(tryRestore) {
    this.hasCelebrated = false;
    BingoFireworks.stop();
    this.resetGameBoardElement();

    if (this.config.gameType === "battleship") {
      BattleshipGame.create(this, tryRestore);
      return;
    }

    BingoGame.create(this, tryRestore);
  },

  saveGameState() {
    const state = {
      gameType: this.config.gameType,
      rows: this.config.rows,
      cols: this.config.cols,
      boardData: this.boardData,
      selectedMap: this.selectedMap,
      ownShipMap: this.ownShipMap,
      attackStateMap: this.attackStateMap,
      ownHitMap: this.ownHitMap
    };

    BingoStorage.saveGameState(state);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  BingoApp.init();
});
