
interface Result {
  years: number;
  days: number;
  level: number;
  isLevelUped: boolean;
  stage: number;
  isStageUped: boolean;
  commulativeScore: {
    from: number;
    to: number;
  },
  commulativeExp: {
    from: number;
    to: number;
  }
}