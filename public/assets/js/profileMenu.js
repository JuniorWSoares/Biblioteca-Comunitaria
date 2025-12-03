// profileMenu.js
const profileIcon = document.getElementById('profileIcon');
const profileMenu = document.getElementById('profileMenu');

if (profileIcon && profileMenu) {
  profileIcon.addEventListener('click', (e) => {
    const isOpen = profileMenu.classList.toggle('open');
    profileMenu.setAttribute('aria-hidden', (!isOpen).toString());
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!profileMenu.contains(e.target) && !profileIcon.contains(e.target)) {
      profileMenu.classList.remove('open');
      profileMenu.setAttribute('aria-hidden', 'true');
    }
  });
}