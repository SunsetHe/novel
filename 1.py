# 打开文件进行读取
with open("pageUrl.txt", "r") as file:
    # 读取每一行内容
    lines = file.readlines()

# 修改每一行内容，删除前面的VM17:137部分
modified_lines = [line.split(" ", 1)[1] for line in lines]

# 将修改后的内容写回文件
with open("pageUrl.txt", "w") as file:
    file.writelines(modified_lines)