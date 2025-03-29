# Hướng dẫn sử dụng

Format code: https://prettier.io/docs/en/precommit.html

## 1. Cấu trúc thư mục

Cấu trúc thư mục của project sau khi tải về :

```
weather_web_portal
.
├── README.md                // Hướng dẫn sử dụng
├── deploy.sh                // Script deploy website lên server
├── jsconfig.json
├── gulpfile.js              // Script thêm license vào các file được build
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo16.png
│   ├── logo32.png
│   ├── logo64.png
│   ├── logo76.png
│   └── manifest.json
└── src
    ├── i18n.js
    ├── index.js
    ├── reportWebvital.js
    ├── setupTests.js
    ├── @history
    │   ├── @history.js
    │   └── index.js
    ├── app
    │   ├── app_context.js
    │   ├── app.js                     // Source app chính
    │   ├── auth // Định nghĩa và chứa các xử lý liên quan: tự động đăng nhập, cài đặt,..
    │   │   ├── auth_roles.js
    │   │   ├── auth.js
    │   │   ├── authorization.js
    │   │   ├── index.js
    │   │   └── store                  // Redux store của trang admin
    │   │       ├── actions
    │   │       │   ├── auth.action.js
    │   │       │   ├── user.action.js
    │   │       │   └── index.js
    │   │       └── reducers
    │   │           ├── auth.action.js
    │   │           ├── user.action.js
    │   │           └── store index.js
    │   ├── configs
    │   │   ├── api.config.js        // Config cho toàn app: baseURL, token, ...
    │   │   ├── menu.config.js       // Config cho drawer
    │   │   └── routes.config.js     // Route config cho toàn app
    │   ├── helpers          // Các hàm hỗ trợ xử lý dữ liệu
    │   │   └── util.js
    │   ├── i18n             // Định nghĩa chung nội dung web cho các ngôn ngữ
    │   │   ├── i18n.config.js
    │   │   └── en.js
    │   ├── layout           // Định nghĩa layout cho toàn trang web
    │   │   ├── auth.js
    │   │   ├── layout.js
    │   │   └── components   // Các component dùng trong layout
    │   ├── pages
    │   │   └── error.js               // Trang error
    │   ├── main                       // Các page của website
    │   │   ├── main.config.js         // Config cho tất cả các trang trong thư mục
    │   │   ├── admin                  // Trang quản lý tài khỏan admin
    │   │   │   ├── contact.config.js    // Route config của trang admin
    │   │   │   ├── contacts.js          // Source code trang quản lý toàn bộ admin
    │   │   │   ├── contact.js           // Source code trang thêm mới admin
    │   │   │   ├── component          // Source code các component
    │   │   │   │   ├── item_handle.js // Xử lý với 1 admin
    │   │   │   │   └── table_data_bk.js  // Xử lý bảng hiện thị toàn bộ admin
    │   │   │   └── store              // Redux store của trang admin
    │   │   ├── auth                   // Các trang phục vụ việc đăng nhập đăng xuất
    │   │   │   ├── i18n               // Định nghĩa nội dung web cho trang home
    │   │   │   ├── auth.config.js
    │   │   │   ├── login.js
    │   │   │   └── logout.js
    │   │   ├── post                  // Các trang phục vụ việc quản lý post
    │   │   │   ├── post.config.js
    │   │   │   ├── post.js           // Source code trang quản lý toàn bộ bài viết
    │   │   │   ├── posts.js          // Source code trang xử lý với 1 bài viết
    │   │   │   ├── component
    │   │   │   └── store.js
    │   │   ├── profile               // Các trang phục vụ xem thông tin và thay đổi mật khẩu
    │   │   │   ├── i18n              // Định nghĩa nội dung web cho trang home
    │   │   │   ├── profile.config.js
    │   │   │   └── profile.js
    │   │   └── tag                   // Trang quản lý post và category
    │   │       ├── i18n              // Định nghĩa nội dung web cho trang home
    │   │       ├── tag.config.js
    │   │       ├── tag.js
    │   │       ├── tags.js
    │   │       ├── category.js
    │   │       ├── categories.js
    │   │       ├── component
    │   │       └── store.js
    │   ├── services
    │   │   └── jwt.js
    │   ├── store                     // Redux store của toàn app
    │   │   ├── index.js
    │   │   ├── actions
    │   │   └── reducers
    │   └── values                    // Định nghĩa các constants
    │       ├── categories.js
    │       └── language.js
    ├── assets      // Media resources và styles được import trong source code
    │   ├── css
    │   ├── github
    │   ├── img
    │   └── scss
    ├── variales    // Định nghĩa các constants
    │   ├── tableHeader.js
    │   └── tinyInit.js
    └── components  // Các components được sử dụng chung cho nhiều page
        ├── Card
        ├── CustomButtons
        ├── CustomInput
        ├── FixedPlugin
        ├── Footer
        ├── Grid
        ├── Navbars
        ├── ReactTable
        ├── Sidebar
        ├── Table
        ├── TabHeader
        └── Typography
```

## 2. Dành cho nhà phát triển

Nhà phát triển cần cài đặt [NodeJS](https://nodejs.org/)
và [yarn](https://yarnpkg.com/) (hoặc [npm]()) trên thiết bị trước khi phát
triển dự án.

### 2.1. Cài đặt các `package` cần thiết

Thực hiện lệnh sau để cài đặt các `package` cần thiết:

```
yarn
```

hoặc:

```
npm install
```

Các `package` chính :

- `react`, `react-dom` : trang web có cấu trúc là single-page và được phát triển
  trên framework [ReactJS](https://reactjs.org/).
- `react-redux` : Tạo và lưu trữ tập trung dữ liệu của trang web.
- `react-router-config`, `react-router-dom` : Điều hướng trang web.
- `i18next`, `react-i18next` : Đa ngôn ngữ (tiếng Anh + tiếng Việt).
- `google-map-react` : Hiển thị Google Map.
- `axios` : Gọi API request.
- `@material-ui` : trang web sử dụng Material CSS framework.

### 2.2. Tạo TinyMCE API key

Để sử dụng Tiny Editor, cần
[tạo API key](https://www.tiny.cloud/blog/how-to-get-tinymce-cloud-up-in-less-than-5-minutes/)
theo hướng dẫn.

Sau khi có Tiny API key, thay thế `<TINY_API_KEY>` trong các files sau bằng
key nhận được:

1. `./src/app/configs/tiny.config.js`

```js
export const tinyApiKey = "<TINY_API_KEY>";
```

### 2.3. Chạy app trên localhost

Sau khi kết thúc cài đặt các `package` cần thiết, chạy lệnh sau để chạy trang
web trên localhost (mặc định ở port 3000).

```
yarn start
```

hoặc:

```
npm start
```

### 2.4. Tạo thêm 1 page mới

Để tạo thêm 1 page mới, thực hiện các bước :

1. Tạo 1 thư mục con trong thư mục `main` vơi cấu trúc tương tự như các page
   khác. Ví dụ với trang `NewPage`.

```
├── main
│   ├── newpage                 // Thư mục chứa source code của newpage
│   │   ├── newpage.config.js   // Route config của newpage
│   │   ├── NewPage.js          // Source code của newpage
│   │   ├── ...
│   │   ├── i18n                // Định nghĩa nội dung web cho newpage
│   │   └── store               // Redux store của newpage
```

2. Thêm `NewPage` config vào trong `main.config.js` :

```js
import newPageConfig from "./newpage/newpage.config";

const mainConfigs = [ ..., newPageConfig ];
```

---

### 2.5. Thêm ảnh vào bài viết

Để có thể thêm ảnh vào bài viết, cần thêm Image Tools Plugin vào Tiny Editor và
tạo API xử lý ảnh trên server.

Làm theo [hướng dẫn](https://www.tiny.cloud/docs/configure/file-image-upload/)
để thêm Image Tools Plugin vào Editor.

## 3. `Build` và `deploy` lên server

Trang web sau khi `build`, cần được `deploy` vào folder
`[weatherplus_api]/webapp/admin` ở trên server.

Có 2 cách để `deploy` trang web lên server:

### 3.1. Thủ công

Các bước thực hiện khi `deploy` trang web thủ công:

1. `Build` trang web bằng lệnh:

   ```
   yarn build
   ```

   Trang web sau khi `build` được lưu trong thư mục `<root_project>/build`.

2. Sao chép toàn bộ thư mục `<root_project>/build` lên thư mục
   `[weatherplus_api]/webapp/admin` ở trên server.

### 3.2. Tự động

Các bước thực hiện khi `deploy` trang web tự động:

1. Cài đặt kết nối ssh tới server.
2. Thay đổi các thiết lập `REMOTE` và `TARGET_FOLDER` trong script `./deploy.sh`
3. Chạy lệnh:

   ```
   ./deploy <env>
   ```

   với <env> là `beta` hoặc `production` tùy thuộc môi trường muốn `deploy`.

---

## 4. Hướng dẫn cho quản trị viên

### 4.1. Đăng nhập

- Sử dụng tài khoản và mật khẩu để đăng nhập

### 4.2. Thao tác với bài viết

1. Xem danh sách bài viết
   - Xem danh sách bài viết trong mục `Quản lý bài viết` trên thanh điều hướng bên trái
   - Sử dụng các nút và lựa chọn pagination để xem các trang và điều chỉnh độ dài trang
   - Sử dụng nút `Refresh` để làm mới danh sách
2. Tạo bài viết mới
   1. Nhần nút `Thêm mới`
   2. Thực hiện thêm nội dung vào các trường: chuyên mục, ảnh, tiêu đề , đường dẫn,...
   3. Nhấn nút `Thêm bài viết` ở cuối trang để hoàn thành thêm bài viết
3. Sửa bài viết
   1. Nhấn nút `Sửa` ở cuối mỗi dòng trong bảng để sửa bài viết
   2. Thay đổi các nội dung cần sửa
   3. Nhấn `Cập nhật` để cập nhật hoặc `Xóa` để xóa bài viết

- _Lưu ý:_
  - Sử dụng nút `Thêm nội dung tiếng anh` để thao tác với nội dung tiếng anh
  - Các **đường dẫn** được sử dụng luôn là duy nhất

### 4.3. Thao tác với tag và chuyên mục

1. Xem danh sách chuyên mục hoặc tag
   - Xem danh sách trong mục `Quản lý chuyên mục` hoặc `Quản lý tag` trên thanh điều hướng
   - Sử dụng các nút và lựa chọn pagination để xem các trang và điều chỉnh độ dài trang
   - Sử dụng nút `Refresh` để làm mới danh sách
2. Tạo chuyên mục hoặc tag
   1. Nhần nút `Thêm mới`
   2. Thực hiện thêm nội dung vào các trường: tên, đường dẫn, ...
   3. Nhấn nút `Thêm` ở cuối trang để hoàn thành thêm chuyên mục hoặc tag
3. Sửa chuyên mục hoặc tag
   1. Nhấn nút `Sửa` ở cuối mỗi dòng trong bảng để sửa chuyên mục hoặc tag
   2. Thay đổi các nội dung cần sửa
   3. Nhấn `Cập nhật` để cập nhật hoặc `Xóa` để xóa chuyên mục hoặc tag

- _Lưu ý:_
  - Các **đường dẫn** được sử dụng luôn là duy nhất

### 4.3. Quản lý quản trị viên

1. Xem danh sách quản trị viên
   - Xem danh sách
   - Sử dụng các nút và lựa chọn pagination để xem các trang và điều chỉnh độ dài trang
   - Sử dụng nút `Refresh` để làm mới danh sách
2. Tạo thêm tài khoản quản trị viên
   1. Nhần nút `Thêm mới`
   2. Thực hiện thêm nội dung vào các trường: email, password
   3. Nhấn nút `Thêm` ở cuối trang để hoàn thành thêm chuyên mục hoặc tag
3. Khóa tài khoản quản trị viên
   - Sử dụng nút `Khóa tài khoản` ở cuối bảng

### 4.5. Thay đổi mật khẩu

- Sử dụng icon button ở góc trên bên phải để mở menu
- Chọn `Profile`
- Thực hiện đổi mật khẩu

### 4.6. Đăng xuất

- Sử dụng icon button ở góc trên bên phải để mở menu
- Chọn `Log out`
