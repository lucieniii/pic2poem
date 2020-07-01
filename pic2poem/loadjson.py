import json

with open("imagenet_class_index.json", 'r') as load_f:
     load_dict = json.load(load_f)
     with open("wordsorigin.txt", 'w') as wd:
         for i in range(1000):
             wd.write(str(i) + ": " + load_dict[str(i)][1] + "\n")
             print(load_dict[str(i)][1])