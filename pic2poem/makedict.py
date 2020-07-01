cnt = 0
with open("words.txt", "r") as f:
    with open("trans.txt", "w") as t:
        while True:
            l = f.readline()
            if l is "":
                break
            t.write("@")
            for c in l:
                if c not in "1234567890-_qwertyuiopasdfghjklzxcvbnm. :QWERTYUIOPASDFGHJKLZXCVBNM\'\"":
                    t.write(c)
    with open("trans.txt", "r") as t:
        with open("dict.txt", "w") as d:
            with open("wordsorigin.txt", "r") as ow:
                for i in range(1000):
                    lt = t.readline()[:-1];
                    lo = ow.readline()[:-1];
                    d.write(lo+lt+"\n")

