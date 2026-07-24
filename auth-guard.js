(function () {
  const AUTH_KEY = 'lapit_admin_authenticated';
  const REDIRECT_KEY = 'lapit_auth_redirect';

  const isAuthenticated = () => sessionStorage.getItem(AUTH_KEY) === 'true';

  document.querySelectorAll('.modal-logout').forEach((link) => {
    link.addEventListener('click', () => {
      sessionStorage.removeItem(AUTH_KEY);
      sessionStorage.removeItem(REDIRECT_KEY);
    });
  });

  if (isAuthenticated()) return;

  const attemptedPage = `${window.location.pathname.split('/').pop() || 'billiard-table-timer.html'}${window.location.search}${window.location.hash}`;
  sessionStorage.setItem(REDIRECT_KEY, attemptedPage);
  window.location.replace('./?login=required');
})();
