# reducer

项目中所有redux逻辑文件

> 按功能分配`redux`业务, 其中包括action, type, reducer
> `nav.js` 绑定`navigation`中的redux, 调用是直接传入action即可调用导航

```shell
.
├── README.md
├── index.js //使用combinreducers组建reducer
├── nav.js
└── user
    ├── nav.js
    ├── userAction.js
    ├── userReducer.js
    └── userType.js
```