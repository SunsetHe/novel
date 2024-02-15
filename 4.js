function getPage(targetUrl) {// 此代码只获取html
    var index = targetUrl.match(/\/(\d+_\d+)\.html$/);
    fetch(targetUrl)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            var decoder = new TextDecoder('GBK');
            var html = decoder.decode(new Uint8Array(buffer));
            var blob = new Blob([html], { type: 'text/html;charset=GBK' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = index[1] + '.html';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Failed to fetch the page:', error);
        });
}

var LackUrls = ['https://66yydstxt426.com/36/36991/1786434_7.html', 'https://66yydstxt426.com/36/36991/1686556_8.html', 'https://66yydstxt426.com/36/36991/1710640_4.html', 'https://66yydstxt426.com/36/36991/1690272_2.html', 'https://66yydstxt426.com/36/36991/1755140_6.html', 'https://66yydstxt426.com/36/36991/1690382_2.html', 'https://66yydstxt426.com/36/36991/1690382_3.html', 'https://66yydstxt426.com/36/36991/1710110_8.html', 'https://66yydstxt426.com/36/36991/1710110_7.html', 'https://66yydstxt426.com/36/36991/1688741_7.html', 'https://66yydstxt426.com/36/36991/1755140_2.html', 'https://66yydstxt426.com/36/36991/1784399_5.html', 'https://66yydstxt426.com/36/36991/1785218_8.html', 'https://66yydstxt426.com/36/36991/1710583_3.html', 'https://66yydstxt426.com/36/36991/1755140_7.html', 'https://66yydstxt426.com/36/36991/1686655_9.html', 'https://66yydstxt426.com/36/36991/1689322_11.html', 'https://66yydstxt426.com/36/36991/1710584_1.html', 'https://66yydstxt426.com/36/36991/1689022_3.html', 'https://66yydstxt426.com/36/36991/1755139_1.html', 'https://66yydstxt426.com/36/36991/1754703_5.html', 'https://66yydstxt426.com/36/36991/1686365_3.html', 'https://66yydstxt426.com/36/36991/1689022_5.html', 'https://66yydstxt426.com/36/36991/1785218_9.html', 'https://66yydstxt426.com/36/36991/1781774_5.html', 'https://66yydstxt426.com/36/36991/1686364_8.html', 'https://66yydstxt426.com/36/36991/1688740_10.html', 'https://66yydstxt426.com/36/36991/1710641_1.html', 'https://66yydstxt426.com/36/36991/1710641_3.html'];
var index = 0;
var intervalId = setInterval(function() {
    if (index < LackUrls.length) {
        console.log(LackUrls[index]);
        getPage(LackUrls[index]);
        index++;
    } else {
        clearInterval(intervalId);
    }
}, 20000);

// 此代码获取html以及
// var script = document.createElement('script');
// script.src = 'https://cdn.jsdelivr.net/npm/jszip@3.1.5/dist/jszip.min.js';
// document.head.appendChild(script);

// function get_page(targetUrl){
//     var index = targetUrl.match(/\/(\d+_\d+)\.html$/);
//     var zip = new JSZip();
//     fetch(targetUrl)
//       .then(response => response.arrayBuffer())
//       .then(buffer => {
//         var decoder = new TextDecoder('GBK');
//         var html = decoder.decode(new Uint8Array(buffer));
//         var blob = new Blob([html], { type: 'text/html;charset=GBK' });
//         zip.file(index[1] + '.html', blob);
//       })
//       .catch(error => {
//         console.error('Failed to fetch the page:', error);
//       });
//     fetch(targetUrl)
//       .then(response => response.text())
//       .then(html => {
//         zip.file('page.html', html);
//         var imgElements = document.querySelectorAll('img');
//         var imgPromises = Array.from(imgElements).map(imgElement => {
//           return new Promise((resolve, reject) => {
//             var imgUrl = imgElement.src;
//             fetch(imgUrl)
//               .then(response => response.blob())
//               .then(blob => {
//                 zip.file(imgUrl.substring(imgUrl.lastIndexOf('/') + 1), blob);
//                 resolve();
//               })
//               .catch(error => {
//                 console.error('Failed to fetch image:', error);
//                 reject();
//               });
//           });
//         });
//         Promise.all(imgPromises)
//           .then(() => {
//             zip.generateAsync({ type: 'blob' })
//               .then(blob => {
//                 var link = document.createElement('a');
//                 link.href = URL.createObjectURL(blob);
//                 link.download = index[1] + '.zip';
//                 link.click();
//               });
//           })
//           .catch(() => {
//             console.error('Failed to process images.');
//           });
//       })
//       .catch(error => {
//         console.error('Failed to fetch the page:', error);
//       });
// }