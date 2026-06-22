// ================= Lógica de Productos =================

const grillaKiosco = document.getElementById('grilla-kiosco');

async function cargarProductos(categoria = 'fisico') {
	try {
		const response = await fetch('http://localhost:3000/api/productos');
		const data = await response.json();

		// Filtrado por categoria
		const productosFiltrados = data.payload.filter(
			p => p.categoria === categoria,
		);

		renderizarProductos(productosFiltrados);
	} catch (error) {
		console.error('Error cargando productos: ', error);
	}
}

function renderizarProductos(productos) {
	if (!grillaKiosco) return;

	let html = '';
	productos.forEach(producto => {
		html += `
            <div class="tarjeta-producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="specs">${producto.descripcion}</div>
                <h3>${producto.nombre}</h3>
                <div class="precio">US$ ${producto.precio}</div>
                <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio}, '${producto.imagen}', '${producto.descripcion}')">
                    + AGREGAR
                </button>
            </div>
        `;
	});

	grillaKiosco.innerHTML = html;
}

if (grillaKiosco) {
	cargarProductos('fisico');
}

function cambiarCategoria(categoria, boton) {
	document
		.querySelectorAll('.btn-categoria')
		.forEach(btn => btn.classList.remove('activa'));
	boton.classList.add('activa');
	cargarProductos(categoria);
}

// ==========================================
// NUEVA LÓGICA: AGREGAR AL CARRITO (productos.js)
// ==========================================

// Inicializamos el carrito leyendo lo que haya en memoria (o un array vacío si no hay nada)
let carrito = JSON.parse(localStorage.getItem('carritoUTN')) || [];
actualizarContadorFlotante();

// Esta función es llamada por el botón "+ AGREGAR"
function agregarAlCarrito(id, nombre, precio, imagen, descripcion) {
    // 1. Buscamos si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        // Si ya existe, le sumamos 1 a la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, lo agregamos como un objeto nuevo con cantidad 1
        // Nota: Agregué imagen y descripcion a los parámetros para poder dibujarlos en el carrito después
        carrito.push({
            id: id,
            nombre: nombre,
            precio: parseFloat(precio), // Nos aseguramos de que sea número
            imagen: imagen,
            descripcion: descripcion,
            cantidad: 1
        });
    }

    // 2. Guardamos el array actualizado en el localStorage
    localStorage.setItem('carritoUTN', JSON.stringify(carrito));
    
    // 3. Actualizamos visualmente el contador
    actualizarContadorFlotante();
    
    // Pequeño feedback visual (opcional)
    alert(`¡${nombre} agregado al carrito!`);
}

// Función para actualizar la barra verde de abajo en productos.html
function actualizarContadorFlotante() {
    // Ahora buscamos el elemento exacto por su ID
    const infoPedido = document.getElementById('info-pedido'); 

    if (!infoPedido) return; // Si no lo encuentra, corta acá para no tirar error

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    // Sobrescribimos el HTML interno de ese pedacito con los datos reales
    infoPedido.innerHTML = `🛒 Mi Pedido: <strong>${totalItems}</strong> items <br> Total: US$ ${precioTotal.toFixed(2)}`;
}