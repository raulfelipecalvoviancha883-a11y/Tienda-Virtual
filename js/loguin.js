// ============================================
// IRON REBEL GARAGE · LOGIN
// Autenticación de demostración (front-end only,
// sin backend real) con validación y redirección
// según el rol detectado.
// ============================================

(function () {
  'use strict';

  const form = document.getElementById('loginForm');
  const usuarioInput = document.getElementById('usuario');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const statusEl = document.getElementById('loginStatus');
  const submitBtn = document.getElementById('loginSubmit');
  const forgotLink = document.getElementById('forgotLink');

  const errorUsuario = document.getElementById('errorUsuario');
  const errorPassword = document.getElementById('errorPassword');

  // Credenciales de demostración
  const ADMIN_USER = 'admin';
  const ADMIN_PASS = 'admin123';
  const MIN_PASS_LENGTH = 4;

  function setFieldError(input, errorEl, message) {
    const group = input.closest('.form-group');
    if (group) group.classList.toggle('error', Boolean(message));
    if (errorEl) {
      errorEl.textContent = message || '';
      errorEl.classList.toggle('visible', Boolean(message));
    }
  }

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `login-status ${type || ''}`.trim();
  }

  function validate() {
    let valid = true;

    if (!usuarioInput.value.trim()) {
      setFieldError(usuarioInput, errorUsuario, 'Ingresa tu usuario o correo');
      valid = false;
    } else {
      setFieldError(usuarioInput, errorUsuario, '');
    }

    if (!passwordInput.value || passwordInput.value.length < MIN_PASS_LENGTH) {
      setFieldError(passwordInput, errorPassword, `La contraseña debe tener al menos ${MIN_PASS_LENGTH} caracteres`);
      valid = false;
    } else {
      setFieldError(passwordInput, errorPassword, '');
    }

    return valid;
  }

  // Mostrar / ocultar contraseña
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', function () {
      const isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';
      togglePasswordBtn.textContent = isHidden ? '🙈' : '👁️';
      togglePasswordBtn.setAttribute('aria-label', isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
  }

  // Limpiar error al escribir
  [usuarioInput, passwordInput].forEach(function (input) {
    input.addEventListener('input', function () {
      const group = input.closest('.form-group');
      if (group && group.classList.contains('error')) validate();
    });
  });

  if (forgotLink) {
    forgotLink.addEventListener('click', function (e) {
      e.preventDefault();
      setStatus('Contacta a soporte para recuperar tu contraseña: info@ironrebelgarage.com', 'success');
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validate()) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Verificando...';
      setStatus('', '');

      const usuario = usuarioInput.value.trim();
      const password = passwordInput.value;

      // Simula una verificación asíncrona (por ejemplo, contra un servidor)
      setTimeout(function () {
        const esAdmin = usuario.toLowerCase() === ADMIN_USER && password === ADMIN_PASS;

        try {
          sessionStorage.setItem('ironrebel_user', usuario);
          sessionStorage.setItem('ironrebel_role', esAdmin ? 'admin' : 'cliente');
        } catch (err) {
          // Si sessionStorage no está disponible, seguimos sin persistir sesión
        }

        setStatus('¡Bienvenido! Redirigiendo…', 'success');

        setTimeout(function () {
          window.location.href = esAdmin ? 'admin.html' : 'cliente.html';
        }, 600);
      }, 700);
    });
  }

})();
