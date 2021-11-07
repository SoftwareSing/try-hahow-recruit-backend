# try-hahow-recruit-backend

[![JavaScript Style Guide](/doc/img/badge.svg)](https://github.com/standard/standard)

這份專案嘗試實作 [Hahow Backend Engineer 徵才小專案](https://github.com/hahow/hahow-recruit/blob/05d2634b6718bcf54e8d3153e778a0f1fe1273bb/backend.md) 來練習

實作結果可以在以下網址查看

- <https://hahow-recruit-backend.softwaresing.com/heroes>
- <https://hahow-recruit-backend.softwaresing.com/heroes/1>

## 啟動 server

1. 安裝 Node.js  
   本專案實作時使用 `node v16.13.0 (npm v8.1.0)`
2. 安裝依賴的 package ( `npm install` )
3. 使用 `npm run server_dev` 啟動 server  
   server 將會使用 port 3100 (可以在 [config/serverConfig](/config/serverConfig.js) 內修改)  
   使用 `ctrl + c` 可以關閉 server

### 測試 server

使用指令 `npm run test` 可以執行自動測試

或是使用以下指令手動測試 API

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3100/heroes

curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3100/heroes/1

curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rocks" -X GET http://localhost:3100/heroes

curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rocks" -X GET http://localhost:3100/heroes/1
```

## 架構

架構參考 <https://youtu.be/gX5oB4fgX6U?t=2568> 的作法

### 元件間的關聯

![class diagram](/doc/img/classDiagram.svg)

當一個 request 進來，首先會通過 `router` 的部份  
`router` 會針對不同的路徑，從 request 取得需要的參數並傳給對應的 `controller` 方法

`controller` 會依照接到的參數做對應的處理  
由於在 `router` 已經處理了 request 的參數，因此 `controller` 並不會碰到 request 與 response 的處理，這樣也方便之後若需抽換掉 express ，只需要修改 routing 的部份即可

接著 `controller` 會透過 `service` 或 `repository` 來取得 `entity` 或是處理資料  
`service` 通常我會放一些需要多個 `repository` 的操作，或是一些對外部服務的處理  
`repository` 則是用來從資料庫等地方取得資料並轉換成 `entity` 回傳，針對資料庫的操作都會在 `repository` 內完成，若需要替換掉資料庫，或是增加快取，則只要修改 `repository` 即可  
`entity` 則是專案中最基本的物件，不受外部影響的商業邏輯會寫在這裡

以這個專案的例子來說，由於我沒辦法直接拿到 user 的資料，因此我將驗證服務(POST /auth)視為一個外部的服務，透過 `AuthService` 來呼叫驗證  
若是一般資料庫內有 user 的情況，則我通常會改成建立一個 `User` 的 entity ，並透過呼叫 `user.verifyPassword(password)` 等方式來驗證

而 Hero 與 HeroProfile 因為都可以拿到資料，因此我將 Hahow 提供的 API 當作資料庫來處理，將取得的方法放在 HeroRepo 與 HeroProfileRepo 中  
若需要加上快取，或是將資料改放在自己的資料庫中，只要修改 repo 內的邏輯，不需要動到 controller 或其他部份

### 呼叫流程

這邊以呼叫 /heroes/:heroId 的流程為例來畫 sequence diagram

![sequence diagram](/doc/img/sequenceDiagram.svg)

## 第三方 library

### server 依賴項

- [axios](https://www.npmjs.com/package/axios): 幫助發送 http 請求的套件，本專案透過這個套件來發送存取 hahow API 的請求
- [express](https://www.npmjs.com/package/express): 幫助建立 web 程式的套件，本專案主要透過 express 來處理 routing 的部份

### 開發依賴項

- [@types/*](https://www.npmjs.com/~types): 若套件不是 用 ts 寫成 或 有完善的 jsdoc ，通常沒有辦法做自動補完且類型通常會變成 any ， `@types` 系列的套件則可以補足這些套件的類型定義，讓開發時更順利
- [chai](https://www.npmjs.com/package/chai): 測試用的斷言庫，協助判斷測試結果，在測試不符預期時丟出錯誤
- [chai-http](https://www.npmjs.com/package/chai-http): 用於在測試中幫助送 http 請求到 server
- [eslint](https://eslint.org/): 用來檢查 coding style ，本專案使用 [standard](https://standardjs.com/readme-zhtw.html) 風格
- [faker](https://www.npmjs.com/package/faker): 協助在測試時產生假資料的套件
- [mocha](https://www.npmjs.com/package/mocha): 測試框架，用於定義、執行測試，處理每次測試前後需要做的動作

## 註解

這個專案中只有 [callHahowApi](/src/common/utils/callHahowApi.js) 有寫到註解 (其他都是 jsdoc)  
通常我會在很難表達意圖，或是解法比較不合直覺時寫註解說明  
若 regex 寫到很長很複雜時也會寫上這則 regex 是在過濾什麼

舉例來說 `callHahowApi` 是為了在訪問 API 回傳錯誤時自動重試，但通常自動重試不是一個常見的解法，一般比較可能會在無法 call API 時拋出錯誤拒絕當下的請求  
然而這邊的情況是 API 太常回傳錯誤了，但也不像一般 call 外部 API 時有錯是真的有需要處理的錯誤，只是短暫的 server error  
向這種少見又不好在程式中表得的情況，會寫一些註解來說明，太複雜的則直接寫成文件

## 困難、問題

問題點主要是 heroku 上的 API 太常回傳錯誤了，一開始很難確認到底是我自己有問題還是 API 有問題  
不過感覺上像是故意的，因此直接加上自動重試的機制來解決
