const input = document.getElementById('codeInput');
const presetLink = document.getElementById('presetLink');
// Add this line to restrict input to digits only
input.addEventListener('input', e => e.target.value = e.target.value.replace(/[^0-9]/g, ''));


function isValidZipCode(zip) {
    return /^\d{5}$/.test(zip);
}

function navigateToPresetUrl() {
    const zipCode = input.value.trim();
    if (isValidZipCode(zipCode)) {
        window.location.href = presetLink.href + '?zip=' + zipCode;
    } else {
        alert('Please enter a valid Los Angeles 5-digit zip code.');
    }
}

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        navigateToPresetUrl();
    }
});

presetLink.addEventListener('click', function(event) {
    event.preventDefault();
    navigateToPresetUrl();
});
console.log('Script loaded and running');



document.addEventListener('DOMContentLoaded', function() {
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  const architectsLink = document.getElementById('Discord');
  const originalArchitectsStyle = window.getComputedStyle(architectsLink);

  sidebarLinks.forEach(link => {
    link.addEventListener('mouseover', function() {
      this.style.fontSize = originalArchitectsStyle.fontSize;
      this.style.fontWeight = originalArchitectsStyle.fontWeight;
      this.style.color = originalArchitectsStyle.color;
      architectsLink.style.fontSize = '';
      architectsLink.style.fontWeight = '';
    });

    link.addEventListener('mouseout', function() {
      this.style.fontSize = '';
      this.style.fontWeight = '';
      architectsLink.style.fontSize = originalArchitectsStyle.fontSize;
      architectsLink.style.fontWeight = originalArchitectsStyle.fontWeight;
    });
  });
});

document.getElementById('codeInput').addEventListener('input', function() {
  const serverName = this.value;
  // Store the value in localStorage
  localStorage.setItem('joinedServer', serverName);
});