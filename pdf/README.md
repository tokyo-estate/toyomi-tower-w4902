# PDF版（html が開けない人向け）
- `brochure.html`（A4縦・1節1ページ・11ページ。サイトの img/ を相対参照）を実Chromeで PDF 化する
- 生成: `node pdf/render.mjs "<このフォルダの絶対パス>/pdf/brochure.html" <出力先>` → `W4416_{ja,en,zh}.pdf`。翻訳は `_豊海タワー_i18n/translations.json` を読み、`data-i18n` 要素に適用（サイトと同じ id）
- 本文を直したら brochure.html の該当要素（data-i18n の id で対応）と translations.json を直して再生成
- 検査: render.mjs がページごとにフッター被りを出力（空配列が合格）。フォントは Hiragino/PingFang/Helvetica Neue（ローカル）。CJK は Type 3 埋め込みになるので、印刷用に出すときは memory `feedback_chrome_pdf_type3_print_error` に従い 300dpi 画像化を検討
- 納品先: `在庫_販売物件/003_販売サイト/_豊海タワー_PDF販売資料/豊海タワー<号室>_販売資料_{日本語,English,中文}.pdf`（2026-10-18 に _未整理 から移動）
- サイト同梱: このフォルダの `W4416_{ja,en,zh}.pdf` が公開される（index.html の close 節からリンク）。再生成したら `_豊海タワー_PDF販売資料/` の納品版と同じものをここにもコピーして `_deploy.sh`

