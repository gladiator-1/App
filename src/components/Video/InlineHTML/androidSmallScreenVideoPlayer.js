export default (src, ext) => `
    <html>

    <head>
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
      <style type=t ext/css>
      video::-webkit-media-controls-fullscreen-button {
             display: none;
            }
      </style>
    </head>
    <video id="video1" width="100%" controls autoplay>
      <source src="${src}" type="video/${ext}">Your browser does not support the video tag.</video>
    
    </html>
    `;
