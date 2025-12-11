
<script type="module">
// data/strokes.js
export const CHAR_DATA = {
  "一": {
    // 用於練習模式的淡淡字形外框（參考字形）
    outline: [
      "M 20 100 L 180 100"
    ],
    // 筆順（每一筆是一段 path）
    strokes: [
      { d: "M 20 100 L 180 100", name: "橫", tip: "從左到右" }
    ]
  },
  "二": {
    outline: ["M 30 70 L 170 70", "M 20 130 L 180 130"],
    strokes: [
      { d: "M 30 70 L 170 70", name: "上橫", tip: "短橫，略細" },
      { d: "M 20 130 L 180 130", name: "下橫", tip: "長橫，略粗" }
    ]
  },
  "三": {
    outline: ["M 30 60 L 170 60", "M 40 100 L 160 100", "M 20 140 L 180 140"],
    strokes: [
      { d: "M 30 60 L 170 60", name: "上橫", tip: "短橫" },
      { d: "M 40 100 L 160 100", name: "中橫", tip: "居中略短" },
      { d: "M 20 140 L 180 140", name: "下橫", tip: "最長的一橫" }
    ]
  },
  "口": {
    outline: [
      "M 40 40 L 160 40 L 160 160 L 40 160 Z"
    ],
    strokes: [
      { d: "M 40 40 L 160 40", name: "上橫", tip: "由左到右" },
      { d: "M 160 40 L 160 160", name: "右豎", tip: "由上到下" },
      { d: "M 160 160 L 40 160", name: "下橫", tip: "由右到左" },
      { d: "M 40 160 L 40 40", name: "左豎", tip: "由下到上收筆" }
    ]
  },
  "人": {
    outline: [
      "M 80 50 L 50 160",
      "M 120 50 L 150 160"
    ],
    strokes: [
      { d: "M 80 50 L 50 160", name: "撇", tip: "由上向左下" },
      { d: "M 120 50 L 150 160", name: "捺", tip: "由上向右下" }
    ]
  }
};
</script>
