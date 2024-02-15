# 创建字典txt
# import os
# import csv
#
# # 文件夹路径
# csv_name = 'dictionary.csv'
# folder_path = 'png'
#
# # 创建CSV文件并写入表头
# with open(csv_name, 'w', newline='') as csvfile:
#     csv_writer = csv.writer(csvfile)
#     csv_writer.writerow(['key', 'value'])  # 写入表头
#
#     # 遍历文件夹中的PNG文件
#     for filename in os.listdir(folder_path):
#         if filename.endswith('.png'):
#             csv_writer.writerow(['/toimg/data/' + filename, ''])  # 写入文件名和空值

# 更新字典txt
# import os
# import csv
#
# # 文件夹路径
# folder_path = 'png'
# # 原始 CSV 文件路径
# csv_path = 'output.csv'
#
# # 读取已存在的 PNG 文件名
# existing_files = set()
# with open(csv_path, 'r', newline='') as csvfile:
#     csv_reader = csv.reader(csvfile)
#     next(csv_reader)  # 跳过表头
#     for row in csv_reader:
#         key = row[0].split('/')[-1]  # 提取文件名
#         existing_files.add(key)
#
# # 遍历文件夹中的 PNG 文件，将新文件名添加到 CSV 文件中
# with open(csv_path, 'a', newline='') as csvfile:
#     csv_writer = csv.writer(csvfile)
#     for filename in os.listdir(folder_path):
#         if filename.endswith('.png') and filename not in existing_files:
#             csv_writer.writerow(['/toimg/data/' + filename, ''])  # 写入新文件名和空值
#
# print("已更新 CSV 文件")


# 重新排序字典txt
# import csv
#
# # 读取 CSV 文件并按照十位数大小重新排列每一行
# def rearrange_csv(input_file, output_file):
#     # 读取 CSV 文件
#     with open(input_file, 'r', newline='') as csvfile:
#         csv_reader = csv.reader(csvfile)
#         header = next(csv_reader)  # 读取表头
#         rows = list(csv_reader)    # 读取数据行
#
#     # 按照十位数大小重新排列每一行
#     sorted_rows = sorted(rows, key=lambda x: int(x[0].split('/')[-1].split('.')[0][-10:]))
#
#     # 写入重新排列后的数据到新的 CSV 文件
#     with open(output_file, 'w', newline='') as csvfile:
#         csv_writer = csv.writer(csvfile)
#         csv_writer.writerow(header)  # 写入表头
#         for row in sorted_rows:
#             csv_writer.writerow(row)  # 写入数据行
#
# # 调用函数重新排列 CSV 文件
# rearrange_csv('output.csv', 'output_sorted.csv')
# print("重新排列完成")
