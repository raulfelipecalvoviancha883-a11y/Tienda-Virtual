// ==========================================
// CONFIGURACIÓN
// ==========================================

const CONFIG = {
  // Selectores
  selectors: {
    form: '#contactForm',
    nombre: '#nombre',
    email: '#email',
    telefono: '#telefono',
    asunto: '#asunto',
    mensaje: '#mensaje',
    terminos: '#terminos',
    formStatus: '#formStatus',
    errorMessages: '.error-message',
    charCounter: '.char-counter',
    resetBtn: 'button[type="reset"]',
    submitBtn: 'button[type="submit"]',
    searchInput: 'nav input[type="text"]',
    searchBtn: 'nav button[type="submit"]',
    navLinks: 'nav ul li a',
    socialLinks: '.social-links a'
  },
  
  // Validación
  validation: {
    nombreMin: 2,
    nombreMax: 80,
    mensajeMin: 10,
    mensajeMax: 500,
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    telefonoPattern: /^[\+\d\s\-\(\)]{8,20}$/
  },
  
  // Mensajes
  messages: {
    required: 'Este campo es obligatorio',
    nombreMin: 'El nombre debe tener al menos 2 caracteres',
    nombreMax: 'El nombre no puede exceder los 80 caracteres',
    emailInvalid: 'Ingresa un correo electrónico válido',
    telefonoInvalid: 'Ingresa un teléfono válido (mínimo 8 dígitos)',
    mensajeMin: 'El mensaje debe tener al menos 10 caracteres',
    mensajeMax: 'El mensaje no puede exceder los 500 caracteres',
    terminosRequired: 'Debes aceptar los términos y condiciones',
    success: '¡Mensaje enviado con éxito! Te responderemos pronto.',
    error: 'Ocurrió un error al enviar el mensaje. Intenta nuevamente.',
    searchPlaceholder: 'Buscar modelo...'
  }
};

// ==========================================
// VARIABLES GLOBALES
// ==========================================

let isSubmitting = false;
let formData = {};

// ==========================================
// SELECTORES DEL DOM
// ==========================================

const DOM = {
  form: document.querySelector(CONFIG.selectors.form),
  nombre: document.querySelector(CONFIG.selectors.nombre),
  email: document.querySelector(CONFIG.selectors.email),
  telefono: document.querySelector(CONFIG.selectors.telefono),
  asunto: document.querySelector(CONFIG.selectors.asunto),
  mensaje: document.querySelector(CONFIG.selectors.mensaje),
  terminos: document.querySelector(CONFIG.selectors.terminos),
  formStatus: document.querySelector(CONFIG.selectors.formStatus),
  errorMessages: document.querySelectorAll(CONFIG.selectors.errorMessages),
  charCounter: document.querySelector(CONFIG.selectors.charCounter),
  resetBtn: document.querySelector(CONFIG.selectors.resetBtn),
  submitBtn: document.querySelector(CONFIG.selectors.submitBtn),
  searchInput: document.querySelector(CONFIG.selectors.searchInput),
  searchBtn: document.querySelector(CONFIG.selectors.searchBtn),
  navLinks: document.querySelectorAll(CONFIG.selectors.navLinks),
  socialLinks: document.querySelectorAll(CONFIG.selectors.socialLinks)
};

// ==========================================
// UTILIDADES
// ==========================================

/**
 * Muestra un mensaje de estado en el formulario
 */
const setFormStatus = (message, type = 'success') => {
  if (!DOM.formStatus) return;
  
  DOM.formStatus.textContent = message;
  DOM.formStatus.className = `form-status ${type}`;
  DOM.formStatus.style.display = 'block';
  
  // Auto-ocultar después de 5 segundos
  if (type === 'success') {
    setTimeout(() => {
      DOM.formStatus.style.display = 'none';
    }, 5000);
  }
};

/**
 * Limpia los mensajes de error de un campo
 */
const clearFieldError = (field) => {
  const group = field.closest('.form-group');
  if (!group) return;
  
  group.classList.remove('error');
  const errorEl = group.querySelector('.error-message');
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
};

/**
 * Muestra un mensaje de error para un campo específico
 */
const setFieldError = (field, message) => {
  const group = field.closest('.form-group');
  if (!group) return;
  
  group.classList.add('error');
  const errorEl = group.querySelector('.error-message');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }
};

/**
 * Valida un campo individual
 */
const validateField = (field) => {
  const id = field.id;
  let isValid = true;
  let errorMessage = '';
  
  clearFieldError(field);
  
  switch (id) {
    case 'nombre':
      if (!field.value.trim()) {
        errorMessage = CONFIG.messages.required;
        isValid = false;
      } else if (field.value.trim().length < CONFIG.validation.nombreMin) {
        errorMessage = CONFIG.messages.nombreMin;
        isValid = false;
      } else if (field.value.trim().length > CONFIG.validation.nombreMax) {
        errorMessage = CONFIG.messages.nombreMax;
        isValid = false;
      }
      break;
      
    case 'email':
      if (!field.value.trim()) {
        errorMessage = CONFIG.messages.required;
        isValid = false;
      } else if (!CONFIG.validation.emailPattern.test(field.value.trim())) {
        errorMessage = CONFIG.messages.emailInvalid;
        isValid = false;
      }
      break;
      
    case 'telefono':
      if (field.value.trim() && !CONFIG.validation.telefonoPattern.test(field.value.trim())) {
        errorMessage = CONFIG.messages.telefonoInvalid;
        isValid = false;
      }
      break;
      
    case 'asunto':
      if (!field.value) {
        errorMessage = CONFIG.messages.required;
        isValid = false;
      }
      break;
      
    case 'mensaje':
      if (!field.value.trim()) {
        errorMessage = CONFIG.messages.required;
        isValid = false;
      } else if (field.value.trim().length < CONFIG.validation.mensajeMin) {
        errorMessage = CONFIG.messages.mensajeMin;
        isValid = false;
      } else if (field.value.trim().length > CONFIG.validation.mensajeMax) {
        errorMessage = CONFIG.messages.mensajeMax;
        isValid = false;
      }
      break;
      
    case 'terminos':
      if (!field.checked) {
        errorMessage = CONFIG.messages.terminosRequired;
        isValid = false;
      }
      break;
  }
  
  if (!isValid) {
    setFieldError(field, errorMessage);
  }
  
  return isValid;
};

/**
 * Valida todo el formulario
 */
const validateForm = () => {
  const fields = [
    DOM.nombre,
    DOM.email,
    DOM.telefono,
    DOM.asunto,
    DOM.mensaje,
    DOM.terminos
  ];
  
  let isValid = true;
  
  fields.forEach(field => {
    if (field && !validateField(field)) {
      isValid = false;
    }
  });
  
  return isValid;
};

/**
 * Actualiza el contador de caracteres del mensaje
 */
const updateCharCounter = () => {
  if (!DOM.mensaje || !DOM.charCounter) return;
  
  const length = DOM.mensaje.value.length;
  const max = CONFIG.validation.mensajeMax;
  
  DOM.charCounter.textContent = `${length} / ${max} caracteres`;
  
  if (length > max) {
    DOM.charCounter.classList.add('limit');
  } else {
    DOM.charCounter.classList.remove('limit');
  }
};

/**
 * Obtiene los datos del formulario como objeto
 */
const getFormData = () => {
  return {
    nombre: DOM.nombre?.value.trim() || '',
    email: DOM.email?.value.trim() || '',
    telefono: DOM.telefono?.value.trim() || '',
    asunto: DOM.asunto?.value || '',
    mensaje: DOM.mensaje?.value.trim() || '',
    terminos: DOM.terminos?.checked || false
  };
};

/**
 * Simula el envío de datos a un servidor
 */
const submitFormData = (data) => {
  return new Promise((resolve) => {
    // Simulación de respuesta del servidor
    setTimeout(() => {
      console.log('Datos enviados:', data);
      resolve({ success: true, message: CONFIG.messages.success });
    }, 1500);
  });
};

/**
 * Limpia el formulario completamente
 */
const resetForm = () => {
  if (DOM.form) {
    DOM.form.reset();
  }
  
  // Limpiar mensajes de error
  document.querySelectorAll('.form-group.error').forEach(group => {
    group.classList.remove('error');
  });
  
  document.querySelectorAll('.error-message.visible').forEach(el => {
    el.classList.remove('visible');
    el.textContent = '';
  });
  
  // Ocultar mensaje de estado
  if (DOM.formStatus) {
    DOM.formStatus.style.display = 'none';
    DOM.formStatus.className = 'form-status';
    DOM.formStatus.textContent = '';
  }
  
  // Actualizar contador
  updateCharCounter();
  
  isSubmitting = false;
  formData = {};
};

/**
 * Maneja el envío del formulario
 */
const handleFormSubmit = async (e) => {
  e.preventDefault();
  
  // Evitar envíos duplicados
  if (isSubmitting) return;
  
  // Validar formulario
  if (!validateForm()) {
    // Encontrar el primer campo con error y hacer scroll
    const firstError = document.querySelector('.form-group.error');
    if (firstError) {
      const input = firstError.querySelector('input, select, textarea');
      if (input) {
        input.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    return;
  }
  
  // Obtener datos
  formData = getFormData();
  
  // Marcar como enviando
  isSubmitting = true;
  if (DOM.submitBtn) {
    DOM.submitBtn.disabled = true;
    DOM.submitBtn.textContent = 'Enviando...';
  }

  try {
    const response = await submitFormData(formData);
    setFormStatus(response.message, 'success');
    resetForm();
  } catch (error) {
    setFormStatus(CONFIG.messages.error, 'error');
  } finally {
    isSubmitting = false;
    if (DOM.submitBtn) {
      DOM.submitBtn.disabled = false;
      DOM.submitBtn.textContent = '✉️ Enviar mensaje';
    }
  }
};

// ==========================================
// EVENT LISTENERS
// ==========================================

if (DOM.form) {
  DOM.form.addEventListener('submit', handleFormSubmit);
}

// Botón "Limpiar": el navegador ya vacía los campos (type="reset"),
// aquí solo limpiamos nuestros mensajes de error y el contador.
if (DOM.resetBtn) {
  DOM.resetBtn.addEventListener('click', () => {
    setTimeout(() => {
      document.querySelectorAll('.form-group.error').forEach(group => {
        group.classList.remove('error');
      });
      document.querySelectorAll('.error-message.visible').forEach(el => {
        el.classList.remove('visible');
        el.textContent = '';
      });
      if (DOM.formStatus) {
        DOM.formStatus.style.display = 'none';
        DOM.formStatus.className = 'form-status';
        DOM.formStatus.textContent = '';
      }
      updateCharCounter();
    }, 0);
  });
}

// Validación en tiempo real: al salir de un campo, y mientras se
// escribe si ya tenía un error visible.
[DOM.nombre, DOM.email, DOM.telefono, DOM.asunto, DOM.mensaje].forEach(field => {
  if (!field) return;
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {
    const group = field.closest('.form-group');
    if (group && group.classList.contains('error')) {
      validateField(field);
    }
  });
});

if (DOM.terminos) {
  DOM.terminos.addEventListener('change', () => validateField(DOM.terminos));
}

// Contador de caracteres del mensaje
if (DOM.mensaje) {
  DOM.mensaje.addEventListener('input', updateCharCounter);
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

updateCharCounter();

console.log('📬 Iron Rebel Garage · Formulario de contacto listo');
