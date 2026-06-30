document.getElementById('buscarProducto-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('idBuscar').value;
    const contenedor = document.getElementById('contenedor-productos');
    const mensajes = document.getElementById('contenedor-mensajes');

    try {
        const res = await fetch(`/api/productos/${id}`);
        const data = await res.json();

        if (!res.ok) {
            contenedor.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        const p = data.payload;
        contenedor.innerHTML = `
            <div class="card-producto">
                <img src="${p.imagen}" alt="${p.nombre}" width="150">
                <h4>${p.nombre}</h4>
                <p>ID: ${p.id}</p>
                <p>$${p.precio}</p>
            </div>
            <button id="btnDesactivar">Desactivar producto</button>
        `;

        document.getElementById('btnDesactivar').addEventListener('click', async () => {
            if (!confirm('¿Seguro que querés desactivar este producto?')) return;

            const resDel = await fetch(`/api/productos/${id}/desactivar`, {
                method: 'PUT',
            });
            const dataDel = await resDel.json();
            mensajes.innerHTML = `<p>${dataDel.mensaje || dataDel.error}</p>`;
        });
    } catch (error) {
        contenedor.innerHTML = `<p>Error al buscar el producto</p>`;
    }
});