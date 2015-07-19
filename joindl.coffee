###
呼び出し方: joindl("./a.zip", 2)
これによって、
./a.zip.00
./a.zip.01
./a.zip.02
がダウンロード、結合されa.zipとなる。
splitコマンド等でファイルを分割すること。
###

@joindl = (base_url, max) ->
  counter = 0
  files = []
  begin = ->
    counter++
  done = ->
    if counter
      counter--
      check()
  fail = ->
    counter = 0
    error()
  check = ->
    unless counter
      success()
  success = ->
    @joinzip_blob = blob = new Blob(files, type: "application/octet-stream")
    filepaths = base_url.split('/')
    filename = filepaths[filepaths.length - 1]
    if window.navigator.msSaveOrOpenBlob # for ie
      window.navigator.msSaveOrOpenBlob(blob, filename)
    else
      url = URL.createObjectURL(blob)
      a = document.createElement('a')
      a.download = filename
      a.href = url
      body = document.getElementsByTagName('body')[0]
      body.appendChild(a) # for firefox
      a.click()
      body.removeChild(a)
  error = ->
    alert "#{base_url}のダウンロードに失敗しました。"
  build_onreadystatechange = (xhr, index) ->
    ->
      if xhr.readyState == 4
        if (200 == xhr.status || xhr.status == 304) && xhr.response
          files[index] = xhr.response
          done()
        else
          fail()
  index = 0
  while max >= index
    begin()
    xhr = new XMLHttpRequest()
    xhr.onreadystatechange = build_onreadystatechange(xhr, index)
    index_zero = ("0" + index).slice(-2)
    xhr.open("GET", base_url + "." + index_zero)
    xhr.responseType = "arraybuffer"
    xhr.send()
    index++
