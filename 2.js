function get_chapter_page_amount(targetUrl) {
    // 查找html中获取带有’class="chapterPages" 的元素
    var chapterPages = document.getElementsByClassName('chapterPages');

    // 提取【数字】的正则表达式
    var regex = /\【(\d+)】/g;

    // 匹配innerText中的所有数字
    var matches = chapterPages[0].innerText.match(regex);

    // 用于存储所有匹配到的数字
    var numbers = [];

    // 遍历匹配结果，并将数字添加到数组中
    matches.forEach(function(match) {
        var number = parseInt(match.replace(/[\【\】]/g, ''));
        numbers.push(number);
    });

    // 打印最大的数字
    return Math.max(...numbers);
}

