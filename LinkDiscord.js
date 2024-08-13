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

window.onload = function() {
  const serverName = localStorage.getItem('joinedServer');
  if (serverName) {
      document.getElementById('serverInfo').textContent = `: ${serverName}`;
      // Clear the stored value
      localStorage.removeItem('joinedServer');
  } else {
      document.getElementById('serverInfo').textContent = 'No server information available.';
  }
};