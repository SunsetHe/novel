import os

# 获取当前文件夹路径
folder_path = './data'

# 存储每个文件夹中文件个数的字典
folder_file_counts = {}

# 遍历文件夹
for folder_name in os.listdir(folder_path):
    folder_full_path = os.path.join(folder_path, folder_name)

    # 判断路径是否为文件夹
    if os.path.isdir(folder_full_path):
        # 统计文件夹中文件个数
        file_count = len(os.listdir(folder_full_path))
        folder_file_counts[folder_name] = file_count
        # print(f"文件夹 '{folder_name}' 中有 {file_count} 个文件.")

# 输出每个文件夹中文件个数
print("\n每个文件夹中的文件个数:")
for folder_name, file_count in folder_file_counts.items():
    print(f"文件夹 '{folder_name}' 中有 {file_count} 个文件.")

# 判断所有文件夹的文件个数是否一致
if len(set(folder_file_counts.values())) == 1:
    print("\n所有文件夹的文件个数一致.")
else:
    print("\n所有文件夹的文件个数不一致.")

# 输出字典的取值有几种取值
unique_values = len(set(folder_file_counts.values()))
print(f"\n字典的取值有 {unique_values} 种不同的取值.")
