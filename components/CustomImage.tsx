import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import spinner from '../assets/spinner.gif';

/**
 * Shows an image with the original aspectratio but a given hight
 */
const CustomImage = ({source , imgSize}: {source: any, imgSize: number}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    async function getData(){
      try{
        const widthData = await getWidth(source, imgSize);
        setIsLoading(false);
        setWidth(widthData);
      } catch(e) {
        alert(e);
      }
    }
    getData();
  }, []);

  if(!isLoading){
    return (
      <View>
        <Image source={source} style={{marginRight: 15, width: width, height: imgSize, borderRadius: 20}} />
      </View>
    );
  }

  return (
    <View>
      <Image source={spinner} style={{marginRight: 15, width: imgSize, height: imgSize, borderRadius: 20}} />
    </View>
  );
}

/**
 * Returns the width of an image with the original aspectratio but a given hight
 * 
 * @param source image that should be converted
 * @param imgSize hight that the image should be converted to
 * 
 * @returns a promise with the calculated width 
 */
function getWidth(source: any, imgSize: number): Promise<number>{
  return new Promise((resolve, reject) => { 
    Image.getSize(source.uri, (width, height) => {
      resolve(width/height*imgSize);
    }, (error) => {
      reject(error);
    });
   });
}

export default CustomImage;