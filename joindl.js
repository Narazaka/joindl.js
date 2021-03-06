// Generated by CoffeeScript 1.9.3

/*
呼び出し方: joindl("./a.zip", 2)
これによって、
./a.zip.00
./a.zip.01
./a.zip.02
がダウンロード、結合されa.zipとなる。
splitコマンド等でファイルを分割すること。
 */

(function() {
  this.joindl = function(base_url, max) {
    var begin, build_onreadystatechange, check, counter, done, error, fail, files, index, index_zero, results, success, xhr;
    counter = 0;
    files = [];
    begin = function() {
      return counter++;
    };
    done = function() {
      if (counter) {
        counter--;
        return check();
      }
    };
    fail = function() {
      counter = 0;
      return error();
    };
    check = function() {
      if (!counter) {
        return success();
      }
    };
    success = function() {
      var a, blob, body, filename, filepaths, url;
      this.joinzip_blob = blob = new Blob(files, {
        type: "application/octet-stream"
      });
      filepaths = base_url.split('/');
      filename = filepaths[filepaths.length - 1];
      if (window.navigator.msSaveOrOpenBlob) {
        return window.navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        url = URL.createObjectURL(blob);
        a = document.createElement('a');
        a.download = filename;
        a.href = url;
        body = document.getElementsByTagName('body')[0];
        body.appendChild(a);
        a.click();
        return body.removeChild(a);
      }
    };
    error = function() {
      return alert(base_url + "のダウンロードに失敗しました。");
    };
    build_onreadystatechange = function(xhr, index) {
      return function() {
        if (xhr.readyState === 4) {
          if ((200 === xhr.status || xhr.status === 304) && xhr.response) {
            files[index] = xhr.response;
            return done();
          } else {
            return fail();
          }
        }
      };
    };
    index = 0;
    results = [];
    while (max >= index) {
      begin();
      xhr = new XMLHttpRequest();
      xhr.onreadystatechange = build_onreadystatechange(xhr, index);
      index_zero = ("0" + index).slice(-2);
      xhr.open("GET", base_url + "." + index_zero);
      xhr.responseType = "arraybuffer";
      xhr.send();
      results.push(index++);
    }
    return results;
  };

}).call(this);
