import React from 'react'
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { Dimensions, Image } from 'react-native'
import FastImage from 'react-native-fast-image'

const {width} = Dimensions.get('window')
const AutoImage = ({url, style}) => {
  const isMounted = useRef(true)
  const [w] = useState(width - 32)
  const [height, setHeight] = useState(0)  
  useEffect(() => {
    if (url) {
      Image.getSize(url, (width, height) => {
        const ratio = height / width
        if (isMounted?.current) {
          setHeight(w * ratio)
        }
      }, () => {})
    }
  }, [])
  return (
    <>
    {!!height && <FastImage style={[{width: w, height}, style]} source={{uri: url, priority: FastImage.priority.normal}}/>}
    </>
  )
}
export default AutoImage
