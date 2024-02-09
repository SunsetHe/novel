// 在控制台中运行加载 JSZip 库的代码，要先运行这段代码
var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/jszip@3.1.5/dist/jszip.min.js';
document.head.appendChild(script);

// 通过 fetch 获取 HTML 内容
async function fetchHTML(url) {
    const response = await fetch(url);
    return await response.text();
}

// 提取 HTML 中的 URL
function extractUrls(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const urls = [];
    const listItems = doc.querySelectorAll('ul.list li a');
    listItems.forEach(item => {
        const href = item.getAttribute('href');
        const fullUrl = new URL(href, BookUrl).href; // 转换为完整 URL
        urls.push(fullUrl);
    });
    return urls;
}

// 获取所有章节的 URL
async function fetchChapterUrls(directoryUrls) {
    // 章节的url列表
    const chapterUrls = [];
    for (const url of directoryUrls) {
        const html = await fetchHTML(url);
        const urls = extractUrls(html);
        chapterUrls.push(...urls);
    }
    // 对章节 URL 进行排序和去重
    return [...new Set(chapterUrls)].sort((a, b) => {
        const numA = parseInt(a.match(/\d+(?=\.html)/)[0]);
        const numB = parseInt(b.match(/\d+(?=\.html)/)[0]);
        return numA - numB;
    });
}

function getPageAmount(buffer) {
    var decoder = new TextDecoder("gbk");
    var text = decoder.decode(buffer);
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;
    var chapterPagesElements = tempDiv.querySelectorAll('.chapterPages');
    var regex = /\【(\d+)】/g;
    var matches = chapterPagesElements[0].innerText.match(regex);
    var numbers = [];
    matches.forEach(function(match) {
        var number = parseInt(match.replace(/[\【\】]/g, ''));
        numbers.push(number);
    });
    // 章节的页数
    return Math.max(...numbers);
}

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



// 书的网址，记得删掉/
var BookUrl = 'https://66yydstxt426.com/36/36991';
// 查看目录页数，并更改对应数目
var DirectoryAmount = 3;
// 生成目录的 URL 列表
var DirectoryUrls = [];
for (var i = 1; i <= DirectoryAmount; i++) {
    var url = BookUrl + '_' + i + '/';
    DirectoryUrls.push(url);
}

// 获取所有章节的 URL
fetchChapterUrls(DirectoryUrls)
    .then(chapterUrls => { //chapterUrls为章节的url列表
        // console.log(chapterUrls);
        for(let i = 0; i < chapterUrls.length; i++){
            fetch(chapterUrls[i])
                .then(response => response.arrayBuffer())
                .then(buffer => {
                    var chapterPage = getPageAmount(buffer);
                    for (let j = 1;j <= chapterPage;j++){
                        var pageUrl = chapterUrls[i].replace(/\.html$/, "") + '_' + j + '.html';
                        console.log(pageUrl);
                        get_page(pageUrl);
                    }
                })
                .catch(error => {
                    console.error('发生错误:', error);
                });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });