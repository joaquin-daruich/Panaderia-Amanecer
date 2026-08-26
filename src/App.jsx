import React, { useState } from 'react';
import './App.css';

// WhatsApp del local para derivación directa
const WHATSAPP_NUMERO = "5492914000000"; // Se reemplaza por el WhatsApp oficial de Amanecer
const DIRECCION = "Luis María Drago 2568, Bahía Blanca";
const HORARIOS = "Lunes a Sábados: 7:30 a 13:00 hs y 15:00 a 20:00 hs";

const CATEGORIAS = [
  { id: 'salados', nombre: 'Pizzas & Salados', icono: '🍕' },
  { id: 'tortas', nombre: 'Pastelería & Tortas', icono: '🍰' },
  { id: 'clasicos', nombre: 'Clásicos de Mostrador', icono: '🥐' },
  { id: 'dulces', nombre: 'Materas & Budines', icono: '🧁' }
];

const PRODUCTOS = {
  salados: [
    {
      id: 'pizzas-horno',
      titulo: 'Pizzas Listas para el Horno',
      subtitulo: 'Ideales para juntadas, cumpleaños y eventos',
      variedades: ['Jamón, queso y muzzarella', 'Jamón, muzzarella y salame', 'Roquefort', 'Palmitos', 'Con tomate'],
      video: '/tanda38videopiza.mp4',
      imagenFallback: '/tanda38opcionessaladas1.jpg',
      tag: '⭐ Especial Juntadas',
      esVideo: true
    },
    {
      id: 'miga-artesanal',
      titulo: 'Sándwiches de Miga',
      subtitulo: 'Elaboración diaria con fiambres seleccionados',
      variedades: ['Jamón y queso', 'Jamón crudo y queso', 'Salame y queso', 'Primavera', 'Morrón y huevo', 'Ananá', 'Palmitos', 'Aceitunas y jamón', 'Roquefort'],
      imagen: '/tanda38opcionessaladas2.jpg',
      tag: 'Docena & Bandejas'
    },
    {
      id: 'sacramentos',
      titulo: 'Sacramentos Rellenos',
      subtitulo: 'Masa hojaldrada dulce y salada',
      variedades: ['Jamón cocido y queso', 'Jamón crudo y queso', 'Primavera'],
      imagen: '/tanda38opcionessaladas3.jpg',
      tag: 'Clásico Imperdible'
    },
    {
      id: 'chipas',
      titulo: 'Chipa Artesanal Calentito',
      subtitulo: 'Puro queso y textura esponjosa',
      variedades: ['De queso y salame', 'De jamón y queso'],
      imagen: '/tanda38clasicos3.jpg',
      tag: 'Por Kilo / Porción'
    }
  ],
  tortas: [
    {
      id: 'balcarce',
      titulo: 'Torta Balcarce',
      subtitulo: 'Pionono, crema chantilly, dulce de leche, merengue y castañas',
      imagen: '/tanda38torta1.jpg',
      tag: 'Favorita de Fiestas'
    },
    {
      id: 'selva-negra',
      titulo: 'Torta Selva Negra',
      subtitulo: 'Bizcochuelo de chocolate intenso, crema, cerezas y lluvia de chocolate',
      imagen: '/tanda38torta2.jpg',
      tag: 'Edición Chocolate'
    },
    {
      id: 'porciones-mousse',
      titulo: 'Porciones de Mousse & Tiramisú',
      subtitulo: 'Capas artesanales individuales listas para servir',
      imagen: '/tanda38torta3.jpg',
      tag: 'Postre Express'
    },
    {
      id: 'postres-varios',
      titulo: 'Postres & Tartas Especiales',
      subtitulo: 'Cheesecake, Lemon Pie, Frutillas, Frutos Rojos y Bombón',
      imagen: '/tanda38opcionesdulces4.jpg',
      tag: 'Frescos de Heladera'
    },
    {
      id: 'tartas-dulces',
      titulo: 'Tartas Redondas Tradicionales',
      subtitulo: 'Pasta Frola tradicional, Coco con dulce de leche y Torta Bombón',
      imagen: '/tanda38opcionesdulces3.jpg',
      tag: 'Para la Tarde'
    }
  ],
  clasicos: [
    {
      id: 'facturas-rellenas',
      titulo: 'Facturas de Manteca & Grasa',
      subtitulo: 'Más de 30 variedades artesanales horneadas en el día',
      imagen: '/tanda38clasicos1.jpg',
      tag: '+30 Variedades'
    },
    {
      id: 'pasteles-hojaldre',
      titulo: 'Pastelitos Hojaldrados',
      subtitulo: 'Fritos de membrillo y al horno de batata y membrillo',
      imagen: '/tanda38clasicos2.jpg',
      tag: 'Puro Hojaldre'
    },
    {
      id: 'bizcochitos',
      titulo: 'Bizcochitos Calentitos',
      subtitulo: 'De grasa tradicionales, de manteca y de manteca con queso',
      imagen: '/tanda38clasicos4.jpg',
      tag: 'El Acompañamiento del Mate'
    }
  ],
  dulces: [
    {
      id: 'materas',
      titulo: 'Materas Caseras',
      subtitulo: 'Chips de chocolate, marmoladas, dulce de leche, membrillo, limón y naranja',
      imagen: '/tanda38opcionesdulces1.jpg',
      tag: 'Esponjosas'
    },
    {
      id: 'budines',
      titulo: 'Budines Artesanales Glaseados',
      subtitulo: 'Masa húmeda con chips, marmolados, dulce de leche y cítricos',
      imagen: '/tanda38opcionesdulces2.jpg',
      tag: 'Receta Tradicional'
    }
  ]
};

export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState('salados');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Estados para el cotizador / armador de pedido
  const [tipoPedido, setTipoPedido] = useState('Juntada / Cumpleaños (Salados + Torta)');
  const [fechaRetiro, setFechaRetiro] = useState('');
  const [horarioRetiro, setHorarioRetiro] = useState('18:00 a 19:30 hs (Turno Tarde)');
  const [detallePedido, setDetallePedido] = useState('');

  const enviarPedidoWhatsApp = (e) => {
    e.preventDefault();
    let texto = `¡Hola Panadería Amanecer! 👋 Quiero hacer un encargo:\n\n`;
    texto += `📌 *Tipo de Pedido:* ${tipoPedido}\n`;
    if (fechaRetiro) texto += `📅 *Fecha de Retiro:* ${fechaRetiro}\n`;
    texto += `⏰ *Horario estimado:* ${horarioRetiro}\n`;
    if (detallePedido.trim()) texto += `📝 *Detalle de lo que quiero encargar:*\n${detallePedido}\n\n`;
    texto += `📍 Retiro por el local en Drago 2568, Bahía Blanca.`;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}&text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  const encargarProductoDirecto = (nombreProducto) => {
    const texto = `¡Hola Amanecer! Quiero consultar precio y disponibilidad para encargar: *${nombreProducto}*.`;
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}&text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="amanecer-root">
      
      {/* Navbar Superior */}
      <nav className="navbar-amanecer">
        <div className="nav-brand">
          <img src="/tanda38fotoperfil.jpg" alt="Logo Panadería Amanecer" className="nav-logo" />
          <div>
            <h1 className="nav-title">AMANECER</h1>
            <span className="nav-badge-exp">33 AÑOS DE TRAYECTORIA</span>
          </div>
        </div>

        <div className="nav-actions">
          <a href="#horarios" className="nav-info-pill">
            📍 Drago 2568, Bahía Blanca
          </a>
          <a href="#pedidos" className="btn-nav-order">
            Hacer Encargo
          </a>
        </div>
      </nav>

      {/* Hero Principal con Doble Video y Mensajes Tentadores */}
      <header className="hero-amanecer">
        <div className="hero-video-container">
          <video 
            src="/tanda38video.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="hero-main-video" 
          />
          <div className="hero-video-gradient"></div>
        </div>

        <div className="hero-floating-card">
          <span className="pill-antojo">🔥 RECIÉN SALIDO DEL HORNO</span>
          <h2 className="hero-heading">
            ¿Por qué dejar para otro momento lo que podés <span className="text-highlight">comer ahora?</span>
          </h2>
          <p className="hero-subtext">
            Pensamientos panaderos activados 🥐🤤. Facturas rebosantes de dulce de leche, pizzas caseras listas para el horno, sándwiches de miga y pastelería de autor en Bahía Blanca.
          </p>

          <div className="hero-cta-buttons">
            <a href="#catalogo" className="btn-hero-primary">
              Ver Especialidades
            </a>
            <a href="#pedidos" className="btn-hero-secondary">
              Armar Pedido para Juntada 🍕
            </a>
          </div>
        </div>
      </header>

      {/* Franja de Autoridad & Horarios */}
      <section id="horarios" className="strip-info">
        <div className="strip-card">
          <span className="strip-emoji">🏆</span>
          <div>
            <strong>Más de 33 Años</strong>
            <p>Elaboración artesanal de confianza</p>
          </div>
        </div>
        <div className="strip-card">
          <span className="strip-emoji">🥐</span>
          <div>
            <strong>Horneados en el Día</strong>
            <p>Más de 30 variedades de facturas</p>
          </div>
        </div>
        <div className="strip-card">
          <span className="strip-emoji">⏰</span>
          <div>
            <strong>Horarios de Atención</strong>
            <p>Lunes a Sáb: 7:30 a 13 y 15 a 20 hs</p>
          </div>
        </div>
      </section>

      {/* Catálogo Interactivo por Categorías */}
      <section id="catalogo" className="menu-section">
        <div className="section-title-wrap">
          <span className="section-eyebrow">NUESTRA CONFITERÍA</span>
          <h2 className="section-main-title">Elegí tus favoritos de hoy</h2>
          <p className="section-subtitle">Opciones saladas para compartir y delicias dulces para acompañar el mate o celebrar.</p>
        </div>

        {/* Botones de Categorías */}
        <div className="category-tabs">
          {CATEGORIAS.map(cat => (
            <button
              key={cat.id}
              className={`cat-tab-btn ${categoriaActiva === cat.id ? 'active' : ''}`}
              onClick={() => setCategoriaActiva(cat.id)}
            >
              <span className="cat-icon">{cat.icono}</span>
              <span className="cat-text">{cat.nombre}</span>
            </button>
          ))}
        </div>

        {/* Grilla de Productos */}
        <div className="products-grid">
          {PRODUCTOS[categoriaActiva].map((prod) => (
            <article key={prod.id} className="product-card">
              <div className="product-media-box">
                {prod.esVideo ? (
                  <video 
                    src={prod.video} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="product-img" 
                  />
                ) : (
                  <img src={prod.imagen} alt={prod.titulo} className="product-img" />
                )}
                <span className="product-badge">{prod.tag}</span>
              </div>

              <div className="product-content">
                <h3 className="product-title">{prod.titulo}</h3>
                <p className="product-desc">{prod.subtitulo}</p>

                {prod.variedades && (
                  <div className="varieties-box">
                    <small>Variedades destacadas:</small>
                    <div className="variety-chips">
                      {prod.variedades.slice(0, 4).map((v, i) => (
                        <span key={i} className="chip">{v}</span>
                      ))}
                      {prod.variedades.length > 4 && (
                        <span className="chip-more">+{prod.variedades.length - 4} más</span>
                      )}
                    </div>
                  </div>
                )}

                <button 
                  className="btn-product-order"
                  onClick={() => encargarProductoDirecto(prod.titulo)}
                >
                  Pedir / Consultar →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Banner Especial de Tortas para el Fin de Semana */}
      <section className="weekend-cake-banner">
        <div className="cake-banner-card">
          <div className="cake-banner-img-wrap">
            <img src="/tanda38tortas.jpg" alt="Tortas de fin de semana Panadería Amanecer" />
          </div>
          <div className="cake-banner-text">
            <span className="cake-banner-pill">🎂 PASTELERÍA DE CELEBRACIÓN</span>
            <h3>El finde pide a gritos estas delicias</h3>
            <p>
              Tortas Balcarce tradicionales, Selva Negra con cerezas y chocolate, tartas de coco con dulce de leche, lemon pie y torta bombón elaboradas con la dedicación de siempre.
            </p>
            <button 
              className="btn-cake-reserve"
              onClick={() => encargarProductoDirecto("Torta artesanal para el fin de semana")}
            >
              Encargar Torta para el Finde 🍰
            </button>
          </div>
        </div>
      </section>

      {/* Armador de Pedidos & Juntadas */}
      <section id="pedidos" className="order-builder-section">
        <div className="order-builder-card">
          <div className="builder-header">
            <span className="builder-tag">⚡ ENCARGOS SIN DEMORAS</span>
            <h2>Armá tu pedido para la próxima juntada</h2>
            <p>Completá lo que necesitás y te responderemos por WhatsApp para confirmar tu retiro en el local.</p>
          </div>

          <form className="builder-form" onSubmit={enviarPedidoWhatsApp}>
            <div className="form-row-2">
              <div className="input-group">
                <label>Tipo de Evento o Encargo:</label>
                <select value={tipoPedido} onChange={(e) => setTipoPedido(e.target.value)}>
                  <option value="Juntada / Cumpleaños (Salados + Torta)">Juntada / Cumpleaños (Pizzas, Miga y Torta)</option>
                  <option value="Docenas de Sándwiches de Miga">Sándwiches de Miga por Docena</option>
                  <option value="Pizzas Listas para el Horno">Pizzas Listas para el Horno</option>
                  <option value="Torta Artesanal Entera">Torta Artesanal Entera</option>
                  <option value="Facturas / Desayuno de Oficina">Facturas y Clásicos para Desayuno / Merienda</option>
                </select>
              </div>

              <div className="input-group">
                <label>Fecha de Retiro:</label>
                <input 
                  type="date" 
                  value={fechaRetiro} 
                  onChange={(e) => setFechaRetiro(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="input-group">
                <label>Turno / Horario de Retiro:</label>
                <select value={horarioRetiro} onChange={(e) => setHorarioRetiro(e.target.value)}>
                  <option value="7:30 a 9:00 hs (Mañana Temprano)">7:30 a 9:00 hs (Mañana Temprano)</option>
                  <option value="11:30 a 13:00 hs (Mediodía)">11:30 a 13:00 hs (Mediodía)</option>
                  <option value="15:00 a 17:00 hs (Tarde)">15:00 a 17:00 hs (Tarde)</option>
                  <option value="18:00 a 20:00 hs (Noche)">18:00 a 20:00 hs (Noche)</option>
                </select>
              </div>

              <div className="input-group">
                <label>Punto de Retiro:</label>
                <input type="text" value="Drago 2568, Bahía Blanca" disabled className="input-disabled" />
              </div>
            </div>

            <div className="input-group">
              <label>Detalle de lo que querés sumar (Ej: 2 pizzas de muzzarella, 1 docena de miga jamón y queso, 1 torta Balcarce):</label>
              <textarea 
                rows="3" 
                placeholder="Escribí acá las cantidades y gustos..." 
                value={detallePedido} 
                onChange={(e) => setDetallePedido(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-submit-order">
              Enviar Encargo a WhatsApp 🥐
            </button>
            <small className="form-note">Te responderemos con la confirmación y el valor total de tu encargo.</small>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-amanecer">
        <div className="footer-container">
          <div className="footer-brand-col">
            <div className="footer-logo-row">
              <img src="/tanda38fotoperfil.jpg" alt="Amanecer Logo" className="footer-logo-img" />
              <div>
                <h4>Panadería & Confitería Amanecer</h4>
                <small>33 años horneando momentos en Bahía Blanca</small>
              </div>
            </div>
            <p className="footer-loc-text">📍 Luis María Drago 2568, Bahía Blanca, Buenos Aires.</p>
          </div>

          <div className="footer-schedule-col">
            <h5>Horarios de Atención:</h5>
            <p>Lunes a Sábados: 7:30 a 13:00 hs y 15:00 a 20:00 hs</p>
            <p className="footer-ig-tag">Instagram: @panaderia.amanecer</p>
          </div>
        </div>
      </footer>
    </div>
  );
}