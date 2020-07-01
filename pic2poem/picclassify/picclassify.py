from keras.applications.vgg16 import VGG16, preprocess_input, decode_predictions
from keras.preprocessing.image import load_img, img_to_array
import numpy as np
# VGG-16 instance
import sys

def getdict():
    dic = []
    with open("/root/pic2poem/picclassify/dict.txt", "r") as f:
        while True:
            lin = f.readline()
            if lin is "":
                break
            lin = lin[:-1].split("@")
            dic.append(lin)
    #print(dic)
    return dic


def translateentozh(dic, enword):
    #print(enword)
    for d in dic:
        if enword == d[0]:
            #print(d)
            return d[1]


def picclassify(image_path):

    model = VGG16(weights='imagenet', include_top=True)

    image = load_img(image_path, target_size=(224, 224))
    image_data = img_to_array(image)

    image_data = image_data.reshape((1,) + image_data.shape)
    #print(image_data.shape)

    image_data = preprocess_input(image_data)
    prediction = model.predict(image_data)
    results = decode_predictions(prediction, top=3)

    #print(results)

    dic = getdict()
    #print(dic)
    hint1 = translateentozh(dic, results[0][0][1])
    hint2 = translateentozh(dic, results[0][1][1])
    hint3 = translateentozh(dic, results[0][2][1])

    return hint1, hint2, hint3



