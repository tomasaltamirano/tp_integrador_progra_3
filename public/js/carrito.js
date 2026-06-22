// ==========================================
// LÓGICA DEL CARRITO DINÁMICO (carrito.js)
// ==========================================

const cartListContainer = document.querySelector('.cart-items-list');
const subtotalElement = document.getElementById('resumen-subtotal'); // Tendrás que ponerle IDs a tus span de resumen en carrito.html
const totalElement = document.getElementById('resumen-total');
const itemsCountElement = document.getElementById('resumen-items-count');

// 1. Leer el carrito de la memoria
let carrito = JSON.parse(localStorage.getItem('carritoUTN')) || [];

// 2. Función principal para dibujar todo
function renderizarCarrito() {
    // Si el carrito está vacío, mostramos un mensaje
    if (carrito.length === 0) {
        cartListContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Tu carrito está vacío. ¡Ve a comprar algunos juegos!</p>';
        actualizarTotales();
        return;
    }

    let html = '';
    
    // Recorremos el array de memoria y dibujamos el HTML que nos pasaste
    carrito.forEach(producto => {
        html += `
            <div class="cart-item">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="item-details">
                    <h4>${producto.nombre}</h4>
                    <span class="item-badge">${producto.descripcion}</span>
                    <div class="item-actions">
                        <div class="quantity-control">
                            <button class="btn-qty" onclick="modificarCantidad(${producto.id}, -1)">-</button>
                            
                            <span>${producto.cantidad}</span>
                            
                            <button class="btn-qty" onclick="modificarCantidad(${producto.id}, 1)">+</button>
                        </div>
                    </div>
                </div>
                <div class="item-price-col">
                    <button class="btn-delete" onclick="eliminarDelCarrito(${producto.id})">🗑️</button>
                    
                    <p class="item-price">US$ ${(producto.precio * producto.cantidad).toFixed(2)}</p>
                </div>
            </div>
        `;
    });

    cartListContainer.innerHTML = html;
    actualizarTotales();
}

// 3. Función para sumar o restar cantidades
function modificarCantidad(idProducto, cambio) {
    const producto = carrito.find(item => item.id === idProducto);
    
    if (producto) {
        producto.cantidad += cambio;
        
        // Si la cantidad llega a 0, lo eliminamos directamente
        if (producto.cantidad <= 0) {
            eliminarDelCarrito(idProducto);
            return; // Cortamos la ejecución acá porque eliminarDelCarrito ya se encarga de guardar y renderizar
        }
        
        // Guardamos los cambios y redibujamos
        localStorage.setItem('carritoUTN', JSON.stringify(carrito));
        renderizarCarrito();
    }
}

// 4. Función para eliminar el tacho de basura
function eliminarDelCarrito(idProducto) {
    // Filtramos el array quedándonos con todos MENOS el que queremos borrar
    carrito = carrito.filter(item => item.id !== idProducto);
    
    localStorage.setItem('carritoUTN', JSON.stringify(carrito));
    renderizarCarrito();
}

// 5. Función para calcular los precios del Resumen de Pedido
function actualizarTotales() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    // Acá actualizamos el HTML del resumen derecho
    // NOTA: Asegurate de poner estos ID en tu carrito.html
    if(subtotalElement && totalElement && itemsCountElement) {
        itemsCountElement.innerText = `Subtotal (${totalItems} items)`;
        subtotalElement.innerText = `US$ ${precioTotal.toFixed(2)}`;
        totalElement.innerText = `US$ ${precioTotal.toFixed(2)}`; // Asumiendo que impuestos y envío son 0
    }
}

// Ejecutamos la función apenas carga la página
renderizarCarrito();