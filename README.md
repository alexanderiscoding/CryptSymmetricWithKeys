## 🚀 Usage


Change after **Bearer** for same token from config.js

Example for create new keys pair

```js
fetch("https://examplename.vercel.app/api/generate", {
  method: "GET",
  headers: new Headers({
    authorization: "Bearer 7f59ba5f69d5b4e588e0ab0d4f8e1634",
  })
});
```
Example for encrypt text

```js
fetch("https://examplename.vercel.app/api/encrypt", {
  method: "POST",
  headers: new Headers({
    authorization: "Bearer 7f59ba5f69d5b4e588e0ab0d4f8e1634",
  }),
  body: JSON.stringify({
    key: "c583d9960960181cbc37433c339d178a65e345ed609996fb90a226f24ef132cd46485dcae36f92208",
    text: "github@alexanderiscoding.com"
  })
});
```
Example for decrypt text

```js
fetch("https://examplename.vercel.app/api/decrypt", {
  method: "POST",
  headers: new Headers({
    authorization: "Bearer 7f59ba5f69d5b4e588e0ab0d4f8e1634",
  }),
  body: JSON.stringify({
    key: "c583d9960960181cbc37433c339d178a65e345ed609996fb90a226f24ef132cd46485dcae36f92208",
    text: "iExQWZhBwvTzHHCz6mMzj8Yg2TANV4+oYlfUvvnZ3NqyICWhNOlRw/ouaecQZsQycnHMWcHgRhjBaT7J"
  })
});
```
