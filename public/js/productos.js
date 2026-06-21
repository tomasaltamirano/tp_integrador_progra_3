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
                <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">
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
