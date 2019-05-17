## express-loginAdmin

This basic CRUD web application allows users to log in and manage user privileges in it. It contains 2 parts, User Management and Department Management, which user can add/select/edit/delete records.

Developed by using javascript, jQuery, Node.js, Express, EJS, AJAX, MySQL, Bootstrap.


### Features
- GET records.
- Add records.
- Edit records.
- Delete one user/ delete multiple users.
- Verify user by a random generated code.
- Pagination.
- Session.


### Directory tree
```bash
express-loginAdmin
├─bin
│       www
│
├─dump_sql
│       dump_sys_db.sql
│
├─public
│  ├─images
│  │
│  ├─javascripts
│  │
│  └─stylesheets
│       index.css
│       jquery-ui.css
│       login.css
│       user.css
│
├─routes
│       department.js
│       index.js
│       users.js
│
└─views
        department_add.ejs
        department_edit.ejs
        department_list.ejs
        error.ejs
        sys_index.ejs
        sys_login.ejs
        user_add.ejs
        user_edit.ejs
        user_list.ejs

  app.js
  favicon.ico
  package.json
  README.md
```

### To use
Clone this repository and install it, then run it locally `http://localhost:3000/`

`$ git clone https://github.com/miaoT/express-loginAdmin.git`

`$ cd express-loginAdmin`

`$ npm install`




### database
Create a database named **sys_db** and create 3 tables: **department**, **loginuser**, **usergroup**. There is an example of this database that you can import, which locates in `/dump_sql/dump_sys_db.sql`.

> You could have your own username and password to log in, by command `INSERT` on MySQL. For example,

> `INSERT INTO loginuser (userName,password) VALUES ("YOUR_USERNAME","YOUR_PWD");`



#### Demo
> You could log in as <font color="#006584">*John*</font> and its pwd <font color="#006584">*9999*</font> to view it.



