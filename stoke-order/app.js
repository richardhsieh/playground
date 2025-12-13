import { CHAR_DATA } from './data/strokes.js';

// DOM 元素
const charSelect = document.getElementById('charSelect');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const speedRange = document.getElementById('speedRange');
const practiceToggle = document.getElementById('practiceToggle');
const canvas = document.getElementById('canvas');
const outlineLayer = document.getElementById('outlineLayer');
const strokeLayer = document.getElementById('strokeLayer');
const drawLayer = document.getElementById('drawLayer');
const hint = document.getElementById('hint');

// 狀態
let currentChar = '一';
let currentStrokeIndex = 0;
let isPlaying = false;
let isPaused = false;
let animationId = null;

// 初始化
function init() {
  updateCanvas();
  charSelect.addEventListener('change', (e) => {
    currentChar = e.target.value;
    currentStrokeIndex = 0;
    updateCanvas();
    stopAnimation();
  });

  playBtn.addEventListener('click', play);
  pauseBtn.addEventListener('click', pause);
  prevBtn.addEventListener('click', prevStroke);
  nextBtn.addEventListener('click', nextStroke);
  practiceToggle.addEventListener('change', updateCanvas);
}

// 更新畫布
function updateCanvas() {
  const charData = CHAR_DATA[currentChar];
  if (!charData) return;

  outlineLayer.innerHTML = '';
  strokeLayer.innerHTML = '';
  drawLayer.innerHTML = '';

  // 繪製輪廓（練習模式）
  if (practiceToggle.checked && charData.outline) {
    charData.outline.forEach((pathData) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('class', 'outline');
      outlineLayer.appendChild(path);
    });
  }

  // 繪製當前筆畫前的筆畫
  if (charData.strokes) {
    charData.strokes.slice(0, currentStrokeIndex).forEach((stroke) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', stroke.d);
      path.setAttribute('class', 'stroke completed');
      strokeLayer.appendChild(path);
    });
  }

  updateHint();
}

// 更新提示
function updateHint() {
  const charData = CHAR_DATA[currentChar];
  if (!charData || !charData.strokes || currentStrokeIndex >= charData.strokes.length) {
    hint.textContent = '已完成！';
    return;
  }

  const stroke = charData.strokes[currentStrokeIndex];
  hint.textContent = `第 ${currentStrokeIndex + 1} 筆：${stroke.name} - ${stroke.tip}`;
}

// 播放動畫
function play() {
  if (isPlaying) return;

  const charData = CHAR_DATA[currentChar];
  if (!charData || !charData.strokes || currentStrokeIndex >= charData.strokes.length) {
    return;
  }

  isPlaying = true;
  isPaused = false;
  playBtn.disabled = true;

  const stroke = charData.strokes[currentStrokeIndex];
  animateStroke(stroke.d);
}

// 暫停
function pause() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  isPaused = true;
  isPlaying = false;
  playBtn.disabled = false;
}

// 上一筆
function prevStroke() {
  stopAnimation();
  if (currentStrokeIndex > 0) {
    currentStrokeIndex--;
    updateCanvas();
  }
}

// 下一筆
function nextStroke() {
  stopAnimation();
  const charData = CHAR_DATA[currentChar];
  if (charData && charData.strokes && currentStrokeIndex < charData.strokes.length) {
    currentStrokeIndex++;
    updateCanvas();
  }
}

// 動畫繪製筆畫
function animateStroke(pathData) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathData);
  path.setAttribute('class', 'stroke drawing');

  const pathLength = path.getTotalLength();
  path.setAttribute('stroke-dasharray', pathLength);
  path.setAttribute('stroke-dashoffset', pathLength);

  drawLayer.appendChild(path);

  const speed = parseFloat(speedRange.value);
  const duration = 1500 / speed; // 1.5 秒為基準

  let startTime = null;

  function animate(currentTime) {
    if (startTime === null) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    path.setAttribute('stroke-dashoffset', pathLength * (1 - progress));

    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    } else {
      // 動畫完成
      path.setAttribute('class', 'stroke completed');
      drawLayer.innerHTML = '';
      strokeLayer.appendChild(path);

      isPlaying = false;
      playBtn.disabled = false;
      nextStroke();
    }
  }

  animationId = requestAnimationFrame(animate);
}

// 停止動畫
function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  isPlaying = false;
  playBtn.disabled = false;
  drawLayer.innerHTML = '';
}

// 啟動應用
init();
