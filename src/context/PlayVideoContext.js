// this context to passing a value from 'ReportScreen' page deeper to 'Video' component.
// Video component need to know if the user go back using the navigation menu back button on small screen devices to stop the video.
import React from 'react';

export default React.createContext(true);
