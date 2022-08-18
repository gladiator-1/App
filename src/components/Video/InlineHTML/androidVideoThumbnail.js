import styles from '../../../styles/styles';

export default (src, ext) => `
    <html>
    <head>
       <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
       <style>
          video {
          border-radius: ${styles.webViewStyles.tagStyles.video.borderRadius}px;
          }
       </style>
    </head>
    <video width="100%" height="99%" id="video1">
       <source src="${src}" type="video/${ext}">
       Your browser does not support the video tag.
    </video>
    <script>
       function formatTime(seconds) {
         const h = Math.floor(seconds / 3600);
         const m = Math.floor((seconds % 3600) / 60);
         const s = Math.round(seconds % 60);
         return [
           h,
           m > 9 ? m : (h ? '0' + m : m || '0'),
           s > 9 ? s : '0' + s
         ].filter(Boolean).join(':');
       }
       var video = document.getElementById("video1");
         video.addEventListener("loadedmetadata",()=>{
           var width = video.videoWidth;
           var height = video.videoHeight;
           var duration = formatTime(video.duration);
           window.ReactNativeWebView.postMessage("w1"+width);
           window.ReactNativeWebView.postMessage("h1"+height);
           window.ReactNativeWebView.postMessage("d1"+duration);
         })
    </script>
 </html>
 
    `;
