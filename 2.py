import os

# 读取pageUrl.txt文件中的每行URL
with open("pageUrl.txt", "r") as file:
    urls = file.readlines()

urlPrefix = urls[0].rsplit("/", 1)[0]
print('url前缀为' ,urls[0].rsplit("/", 1)[0])

# 提取每行中的文件名并加上.zip后放入列表中
zip_names = []
for url in urls:
    # 提取URL中.html前面的部分
    file_name = url.strip().split("/")[-1].replace(".html", "") + ".zip"
    zip_names.append(file_name)

print('该小说总共有' , len(zip_names) , '页')
# 进入当前目录下的data目录
data_dir = "data"
os.chdir(data_dir)

# 遍历zip_names列表中的每个元素，检查是否存在对应的文件
existing_files = []
lacking_files = []
for zip_name in zip_names:
    if os.path.exists(zip_name):
        existing_files.append(zip_name)
    else:
        lacking_files.append(zip_name)

# 打印存在的文件列表
print("已有", len(existing_files) , '页')
# 打印剩余的zip_names列表
print("差", len(lacking_files) , '页')

LackUrl = []
for lacking_file in lacking_files:
    Url = urlPrefix + '/' + lacking_file.replace(".zip", "") + '.html'
    LackUrl.append(Url)

print(LackUrl)
os.chdir('..')
# 打开LackUrl.txt文件进行写入
with open("LackUrl.txt", "w") as file:
    file.write("[\n")  # 写入第一行 [

    # 逐个写入URL
    for i, url in enumerate(LackUrl):
        file.write(f"'{url}'")
        # 判断是否是最后一个元素
        if i < len(LackUrl) - 1:
            file.write(",\n")

    file.write("\n]")  # 写入最后一行 ]

# 读取download.js文件的内容
with open("download.js", "r") as file:
    lines = file.readlines()

lines[59] = f"var LackUrls = {LackUrl};\n"

# 将修改后的内容写回文件
with open("download.js", "w") as file:
    file.writelines(lines)