interface PlayerData {
  level: number;
  stage: number;
  commulativeExp: number;
  commulativeScore: number;
}

const InitialPlayerData = {
  level: 1,
  stage: 1,
  commulativeExp: 0,
  commulativeScore: 0
}

interface PlayerProfile {
  name: string;
  avatarUrl: string;
}

const AnonymousPlayerProfile: PlayerProfile = {
  name: "???",
  avatarUrl: "???"
}

interface PlayerLeaderboard {
  bestScore: number;
  bestRank: number | undefined;
}

const InitialPlayerLeaderboard: PlayerLeaderboard = {
  bestScore: 0,
  bestRank: undefined
}

type Player = PlayerProfile & PlayerData & PlayerLeaderboard;

function decodePlayerData(rawData: any): PlayerData {
  console.log("decodePlayerData", rawData);
  if (!rawData) {
    console.error("decodePlayerData: Empty");
    return InitialPlayerData;
  }

  if (typeof rawData.level !== "number" ||
    (typeof rawData.stage !== "number") ||
    typeof rawData.commulativeExp !== "number" ||
    typeof rawData.commulativeScore !== "number") {
    console.error("decodePlayerData: Invalid, ", rawData);
    return InitialPlayerData;
  }
  return {
    level: Math.max(1, Math.min(Math.floor(rawData.level), LevelOptions.length + 1)),
    stage: Math.max(1, Math.min(Math.floor(rawData.stage), StageOptions.length + 1)),
    commulativeExp: Math.floor(rawData.commulativeExp),
    commulativeScore: Math.floor(rawData.commulativeScore)
  };
}

