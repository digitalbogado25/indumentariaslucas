// Archivo: js/script.js (o incluirlo al final del body)

document.addEventListener('DOMContentLoaded', () => {
    // Definición de los productos con sus precios y mensajes de WhatsApp
    const productos = [
        // Boxers Marcas Premium
        { id: 'boxer-kalvin-1', nombre: 'Boxer Kalvin Klein (x1)', precio: 7000, whatsapp: 'Boxer Kalvin Klein (x1) - $7.000' },
        { id: 'boxer-kalvin-3', nombre: 'Boxer Kalvin Klein (x3)', precio: 19000, whatsapp: 'Boxer Kalvin Klein (x3) - $19.000' },
        { id: 'boxer-tommy-1', nombre: 'Boxer Tommy (x1)', precio: 7000, whatsapp: 'Boxer Tommy (x1) - $7.000' },
        { id: 'boxer-tommy-3', nombre: 'Boxer Tommy (x3)', precio: 19000, whatsapp: 'Boxer Tommy (x3) - $19.000' },
        { id: 'boxer-lacoste-1', nombre: 'Boxer Lacoste (x1)', precio: 7000, whatsapp: 'Boxer Lacoste (x1) - $7.000' },
        { id: 'boxer-lacoste-3', nombre: 'Boxer Lacoste (x3)', precio: 19000, whatsapp: 'Boxer Lacoste (x3) - $19.000' },

        // Boxers Marcas Nacionales
        { id: 'boxer-uomo-1', nombre: 'Boxer UOMO (x1)', precio: 4000, whatsapp: 'Boxer UOMO (x1) - $4.000' },
        { id: 'boxer-uomo-3', nombre: 'Boxer UOMO (x3)', precio: 10000, whatsapp: 'Boxer UOMO (x3) - $10.000' },
        { id: 'boxer-dufour', nombre: 'Boxer DUFOUR', precio: 4500, whatsapp: 'Boxer DUFOUR - $4.500' },
        { id: 'boxer-lody', nombre: 'Boxer LODY', precio: 4500, whatsapp: 'Boxer LODY - $4.500' },
        { id: 'boxer-capicua', nombre: 'Boxer CAPICUA', precio: 5000, whatsapp: 'Boxer CAPICUA - $5.000' },

        // Otros Productos (Precio por unidad simple para la simulación)
        { id: 'slip-adulto', nombre: 'Slip Adulto', precio: 3500, whatsapp: 'Slip Adulto - $3.500' },
        { id: 'slip-juvenil', nombre: 'Slip Juvenil', precio: 1500, whatsapp: 'Slip Juvenil - $1.500' },
        { id: 'media-par', nombre: 'Par de Medias', precio: 2500, whatsapp: 'Par de Medias - $2.500' },
        { id: 'termica-conjunto-juv', nombre: 'Conjunto Térmico Juvenil', precio: 15000, whatsapp: 'Conjunto Térmico Juvenil - $15.000' },
        { id: 'termica-remera', nombre: 'Remera Térmica (Adulto)', precio: 10000, whatsapp: 'Remera Térmica - $10.000' },
        { id: 'pijama-nino', nombre: 'Pijama de Niño', precio: 15000, whatsapp: 'Pijama de Niño - $15.000' },
        { id: 'pijama-adulto', nombre: 'Pijama de Adulto', precio: 15000, whatsapp: 'Pijama de Adulto - $15.000' },
    ];

    let carrito = [];
    const totalElement = document.getElementById('total-compra');
    const itemsListElement = document.getElementById('carrito-items');
    const whatsappLinkElement = document.getElementById('whatsapp-checkout');

    // Función para agregar o remover items del carrito
    const actualizarCarrito = (id, cantidad) => {
        const productoEncontrado = productos.find(p => p.id === id);
        if (!productoEncontrado) return;

        let item = carrito.find(i => i.id === id);

        if (item) {
            item.cantidad += cantidad;
            if (item.cantidad <= 0) {
                carrito = carrito.filter(i => i.id !== id);
            }
        } else if (cantidad > 0) {
            carrito.push({ ...productoEncontrado, cantidad });
        }

        renderizarCarrito();
    };

    // Función para actualizar la interfaz del carrito y el total
    const renderizarCarrito = () => {
        let total = 0;
        let mensajeWhatsapp = "Hola LU|CAS, me gustaría comprar los siguientes productos:\n\n";

        itemsListElement.innerHTML = '';

        if (carrito.length === 0) {
            itemsListElement.innerHTML = '<li class="list-group-item text-center text-muted">Aún no agregaste productos.</li>';
            mensajeWhatsapp = "Hola LU|CAS, me gustaría consultar por varios productos.";
        } else {
            carrito.forEach(item => {
                const subtotal = item.precio * item.cantidad;
                total += subtotal;
                mensajeWhatsapp += `${item.cantidad} x ${item.nombre} ($${item.precio.toLocaleString('es-AR')}) = $${subtotal.toLocaleString('es-AR')}\n`;

                // Crear el elemento de la lista para el HTML
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center small';
                li.innerHTML = `
                    <span>${item.cantidad}x ${item.nombre}</span>
                    <div>
                        <span class="fw-bold">$${subtotal.toLocaleString('es-AR')}</span>
                        <button class="btn btn-sm btn-outline-danger ms-2 p-1" data-id="${item.id}">
                            <i class="fas fa-trash-alt" data-id="${item.id}"></i>
                        </button>
                    </div>
                `;
                itemsListElement.appendChild(li);
            });
            mensajeWhatsapp += `\n*TOTAL ESTIMADO: $${total.toLocaleString('es-AR')}*`;
        }

        totalElement.textContent = `$${total.toLocaleString('es-AR')}`;
        
        // Codificar el mensaje para el URL de WhatsApp
        const numero = '5491125982119'; 
        const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensajeWhatsapp)}`;
        whatsappLinkElement.href = link;

        // Mostrar/Ocultar el botón de finalizar compra si hay items
        whatsappLinkElement.parentElement.style.display = carrito.length > 0 ? 'block' : 'none';
        
        // Agregar listener para eliminar items
        itemsListElement.querySelectorAll('.btn-outline-danger').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id || e.target.parentElement.dataset.id;
                actualizarCarrito(id, -Infinity); // Eliminar todas las unidades del item
            });
        });
    };

    // Función para añadir los listeners de los botones "Agregar" en el HTML
    const añadirListeners = () => {
        document.querySelectorAll('.btn-agregar').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                if (id) {
                    actualizarCarrito(id, 1);
                    // Pequeña animación para indicar que se agregó
                    e.target.classList.add('btn-success');
                    e.target.textContent = 'Agregado ✔️';
                    setTimeout(() => {
                         e.target.classList.remove('btn-success');
                         e.target.textContent = 'Agregar';
                    }, 500);
                }
            });
        });
    };

    añadirListeners();
    renderizarCarrito(); // Inicializar el carrito en la vista
});