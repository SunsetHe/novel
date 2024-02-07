// 在控制台中运行加载 JSZip 库的代码
var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/jszip@3.1.5/dist/jszip.min.js';
document.head.appendChild(script);

function get_page(targetUrl){
    var index = targetUrl.match(/\/(\d+_\d+)\.html$/);

    // 创建一个JSZip实例
    var zip = new JSZip();

    fetch(targetUrl)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        // 将字节流转换为文本
        var decoder = new TextDecoder('GBK');
        var html = decoder.decode(new Uint8Array(buffer));

        // 创建一个Blob对象，并使用浏览器下载功能保存HTML内容
        var blob = new Blob([html], { type: 'text/html;charset=GBK' });

        zip.file(index[1] + '.html', blob);
      })
      .catch(error => {
        console.error('Failed to fetch the page:', error);
      });

    // 发送GET请求获取页面内容
    fetch(targetUrl)
      .then(response => response.text())
      .then(html => {

        // 将HTML内容添加到ZIP文件中
        zip.file('page.html', html);

        // 获取所有图片元素
        var imgElements = document.querySelectorAll('img');

        // 遍历图片元素
        var imgPromises = Array.from(imgElements).map(imgElement => {
          return new Promise((resolve, reject) => {
            // 获取图片的URL
            var imgUrl = imgElement.src;

            // 发送GET请求获取图片内容
            fetch(imgUrl)
              .then(response => response.blob())
              .then(blob => {
                // 将图片内容添加到ZIP文件中
                zip.file(imgUrl.substring(imgUrl.lastIndexOf('/') + 1), blob);
                resolve();
              })
              .catch(error => {
                console.error('Failed to fetch image:', error);
                reject();
              });
          });
        });

        // 等待所有图片处理完成后，将ZIP文件下载到本地
        Promise.all(imgPromises)
          .then(() => {
            zip.generateAsync({ type: 'blob' })
              .then(blob => {
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);

                // 生成文件名
                link.download = index[1] + '.zip';

                // 模拟点击下载链接
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











// function get_directory_amount(targetUrl) {
//     return new Promise((resolve, reject) => {
//         // 发送HTTP请求获取HTML内容
//         fetch(targetUrl)
//             .then(response => {
//                 // 将响应转换为Blob对象
//                 return response.blob();
//             })
//             .then(blob => {
//                 // 创建一个新的FileReader对象
//                 var reader = new FileReader();
//                 reader.onload = function () {
//                     // 将Blob解码为文本，使用GBK编码
//                     var text = new TextDecoder('gbk').decode(reader.result);
//
//                     // 创建一个虚拟的HTML元素，用于解析HTML字符串
//                     var tempElement = document.createElement('div');
//                     tempElement.innerHTML = text;
//
//                     // 查找包含<div class="page">的元素
//                     var pageDivs = tempElement.querySelectorAll('div.page');
//
//                     var layer;
//
//                     // 打印在控制台中
//                     pageDivs.forEach(div => {
//                         layer = div.innerHTML;
//                     });
//
//                     // 使用正则表达式提取页数信息
//                     var regex = /第\d+\/(\d+)页/;
//                     var match = layer.match(regex);
//
//                     if (match) {
//                         var total_Pages_directory = parseInt(match[1]);
//                         console.log(typeof total_Pages_directory)
//                         console.log("总页数为：" + total_Pages_directory);
//                         resolve(total_Pages_directory);
//                     } else {
//                         console.log("未找到页数信息。");
//                         reject("未找到页数信息。");
//                     }
//                 };
//                 reader.readAsArrayBuffer(blob);
//             })
//             .catch(error => {
//                 console.error('发生错误：', error);
//                 reject(error);
//             });
//     });
// }
//
// var directory_amount = 0;
//
// get_directory_amount('https://66yydstxt426.com/36/36991/')
//     .then(result => {
//         directory_amount = result;
//     })
//     .catch(error => {
//         console.error(error); // 输出错误
//     });
//
// console.log(directory_amount)





























// // 替换为你想要访问的URL
// var targetUrl = 'https://66yydstxt426.com/36/36991/1786434_4.html';
//
// var index = targetUrl.match(/\/(\d+_\d+)\.html$/);
//
// // 创建一个JSZip实例
// var zip = new JSZip();
//
// fetch(targetUrl)
//   .then(response => response.arrayBuffer())
//   .then(buffer => {
//     // 将字节流转换为文本
//     var decoder = new TextDecoder('GBK');
//     var html = decoder.decode(new Uint8Array(buffer));
//
//     // 创建一个Blob对象，并使用浏览器下载功能保存HTML内容
//     var blob = new Blob([html], { type: 'text/html;charset=GBK' });
//
//     zip.file(index[1] + '.html', blob);
//   })
//   .catch(error => {
//     console.error('Failed to fetch the page:', error);
//   });
//
// // 发送GET请求获取页面内容
// fetch(targetUrl)
//   .then(response => response.text())
//   .then(html => {
//
//     // 将HTML内容添加到ZIP文件中
//     zip.file('page.html', html);
//
//     // 获取所有图片元素
//     var imgElements = document.querySelectorAll('img');
//
//     // 遍历图片元素
//     var imgPromises = Array.from(imgElements).map(imgElement => {
//       return new Promise((resolve, reject) => {
//         // 获取图片的URL
//         var imgUrl = imgElement.src;
//
//         // 发送GET请求获取图片内容
//         fetch(imgUrl)
//           .then(response => response.blob())
//           .then(blob => {
//             // 将图片内容添加到ZIP文件中
//             zip.file(imgUrl.substring(imgUrl.lastIndexOf('/') + 1), blob);
//             resolve();
//           })
//           .catch(error => {
//             console.error('Failed to fetch image:', error);
//             reject();
//           });
//       });
//     });
//
//     // 等待所有图片处理完成后，将ZIP文件下载到本地
//     Promise.all(imgPromises)
//       .then(() => {
//         zip.generateAsync({ type: 'blob' })
//           .then(blob => {
//             var link = document.createElement('a');
//             link.href = URL.createObjectURL(blob);
//
//             // 生成文件名
//             link.download = index[1] + '.zip';
//
//             // 模拟点击下载链接
//             link.click();
//           });
//       })
//       .catch(() => {
//         console.error('Failed to process images.');
//       });
//   })
//   .catch(error => {
//     console.error('Failed to fetch the page:', error);
//   });
