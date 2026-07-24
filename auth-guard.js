(function () {
  const AUTH_KEY = 'lapit_admin_authenticated';

  document.querySelectorAll('.modal-logout').forEach((link) => {
    link.addEventListener('click', () => {
      sessionStorage.removeItem(AUTH_KEY);
    });
  });
})();
