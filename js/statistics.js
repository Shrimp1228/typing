/********************************************************************************
 * 統計・結果処理
 *
 * @author Shrimp1228
 * @license MIT
 * @copyright (c) 2025 Shrimp1228
 ********************************************************************************/

/**
 * テキスト統計をテーブルに描画する
 * ミス文字の赤色ハイライトと最長待ち時間文字の黄色ハイライトを含む
 */
function renderTextStats() {
  statisticsTableBodyElement.innerHTML = "" // テーブル内容をクリア

  statisticsDataForSorting.forEach((stat) => {
    const row = document.createElement("tr") // 新しい行を作成

    // アルファベット表示の処理（ミスした文字を赤、最長待ち時間の文字を黄色でハイライト）
    let alpDisplay = stat.alp
    const chars = stat.alp.split("") // 文字列を1文字ずつの配列に分割

    // 各文字の装飾を決定
    chars.forEach((char, index) => {
      const isMissed =
        stat.missedPositions && stat.missedPositions.includes(index) // ミスした位置かチェック
      const isMaxWait = stat.maxCharInfo && stat.maxCharInfo.position === index // 最長待ち時間の位置かチェック

      // ミス + 最長待ち時間: 赤色 + ルビ「-」
      if (isMissed && isMaxWait) {
        chars[
          index
        ] = `<ruby><span style="color: red; font-weight: bold">${char}</span><rt>-</rt></ruby>`
        return
      }
      // ミスのみ: 赤色
      if (isMissed) {
        chars[
          index
        ] = `<span style="color: red; font-weight: bold">${char}</span>`
        return
      }
      // 最長待ち時間のみ: 黄色 + ルビ「-」
      if (isMaxWait) {
        chars[
          index
        ] = `<ruby><span style="color: gold; font-weight: bold">${char}</span><rt>-</rt></ruby>`
        return
      }
    })

    alpDisplay = chars.join("") // 装飾された文字を結合

    // ミス詳細の表示文字列を作成
    let missDisplayText = stat.missCount.toString()
    if (stat.missDetails && stat.missDetails.length > 0) {
      const missTexts = stat.missDetails.map(
        (miss) => `${miss.expected}→${miss.actual}`
      ) // 期待文字→実際文字の形式
      missDisplayText += `
        <br><small style="color: #888">
          (${missTexts.join(", ")})
        </small>`
    }

    // テーブル行のHTML生成
    row.innerHTML = `
      <td>${stat.text}</td>
      <td>${alpDisplay}</td>
      <td>${stat.firstSpeed}</td>
      <td>${stat.maxCharWaitTime || stat.totalSpeed}</td>
      <td>${missDisplayText}</td>
    `
    statisticsTableBodyElement.appendChild(row) // テーブルに行を追加
  })
}

/**
 * テキスト統計をソートする
 * @param {string} column ソート対象の列名
 * @param {boolean} forceDescending 強制的に降順にするか
 */
function sortTextStats(column, forceDescending = false) {
  // ソート方向を決定（同じ列の場合は昇順/降順を切り替え、異なる列の場合は降順から開始）
  const ascending = forceDescending
    ? false
    : currentSortConfiguration.column === column
    ? !currentSortConfiguration.ascending
    : false
  currentSortConfiguration = { column, ascending } // 現在のソート状態を更新

  // データをソート
  statisticsDataForSorting.sort((a, b) => {
    let aVal, bVal

    // 列名に応じて比較する値を設定
    switch (column) {
      case "firstSpeed": // 初回入力速度
        aVal = a.firstSpeed
        bVal = b.firstSpeed
        break
      case "maxWaitTime": // 最長待ち時間
        aVal = a.maxCharWaitTime || a.totalSpeed
        bVal = b.maxCharWaitTime || b.totalSpeed
        break
      case "missCount": // ミス数
        aVal = a.missCount
        bVal = b.missCount
        break
      case "text": // テキスト（漢字）
        aVal = a.text
        bVal = b.text
        break
      case "alp": // アルファベット
        aVal = a.alp
        bVal = b.alp
        break
    }

    // 文字列の場合は文字列比較、数値の場合は数値比較
    if (column === "text" || column === "alp") {
      if (ascending) return aVal.localeCompare(bVal) // 昇順での文字列比較
      return bVal.localeCompare(aVal) // 降順での文字列比較
    }

    // 数値比較
    if (ascending) return aVal - bVal // 昇順
    return bVal - aVal // 降順
  })

  // ヘッダーの矢印を更新
  document.querySelectorAll(".sortable").forEach((th) => {
    const sortColumn = th.getAttribute("data-sort") // data-sort属性からソート列名を取得
    if (sortColumn === column) {
      // 現在ソート中の列：昇順/降順の矢印を表示
      th.textContent =
        th.textContent.replace(/ [▼▲]/, "") + (ascending ? " ▲" : " ▼")
      return
    }
    // その他の列：デフォルトの降順矢印を表示
    th.textContent = th.textContent.replace(/ [▼▲]/, "") + " ▼"
  })

  renderTextStats() // 統計を再描画
}

/**
 * 統合された結果画面を表示する
 * @param {Object} resultData 結果データ
 */
function showIntegratedResult(resultData) {
  // ゲーム画面を隠して結果画面を表示
  document.querySelector("h1").style.display = "none"
  kanjiDisplayElement.style.display = "none"
  yomiDisplayElement.style.display = "none"
  alphabetDisplayElement.style.display = "none"
  typingInputElement.style.display = "none"
  resultDisplayElement.style.display = "none"
  resultScreenElement.style.display = "block"

  // 基本統計を表示
  document.getElementById("finalScore").textContent = resultData.score
  document.getElementById("accuracy").textContent = resultData.accuracy + "%"
  document.getElementById("finalWPM").textContent = resultData.wpm
  document.getElementById("totalTime").textContent = resultData.totalTime + "s"
  document.getElementById("maxWaitTime").textContent =
    resultData.maxWaitTime + "ms"
  document.getElementById(
    "totalMisses"
  ).textContent = `${resultData.totalMissCount}/${resultData.totalChars}`

  // 詳細統計データを準備
  statisticsDataForSorting = [...resultData.textStats]

  // ソートイベントリスナー設定（初回のみ）
  if (!document.querySelector(".sortable").hasAttribute("data-listener-set")) {
    document.querySelectorAll(".sortable").forEach((th) => {
      th.setAttribute("data-listener-set", "true")
      th.addEventListener("click", () => {
        const column = th.getAttribute("data-sort")
        sortTextStats(column)
      })
    })
  }

  // 初期表示（最長待ち時間の降順でソート）
  sortTextStats("maxWaitTime", true)
}

/**
 * 結果画面を表示する
 */
function showResult() {
  isGameInProgress = false

  // 統計計算
  const totalTime = (gameSessionEndTime - gameSessionStartTime) / 1000
  const totalCorrectChars = totalCharacterCount
  // e-typing式正確率: (正確な入力数 - 誤入力数) / 正確な入力数
  const accuracy =
    totalMistakeCount > 0
      ? (totalCorrectChars - totalMistakeCount) / totalCorrectChars
      : 1.0
  // e-typing式WPM: 正確に入力した文字数 × (60 / 時間(秒))
  const wpm = Math.round((totalCorrectChars * 60) / totalTime)
  // e-typing式スコア: WPM × (正確率)³
  const score = Math.round(wpm * accuracy * accuracy * accuracy)

  // 文字詳細統計データ準備と最長待ち時間の文字特定
  let maxWaitTime = 0
  let maxWaitText = ""
  let maxWaitChar = ""
  let maxWaitPosition = -1

  const textStatsData = textStatistics.map((stat) => {
    const firstSpeed = stat.firstInputTime
      ? stat.firstInputTime - stat.startTime
      : 0
    const totalSpeed = stat.completedTime
      ? stat.completedTime - stat.startTime
      : 0

    // 各文字の待ち時間を計算
    let maxCharWaitTime = 0
    let maxCharInfo = null

    if (stat.charTimings.length > 1) {
      let prevTime = stat.charTimings[0].time // 最初の文字の時間から開始
      stat.charTimings.forEach((charTiming, index) => {
        if (index > 0) {
          // 最初の文字を無視
          const waitTime = charTiming.time - prevTime
          if (waitTime > maxCharWaitTime) {
            maxCharWaitTime = waitTime
            maxCharInfo = {
              char: charTiming.char,
              position: charTiming.position,
              waitTime: waitTime,
              text: stat.text,
              alp: stat.alp,
            }
          }
        }
        prevTime = charTiming.time
      })

      // 全体の最長待ち時間と比較
      if (maxCharWaitTime > maxWaitTime) {
        maxWaitTime = maxCharWaitTime
        maxWaitText = maxCharInfo.text
        maxWaitChar = maxCharInfo.char
        maxWaitPosition = maxCharInfo.position
      }
    }

    return {
      text: stat.text,
      alp: stat.alp,
      firstSpeed: firstSpeed,
      totalSpeed: totalSpeed,
      maxCharWaitTime: maxCharWaitTime,
      maxCharInfo: maxCharInfo,
      missCount: stat.missCount,
      missedPositions: Array.from(stat.missedPositions),
      missDetails: stat.missDetails,
    }
  })

  // ミス入力データ準備
  const missData = Array.from(mistakeAggregateMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([inputChar, data]) => ({
      inputChar,
      contexts: Array.from(data.contexts).join("<br>"),
      count: data.count,
    }))

  // 結果データをまとめる
  const resultData = {
    score,
    accuracy: (accuracy * 100).toFixed(2),
    wpm,
    totalTime: totalTime.toFixed(2),
    textStats: textStatsData,
    missData,
    maxWaitTime: maxWaitTime,
    maxWaitText: maxWaitText,
    maxWaitChar: maxWaitChar,
    maxWaitPosition: maxWaitPosition,
    totalMissCount: totalMistakeCount,
    totalChars: totalCorrectChars,
  }

  // 統合された結果画面を表示
  showIntegratedResult(resultData)
}
