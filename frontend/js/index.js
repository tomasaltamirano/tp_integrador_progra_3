function toggleTheme() {
	const html = document.documentElement;
	html.setAttribute(
		'data-theme',
		html.getAttribute('data-theme') === 'light' ? 'dark' : 'light',
	);
}

// ================= Manejo del Tema =================

// Al cargar cualquier página, revisamos si ya había un tema guardado
document.addEventListener('DOMContentLoaded', () => {
	const temaGuardado = localStorage.getItem('temaPreferido');
	if (temaGuardado) {
		document.documentElement.setAttribute('data-theme', temaGuardado);
	}
});

// Función para cambiar y guardar el tema
function toggleTheme() {
	const html = document.documentElement;
	const temaActual = html.getAttribute('data-theme');
	const nuevoTema = temaActual === 'light' ? 'dark' : 'light'; /* revisar*/

	html.setAttribute('data-theme', nuevoTema);
	localStorage.setItem('temaPreferido', nuevoTema); // Lo guardamos en memoria
}

// ================= Lógica de Bienvenida =================

function comenzarPedido(event) {
	// Evitamos que el enlace <a> cambie de página inmediatamente
	event.preventDefault();

	const inputNombre = document.getElementById('nombreUsuario').value;

	// Validación simple: que no entre sin poner nombre
	if (inputNombre.trim() === '') {
		alert('Por favor, ingresá tu nombre para continuar.');
		return;
	}

	// Guardamos el nombre en memoria para usarlo en el Ticket final
	localStorage.setItem('nombreCliente', inputNombre);

	// Ahora sí, lo mandamos a la página de productos
	window.location.href = 'productos.html';
}

// Agregamos el evento al botón del index.html

const btn = document.getElementById('btnComenzar');
if (btn) {
	btn.addEventListener('click', comenzarPedido);
}

//logica para activar y desactivar productos en el dashboard de admin:
// async function cambiarEstado(id, accion) {
// 	const mensaje =
// 		accion === 'desactivar'
// 			? '¿Estás seguro de desactivar este producto?'
// 			: '¿Estás seguro de activar este producto?';

// 	if (!confirm(mensaje)) return;

// 	try {
// 		const response = await fetch(`/api/productos/${id}/${accion}`, {
// 			method: 'PUT',
// 		});

// 		if (response.ok) {
// 			window.location.reload();
// 		} else {
// 			alert('Error al cambiar el estado del producto');
// 		}
// 	} catch (error) {
// 		alert('Error de conexión con el servidor');
// 	}
// }

// lógica para activar y desactivar productos en el dashboard de admin:
async function cambiarEstado(id, accion) {
	const mensaje =
		accion === 'desactivar'
			? '¿Estás seguro de desactivar este producto?'
			: '¿Estás seguro de activar este producto?';

	if (!confirm(mensaje)) return;

	try {
		// ACÁ ESTÁ EL CAMBIO DE RUTA ABSOLUTA
		const response = await fetch(
			`http://localhost:3000/api/productos/${id}/${accion}`,
			{
				method: 'PUT',
			},
		);

		if (response.ok) {
			window.location.reload();
		} else {
			alert('Error al cambiar el estado del producto');
		}
	} catch (error) {
		alert('Error de conexión con el servidor');
	}
}
