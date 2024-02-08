import re

# 读取txt文件中的URL并存储到列表中
with open('36991.txt', 'r') as file:
    urls = file.readlines()

# 定义一个函数，用于提取URL中.html前面的数字作为排序的关键字
def extract_number(url):
    match = re.search(r'(\d+)\.html', url)
    if match:
        return int(match.group(1))
    return float('inf')  # 如果没有匹配到数字，默认返回无穷大

# 按照提取的数字对URL进行排序
sorted_urls = sorted(urls, key=extract_number)

unique_urls = list(set(sorted_urls))

sorted_urls = sorted(unique_urls, key=extract_number)

# 输出排序后的URL
for url in sorted_urls:
    print(url.strip())


