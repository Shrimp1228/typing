/********************************************************************************
 * ゲーム設定・定数管理
 *
 * @author Shrimp1228
 * @license MIT
 * @copyright (c) 2025 Shrimp1228
 ********************************************************************************/

/**
 * アプリケーション全体の設定オブジェクト
 */
const CONFIG = {
  // タイミング設定
  timing: {
    COUNTDOWN_DURATION: 3, // カウントダウン秒数
    NEXT_PROBLEM_DELAY: 500, // 次の問題表示までの遅延時間(ms)
    MISS_MESSAGE_DURATION: 500, // ミス表示時間(ms)
  },

  // 音声設定
  audio: {
    BGM_VOLUME: 0.3, // BGM音量
    TYPING_SOUND_COUNT: 9, // タイピング効果音ファイル数
    BGM_FILES: [
      // BGMファイル名配列
      "すこしの安息と.mp3",
      "みやびごころ.mp3",
      "ソメイヨシノ.mp3",
      "別れの時.mp3",
      "千年の孤独.mp3",
      "屍を越えて.mp3",
      "憂愁.mp3",
      "日曜のおわりに.mp3",
      "母なる海へ.mp3",
      "淡々と流れていく時間.mp3",
    ],
    SOUND_PATHS: {
      mistakeSound: "mp3/type/miss.mp3",
      typingSound: "mp3/type/type", // タイピング音のパス共通部分
    },
    MUSIC_PATHS: {
      backgroundMusicDir: "mp3/bgm/", // BGMディレクトリパス
    },
  },

  // UI設定
  ui: {
    COLORS: {
      INPUT_TEXT: "#00ff00", // 入力欄テキスト色
      CORRECT_MESSAGE: "green", // 正解メッセージ色
      MISS_MESSAGE: "red", // ミスメッセージ色
    },
    MESSAGES: {
      CORRECT: "✅ 正解！",
      MISS: "❌ ミス",
    },
  },

  // ゲーム設定
  game: {
    DEFAULT_MODE: "challenge", // デフォルトゲームモード
    DEFAULT_DIFFICULTY: "beginner", // デフォルト難易度
    MODES: ["challenge", "endless"], // 利用可能なゲームモード
    DIFFICULTIES: ["beginner", "intermediate", "advanced"], // 利用可能な難易度
    BACKGROUND_IMAGES: [
      "jpg/ジャングルの神殿　忘れられた古代文明の探検.jpg",
      "jpg/ジャングルの秘境と古代文明の扉.jpg",
      "jpg/崩壊した都市の中の静寂な戦車.jpg",
      "jpg/時が止まった工場跡地に降り注ぐ雨と秋の情景.jpg",
      "jpg/時間が刻んだ錆びついた線路と工場の遺構.jpg",
      "jpg/海底から見上げる海底遺跡.jpg",
      "jpg/濡れた床にネオンの光が反射する薄暗い廊下.jpg",
      "jpg/荒野に残された昔日の面影を残す廃屋.jpg",
      "jpg/雨上がりの静寂に包まれた都会の通路.jpg",
      "jpg/霧に消えゆく古城の面影.jpg",
      "jpg/霧の中に浮かび上がる廃墟の階段.jpg",
    ],
  },
}
