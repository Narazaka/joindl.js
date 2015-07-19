呼び出し方: joindl("./a.zip", 2)

これによって、

- ./a.zip.00
- ./a.zip.01
- ./a.zip.02

がダウンロード、結合されa.zipとなる。

splitコマンド等でファイルを分割すること。

例:
```javascript
<script src="joindl.js"></script>
<script>
window.onload = function(){
joindl("debug.log", 3);
};
</script>
```
