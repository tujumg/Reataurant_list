<img width="1215" alt="restaurant" src="https://github.com/tujumg/shortenURL/blob/master/%E6%88%AA%E5%9C%96/%E6%88%AA%E5%9C%96%202022-05-27%20%E4%B8%8B%E5%8D%884.54.48.png">
<img width="1215" alt="restaurant" src="hhttps://github.com/tujumg/shortenURL/blob/master/%E6%88%AA%E5%9C%96/%E6%88%AA%E5%9C%96%202022-05-27%20%E4%B8%8B%E5%8D%884.53.47.png">

# 關於 shortenURL

1. 使用者可以將網址縮短
2. 使用者可以直接複製新產生的短網址
3. 使用者可以透過新產生的短網址連到原本的網址目的地
4. 相同的網址只會產生同一組短網址

# 環境建置與需求

1. Node.js 16.14.0
2. Express: 4.16.4
3. Express-handlebars: 3.0.0
4. Bootstrap 5.1.3
5. Font-awesome: 4.7.0
6. mongoose:6.0.5
7. MongoDB

# 安裝步驟

1. 安裝 node.js 與 npm
2. 下載本專案至本地：git clone https://github.com/tujumg/shortenURL
3. 透過終端機進入資料夾，輸入：npm install
4. 修改使用者名稱以及密碼等參數,輸入：export MONGODB_URI=“mongodb+srv://使用者名稱：使用者密碼@alpha.0q4uo.mongodb.net/URL?retryWrites=true&w=majority”
5. 繼續輸入：npm run dev
6. 若看見 Express is listening on http://localhost:3000 訊息則代表順利運行，打開瀏覽器進入到以下網址 http://localhost:3000
7. 若欲暫停使用 ctrl + c
