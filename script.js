const messages = [
  "You're the peanut butter to my jelly 💕",
  "I love you more than boba tea 🧋",
  "You're my favorite notification ✨",
  "My heart does a happy dance when I think of you 🥰",
  "You're my sunshine on a rainy day ☀️🌧️"
];

function showMessage() {
  const message = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById("message").innerText = message;
}

function checkAnswer(button, correct) {
  if (correct) {
    button.style.background = "#b2f2bb";
    document.getElementById("quizResult").innerText = "Yay! You got it right 💘";
  } else {
    button.style.background = "#ffa8a8";
    document.getElementById("quizResult").innerText = "Oops! Try again 🥺";
  }
}

// 📸 Camera + Photobooth
const video = document.getElementById('video');
const canvas = document.createElement('canvas');
const previewSection = document.getElementById('preview');
const previewImage = document.getElementById('photoPreview');
const downloadLink = document.getElementById('downloadLink');

if (video) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => {
      alert("Couldn't access camera 😢");
    });
}

// Updated takePhoto() with countdown
function takePhoto() {
  const button = document.querySelector('.cute-button');
  const countdownText = document.createElement('p');
  countdownText.id = 'countdown';
  countdownText.style.fontSize = '2em';
  countdownText.style.color = '#ff69b4';
  countdownText.style.marginTop = '15px';
  countdownText.style.fontWeight = 'bold';

  button.insertAdjacentElement('afterend', countdownText);

  let count = 3;
  countdownText.textContent = `📸 Say cheese in ${count}...`;

  const countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownText.textContent = `📸 Say cheese in ${count}...`;
    } else {
      clearInterval(countdownInterval);
      countdownText.remove();
      snapPhoto(); // Call actual photo-taking logic
    }
  }, 1000);
}

function snapPhoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataURL = canvas.toDataURL('image/png');
  previewImage.src = dataURL;
  previewSection.style.display = 'block';
  downloadLink.href = dataURL;

  saveSelfieToLocalStorage(dataURL);
}

function saveSelfieToLocalStorage(dataURL) {
  let selfies = JSON.parse(localStorage.getItem("selfies") || "[]");
  selfies.push(dataURL);
  localStorage.setItem("selfies", JSON.stringify(selfies));
}
