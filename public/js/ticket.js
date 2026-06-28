// ================= Lógica del Ticket =================

// Leemos los datos del localStorage
const nombreCliente = localStorage.getItem('nombreCliente') || 'Cliente';
const carrito = JSON.parse(localStorage.getItem('carritoUTN')) || [];

// Mostramos el nombre del cliente y la fecha
document.getElementById('ticketNombreUsuario').innerText = nombreCliente;
document.getElementById('ticketFechaActual').innerText =
	new Date().toLocaleDateString('es-AR');

// Renderizamos los productos del carrito en el ticket
function renderizarTicket() {
	const ticketItems = document.getElementById('ticket-items');

	if (carrito.length === 0) {
		ticketItems.innerHTML = '<p>No hay productos en el carrito.</p>';
		return;
	}

	let html = '';
	carrito.forEach(producto => {
		html += `
            <div class="receipt-row">
                <div class="item-desc">
                    <strong>${producto.nombre}</strong>
                    <span>${producto.cantidad}x ${producto.descripcion}</span>
                </div>
                <div class="item-price">US$ ${(producto.precio * producto.cantidad).toFixed(2)}</div>
            </div>
        `;
	});

	ticketItems.innerHTML = html;
}

// Calculo y totales
function actualizarTotales() {
	const total = carrito.reduce(
		(acc, item) => acc + item.precio * item.cantidad,
		0,
	);
	document.getElementById('ticket-subtotal').innerText =
		`US$ ${total.toFixed(2)}`;
	document.getElementById('ticket-total').innerText = `US$ ${total.toFixed(2)}`;
}

// registro de ventas
async function registrarVenta() {
	const total = carrito.reduce(
		(acc, item) => acc + item.precio * item.cantidad,
		0,
	);

	const ventaData = {
		nombre_cliente: nombreCliente,
		precio_total: total,
		productos: carrito.map(item => ({
			id: item.id,
			cantidad: item.cantidad,
		})),
	};

	try {
		const response = await fetch('http://localhost:3000/api/ventas', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(ventaData),
		});
		const data = await response.json();
		console.log('Venta registrada con ID:', data.id);
	} catch (error) {
		console.error('Error registrando venta:', error);
	}
}

// 6. Al salir limpiamos el carrito
const btnSalir = document.querySelector('.btn-exit');
if (btnSalir) {
	btnSalir.addEventListener('click', () => {
		localStorage.removeItem('carritoUTN');
		localStorage.removeItem('nombreCliente');
	});
}

// Ejecutamos todo al cargar la página
renderizarTicket();
actualizarTotales();
registrarVenta();
