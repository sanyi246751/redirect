# 動態網址轉向服務 (Google Sheet + GitHub Pages)

這是一個利用 Google Apps Script (GAS) 讀取試算表作為後端邏輯，搭配 GitHub Pages 靜態網頁作為前台跳板的「零成本動態轉址系統」。

## 📌 系統優勢
- **資料保護**: Google Sheet 本身不用公開，只有你的後端 GAS 授權憑證可以讀到裡面的對照表。
- **無縫隱形**: 前端透過 `fetch` 背景查表，使用者網址列不會閃過一大串 GAS 網址。
- **保護資料不被整包載走**: 輸入正確的 ID 才會給出正確的網址，一般人無法倒出整份對照清單。

---

## 🛠 安裝與部署流程

### Step 1. 設定 Google Sheet 與後端 (GAS)
1. 建立一張 Google 試算表。第一欄寫「ID」，第二欄放「目標網址」。
2. 試算表**維持私人（不共用）**即可，確保安全。
3. 點選「擴充功能」>「Apps Script」。
4. 請把本專案中的 `backend.gs` 程式碼全部複製貼上並取代裡面舊有的內容。
5. 點選右上角「部署」>「新增部署作業」：
   - 類型選**網頁應用程式 (Web app)**。
   - **執行身分**: `我自己`。
   - **誰可以存取**: `所有人` (Anyone)。
6. 完成部署後，**複製那串長長的「網頁應用程式網址」 (最後是 `/exec` 結尾)**。

> ⚠️ 注意：以後修改了 `backend.gs` 裡面的程式碼，都要點選「管理部署」建立一個「新版本」才會生效。

### Step 2. 設定 GitHub Pages 前端 (跳板網頁)
1. 在本地端打開 `index.html`。
2. 將裡面的 `gasWebAppUrl` 變數替換成你剛才複製到的網址：
   ```javascript
   const gasWebAppUrl = 'https://script.google.com/macros/s/你的網址/exec'; 
   ```
3. 修改完成後，透過 git 提交並上傳到 GitHub。
4. 到 GitHub Repo 頁面，點選 `Settings` > `Pages`，開啟並部署 GitHub Pages（指定分支為 `main` 或 `master`）。

---

## 🚀 網址使用方式

把剛剛拿到的 GitHub Pages 首頁網址，屁股接上 `?id=你的參數` 就可以對外擴散或印成 QR Code 了。

**使用範例：**
```text
https://sanyi246751.github.io/redirect/?id=01001
```

- 若對照表中存在 `01001`，就會自動跳轉到對應網址。
- 若查無該 ID 或發生錯誤，一律退回預設首頁（例如：`https://www.sanyi.gov.tw/`）。
