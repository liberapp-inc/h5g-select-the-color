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
  return rawData;
}

