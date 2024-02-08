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

// 查看目录页数，并更改对应数目
var DirectoryAmount = 3;
// 书的网址，记得删掉/
var BookUrl = 'https://66yydstxt426.com/36/36991';
var BookUid = '36991';

// 生成目录的 URL 列表
var DirectoryUrls = [];
for (var i = 1; i <= DirectoryAmount; i++) {
    var url = BookUrl + '_' + i + '/';
    DirectoryUrls.push(url);
}

// 获取所有章节的 URL
fetchChapterUrls(DirectoryUrls)
    .then(chapterUrls => {
        console.log(chapterUrls);

        function createBlob(content) {
            return new Blob([content], { type: 'text/plain' });
        }

        // 下载文件
        function downloadFile(blob, filename) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }

        // 将章节 URL 写入文件并下载
        const content = chapterUrls.join('\n');
        const blob = createBlob(content);

        const filename = BookUid + '.txt';
        downloadFile(blob, filename);

    })
    .catch(error => {
        console.error('Error:', error);
    });

