# https://youtu.be/dCcRWdmmgA0

"""
@author: DigitalSreeni

This file provides the VGG16 method to be applied on images to extract features. 
These features can then be used for content based image retrieval. 
Please note that Imagenet pre-trained weights will be loaded to VGG16
and the output from the final layer has a shape of 512 - our feature vector length. 


"""

import numpy as np
from numpy import linalg as LA

from tensorflow import keras
from keras._tf_keras.keras.applications.vgg16 import VGG16

from keras._tf_keras.keras.preprocessing import image
from keras._tf_keras.keras.applications.vgg16 import preprocess_input
from io import BytesIO
from PIL import Image



class VGGNet:
    def __init__(self):
        self.input_shape = (224, 224, 3)
        self.weight = 'imagenet'
        self.pooling = 'max'
        self.model = VGG16(weights = self.weight, input_shape = (self.input_shape[0], self.input_shape[1], self.input_shape[2]), pooling = self.pooling, include_top = False)
        self.model.predict(np.zeros((1, 224, 224 , 3)))
        

    '''
    Use vgg16 model to extract features
    Output normalized feature vector
    '''
    def extract_feat(self, img_path):
        img = image.load_img(img_path, target_size=(self.input_shape[0], self.input_shape[1]))
        img = image.img_to_array(img)
        img = np.expand_dims(img, axis=0)
        img = preprocess_input(img)
        feat = self.model.predict(img)
        norm_feat = feat[0]/LA.norm(feat[0])
        return norm_feat
    
    def extract_feat_image(self, image_bytes):
        print(f"Received image fuction: {len(image_bytes)} bytes")
        try:
            img = Image.open(BytesIO(image_bytes))
            img = img.convert("RGB")
            img = img.resize((224, 224))
            img = image.img_to_array(img)
            img = np.expand_dims(img, axis=0)
            img = preprocess_input(img)
            feat = self.model.predict(img)
            norm_feat = feat[0]/LA.norm(feat[0])
            return norm_feat
        
        except Exception as e:
            print(f"Error loading image: {str(e)}")
            return None

