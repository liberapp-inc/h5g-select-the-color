type ComboType = "single" | "combo1" | "combo2" | "combo3" | "combo4";
const ComboTypeTable: ComboType[] = ["single", "combo1", "combo2", "combo2", "combo3", "combo3", "combo3", "combo4"];

function comboType(numberOfCombos: number): ComboType {
  if (ComboTypeTable.length <= numberOfCombos) {
    numberOfCombos = ComboTypeTable.length - 1;
  }
  return ComboTypeTable[numberOfCombos];
}

interface Level {
  rowcol: [number, number];
  framesOfTurn: number;
  depthColor: number;
}

const Levels: Level[] = [
  // 0
  { rowcol: [2, 2], framesOfTurn: FramesOf4thNote * 4, depthColor: 50 },
  // 01-10
  { rowcol: [2, 2], framesOfTurn: FramesOf4thNote * 4, depthColor: 50 },
  { rowcol: [2, 2], framesOfTurn: FramesOf4thNote * 4, depthColor: 50 },
  { rowcol: [2, 2], framesOfTurn: FramesOf4thNote * 4, depthColor: 45 },
  { rowcol: [2, 2], framesOfTurn: FramesOf4thNote * 4, depthColor: 45 },
  { rowcol: [2, 2], framesOfTurn: FramesOf4thNote * 4, depthColor: 40 },

  { rowcol: [2, 2], framesOfTurn: FramesOf4thNote * 3, depthColor: 45 },
  { rowcol: [2, 2], framesOfTurn: FramesOf4thNote * 3, depthColor: 45 },
  { rowcol: [2, 2], framesOfTurn: FramesOf4thNote * 3, depthColor: 40 },
  { rowcol: [2, 2], framesOfTurn: FramesOf4thNote * 3, depthColor: 40 },
  { rowcol: [2, 2], framesOfTurn: FramesOf4thNote * 3, depthColor: 35 },

  // 11-20
  { rowcol: [2, 3], framesOfTurn: FramesOf4thNote * 4, depthColor: 50 },
  { rowcol: [2, 3], framesOfTurn: FramesOf4thNote * 4, depthColor: 50 },
  { rowcol: [2, 3], framesOfTurn: FramesOf4thNote * 4, depthColor: 45 },
  { rowcol: [2, 3], framesOfTurn: FramesOf4thNote * 4, depthColor: 45 },
  { rowcol: [2, 3], framesOfTurn: FramesOf4thNote * 4, depthColor: 40 },

  { rowcol: [2, 3], framesOfTurn: FramesOf4thNote * 3, depthColor: 45 },
  { rowcol: [2, 3], framesOfTurn: FramesOf4thNote * 3, depthColor: 45 },
  { rowcol: [2, 3], framesOfTurn: FramesOf4thNote * 3, depthColor: 40 },
  { rowcol: [2, 3], framesOfTurn: FramesOf4thNote * 3, depthColor: 40 },
  { rowcol: [2, 3], framesOfTurn: FramesOf4thNote * 3, depthColor: 35 },

  // 21-30
  { rowcol: [3, 3], framesOfTurn: FramesOf4thNote * 4, depthColor: 40 },
  { rowcol: [3, 3], framesOfTurn: FramesOf4thNote * 4, depthColor: 40 },
  { rowcol: [3, 3], framesOfTurn: FramesOf4thNote * 4, depthColor: 35 },
  { rowcol: [3, 3], framesOfTurn: FramesOf4thNote * 4, depthColor: 35 },
  { rowcol: [3, 3], framesOfTurn: FramesOf4thNote * 4, depthColor: 30 },

  { rowcol: [3, 3], framesOfTurn: FramesOf4thNote * 3, depthColor: 35 },
  { rowcol: [3, 3], framesOfTurn: FramesOf4thNote * 3, depthColor: 35 },
  { rowcol: [3, 3], framesOfTurn: FramesOf4thNote * 3, depthColor: 30 },
  { rowcol: [3, 3], framesOfTurn: FramesOf4thNote * 3, depthColor: 30 },
  { rowcol: [3, 3], framesOfTurn: FramesOf4thNote * 3, depthColor: 25 },

  // 31-40
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 3, depthColor: 35 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 3, depthColor: 35 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 3, depthColor: 30 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 3, depthColor: 30 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 3, depthColor: 25 },

  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 2, depthColor: 30 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 2, depthColor: 30 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 2, depthColor: 25 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 2, depthColor: 25 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 2, depthColor: 20 },

  // 41-50
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 1.5, depthColor: 30 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 1.5, depthColor: 30 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 1.5, depthColor: 25 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 1.5, depthColor: 25 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 1.5, depthColor: 20 },

  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 1, depthColor: 25 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 1, depthColor: 25 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 1, depthColor: 20 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 1, depthColor: 20 },
  { rowcol: [3, 4], framesOfTurn: FramesOf4thNote * 1, depthColor: 15 },
];