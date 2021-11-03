# try-hahow-recruit-backend

這份專案嘗試實作 [Hahow Backend Engineer 徵才小專案](https://github.com/hahow/hahow-recruit/blob/05d2634b6718bcf54e8d3153e778a0f1fe1273bb/backend.md) 來練習

## 啟動 server

1. 安裝 Node.js  
   本專案實作時使用 `node v16.13.0 (npm v8.1.0)`
2. 安裝依賴的 package ( `npm install` )
3. 使用 `npm run server_dev` 啟動 server  
   server 將會使用 port 3000  
   使用 `ctrl + c` 可以關閉 server

### 測試 server

使用指令 `npm run test` 可以執行自動測試

或是使用以下指令手動測試 API

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/heroes

curl -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/heroes/1

curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rocks" -X GET http://localhost:3000/heroes

curl -H "Accept: application/json" -H "Content-Type: application/json" -H "Name: hahow" -H "Password: rocks" -X GET http://localhost:3000/heroes/1
```

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
