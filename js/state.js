/********************************************************************************
 * 状態管理
 *
 * @author Shrimp1228
 * @license MIT
 * @copyright (c) 2025 Shrimp1228
 ********************************************************************************/

// ゲーム状態管理
let availableTextItems = [] // 出題アイテム配列
let selectedGameMode = CONFIG.game.DEFAULT_MODE // ゲームモード (CONFIG.game.MODESの値)
let selectedDifficulty = "" // 難易度 (CONFIG.game.DIFFICULTIESの値)
let currentTextItem // 現在の出題アイテム
let currentTargetText // 現在のタイピング対象文字列
let lastCompletedTextItem = null // 前回完了したお題アイテム（エンドレスモード用）
let isGameInProgress = false // ゲーム開始フラグ
let isProcessingCorrectAnswer = false // 正解処理中フラグ
let isCountdownInProgress = false // カウントダウン中フラグ

// タイミング管理
let textStartTime = Date.now() // 個別テキストの開始時間
let gameSessionStartTime = 0 // ゲーム全体の開始時間
let gameSessionEndTime = 0 // ゲーム全体の終了時間

// 入力状態管理
let currentInputPosition = 0 // 現在の入力位置
let lastMistakePosition = -1 // 最後にミスした位置

// 統計データ
let textStatistics = [] // テキスト別統計データ
let totalCharacterCount = 0 // 総入力文字数
let totalMistakeCount = 0 // 総ミス数
let mistakeAggregateMap = new Map() // ミス文字の集約データ

// 結果画面用データ
let statisticsDataForSorting = [] // 統計データのコピー（ソート用）
let currentSortConfiguration = { column: "maxWaitTime", ascending: false } // 現在のソート状態

/**
 * 統計データを初期化する
 */
function initializeStatistics() {
  textStatistics = []
  totalCharacterCount = 0
  totalMistakeCount = 0
  mistakeAggregateMap.clear()
  statisticsDataForSorting = []
}

/**
 * 統計オブジェクトを作成する
 * @param {Object} item 出題アイテム
 * @param {number} startTime 開始時間
 * @returns {Object} 統計オブジェクト
 */
function createTextStat(item, startTime) {
  return {
    text: item.kanji,
    alp: item.alp,
    startTime: startTime,
    firstInputTime: null,
    completedTime: null,
    missCount: 0,
    charTimings: [], // 各文字の入力時間記録
    missedPositions: new Set(), // ミスした位置記録
    missDetails: [], // ミスの詳細情報
  }
}
