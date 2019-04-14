# mini-wp by William Suryawan

#Local Access
#### client site: http://localhost:8080/
#### server site: http://localhost:3000/

### Installation and Getting Started (execute this function to run this app in your terminal)
```sh
$ npm init -y (inside root server folder)
$ npm run dev or nodemon app.js (on terminal inside root server folder)
$ live-server --host=localhost (on terminal inside root client folder)
```

#Deploy (BETA Version, some bugs still exist)
```sh
Server: http://35.247.170.82/
Client: http://miniwordpress.williamsuryawan.com/
```

### **User Routing**
HTTP METHOD | ROUTE | REQUEST | RESPONSE Success | RESPONSE Error | Description
------|------|-----------|------|----------|------------
POST | users/register | body Object <br> example {name: String, email: String, password: String} | Code: 201 <br> Body: {message: newUser} | Code: 500 <br> Body: {message: internal server error} |register new user to mini wordpress
POST | users/login | body Object <br> example {email: String, password: String, loginVia: String} | Code: 200 <br> Body: {token: token} | Code 400 <b> Body: {msg: wrong email/password} | login via website/ googleSignIn to get the token and to access mini wordpress

### **Article Routing**

HTTP METHOD | ROUTE | REQUEST | RESPONSE Success | RESPONSE Error | Description
------|------|-----------|------|----------|------------
GET | articles |  | Code: 200 <br> Body: [{message: article}] | Code: 500 <br> Body: {message: internal server error} |show all available articles from all users
GET | articles/tags |  | Code: 200 <br> Body: [{message: article}] | Code: 500 <br> Body: {message: internal server error} |show all available articles from all users based on tags (multiple tags are possible). Use space among tags on search bar
GET | articles/myarticle | headers token:**Required** | Code: 200 <br> Body: [{message: article}] | Code: 500 <br> Body: {message: internal server error} |show all available articles posted by an authenticated user
POST | articles/create | body Form Data <br> example {title: String, content: String, status: String, tags: String, image: file} <br> headers token:**Required** | Code: 201 <br> Body: {message: newArticle} | Code: 500 <br> Body: {message: internal server error} |create new article to miniWP
GET | articles/:id | params articleId <br> headers token:**Required** | Code: 200 <br> Body: {message: article} | Code: 500 <br> Body: {message: internal server error} |show one individual article of the authenticated user (based on article Id)
PUT | articles/:id | params articleId <br> headers token:**Required** <br> body Object <br> example {title: String, content: String, status: String, tags: String} | Code: 200 <br> Body: {message: updatedArticle} | Code: 500 <br> Body: {message: can't edit article} | edit one article of the authenticated user without changing image (based on information provided on body)
PUT | articles/fulledit/:id | params articleId <br> headers token:**Required** <br> Form Data <br> example {title: String, content: String, status: String, tags: String, image: file} | Code: 200 <br> Body: {message: updatedArticle} | Code: 500 <br> Body: {message: can't edit article} | edit one article of the authenticated user and change the image (based on information provided on form data)
DELETE | articles/:id | params articleId <br> headers token:**Required** | Code: 200 <br> Body: {message: deletedTodo} | Code: 500 <br> Body: {message: can't delete article} | delete one  personal article of the authenticated user (based on provided user token and article Id)

### **Tag Routing**
HTTP METHOD | ROUTE | REQUEST | RESPONSE Success | RESPONSE Error | Description
------|------|-----------|------|----------|------------
GET | tags |  | Code: 200 <br> Body: [{message: tags}] | Code: 500 <br> Body: {message: internal server error} |show all available tags in miniWP