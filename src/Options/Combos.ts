type ComboType = "single" | "combo1" | "combo2" | "combo3" | "combo4";
const ComboTypeTable: ComboType[] = ["single", "combo1", "combo2", "combo2", "combo3", "combo3", "combo3", "combo4"];

function comboType(numberOfCombos: number): ComboType {
  if (ComboTypeTable.length <= numberOfCombos) {
    numberOfCombos = ComboTypeTable.length - 1;
  }
  return ComboTypeTable[numberOfCombos];
}
