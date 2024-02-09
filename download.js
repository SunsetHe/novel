var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/jszip@3.1.5/dist/jszip.min.js';
document.head.appendChild(script);

function get_page(targetUrl){
    var index = targetUrl.match(/\/(\d+_\d+)\.html$/);
    var zip = new JSZip();
    fetch(targetUrl)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        var decoder = new TextDecoder('GBK');
        var html = decoder.decode(new Uint8Array(buffer));
        var blob = new Blob([html], { type: 'text/html;charset=GBK' });
        zip.file(index[1] + '.html', blob);
      })
      .catch(error => {
        console.error('Failed to fetch the page:', error);
      });
    fetch(targetUrl)
      .then(response => response.text())
      .then(html => {
        zip.file('page.html', html);
        var imgElements = document.querySelectorAll('img');
        var imgPromises = Array.from(imgElements).map(imgElement => {
          return new Promise((resolve, reject) => {
            var imgUrl = imgElement.src;
            fetch(imgUrl)
              .then(response => response.blob())
              .then(blob => {
                zip.file(imgUrl.substring(imgUrl.lastIndexOf('/') + 1), blob);
                resolve();
              })
              .catch(error => {
                console.error('Failed to fetch image:', error);
                reject();
              });
          });
        });
        Promise.all(imgPromises)
          .then(() => {
            zip.generateAsync({ type: 'blob' })
              .then(blob => {
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = index[1] + '.zip';
                link.click();
              });
          })
          .catch(() => {
            console.error('Failed to process images.');
          });
      })
      .catch(error => {
        console.error('Failed to fetch the page:', error);
      });
}


// TODO
var LackUrls = [];

for (let i = 0;i < LackUrls.length;i++){
    console.log(LackUrls[i]);
    get_page(LackUrls[i]);
}