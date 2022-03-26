/**
 * 
 * @param {string} url 
 * @returns {HTMLImageElement} the image
 */

function addImage(url) {
  const image = document.querySelector('div').appendChild(document.createElement('img'));
  image.src = url;
  return image;
}