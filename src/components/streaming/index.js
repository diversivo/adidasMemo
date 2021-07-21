import React from 'react';

const Streaming = ({ }) => {
  return (<>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dl87J5gMKRI?rel=0&modestbranding=1&playsinline=1&autohide=1&mute=0&showinfo=0&controls=1&autoplay=1"
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    {/* <iframe className="streaming"
      src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3D101964451555646%26id%3D100283158390442&width=500"
      width="500"
      height="496"
      scrolling="no"
      frameborder="0"
      allowTransparency="true"
      style={{
        border: 'none',
        overflow: 'hidden'
      }}
    /> */}
  </>)
}
export default Streaming;