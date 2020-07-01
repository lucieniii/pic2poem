import sys
import random

hint = sys.argv[1]
# hint = "山悬崖谷"
sentNum = 4



def gen(acExtent):
    f = open("pic2poem/poetry_generator/poetry.txt", "r")
    txt = f.readlines()
    foundPoems = []
    for line in txt:
        s = line.index(":") + 1
        line = line[s:]
        cnt = 0
        for c in line:
            if c == "，" or c == "。":
                cnt += 1
        if cnt != sentNum:
            continue
        cnt = 0
        for c in hint:
            if c in line:
                cnt += 1
        matchExtent = 1.0 * cnt / len(hint)
        if matchExtent >= acExtent:
            foundPoems.append(line)
    f.close()
    return foundPoems


ex = 1.0
while True:
    try:
        print(random.choice(gen(ex)))
        # print("1，0。1，0。")
        break
    except IndexError:
        ex -= 0.1
