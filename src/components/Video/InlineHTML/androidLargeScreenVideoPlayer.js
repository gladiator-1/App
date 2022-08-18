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
    <body>
       <video id="video1" width="100%" height="99%" controls >
          <source src="${src}" type="video/${ext}">
          Your browser does not support the video tag.
       </video>
       <script>
          var video = document.getElementById("video1");
            video.addEventListener("loadedmetadata",()=>{
              var width = video.videoWidth;
              var height = video.videoHeight;
              window.ReactNativeWebView.postMessage("w2"+width);
              window.ReactNativeWebView.postMessage("h2"+height);
            })
       </script>
       <body>
 </html>
`;
