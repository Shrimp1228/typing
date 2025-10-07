/********************************************************************************
 * UI操作、DOM管理
 *
 * @author Shrimp1228
 * @license MIT
 * @copyright (c) 2025 Shrimp1228
 ********************************************************************************/

// DOM要素の取得
const kanjiDisplayElement = document.getElementById("target") // 漢字表示エリア
const yomiDisplayElement = document.getElementById("yomi") // 読み表示エリア
const alphabetDisplayElement = document.getElementById("alp") // アルファベット表示エリア
const typingInputElement = document.getElementById("typingInput") // 入力欄
const resultDisplayElement = document.getElementById("result") // 結果表示エリア
const startScreenElement = document.getElementById("startScreen") // スタート画面
const startMessageElement = document.getElementById("startMessage") // スタートメッセージ
const modeSelectionElement = document.getElementById("modeSelection") // モード・難易度選択エリア
const countdownDisplayElement = document.getElementById("countdown") // カウントダウン表示
const resultScreenElement = document.getElementById("resultScreen") // 結果画面
const statisticsTableBodyElement = document.getElementById("textStatsBody") // 統計テーブルのbody要素
const currentBgmTitleElement = document.getElementById("currentBgmTitle") // BGM曲名表示要素

/**
 * 複数のDOM要素の表示/非表示を一括設定する
 * @param {Array} elements {element: HTMLElement, visible: boolean} の配列
 */
function setElementsVisibility(elements) {
  elements.forEach(({ element, visible }) => {
    element.style.display = visible ? "block" : "none"
  })
}

/**
 * ゲーム表示要素をクリアする
 */
function clearGameDisplay() {
  kanjiDisplayElement.textContent = ""
  yomiDisplayElement.textContent = ""
  alphabetDisplayElement.textContent = ""
  alphabetDisplayElement.innerHTML = ""
  alphabetDisplayElement.style.visibility = "hidden"
  typingInputElement.value = ""
  resultDisplayElement.textContent = ""
}

/**
 * ランダムな背景画像を設定する（CONFIG使用）
 */
function setRandomBackground() {
  const selected = getRandomItem(CONFIG.game.BACKGROUND_IMAGES)
  document.body.style.backgroundImage = `url('${selected.item}')`
}

/**
 * 画面の表示要素を更新する（エラーハンドリング強化）
 * @param {Object} textItem 表示するアイテム
 */
function updateDisplayElements(textItem) {
  try {
    if (!textItem || !textItem.kanji || !textItem.yomi || !textItem.alp) {
      console.error("無効なアイテムデータが渡されました:", textItem)
      return
    }

    if (validateElement(kanjiDisplayElement, "target要素"))
      kanjiDisplayElement.textContent = textItem.kanji

    if (validateElement(yomiDisplayElement, "yomi要素"))
      yomiDisplayElement.textContent = textItem.yomi

    if (validateElement(alphabetDisplayElement, "alp要素")) {
      alphabetDisplayElement.textContent = textItem.alp
      alphabetDisplayElement.style.visibility = "hidden"
    }
  } catch (error) {
    console.error("表示要素の更新中にエラーが発生しました:", error)
  }
}

/**
 * モード選択の視覚的更新（選択されたモードをハイライト・矢印表示）
 */
function updateModeSelection() {
  const challengeModeElement = document.getElementById("challengeMode")
  const endlessModeElement = document.getElementById("endlessMode")

  // 全てのselectedクラスを削除
  challengeModeElement.classList.remove("selected")
  endlessModeElement.classList.remove("selected")

  // 矢印インジケーターとテキストを更新
  if (selectedGameMode === CONFIG.game.MODES[0]) {
    challengeModeElement.classList.add("selected")
    challengeModeElement.textContent =
      "→ 1: Challenge (お題を一周したらゲーム終了)"
    endlessModeElement.textContent =
      "　2: Endless (ESCキーを押すまでエンドレス)"
    return
  }
  endlessModeElement.classList.add("selected")
  challengeModeElement.textContent =
    "　1: Challenge (お題を一周したらゲーム終了)"
  endlessModeElement.textContent = "→ 2: Endless (ESCキーを押すまでエンドレス)"
}

/**
 * カウントダウンを開始する
 */
function startCountdown() {
  // スタート画面の要素を隠してカウントダウンを表示
  startMessageElement.style.display = "none"
  modeSelectionElement.style.display = "none"
  countdownDisplayElement.style.display = "block"
  
  // カウントダウン中フラグを有効化
  isCountdownInProgress = true

  let countdownValue = CONFIG.timing.COUNTDOWN_DURATION
  countdownDisplayElement.textContent = countdownValue

  const countdownTimer = setInterval(() => {
    countdownValue--
    if (countdownValue > 0) {
      countdownDisplayElement.textContent = countdownValue
      return
    }
    clearInterval(countdownTimer)
    // カウントダウン中フラグを無効化
    isCountdownInProgress = false
    startGame()
  }, 1000)
}

/**
 * スタート画面に戻る
 */
function resetToStartScreen() {
  // 結果画面を隠してスタート画面を表示
  resultScreenElement.style.display = "none"
  startScreenElement.style.display = "flex"

  // スタート画面とゲーム画面の表示切り替え
  setElementsVisibility([
    { element: startMessageElement, visible: true },
    { element: modeSelectionElement, visible: true },
    { element: countdownDisplayElement, visible: false },
    { element: document.querySelector("h1"), visible: false },
    { element: kanjiDisplayElement, visible: true },
    { element: yomiDisplayElement, visible: true },
    { element: alphabetDisplayElement, visible: true },
    { element: typingInputElement, visible: false },
    { element: resultDisplayElement, visible: true },
  ])

  // 表示内容とゲーム状態をクリア
  clearGameDisplay()

  // ゲーム状態をリセット
  isGameInProgress = false
  isProcessingCorrectAnswer = false
  availableTextItems = []
  currentTextItem = null
  currentTargetText = ""
  lastCompletedTextItem = null
  currentInputPosition = 0
  lastMistakePosition = -1
  selectedDifficulty = ""

  // タイミング管理もリセット
  textStartTime = Date.now()
  gameSessionStartTime = 0
  gameSessionEndTime = 0

  // 入力欄を有効化
  typingInputElement.disabled = false

  // 統計データもリセット
  initializeStatistics()

  // ゲームモードをデフォルトに戻してモード選択表示を更新
  selectedGameMode = CONFIG.game.DEFAULT_MODE
  updateModeSelection()
}
