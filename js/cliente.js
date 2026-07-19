// ============================================
// IRON REBEL GARAGE · script.js
// Funcionalidad completa sin frameworks
// ============================================

(function() {
  'use strict';

  // ---------- DATOS DE MOTOS (16 modelos) ----------
  const motos = [
    {
      id: 'x1',
      nombre: 'IRON REBEL X1',
      estilo: 'naked',
      cilindraje: 'medio',
      uso: 'urbano',
      cc: 650,
      hp: 70,
      peso: 185,
      seguridad: 'ABS, control de tracción',
      comodidad: 'Asiento ergonómico, suspensión ajustable',
      equipamiento: 'Faro LED, pantalla TFT, puerto USB'
    },
    {
      id: 'cruiser',
      nombre: 'REBEL CRUISER',
      estilo: 'cruiser',
      cilindraje: 'alto',
      uso: 'carretera',
      cc: 1200,
      hp: 95,
      peso: 260,
      seguridad: 'ABS, control de tracción, asistencia de frenada',
      comodidad: 'Asiento de viaje, suspensión con ajuste de precarga',
      equipamiento: 'Maletas laterales, parabrisas, climatización'
    },
    {
      id: 'sport',
      nombre: 'SPORT RR',
      estilo: 'sport',
      cilindraje: 'alto',
      uso: 'carretera',
      cc: 998,
      hp: 205,
      peso: 175,
      seguridad: 'ABS, cornering ABS, control de tracción, quickshifter',
      comodidad: 'Posición deportiva, asiento ergonómico',
      equipamiento: 'Pantalla TFT, modos de conducción, suspensiones Öhlins'
    },
    {
      id: 'adv',
      nombre: 'ADVENTURE GS',
      estilo: 'adventure',
      cilindraje: 'medio',
      uso: 'offroad',
      cc: 850,
      hp: 80,
      peso: 230,
      seguridad: 'ABS, control de tracción off-road',
      comodidad: 'Suspensión larga recorrido, asiento amplio',
      equipamiento: 'Protecciones, maletas, puños calefactables'
    },
    {
      id: 'urban',
      nombre: 'URBAN STREET',
      estilo: 'urban',
      cilindraje: 'bajo',
      uso: 'urbano',
      cc: 400,
      hp: 45,
      peso: 160,
      seguridad: 'ABS, freno combinado',
      comodidad: 'Posición erguida, asiento bajo',
      equipamiento: 'Puerto USB, espacio bajo asiento'
    },
    {
      id: 'touring',
      nombre: 'TOURING GT',
      estilo: 'touring',
      cilindraje: 'alto',
      uso: 'carretera',
      cc: 1300,
      hp: 110,
      peso: 290,
      seguridad: 'ABS, control de tracción, asistente de frenada en curvas',
      comodidad: 'Asiento de confort, suspensión electrónica',
      equipamiento: 'Sistema de audio, navegador, maletas rígidas'
    },
    {
      id: 'nakedfury',
      nombre: 'NAKED FURY',
      estilo: 'naked',
      cilindraje: 'medio',
      uso: 'urbano',
      cc: 800,
      hp: 95,
      peso: 195,
      seguridad: 'ABS, control de tracción',
      comodidad: 'Posición deportiva, asiento ergonómico',
      equipamiento: 'Pantalla TFT, faro LED, puerto USB'
    },
    {
      id: 'cruiser1800',
      nombre: 'CRUISER 1800',
      estilo: 'cruiser',
      cilindraje: 'alto',
      uso: 'carretera',
      cc: 1800,
      hp: 100,
      peso: 310,
      seguridad: 'ABS, control de tracción, asistente de arranque en pendiente',
      comodidad: 'Asiento de lujo, suspensión ajustable',
      equipamiento: 'Maletas, parabrisas, sistema de audio'
    },
    {
      id: 'sportR',
      nombre: 'SPORT R',
      estilo: 'sport',
      cilindraje: 'medio',
      uso: 'carretera',
      cc: 600,
      hp: 120,
      peso: 168,
      seguridad: 'ABS, control de tracción, quickshifter',
      comodidad: 'Posición deportiva, asiento ergonómico',
      equipamiento: 'Pantalla TFT, modos de conducción'
    },
    {
      id: 'advrally',
      nombre: 'ADVENTURE RALLY',
      estilo: 'adventure',
      cilindraje: 'medio',
      uso: 'offroad',
      cc: 700,
      hp: 72,
      peso: 215,
      seguridad: 'ABS off-road, control de tracción',
      comodidad: 'Suspensión de largo recorrido, asiento rally',
      equipamiento: 'Protecciones, maletas, navegador GPS'
    },
    {
      id: 'scrambler',
      nombre: 'URBAN SCRAMBLER',
      estilo: 'urban',
      cilindraje: 'medio',
      uso: 'urbano',
      cc: 500,
      hp: 50,
      peso: 170,
      seguridad: 'ABS, freno combinado',
      comodidad: 'Posición erguida, asiento amplio',
      equipamiento: 'Neumáticos mixtos, puerto USB'
    },
    {
      id: 'touringelite',
      nombre: 'TOURING ELITE',
      estilo: 'touring',
      cilindraje: 'alto',
      uso: 'carretera',
      cc: 1600,
      hp: 120,
      peso: 300,
      seguridad: 'ABS, control de tracción, asistente de frenada',
      comodidad: 'Asiento premium, suspensión electrónica',
      equipamiento: 'Audio premium, navegador, maletas'
    },
    {
      id: 'rebel500',
      nombre: 'REBEL 500',
      estilo: 'cruiser',
      cilindraje: 'medio',
      uso: 'urbano',
      cc: 500,
      hp: 48,
      peso: 190,
      seguridad: 'ABS, freno combinado',
      comodidad: 'Asiento bajo, posición relajada',
      equipamiento: 'Puerto USB, espacio bajo asiento'
    },
    {
      id: 'nakedstreet',
      nombre: 'NAKED STREET',
      estilo: 'naked',
      cilindraje: 'bajo',
      uso: 'urbano',
      cc: 300,
      hp: 30,
      peso: 150,
      seguridad: 'ABS',
      comodidad: 'Posición erguida, ligera',
      equipamiento: 'Faro LED, puerto USB'
    },
    {
      id: 'advx',
      nombre: 'ADVENTURE X',
      estilo: 'adventure',
      cilindraje: 'alto',
      uso: 'offroad',
      cc: 900,
      hp: 88,
      peso: 225,
      seguridad: 'ABS off-road, control de tracción',
      comodidad: 'Suspensión ajustable, asiento confort',
      equipamiento: 'Protecciones, maletas, navegador'
    },
    {
      id: 'sporttouring',
      nombre: 'SPORT TOURING',
      estilo: 'touring',
      cilindraje: 'alto',
      uso: 'carretera',
      cc: 1000,
      hp: 130,
      peso: 245,
      seguridad: 'ABS, control de tracción, asistente de frenada',
      comodidad: 'Asiento deportivo, suspensión ajustable',
      equipamiento: 'Maletas, parabrisas, sistema de audio'
    }
  ];

  // ---------- REFERENCIAS DOM ----------
  const gridContainer = document.getElementById('gridContainer');
  const detallesContainer = document.getElementById('detalles');
  const filterForm = document.getElementById('filtrosForm');
  const searchInput = document.querySelector('nav form input[type="text"]');
  const searchForm = document.querySelector('nav form');
  const resetBtn = document.querySelector('#filtrosForm button[type="reset"]');
  const countDisplay = document.getElementById('motoCount');

  // ---------- FUNCIÓN PARA RENDERIZAR TARJETAS ----------
  function renderMotos(lista) {
    if (!gridContainer) return;

    // Limpiar grid
    gridContainer.innerHTML = '';

    if (lista.length === 0) {
      gridContainer.innerHTML = `
        <p style="grid-column:1/-1; text-align:center; color:var(--text-secondary); padding:3rem 0; font-size:1.2rem;">
          🔍 No hay motos que coincidan con los filtros seleccionados.
        </p>
      `;
      if (countDisplay) countDisplay.textContent = '0';
      return;
    }

    // Actualizar contador
    if (countDisplay) countDisplay.textContent = lista.length;

    // Generar tarjetas
    lista.forEach(moto => {
      const article = document.createElement('article');
      article.id = `card-${moto.id}`;
      article.innerHTML = `
        <div>
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%231a1a1a'/%3E%3Ctext x='40' y='130' font-family='Arial' font-size='20' fill='%23d4af37'%3E🏍️ ${moto.nombre}%3C/text%3E%3Ctext x='40' y='170' font-family='Arial' font-size='14' fill='%23cccccc'%3E${moto.estilo.charAt(0).toUpperCase() + moto.estilo.slice(1)} · ${moto.cc}cc%3C/text%3E%3C/svg%3E" 
               alt="${moto.nombre} - ${moto.cc}cc">
          <h3>${moto.nombre}</h3>
          <ul>
            <li>⚡ ${moto.cc} cc · ${moto.hp} hp</li>
            <li>🛞 ${moto.peso} kg · ${moto.seguridad.split(',')[0]}</li>
            <li>🔥 ${moto.estilo.charAt(0).toUpperCase() + moto.estilo.slice(1)} · ${moto.uso}</li>
          </ul>
          <a href="#detalle-${moto.id}">Ver más</a>
        </div>
      `;
      gridContainer.appendChild(article);
    });

    // Renderizar detalles
    renderDetalles(lista);
  }

  // ---------- FUNCIÓN PARA RENDERIZAR DETALLES ----------
  function renderDetalles(lista) {
    if (!detallesContainer) return;

    // Limpiar contenedor de detalles (mantener el h2)
    const h2 = detallesContainer.querySelector('h2');
    detallesContainer.innerHTML = '';
    if (h2) detallesContainer.appendChild(h2);

    // Crear secciones de detalle para cada moto
    lista.forEach(moto => {
      const section = document.createElement('section');
      section.id = `detalle-${moto.id}`;
      section.style.display = 'block';
      section.innerHTML = `
        <article>
          <h3>${moto.nombre}</h3>
          <div>
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300' viewBox='0 0 600 300'%3E%3Crect width='600' height='300' fill='%231a1a1a'/%3E%3Ctext x='60' y='150' font-family='Arial' font-size='28' fill='%23d4af37'%3E🏍️ ${moto.nombre}%3C/text%3E%3Ctext x='60' y='190' font-family='Arial' font-size='16' fill='%23cccccc'%3E${moto.estilo} · ${moto.cc}cc%3C/text%3E%3C/svg%3E" 
                 alt="Detalle ${moto.nombre}">
            <ul>
              <li><strong>Cilindrada:</strong> ${moto.cc} cc</li>
              <li><strong>Potencia:</strong> ${moto.hp} hp</li>
              <li><strong>Peso:</strong> ${moto.peso} kg</li>
              <li><strong>Seguridad:</strong> ${moto.seguridad}</li>
              <li><strong>Comodidad:</strong> ${moto.comodidad}</li>
              <li><strong>Uso recomendado:</strong> ${moto.uso.charAt(0).toUpperCase() + moto.uso.slice(1)}</li>
              <li><strong>Equipamiento:</strong> ${moto.equipamiento}</li>
            </ul>
            <a href="#catalogo">⬅️ Volver al catálogo</a>
          </div>
        </article>
      `;
      detallesContainer.appendChild(section);
    });
  }

  // ---------- FUNCIÓN PARA ACTUALIZAR DETALLES (ocultar/mostrar) ----------
  function updateDetalles(lista) {
    // Obtener todas las secciones de detalle
    const detalleSections = document.querySelectorAll('section[id^="detalle-"]');
    
    if (detalleSections.length === 0) return;

    // Ocultar todas las secciones de detalle primero
    detalleSections.forEach(section => {
      section.style.display = 'none';
    });

    // Mostrar solo los detalles de los modelos que están en la lista filtrada
    lista.forEach(moto => {
      const section = document.getElementById(`detalle-${moto.id}`);
      if (section) {
        section.style.display = 'block';
      }
    });
  }

  // ---------- FILTRADO ----------
  function filtrarMotos() {
    // Obtener checkboxes seleccionados
    const checkboxes = filterForm ? filterForm.querySelectorAll('input[type="checkbox"]:checked') : [];
    const filtros = {};
    
    checkboxes.forEach(cb => {
      const name = cb.name;
      const value = cb.value;
      if (!filtros[name]) filtros[name] = [];
      filtros[name].push(value);
    });

    // Búsqueda por texto
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

    // Aplicar filtros
    let resultado = motos.filter(moto => {
      // Filtro por estilo
      if (filtros.estilo && filtros.estilo.length > 0) {
        if (!filtros.estilo.includes(moto.estilo)) return false;
      }

      // Filtro por cilindraje
      if (filtros.cilindraje && filtros.cilindraje.length > 0) {
        if (!filtros.cilindraje.includes(moto.cilindraje)) return false;
      }

      // Filtro por uso
      if (filtros.uso && filtros.uso.length > 0) {
        if (!filtros.uso.includes(moto.uso)) return false;
      }

      // Búsqueda por texto (nombre o estilo)
      if (searchTerm) {
        const match = moto.nombre.toLowerCase().includes(searchTerm) || 
                     moto.estilo.toLowerCase().includes(searchTerm) ||
                     moto.uso.toLowerCase().includes(searchTerm);
        if (!match) return false;
      }

      return true;
    });

    // Renderizar resultados
    renderMotos(resultado);
    updateDetalles(resultado);
  }

  // ---------- EVENT LISTENERS ----------
  if (filterForm) {
    filterForm.addEventListener('change', filtrarMotos);
    filterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      filtrarMotos();
    });

    // Botón de reset
    if (resetBtn) {
      resetBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Desmarcar todos los checkboxes
        const checkboxes = filterForm.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = false);
        // Limpiar búsqueda
        if (searchInput) searchInput.value = '';
        filtrarMotos();
      });
    }
  }

  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      filtrarMotos();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filtrarMotos);
  }

  // ---------- INICIALIZAR ----------
  renderMotos(motos);

  // ---------- COMPORTAMIENTO DE ENLACES "VER MÁS" ----------
  document.addEventListener('click', function(e) {
    const link = e.target.closest('article a[href^="#detalle-"]');
    if (link) {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetElement.style.display = 'block';
      }
    }
  });

  // ---------- BOTONES "VOLVER AL CATÁLOGO" ----------
  document.addEventListener('click', function(e) {
    const backLink = e.target.closest('section[id^="detalle-"] article a[href="#catalogo"]');
    if (backLink) {
      e.preventDefault();
      const catalogo = document.getElementById('catalogo');
      if (catalogo) catalogo.scrollIntoView({ behavior: 'smooth' });
    }
  });

  console.log('🏍️ Iron Rebel Garage · Catálogo cargado correctamente');
  console.log(`📊 ${motos.length} modelos disponibles`);

})();