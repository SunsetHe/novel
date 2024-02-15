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
        for(let i = 0; i < chapterUrls.length; i++){
            fetch(chapterUrls[i])
                .then(response => response.arrayBuffer())
                .then(buffer => {
                    // 该章节的页数
                    var chapterPage = getPageAmount(buffer);
                    for (let j = 1;j <= chapterPage;j++){
                        var pageUrl = chapterUrls[i].replace(/\.html$/, "") + '_' + j + '.html';
                        console.log(pageUrl);
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