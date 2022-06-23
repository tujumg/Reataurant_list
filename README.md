<img width="1215" alt="restaurant" src="https://github.com/tujumg/Reataurant_list/blob/main/%E6%88%AA%E5%9C%96%202022-06-23%20%E4%B8%8B%E5%8D%889.49.30.png">

# 關於 RestaurantList

1. 查看所有的餐廳
2. 查看餐廳詳細資訊
3. 以餐廳名稱或店家類型來搜尋特定餐廳
4. 新增餐廳資訊
5. 更改餐廳資訊
6. 刪除餐廳資訊

# 環境建置與需求

Node.js 14.16.0

Express 4.16.4

Express-Handlebars 3.0.0

Bootstrap 4.3.1

Font-awesome 5.8.1

MongoDB

mongoose 6.3.3

bcryptjs 2.4.3

body-parser 1.20.0

connect-flash 0.1.1

dotenv 8.2.0

express-session 1.17.1

method-override 3.0.0

passport 0.4.1

passport-facebook 3.0.0

passport-local 1.0.0

# 安裝步驟

1. 安裝 node.js 與 npm
2. 下載本專案至本地：git clone https://github.com/tujumg/Reataurant_list
3. 透過終端機進入資料夾，輸入：npm install 4.下載完成後新增一個.env，放入 MONGODB_URI，
   連結你的 mongoDB
   MONGODB_URI="<根據自己的 MONGODB_URI 及帳號密碼做設定>"
4. 匯入 Seeder 檔案
5. 繼續輸入：npm run dev
6. 若看見 Express is listening on http://localhost:3000 訊息則代表順利運行，打開瀏覽器進入到以下網址 http://localhost:3000
7. 若欲暫停使用 ctrl + c
