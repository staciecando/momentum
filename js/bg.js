const colors = ["#5e716a", "#1f271b", "#7c6e7f", "#59515e", "#655967", "#333333", "#594d5b"];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Example usage
const randomColor = getRandomColor();
console.log(randomColor);

document.body.style.background = randomColor;

