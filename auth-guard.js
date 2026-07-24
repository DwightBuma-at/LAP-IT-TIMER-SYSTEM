(function () {
  const AUTH_KEY = 'lapit_admin_authenticated';
  const USERNAME = 'admin';
  const PASSWORD = 'admin123';

  const isAuthenticated = () => sessionStorage.getItem(AUTH_KEY) === 'true';

  const createLoginGuard = () => {
    const modal = document.createElement('div');
    modal.id = 'authGuardModal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/45 px-4 py-5 backdrop-blur-sm';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="grid max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/70 bg-white shadow-[0_28px_90px_rgba(0,0,0,.34)] md:grid-cols-[.9fr_1.1fr]">
        <div class="relative flex min-h-[210px] flex-col justify-between bg-gradient-to-br from-[#16092F] via-[#3B178F] to-[#0F766E] p-5 text-white sm:min-h-[240px] sm:p-8">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,.20),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(255,255,255,.14),transparent_30%)]"></div>
          <div class="relative">
            <img src="assets/lap_it_logo-removebg-preview.png" alt="LAP IT logo" class="h-24 w-52 max-w-full object-contain object-left sm:h-28 sm:w-60">
          </div>
          <a class="relative inline-flex w-fit max-w-full whitespace-nowrap rounded-2xl border border-white/35 bg-white/12 px-3 py-2 text-[11px] font-extrabold uppercase tracking-[.04em] text-white shadow-sm transition hover:border-white/70 hover:bg-white/20 sm:px-4 sm:py-3 sm:text-sm sm:tracking-[.08em]" href="https://lapsolinc.com/" target="_blank" rel="noopener">
            Powered by LAP I.T. Solutions
          </a>
        </div>

        <div class="p-5 sm:p-8">
          <p class="text-xs font-extrabold uppercase tracking-[.18em] text-lap-muted">Login Required</p>
          <h2 class="mt-3 text-3xl font-extrabold text-lap-ink">Admin Access</h2>
          <p class="mt-2 text-sm leading-6 text-lap-muted">Please login first to continue to the admin interface.</p>

          <form id="authGuardForm" class="mt-7">
            <label class="block text-xs font-extrabold uppercase tracking-[.16em] text-lap-muted" for="authUsername">Username</label>
            <div class="mt-2 flex h-12 items-center gap-3 rounded-xl border border-lap-line bg-[#F7F5F7] px-4 transition focus-within:border-lap-purple focus-within:bg-white">
              <i data-lucide="user" class="h-4 w-4 text-lap-muted"></i>
              <input id="authUsername" class="w-full bg-transparent text-sm font-semibold text-lap-ink outline-none placeholder:text-lap-muted/50" type="text" placeholder="Username" required>
            </div>

            <label class="mt-5 block text-xs font-extrabold uppercase tracking-[.16em] text-lap-muted" for="authPassword">Password</label>
            <div class="mt-2 flex h-12 items-center gap-3 rounded-xl border border-lap-line bg-[#F7F5F7] px-4 transition focus-within:border-lap-purple focus-within:bg-white">
              <i data-lucide="lock" class="h-4 w-4 text-lap-muted"></i>
              <input id="authPassword" class="w-full bg-transparent text-sm font-semibold text-lap-ink outline-none placeholder:text-lap-muted/50" type="password" placeholder="Password" required>
              <button id="authTogglePassword" class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lap-muted transition hover:bg-slate-200 hover:text-lap-ink" type="button" aria-label="Show password">
                <i id="authPasswordIcon" data-lucide="eye" class="h-4 w-4"></i>
              </button>
            </div>

            <label class="mt-4 flex items-center gap-2 text-sm font-semibold text-lap-muted">
              <input id="authShowPassword" class="h-4 w-4 rounded border-lap-line accent-lap-purple" type="checkbox">
              Show password
            </label>

            <p id="authError" class="mt-3 hidden text-xs font-semibold text-red-600">The username or password you entered is incorrect.</p>

            <div class="mt-7 grid grid-cols-2 gap-3">
              <a class="inline-flex h-12 items-center justify-center rounded-xl border border-lap-line bg-white text-sm font-bold text-lap-ink transition hover:border-slate-400 hover:bg-slate-100" href="index.html">Back</a>
              <button class="h-12 rounded-xl bg-lap-purple text-sm font-extrabold text-white transition hover:bg-lap-dark" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    if (window.lucide) lucide.createIcons();

    const form = document.getElementById('authGuardForm');
    const username = document.getElementById('authUsername');
    const password = document.getElementById('authPassword');
    const error = document.getElementById('authError');
    const toggle = document.getElementById('authTogglePassword');
    const checkbox = document.getElementById('authShowPassword');
    const icon = document.getElementById('authPasswordIcon');

    const setPasswordVisibility = (visible) => {
      password.type = visible ? 'text' : 'password';
      checkbox.checked = visible;
      icon.setAttribute('data-lucide', visible ? 'eye-off' : 'eye');
      toggle.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
      if (window.lucide) lucide.createIcons();
    };

    toggle.addEventListener('click', () => setPasswordVisibility(password.type === 'password'));
    checkbox.addEventListener('change', () => setPasswordVisibility(checkbox.checked));

    [username, password].forEach((input) => {
      input.addEventListener('input', () => error.classList.add('hidden'));
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (username.value.trim() !== USERNAME || password.value.trim() !== PASSWORD) {
        error.classList.remove('hidden');
        return;
      }

      sessionStorage.setItem(AUTH_KEY, 'true');
      modal.remove();
    });

    setTimeout(() => username.focus(), 0);
  };

  document.querySelectorAll('.modal-logout').forEach((link) => {
    link.addEventListener('click', () => sessionStorage.removeItem(AUTH_KEY));
  });

  if (!isAuthenticated()) createLoginGuard();
})();
