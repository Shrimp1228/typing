/********************************************************************************
 * 音声管理
 *
 * @author Shrimp1228
 * @license MIT
 * @copyright (c) 2025 Shrimp1228
 ********************************************************************************/

// BGM関連の状態管理
let isBackgroundMusicPlaying = false
let currentBackgroundMusic = null
let currentBgmIndex = 0
let availableBgmIndices = []
let playedBgmIndices = []

// 音声ファイル
let mistakeSoundFile = null
let typingSoundFiles = []
let backgroundMusicFiles = []
let audioLoadingErrorList = []

/**
 * 音声ファイルを初期化する
 */
function initializeAudioFiles() {
  try {
    initializeMistakeSound()
    initializeTypingSounds()
    initializeBackgroundMusic()

    if (audioLoadingErrorList.length > 0) {
      console.warn(
        `音声ファイルの読み込みで${audioLoadingErrorList.length}個のエラーが発生しました:`,
        audioLoadingErrorList
      )
    }
  } catch (error) {
    console.error("音声初期化中に予期しないエラーが発生しました:", error)
    showUserError(
      "音声ファイルの初期化に失敗しました。音声なしでゲームをプレイできます。"
    )
  }
}

/**
 * ミス効果音を初期化する
 */
function initializeMistakeSound() {
  mistakeSoundFile = new Audio(CONFIG.audio.SOUND_PATHS.mistakeSound)
  mistakeSoundFile.preload = "auto"
  mistakeSoundFile.addEventListener("error", () => {
    console.warn("ミス効果音の読み込みに失敗しました")
    audioLoadingErrorList.push("ミス効果音")
  })
}

/**
 * タイピング効果音を初期化する
 */
function initializeTypingSounds() {
  for (let i = 1; i <= CONFIG.audio.TYPING_SOUND_COUNT; i++) {
    try {
      const typingSoundFile = new Audio(
        `${CONFIG.audio.SOUND_PATHS.typingSound}${i}.mp3`
      )
      typingSoundFile.preload = "auto"
      typingSoundFile.addEventListener("error", () => {
        console.warn(`タイピング効果音${i}の読み込みに失敗しました`)
        audioLoadingErrorList.push(`タイピング効果音${i}`)
      })
      typingSoundFiles.push(typingSoundFile)
    } catch (error) {
      console.warn(`タイピング効果音${i}の作成に失敗しました:`, error)
      audioLoadingErrorList.push(`タイピング効果音${i}`)
    }
  }
}

/**
 * BGMを初期化する
 */
function initializeBackgroundMusic() {
  CONFIG.audio.BGM_FILES.forEach((fileName, index) => {
    try {
      const bgmFile = createBgmFile(fileName)
      backgroundMusicFiles.push(bgmFile)
      availableBgmIndices.push(index)
    } catch (error) {
      console.warn(`BGM「${fileName}」の作成に失敗しました:`, error)
      audioLoadingErrorList.push(`BGM「${fileName}」`)
    }
  })
}

/**
 * BGMファイルオブジェクトを作成する
 * @param {string} fileName ファイル名
 * @returns {Audio} BGMファイルオブジェクト
 */
function createBgmFile(fileName) {
  const bgmFile = new Audio(
    `${CONFIG.audio.MUSIC_PATHS.backgroundMusicDir}${fileName}`
  )
  bgmFile.preload = "auto"
  bgmFile.loop = false
  bgmFile.volume = CONFIG.audio.BGM_VOLUME

  bgmFile.addEventListener("error", () => {
    console.warn(`BGM「${fileName}」の読み込みに失敗しました`)
    audioLoadingErrorList.push(`BGM「${fileName}」`)
  })

  bgmFile.addEventListener("ended", () => playNextAvailableBgm())

  return bgmFile
}

/**
 * 音声を再生する
 * @param {Audio} audio 音声オブジェクト
 * @param {string} errorMessage エラーメッセージ
 * @param {boolean} showErrorToUser エラーを表示するか
 * @returns {Promise<boolean>} 再生成功かどうか
 */
function playAudio(audio, errorMessage, showErrorToUser = false) {
  if (!audio) {
    console.error("音声オブジェクトが存在しません")
    return Promise.resolve(false)
  }

  try {
    audio.currentTime = 0
    return audio
      .play()
      .then(() => true)
      .catch((error) => {
        console.error(errorMessage, error)
        if (showErrorToUser && error.name !== "NotAllowedError") {
          console.warn("音声再生に失敗しました:", errorMessage)
        }
        return false
      })
  } catch (error) {
    console.error(errorMessage, error)
    return Promise.resolve(false)
  }
}

/**
 * ランダムなタイピング音を再生する
 */
function playRandomTypeSound() {
  if (typingSoundFiles.length === 0) {
    console.warn("タイプ音声が読み込まれていません")
    return
  }

  try {
    const selectedSound = getRandomItem(typingSoundFiles)
    playAudio(selectedSound.item, "タイプ音声再生エラー:")
  } catch (error) {
    console.error("タイプ音声の選択中にエラーが発生しました:", error)
  }
}

/**
 * ランダムなBGMを再生する
 */
function playRandomBGM() {
  if (isBackgroundMusicPlaying) return
  if (backgroundMusicFiles.length === 0) {
    console.warn("BGM音声が読み込まれていません")
    return
  }

  try {
    resetBgmIndicesIfNeeded()

    const randomIndex = Math.floor(Math.random() * availableBgmIndices.length)
    const selectedIndex = availableBgmIndices[randomIndex]

    currentBgmIndex = selectedIndex
    playBgmByIndex(currentBgmIndex)

    moveBgmToPlayed(randomIndex, selectedIndex)
  } catch (error) {
    console.error("BGM選択中にエラーが発生しました:", error)
  }
}

/**
 * BGMインデックス配列を必要に応じてリセットする
 */
function resetBgmIndicesIfNeeded() {
  if (availableBgmIndices.length === 0) {
    availableBgmIndices = [...Array(backgroundMusicFiles.length).keys()]
    playedBgmIndices = []
  }
}

/**
 * BGMを再生済みリストに移動する
 * @param {number} randomIndex ランダムインデックス
 * @param {number} selectedIndex 選択されたBGMインデックス
 */
function moveBgmToPlayed(randomIndex, selectedIndex) {
  availableBgmIndices.splice(randomIndex, 1)
  playedBgmIndices.push(selectedIndex)
}

/**
 * 指定されたインデックスのBGMを再生する
 * @param {number} index BGMインデックス
 */
function playBgmByIndex(index) {
  if (backgroundMusicFiles.length === 0) return

  // 現在のBGMを停止
  if (currentBackgroundMusic) {
    currentBackgroundMusic.pause()
    currentBackgroundMusic.currentTime = 0
  }

  currentBgmIndex = index
  currentBackgroundMusic = backgroundMusicFiles[index]

  currentBackgroundMusic
    .play()
    .then(() => {
      isBackgroundMusicPlaying = true
      // 曲名を表示
      const fileName = CONFIG.audio.BGM_FILES[index]
      const songTitle = fileName.replace(".mp3", "")
      showBgmTitle(songTitle)
    })
    .catch((error) => console.warn("BGM再生エラー:", error))
}

/**
 * 次の未再生BGMを再生する
 */
function playNextAvailableBgm() {
  if (backgroundMusicFiles.length === 0) return

  isBackgroundMusicPlaying = false

  if (availableBgmIndices.length === 0) resetAvailableBgmWithExclusion()

  const randomIndex = Math.floor(Math.random() * availableBgmIndices.length)
  const selectedIndex = availableBgmIndices[randomIndex]

  currentBgmIndex = selectedIndex
  playBgmByIndex(currentBgmIndex)

  moveBgmToPlayed(randomIndex, selectedIndex)
}

/**
 * 利用可能BGM配列を前の曲を除外してリセットする
 */
function resetAvailableBgmWithExclusion() {
  availableBgmIndices = [...Array(backgroundMusicFiles.length).keys()]

  // 前の曲と同じ曲が選ばれないよう除外
  if (backgroundMusicFiles.length > 1 && currentBgmIndex !== undefined) {
    const currentIndex = availableBgmIndices.indexOf(currentBgmIndex)
    if (currentIndex !== -1) availableBgmIndices.splice(currentIndex, 1)
  }

  playedBgmIndices = [currentBgmIndex]
}

/**
 * BGM曲名を画面右下に表示する
 * @param {string} songTitle 曲名
 */
function showBgmTitle(songTitle) {
  if (!currentBgmTitleElement) return

  currentBgmTitleElement.textContent = `♪ ～ ${songTitle} ～`
  currentBgmTitleElement.style.display = "block"
}

/**
 * ユーザーの最初の操作でBGMを開始する
 */
function startBGMOnUserInteraction() {
  if (isBackgroundMusicPlaying) return
  playRandomBGM()
}

// 音声ファイルを初期化
initializeAudioFiles()
