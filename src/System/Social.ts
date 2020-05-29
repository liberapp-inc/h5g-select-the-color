class Social {
  private static sdk;
  private static leaderboard;
  private static myBestEntry;

  static async init() {
    const sdk = await Sdk.loadSdk();
    this.sdk = sdk;
    Toast.show({ text: "ログイン中・・・", delay: 30000, canHide: true });
    await sdk.initializeAsync();
    await sdk.startGameAsync();
    Toast.show({ text: `${this.playerName}さんようこそ！`, delay: 30000, canHide: true });
    this.leaderboard = await sdk.getLeaderboardAsync("default");
    const [entryCount, entries, playerEntry] = await Promise.all([
      this.leaderboard.getEntryCountAsync(),
      this.leaderboard.getEntriesAsync(3, 0),
      this.leaderboard.getPlayerEntryAsync()
    ]);
    this.playerEntry = playerEntry;

    if (this.hasBest) {
      Toast.show({ text: `今のところ${entryCount}人中${this.bestRank}位です`, delay: 3000 });
    } else {
      const p1 = entries[0];
      if (p1) {
        console.log(p1);
        const p1Name = p1.getPlayer().getName();
        const p1Score = p1.getScore();
        Toast.show({ text: `${entryCount}人が遊んでいます!\n一番は${p1Name}さん\nスコアは${p1Score}です`, delay: 3000 });
      }
    }
  }

  static get hasBest(): boolean {
    return !!this.myBestEntry;
  }

  static get bestScore(): number {
    return this.hasBest ? this.myBestEntry.getScore() : 0;
  }

  static get bestRank(): number {
    return this.hasBest ? this.myBestEntry.getRank() : undefined;
  }

  static set playerEntry(playerEntry: any) {
    console.log("myBest:", this.myBestEntry, playerEntry);
    this.myBestEntry = playerEntry;
    TheGame.setBest({ bestScore: Social.bestScore, bestRank: Social.bestRank });
  }

  static async setScore(score: number): Promise<void> {
    if (!this.leaderboard) {
      console.log("ハイスコアを送信しません");
      return;
    }
    console.log(`setScore ${score}`);
    Toast.show({ text: `ハイスコアを送信中`, delay: 30000, canHide: true });
    const playerEntry = await this.leaderboard.setScoreAsync(score);
    Toast.show({ text: `順位は${this.bestRank}位でした`, delay: 3000 });
    return
  }

  static get playerName() {
    return this.sdk.player.getName() || "名無し";
  }
}