import imageInference from './tfjs-face_verify.js'
import imagePointInference from './tfjs-face_detection_landmarks.js'
import imageFaceInference from './tfjs-face_detection.js'
import videoInference from './speech_detection.js'
import poseInference from './tfjs-pose_detection.js'
import itemInference from './item_detection.min.js'


// const image = document.querySelector('img')
const video = document.getElementById('video')

const setupCamera = async function () {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      'Browser API navigator.mediaDevices.getUserMedia not available'
    )
  }

  const targetFPS = 60
  const $size = {
    width: 640,
    height: 480
  }
  const videoConfig = {
    audio: false,
    video: {
      facingMode: 'user',
      // Only setting the video to a specified size for large screen, on
      // mobile devices accept the default size.
      width: $size.width,
      height: $size.height,
      frameRate: {
        ideal: targetFPS
      }
    }
  }

  const stream = await navigator.mediaDevices.getUserMedia(videoConfig)
  
  return stream
}

video.srcObject = await setupCamera()

video.play()


/*
  video：传入视频流  --必传项
  baseImg：证件照 --必传项
  userId：渠道码  --必传项（请使用示例值）
  code: 授权码  --必传项（请使用示例值）
  freCnt：推理频率  --非必传项，不传默认为500毫秒，即每秒推理2次
*/
const userId = "1018"
const code = "kLhtDpdRFIojo6VSwXZ5myUFycvJUHey3xLqnQFVqsCW1qYg4Rh/aplH0pHraTPZ9NTg5+W/tlKUwZtq7yXtPg=="
const freCnt = 1000
// const img = document.getElementById('myImg')
const baseImg = document.getElementById('myImg')
//人脸相似度
imageInference(video, baseImg, userId, code, data => {
  console.log(data)
}, freCnt)
//人脸识别关键点
imagePointInference(video, userId, code, data => {
  console.log(data)
}, freCnt)
//人脸识别
imageFaceInference(video, userId, code, data => {
  console.log(data)
}, freCnt)
//声音识别
videoInference(userId, code, data => {
  console.log(data)
})
//行为识别
poseInference(video, userId, code, data => {
  console.log(data.yaw)
})
// 物品识别
itemInference(video, userId, code, data => {
  console.log(data)
})
