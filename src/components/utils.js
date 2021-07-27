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

function rutEsValido(rut) {
  if (!rut || rut.trim().length < 3) return false;
  const rutLimpio = rut.replace(/[^0-9kK-]/g, "");

  if (rutLimpio.length < 3) return false;

  const split = rutLimpio.split("-");
  if (split.length > 2 || split.length < 1) return false;

  let num;
  let dgv;

  if(split.length === 2) {
    num = parseInt(split[0], 10);
    dgv = split[1];
  } else {
    dgv = split[0].slice(-1)[0];
    num = split[0].slice(0, -1); 
  }

  

  const dvCalc = calculateDV(num);
  return dvCalc === dgv;
}

function calculateDV(rut) {
  const cuerpo = `${rut}`;
  // Calcular Dígito Verificador
  let suma = 0;
  let multiplo = 2;

  // Para cada dígito del Cuerpo
  for (let i = 1; i <= cuerpo.length; i++) {
    // Obtener su Producto con el Múltiplo Correspondiente
    const index = multiplo * cuerpo.charAt(cuerpo.length - i);

    // Sumar al Contador General
    suma += index;

    // Consolidar Múltiplo dentro del rango [2,7]
    if (multiplo < 7) {
      multiplo += 1;
    } else {
      multiplo = 2;
    }
  }

  // Calcular Dígito Verificador en base al Módulo 11
  const dvEsperado = 11 - (suma % 11);
  if (dvEsperado === 10) return "k";
  if (dvEsperado === 11) return "0";
  return `${dvEsperado}`;
}

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function shuffleArray(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export {
  clrIlTxt,
  copyTextToClipboard,
  sha256,
  rutEsValido,
  calculateDV,
  getRandom,
  shuffleArray
};