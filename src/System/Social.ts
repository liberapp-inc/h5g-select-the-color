class Social {
    private static sdk;
    private static leaderboard;
    private static myBest;

    static async init() {
        const sdk = await Sdk.loadSdk();
        this.sdk = sdk;
        Toast.show({ text: "ログイン中・・・", delay: 1000 });
        await sdk.initializeAsync();
        await sdk.startGameAsync();
        Toast.show({ text: `${this.playerName}さんようこそ！`, delay: 3000 });
        this.leaderboard = await sdk.getLeaderboardAsync("default");
        const [entryCount, entries, myBest] = await Promise.all([
            this.leaderboard.getEntryCountAsync(),
            this.leaderboard.getEntriesAsync(3,0),
            this.leaderboard.getPlayerEntryAsync()
        ]);
        this.myBest = myBest;
        if (this.hasBest) {
            Toast.show({ text: `今のところ${entryCount}人中${this.bestRank}位です`, delay: 3000 });
        } else {
            const p1 = entries[0];
            const p1Name= p1.getPlayer().getName();
            const p1Score = p1.getScore();
            if (p1) {
                Toast.show({ text: `${entryCount}人が遊んでいます!\n一番は${p1Name}さん\nスコアは${p1Score}です`, delay: 3000 });
            }
        }
    }

    static get hasBest(): boolean {
        return !!this.myBest;
    }

    static get bestScore(): number {
        return this.hasBest ? this.myBest.getScore() : 0;
    }

    static get bestRank(): string {
        return this.myBest.getRank();
    }

    static setScore(score: number) {
        setTimeout(async () => {
            Toast.show({ text: `ハイスコアを送信中`, delay: 1000 });
            this.myBest = await this.leaderboard.setScoreAsync(score);
            Toast.show({ text: `順位は${this.bestRank}位でした`, delay: 3000 });
        }, 1);
    }

    static get playerName() {
        return this.sdk.player.getName() || "名無し";
    }
}