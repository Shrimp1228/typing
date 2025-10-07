/********************************************************************************
 * メインゲームロジック
 *
 * @author Shrimp1228
 * @license MIT
 * @copyright (c) 2025 Shrimp1228
 ********************************************************************************/

/**
 * エラーをユーザーに表示する
 * @param {string} message エラーメッセージ
 * @param {Error} error エラーオブジェクト
 */
function showUserError(message, error = null) {
  console.error(message, error)
  alert(message)
}

/**
 * ゲームデータの妥当性を検証する
 * @param {string} difficulty 難易度
 * @returns {boolean} データが有効かどうか
 */
function validateData(difficulty) {
  // データの基本存在チェック
  if (!data || typeof data !== "object") {
    showUserError(
      "ゲームデータが読み込まれていません。ページを再読み込みしてください。"
    )
    return false
  }

  // 指定難易度のデータ存在チェック
  if (!data[difficulty] || !Array.isArray(data[difficulty])) {
    showUserError(`難易度「${difficulty}」のデータが見つかりません。`)
    return false
  }

  // データ配列の空チェック
  if (data[difficulty].length === 0) {
    showUserError(
      "この難易度にはまだ問題が用意されていません。他の難易度を選択してください。"
    )
    return false
  }

  // 各データアイテムの構造チェック
  for (let i = 0; i < data[difficulty].length; i++) {
    const item = data[difficulty][i]

    if (!item || typeof item !== "object") {
      showUserError(`データの構造に問題があります（位置: ${i + 1}）。`)
      return false
    }

    if (!item.kanji || !item.yomi || !item.alp) {
      showUserError(
        `必要なデータが不足しています（位置: ${
          i + 1
        }）。kanji, yomi, alpが必要です。`
      )
      return false
    }
  }

  return true
}

/**
 * DOM要素の存在を検証する
 * @param {HTMLElement} element DOM要素
 * @param {string} elementName 要素名
 * @returns {boolean} 要素が存在するかどうか
 */
function validateElement(element, elementName) {
  if (!element) {
    console.error(`必要なDOM要素が見つかりません: ${elementName}`)
    return false
  }
  return true
}

/**
 * 配列からランダムにアイテムを選択する
 * @param {Array} array 選択元の配列
 * @returns {Object} {item: 選択されたアイテム, index: インデックス}
 */
function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return { item: array[randomIndex], index: randomIndex }
}

/**
 * 入力の妥当性をチェックする
 * @param {string} typed 入力された文字列
 * @param {string} target 目標文字列
 * @returns {Object} {complete: 完了フラグ, valid: 妥当性フラグ}
 */
function isValidInput(typed, target) {
  if (target === typed) return { complete: true, valid: true }
  if (target.startsWith(typed)) return { complete: false, valid: true }
  return { complete: false, valid: false }
}

/**
 * ゲームモードに応じてランダムなテキストを取得する
 * @returns {Object|null} 選択されたテキストアイテム、または null（終了時）
 */
function getRandomText() {
  const isChallengeMode = selectedGameMode === CONFIG.game.MODES[0]
  const isEndlessMode = selectedGameMode === CONFIG.game.MODES[1]

  // Challengeモードで全問題完了時はゲーム終了
  if (isChallengeMode && availableTextItems.length === 0) {
    return null
  }

  // Endlessモードで全問題完了時は配列をリセット
  if (isEndlessMode && availableTextItems.length === 0) {
    resetEndlessModeItems()
  }

  const selectedText = getRandomItem(availableTextItems)
  availableTextItems.splice(selectedText.index, 1)

  return selectedText.item
}

/**
 * エンドレスモード用のアイテム配列をリセットする
 * 前回完了したお題と同じものが選ばれないよう除外
 */
function resetEndlessModeItems() {
  availableTextItems = [...data[selectedDifficulty]]

  if (lastCompletedTextItem && availableTextItems.length > 1) {
    const lastItemIndex = availableTextItems.findIndex(
      (item) =>
        item.kanji === lastCompletedTextItem.kanji &&
        item.yomi === lastCompletedTextItem.yomi &&
        item.alp === lastCompletedTextItem.alp
    )

    if (lastItemIndex !== -1) {
      availableTextItems.splice(lastItemIndex, 1)
    }
  }
}

/**
 * ゲームを開始する
 */
function startGame() {
  try {
    if (!validateRequiredElements()) return
    if (!validateGameData()) return

    initializeGameState()

    const firstTextItem = getRandomText()
    if (!firstTextItem) {
      showUserError("テキストデータの取得に失敗しました。")
      resetToStartScreen()
      return
    }

    setupGameUI(firstTextItem)
    startGameTimers()
  } catch (error) {
    console.error("ゲーム開始中にエラーが発生しました:", error)
    showUserError(
      "ゲームの開始に失敗しました。ページを再読み込みしてください。"
    )
    resetToStartScreen()
  }
}

/**
 * ゲーム開始時の必須DOM要素を検証する
 * @returns {boolean} 検証結果
 */
function validateRequiredElements() {
  const requiredElements = [
    { element: startScreenElement, name: "startScreen" },
    { element: typingInputElement, name: "typingInput" },
    { element: document.querySelector("h1"), name: "h1タイトル" },
  ]

  for (const { element, name } of requiredElements) {
    if (!validateElement(element, name)) {
      showUserError(
        "ページの読み込みに問題があります。ページを再読み込みしてください。"
      )
      return false
    }
  }
  return true
}

/**
 * ゲームデータの検証を行う
 * @returns {boolean} 検証結果
 */
function validateGameData() {
  if (!selectedDifficulty) selectedDifficulty = CONFIG.game.DEFAULT_DIFFICULTY

  return validateData(selectedDifficulty)
}

/**
 * ゲーム状態を初期化する
 */
function initializeGameState() {
  isGameInProgress = true
  startScreenElement.style.display = "none"
  document.querySelector("h1").style.display = "block"
  availableTextItems = [...data[selectedDifficulty]]
  initializeStatistics()
}

/**
 * ゲームUIをセットアップする
 * @param {Object} textItem 表示するテキストアイテム
 */
function setupGameUI(textItem) {
  currentTextItem = textItem
  currentTargetText = textItem.alp
  updateDisplayElements(textItem)

  typingInputElement.style.display = "block"

  try {
    typingInputElement.focus()
  } catch (error) {
    console.warn("入力欄へのフォーカスに失敗しました:", error)
  }
}

/**
 * ゲームタイマーを開始する
 */
function startGameTimers() {
  const currentTime = Date.now()
  textStartTime = currentTime
  gameSessionStartTime = currentTime
  textStatistics.push(createTextStat(currentTextItem, currentTime))
}

/**
 * ゲームを途中終了する
 */
function endGameEarly() {
  isGameInProgress = false

  if (textStatistics.length === 0) return

  // 完了していない最後の統計データを除外
  const lastStat = textStatistics[textStatistics.length - 1]
  if (!lastStat.completedTime) textStatistics.pop()

  gameSessionEndTime = Date.now()
  showResult()
}

/**
 * 完全正解時の入力処理
 * @param {string} typedText 入力された文字列
 */
function handleCompleteInput(typedText) {
  isProcessingCorrectAnswer = true

  // 最後の文字入力時にもタイプ音を再生
  const newInputPosition = typedText.length
  if (newInputPosition > currentInputPosition) {
    // 最後の文字の入力時間を記録
    const currentTextStat = textStatistics[textStatistics.length - 1]
    const characterInputTime = Date.now()
    for (let i = currentInputPosition; i < newInputPosition; i++) {
      currentTextStat.charTimings.push({
        char: currentTargetText[i],
        position: i,
        time: characterInputTime,
      })
    }

    // 最後の文字のタイプ音を再生
    playRandomTypeSound()
  }

  resultDisplayElement.textContent = CONFIG.ui.MESSAGES.CORRECT
  resultDisplayElement.style.color = CONFIG.ui.COLORS.CORRECT_MESSAGE
  totalCharacterCount += currentTargetText.length

  // 現在の文字統計を更新
  const currentTextStat = textStatistics[textStatistics.length - 1]
  currentTextStat.completedTime = Date.now()
  gameSessionEndTime = currentTextStat.completedTime

  // エンドレスモードの場合、完了したお題を記録
  if (selectedGameMode === CONFIG.game.MODES[1])
    lastCompletedTextItem = currentTextItem

  // 入力フィールドを無効化
  typingInputElement.disabled = true

  // 次のテキストを表示
  setTimeout(() => {
    typingInputElement.value = "" // 入力文字列を削除
    currentTextItem = getRandomText()

    // 全アイテム完了チェック
    if (currentTextItem === null) {
      showResult()
      return
    }

    currentTargetText = currentTextItem.alp
    updateDisplayElements(currentTextItem)
    currentInputPosition = 0
    resultDisplayElement.textContent = "" // 正解表示を非表示
    isProcessingCorrectAnswer = false // 入力受付を再開
    lastMistakePosition = -1 // ミス位置をリセット

    // 入力フィールドを再度有効化してフォーカス
    typingInputElement.disabled = false
    typingInputElement.focus()

    // 新しい文字統計を追加
    textStatistics.push(createTextStat(currentTextItem, Date.now()))
  }, CONFIG.timing.NEXT_PROBLEM_DELAY)
}

/**
 * 部分正解時の入力処理
 * @param {string} typedText 入力された文字列
 */
function handleValidInput(typedText) {
  resultDisplayElement.textContent = ""
  const newInputPosition = typedText.length

  // 初回入力時刻を記録
  const currentTextStat = textStatistics[textStatistics.length - 1]
  if (!currentTextStat.firstInputTime)
    currentTextStat.firstInputTime = Date.now()

  // 新しい文字が入力された場合、文字ごとの時間を記録
  if (newInputPosition > currentInputPosition) {
    const characterInputTime = Date.now()
    for (let i = currentInputPosition; i < newInputPosition; i++) {
      currentTextStat.charTimings.push({
        char: currentTargetText[i],
        position: i,
        time: characterInputTime,
      })
    }

    // 正常な文字入力時にランダムタイプ音声を再生
    playRandomTypeSound()
  }

  currentInputPosition = newInputPosition
}

/**
 * ミス時の入力処理（エラーハンドリング強化）
 * @param {string} typedText 入力された文字列
 */
function handleMissInput(typedText) {
  try {
    const lastTypedCharacter = typedText[typedText.length - 1]
    const expectedCharacter = currentTargetText[typedText.length - 1]
    const mistakePosition = typedText.length - 1

    // 前回ミスした位置より進んでいるか、または初回ミスの場合は記録する
    if (
      lastTypedCharacter &&
      expectedCharacter &&
      mistakePosition > lastMistakePosition
    ) {
      const previousCharacter =
        mistakePosition > 0 ? currentTargetText[mistakePosition - 1] : ""
      const nextCharacter =
        mistakePosition < currentTargetText.length - 1
          ? currentTargetText[mistakePosition + 1]
          : ""
      const contextFormat = `(${previousCharacter})${expectedCharacter}(${nextCharacter})`

      // 入力文字で集約
      if (!mistakeAggregateMap.has(lastTypedCharacter))
        mistakeAggregateMap.set(lastTypedCharacter, {
          count: 0,
          contexts: new Set(),
        })

      const aggregateData = mistakeAggregateMap.get(lastTypedCharacter)
      aggregateData.count++
      aggregateData.contexts.add(contextFormat)

      lastMistakePosition = mistakePosition // ミス位置を更新

      // 文字統計にミスを記録
      const currentTextStat = textStatistics[textStatistics.length - 1]
      if (currentTextStat) {
        currentTextStat.missCount++
        currentTextStat.missedPositions.add(mistakePosition) // ミスした位置を記録
        currentTextStat.missDetails.push({
          expected: expectedCharacter,
          actual: lastTypedCharacter,
          position: mistakePosition,
        })
        totalMistakeCount++
      }
    }

    // alpを表示（ミス文字をハイライト）
    if (validateElement(alphabetDisplayElement, "alpエレメント")) {
      const alphabetTextWithHighlight = currentTargetText
        .split("")
        .map((character, index) => {
          if (index === mistakePosition)
            return `<span class="miss-char">${character}</span>`
          return character
        })
        .join("")

      alphabetDisplayElement.innerHTML = alphabetTextWithHighlight
      alphabetDisplayElement.style.visibility = "visible"
    }

    // ミス文字を削除
    if (validateElement(typingInputElement, "入力エレメント"))
      typingInputElement.value = typedText.slice(0, -1)

    // ミス効果音を再生（音声が利用可能な場合のみ）
    if (mistakeSoundFile) playAudio(mistakeSoundFile, "ミス効果音再生エラー:")

    // 結果表示を更新
    if (validateElement(resultDisplayElement, "結果エレメント")) {
      resultDisplayElement.textContent = CONFIG.ui.MESSAGES.MISS
      resultDisplayElement.style.color = CONFIG.ui.COLORS.MISS_MESSAGE

      // 少し後にミス表示を消す
      setTimeout(() => {
        if (resultDisplayElement) resultDisplayElement.textContent = ""
      }, CONFIG.timing.MISS_MESSAGE_DURATION)
    }
  } catch (error) {
    console.error("ミス処理中にエラーが発生しました:", error)
    // エラーが発生しても入力は続行できるようにする
    if (typingInputElement && typedText.length > 0)
      typingInputElement.value = typedText.slice(0, -1)
  }
}

/**
 * ページ初期化処理（DOM要素の存在確認を含む）
 */
function initializePage() {
  try {
    // 必要なDOM要素の存在確認
    const requiredElements = [
      { element: kanjiDisplayElement, name: "target" },
      { element: yomiDisplayElement, name: "yomi" },
      { element: alphabetDisplayElement, name: "alp" },
      { element: typingInputElement, name: "typingInput" },
      { element: resultDisplayElement, name: "result" },
      { element: startScreenElement, name: "startScreen" },
      { element: startMessageElement, name: "startMessage" },
      { element: modeSelectionElement, name: "modeSelection" },
      { element: countdownDisplayElement, name: "countdown" },
      { element: resultScreenElement, name: "resultScreen" },
      { element: statisticsTableBodyElement, name: "textStatsBody" },
    ]

    let missingElements = []
    for (const { element, name } of requiredElements)
      if (!element) missingElements.push(name)

    if (missingElements.length > 0) {
      const errorMsg = `必要なDOM要素が見つかりません: ${missingElements.join(
        ", "
      )}`
      console.error(errorMsg)
      showUserError(
        "ページの読み込みに問題があります。ページを再読み込みしてください。"
      )
      return false
    }

    // データの存在確認
    if (!data || typeof data !== "object") {
      console.error("ゲームデータが読み込まれていません")
      showUserError(
        "ゲームデータの読み込みに失敗しました。ページを再読み込みしてください。"
      )
      return false
    }

    // 背景設定とモード選択の初期化
    setRandomBackground()
    updateModeSelection()

    console.log("ページ初期化が完了しました")
    return true
  } catch (error) {
    console.error("ページ初期化中にエラーが発生しました:", error)
    showUserError(
      "ページの初期化に失敗しました。ページを再読み込みしてください。"
    )
    return false
  }
}

// ===========================================================================
// イベントリスナー
// ===========================================================================

// ページ読み込み時に初期化処理を実行
document.addEventListener("DOMContentLoaded", () => initializePage())

// キーイベント処理
document.addEventListener("keydown", (e) => {
  // カウントダウン中はすべてのキー入力を無視
  if (isCountdownInProgress) return
  
  // ゲーム中は入力キー以外を無視
  if (isGameInProgress && e.key !== "Escape") return

  switch (e.key) {
    case "1":
      handleModeSelection(0, e)
      break
    case "2":
      handleModeSelection(1, e)
      break
    case "a":
    case "A":
      handleDifficultySelection(0, e)
      break
    case "b":
    case "B":
      handleDifficultySelection(1, e)
      break
    case "c":
    case "C":
      handleDifficultySelection(2, e)
      break
    case "Escape":
      handleEscapeKey(e)
      break
  }
})

/**
 * ゲームモード選択を処理する
 * @param {number} modeIndex モードインデックス
 * @param {Event} event キーイベント
 */
function handleModeSelection(modeIndex, event) {
  event.preventDefault()
  selectedGameMode = CONFIG.game.MODES[modeIndex]
  startBGMOnUserInteraction()
  updateModeSelection()
}

/**
 * 難易度選択を処理する
 * @param {number} difficultyIndex 難易度インデックス
 * @param {Event} event キーイベント
 */
function handleDifficultySelection(difficultyIndex, event) {
  event.preventDefault()
  selectedDifficulty = CONFIG.game.DIFFICULTIES[difficultyIndex]

  if (!validateData(selectedDifficulty)) return

  startBGMOnUserInteraction()
  startCountdown()
}

/**
 * ESCキーの処理
 * @param {Event} event キーイベント
 */
function handleEscapeKey(event) {
  event.preventDefault()

  // 結果画面表示中はスタート画面に戻る
  if (resultScreenElement.style.display === "block") {
    resetToStartScreen()
    return
  }

  // ゲーム中は途中終了
  if (isGameInProgress) endGameEarly()
}

// メインタイピング処理
typingInputElement.addEventListener("input", (e) => {
  // ガード節：ゲーム開始前または正解処理中は入力を無視
  if (!isGameInProgress || isProcessingCorrectAnswer) return

  startBGMOnUserInteraction()

  const typedText = typingInputElement.value
  const inputResult = isValidInput(typedText, currentTargetText)

  // 入力結果に応じた処理の分岐
  if (inputResult.complete) {
    handleCompleteInput(typedText)
    return
  }
  if (inputResult.valid) {
    handleValidInput(typedText)
    return
  }
  handleMissInput(typedText)
})
