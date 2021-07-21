import { navigate } from 'gatsby';

const clrIlTxt = (clr, percent, alignRight = false) => {
  const colors = {
    blk: '#000000',
    blu: '#005EA1',
    red: '#D7685B',
    wht: '#FFFFFF',
  }
  return {
    color: colors[clr],
    display: 'inline-block',
    width: `${percent}%`,
    ...alignRight ? { textAlign: 'right' } : {}
  }
}

function fallbackCopyTextToClipboard(text) {
  if (typeof document !== 'undefined') {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }
}
function copyTextToClipboard(text) {
  if (typeof window !== 'undefined') {
    if (!window.navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    window.navigator.clipboard.writeText(text).then(function () {
      console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
}

const timeVerify = (time) => {
  const elapsedTime = Date.now() - time;
  if (elapsedTime > 5000) {
    navigate('/');
  }
}

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);                    

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string                  
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}

export {
  clrIlTxt,
  copyTextToClipboard,
  sha256
};