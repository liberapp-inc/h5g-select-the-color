
class Social {

  private static sdk;
  private static leaderboard;

  static async init(online: boolean): Promise<Player> {
    if (!online) {
      return { ...AnonymousPlayerProfile, ...InitialPlayerData, ...InitialPlayerLeaderboard };
    }

    const sdk = await Sdk.loadSdk();
    this.sdk = sdk;
    Toast.show({ text: "ログイン中・・・", delay: 30000, canHide: true });
    await sdk.initializeAsync();
    await sdk.startGameAsync();

    const player = {
      name: sdk.player.getName(),
      avatarUrl: sdk.player.getPhoto()
    }

    Toast.show({ text: `${player.name}さんようこそ！`, delay: 30000, canHide: true });
    this.leaderboard = await sdk.getLeaderboardAsync("default");
    const [entryCount, entries, playerEntry, rawData] = await Promise.all([
      this.leaderboard.getEntryCountAsync(),
      this.leaderboard.getEntriesAsync(3, 0),
      this.leaderboard.getPlayerEntryAsync(),
      this.sdk.player.getDataAsync(Object.keys(InitialPlayerData))
    ]);
    const playerData = decodePlayerData(rawData);
    let playerLeaderboard: PlayerLeaderboard;
    if (playerEntry) {
      playerLeaderboard = {
        bestRank: playerEntry.getRank(),
        bestScore: playerEntry.getScore(),
      };
      Toast.show({ text: `今のところ${entryCount}人中${playerLeaderboard.bestRank}位です`, delay: 3000 });
    } else {
      playerLeaderboard = InitialPlayerLeaderboard;
      const p1 = entries[0];
      if (p1) {
        console.log(p1);
        const p1Name = p1.getPlayer().getName();
        const p1Score = p1.getScore();
        Toast.show({ text: `${entryCount}人が遊んでいます!\n一番は${p1Name}さん\nスコアは${p1Score}です`, delay: 3000 });
      }
    }
    return { ...player, ...playerData, ...playerLeaderboard };
  }

  static updateData(player: Player): Promise<void> {
    console.log(`updateData ${player}`);
    if (!this.sdk || !this.sdk.player) {
      console.log("データを保存しません");
      return;
    }
    const data: PlayerData = {
      commulativeExp: player.commulativeExp,
      commulativeScore: player.commulativeScore,
      level: player.level,
      stage: player.stage
    };
    const promise: Promise<any> = this.sdk.player.setDataAsync(data);
    promise.then(() => console.log("保存完了"));
  }

  static async setScore(score: number): Promise<{ bestScore: number, bestRank: number } | undefined> {
    console.log(`setScore ${score}`);
    if (!this.leaderboard) {
      console.log("ハイスコアを送信しません");
      return undefined;
    }

    Toast.show({ text: `ハイスコアを送信中`, delay: 30000, canHide: true });
    const playerEntry = await this.leaderboard.setScoreAsync(score);

    const bestScore = playerEntry.getScore();
    const bestRank = playerEntry.getRank();
    Toast.show({ text: `順位は${bestRank}位でした`, delay: 3000 });

    return { bestScore, bestRank };
  }
}