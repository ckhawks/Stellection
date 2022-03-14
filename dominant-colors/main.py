import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt
import PIL

# https://towardsdatascience.com/finding-most-common-colors-in-python-47ea0767a06a
# source https://github.com/mrakelinggar/data-stuffs/blob/master/frequent_color/common%20colors.ipynb

def show_img_compar(img_1, img_2):
    f, ax = plt.subplots(1, 2, figsize=(10,10))
    ax[0].imshow(img_1)
    ax[1].imshow(img_2)
    ax[0].axis('off')
    ax[1].axis('off')
    f.tight_layout()
    plt.show()

img = cv.imread("img/img1.jpg")
img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
img_2 = cv.imread("img/img2.jpg")
img_2 = cv.cvtColor(img_2, cv.COLOR_BGR2RGB)

dim = (500, 300)
# resize image
img = cv.resize(img, dim, interpolation = cv.INTER_AREA)
img_2 = cv.resize(img_2, dim, interpolation = cv.INTER_AREA)

# show_img_compar(img, img_2)

"""
# method 1 - average 
img_temp = img.copy()
img_temp[:,:,0], img_temp[:,:,1], img_temp[:,:,2] = np.average(img, axis=(0,1))

img_temp_2 = img_2.copy()
img_temp_2[:,:,0], img_temp_2[:,:,1], img_temp_2[:,:,2] = np.average(img_2, axis=(0,1))

show_img_compar(img, img_temp)
show_img_compar(img_2, img_temp_2)
"""

# method 2 - most common combination


"""img_temp = img.copy()
unique, counts = np.unique(img_temp.reshape(-1, 3), axis=0, return_counts=True)
img_temp[:,:,0], img_temp[:,:,1], img_temp[:,:,2] = unique[np.argmax(counts)]

img_temp_2 = img_2.copy()
unique, counts = np.unique(img_temp_2.reshape(-1, 3), axis=0, return_counts=True)
img_temp_2[:,:,0], img_temp_2[:,:,1], img_temp_2[:,:,2] = unique[np.argmax(counts)]

show_img_compar(img, img_temp)
show_img_compar(img_2, img_temp_2)"""

""" pieces
print(img.reshape(-1, 3).shape)
img.reshape(-1, 3)

print(img.shape)
img

unique, counts = np.unique(img.reshape(-1, 3), axis=0, return_counts=True)
print(unique)
print(counts)

np.argmax(counts), np.max(counts), np.sum(counts)

unique[np.argmax(counts)]"""

# method 3 - n most common color


"""
from sklearn.cluster import KMeans

clt = KMeans(n_clusters=5)
clt.fit(img.reshape(-1, 3))

def palette(clusters):
    width=300
    palette = np.zeros((50, width, 3), np.uint8)
    steps = width/clusters.cluster_centers_.shape[0]
    for idx, centers in enumerate(clusters.cluster_centers_): 
        palette[:, int(idx*steps):(int((idx+1)*steps)), :] = centers
    return palette

clt_1 = clt.fit(img.reshape(-1, 3))
show_img_compar(img, palette(clt_1))

clt_2 = clt.fit(img_2.reshape(-1, 3))
show_img_compar(img_2, palette(clt_2))"""

# method 3.1 - n most common color + %

from sklearn.cluster import KMeans
from collections import Counter

clt = KMeans(n_clusters=5)
clt.fit(img.reshape(-1, 3))

def palette_perc(k_cluster):
    width = 300
    palette = np.zeros((50, width, 3), np.uint8)
    
    n_pixels = len(k_cluster.labels_)
    counter = Counter(k_cluster.labels_) # count how many pixels per cluster
    perc = {}
    for i in counter:
        perc[i] = np.round(counter[i]/n_pixels, 2)
    perc = dict(sorted(perc.items()))
    
    #for logging purposes
    print(perc)
    print(k_cluster.cluster_centers_)
    
    step = 0
    
    for idx, centers in enumerate(k_cluster.cluster_centers_): 
        palette[:, step:int(step + perc[idx]*width+1), :] = centers
        step += int(perc[idx]*width+1)
        
    return palette

clt_1 = clt.fit(img.reshape(-1, 3))
show_img_compar(img, palette_perc(clt_1))

clt_2 = clt.fit(img_2.reshape(-1, 3))
show_img_compar(img_2, palette_perc(clt_2))

goal = [{"percent": 0.42, "rgb": [254, 254, 254]},{"percent": 0.2, "rgb": [24.5, 25.1, 17.3]}]

# prioritize higher percentages
# python sort takes a lambda for what to sort by so you can tell it to sort by the percent key

"""
rgb1 = sRGBColor(0.1, 0.2, 0.3)
rgb2 = sRGBColor(1, 0.4, 0.2)
lab1 = convert_color(rgb1, LabColor, through_rgb_type=sRGBColor)
lab2 = convert_color(rgb2, LabColor, through_rgb_type=sRGBColor)
# If you are going to convert back to XYZ, make sure you use the same
# RGB color space on the way back.
# xyz2 = convert_color(hsl, XYZColor)

delta_e = delta_e_cie1976(lab1, lab2)
print(delta_e)


# Reference color.
color1 = LabColor(lab_l=0.9, lab_a=16.3, lab_b=-2.22)
# Color to be compared to the reference.
color2 = LabColor(lab_l=0.7, lab_a=14.2, lab_b=-1.80)
# This is your delta E value as a float.
delta_e = delta_e_cie1976(color1, color2)

print(delta_e)
"""

from colormath.color_objects import XYZColor, sRGBColor, LabColor, HSLColor, AdobeRGBColor
from colormath.color_conversions import convert_color
from colormath.color_diff import delta_e_cie1976

# returns delta_e value representing the difference between the two colors
# rgb tuples should be unnormalized (r[0-255], g[0-255], b[0-255])
def compareTwoRGB(rgb1, rgb2):

    print(rgb1)
    print(rgb2)

    # normalize RGB
    n_rgb1 = list(map(lambda i: float(i)/255, rgb1))
    n_rgb2 = list(map(lambda i: float(i)/255, rgb2))

    """
    n_rgb1 = list()
    n_rgb2 = list()

    for i in range(len(rgb1)):
        n_rgb1.append(float(rgb1[i])/255)
    for i in range(len(rgb2)):
        n_rgb2.append(float(rgb2[i])/255)
    """
    
    print(n_rgb1)
    print(n_rgb2)

    # source https://python-colormath.readthedocs.io/en/latest/conversions.html

    # convert RGB to LabColor
    n_srgb1 = sRGBColor(n_rgb1[0], n_rgb1[1], n_rgb1[2])
    n_srgb2 = sRGBColor(n_rgb2[0], n_rgb2[1], n_rgb2[2])

    print(n_srgb1)
    print(n_srgb2)

    lab1 = convert_color(n_srgb1, LabColor, through_rgb_type=sRGBColor)
    lab2 = convert_color(n_srgb2, LabColor, through_rgb_type=sRGBColor)

    delta_e = delta_e_cie1976(lab1, lab2)

    return delta_e

print(compareTwoRGB([255, 67, 88], [144, 55, 66]))