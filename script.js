const imageUrls = [
  { url: 'https://via.placeholder.com/150' },
  { url: 'https://via.placeholder.com/200' },
  { url: 'https://via.placeholder.com/250' },
];

function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
    img.src = image.url;
  });
}

document.getElementById('download-images-button').addEventListener('click', () => {
  const downloadPromises = imageUrls.map(image => downloadImage(image));

  Promise.all(downloadPromises)
    .then(images => {
      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = '';
      images.forEach(img => {
        outputDiv.appendChild(img);
      });
    })
    .catch(error => {
      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = `<p class="text-danger">${error}</p>`;
    });
});
