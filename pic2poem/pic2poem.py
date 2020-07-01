from poetry_generator import poetry_gen
from picclassify import picclassify
import os
import sys
import subprocess


def de_duplication(s):

    dedup_list = ''
    for char in s:
        if not char in dedup_list:
            dedup_list += char

    return dedup_list


if __name__ == '__main__':

    pic_path = sys.argv[1]
    # hint1, hint2, hint3 = picclassify.picclassify('/Users/lucien/pic2poem/picclassify/1.png')
    hint1, hint2, hint3 = picclassify.picclassify(pic_path)
    # print(hint1)
    # print(hint2)
    # print(hint3)

    hint = hint1 + hint2 + hint3
    hint = de_duplication(hint)
    # print(hint)

    # os.popen(cmd, 'r', 1)
    if sys.argv[2] == '0':
        cmd = "/root/pic2poem/poetry_generator/poetry_gen.py"
        out_bytes = subprocess.check_output(['python3', cmd, '--mode', 'sample', '--head', hint])
    else:
        cmd = "/root/pic2poem/searchPoem.py"
        out_bytes = subprocess.check_output(['python3', cmd, hint])
    out_text = out_bytes.decode('utf-8')
    # out_text = u'人安十年意，篱拜发新舍。栏盖何日见，蜂随花老齐。'
    # out_text = u'燕辞旅舍人空在，萤出疏篱菊正芳。 堪恨昔年联句地，念经僧扫过重阳。'
    # out_text = u'泉楼别凄凄。山尘耳合何悠悠。'
    # out_text = u'登山临水分无期，泉石烟霞今属谁。君到嵩阳吟此句，与教二十六峰知。'
    # out_text = u'山洲人境空，河清草木黄。谷口云连野，边流日渐长。'
    print(out_text)

