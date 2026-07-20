// js/main.js
// ============================================
// IRON REBEL GARAGE · HEADER LOADER
// Carga dinámicamente el header desde main.html
// ============================================

(function() {
    'use strict';

    // Configuración
    const CONFIG = {
        headerPath: '/main.html',
        cacheKey: 'ironrebel_header',
        cacheTime: 3600000 // 1 hora
    };

    /**
     * Inyecta el header en el DOM
     */
    function injectHeader(html) {
        // Crear o obtener el contenedor
        let container = document.getElementById('header-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'header-container';
            document.body.insertBefore(container, document.body.firstChild);
        }
        
        container.innerHTML = html;
        initHeaderFunctions();
    }

    /**
     * Inicializa las funcionalidades del header
     */
    function initHeaderFunctions() {
        // Marcar enlace activo según la página actual
        const currentPage = window.location.pathname.split('/').pop() || 'cliente.html';
        document.querySelectorAll('nav ul li a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPage.includes(href)) {
                link.classList.add('active');
            }
        });

        // Configurar búsqueda
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        
        if (searchForm && searchInput) {
            // Si estamos en cliente.html, la búsqueda ya está configurada
            // Si estamos en otra página, redirigimos a cliente.html con el término
            if (!window.location.pathname.includes('cliente.html')) {
                searchForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const term = searchInput.value.trim();
                    if (term) {
                        window.location.href = `cliente.html?buscar=${encodeURIComponent(term)}`;
                    }
                });
            }
        }

        // Logo - Redirigir a cliente.html
        const logoLink = document.querySelector('.logo a');
        if (logoLink) {
            logoLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'cliente.html';
            });
        }
    }

    /**
     * Carga el header por defecto (fallback)
     */
    function loadDefaultHeader() {
        const defaultHeader = `
            <header>
                <nav>
                    <div class="logo">
                        <a href="cliente.html">⚡ IRON REBEL GARAGE</a>
                    </div>
                    <ul>
                        <li><a href="cliente.html">Catálogo</a></li>
                        <li><a href="contacto.html">Contacto</a></li>
                    </ul>
                    <form id="searchForm" action="cliente.html" method="get">
                        <input type="text" id="searchInput" name="buscar" placeholder="Buscar modelo..." aria-label="Buscar moto">
                        <button type="submit">🔍</button>
                    </form>
                </nav>
            </header>
        `;
        injectHeader(defaultHeader);
        console.warn('⚠️ Header cargado por defecto (fallback)');
    }

    /**
     * Carga el header desde main.html
     */
    function loadHeader() {
        // Verificar si ya existe un header
        if (document.querySelector('header')) return;

        // Intentar cargar desde caché
        try {
            const cached = localStorage.getItem(CONFIG.cacheKey);
            const cacheTime = localStorage.getItem(`${CONFIG.cacheKey}_time`);
            
            if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < CONFIG.cacheTime) {
                injectHeader(cached);
                console.log('✅ Header cargado desde caché');
                return;
            }
        } catch (e) {
            // Si hay error con localStorage, continuar con fetch
        }

        // Cargar desde el servidor
        fetch(CONFIG.headerPath)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const header = doc.querySelector('header');
                
                if (header) {
                    const headerHTML = header.outerHTML;
                    // Guardar en caché
                    try {
                        localStorage.setItem(CONFIG.cacheKey, headerHTML);
                        localStorage.setItem(`${CONFIG.cacheKey}_time`, Date.now().toString());
                    } catch (e) {
                        // Ignorar errores de localStorage
                    }
                    injectHeader(headerHTML);
                    console.log('✅ Header cargado desde main.html');
                } else {
                    throw new Error('No se encontró el header en main.html');
                }
            })
            .catch(error => {
                console.error('❌ Error cargando el header:', error);
                loadDefaultHeader();
            });
    }

    // ==========================================
    // INICIALIZACIÓN
    // ==========================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }

})();