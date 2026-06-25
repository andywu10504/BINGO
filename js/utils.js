const BingoUtils = {
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];

      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  },

  toMatrix(values, rows, cols) {
    const result = [];
    let index = 0;

    for (let r = 0; r < rows; r++) {
      const row = [];

      for (let c = 0; c < cols; c++) {
        row.push(values[index++]);
      }

      result.push(row);
    }

    return result;
  },

  calculateMaxPossibleLines(rows, cols) {
    let maxLines = rows + cols;

    if (rows === cols) {
      maxLines += 2;
    }

    return maxLines;
  },

  getColumnLetter(index) {
    return String.fromCharCode(65 + index);
  },

  async loadJson(path, fallbackData) {
    try {
      const response = await fetch(path, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("JSON 載入失敗：" + path);
      }

      return await response.json();
    } catch {
      return fallbackData;
    }
  }
};
