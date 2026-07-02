document.getElementById('getProduct-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('idProd').value;
    const contenedor = document.getElementById('contenedor-productos');

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
                <p>${p.descripcion}</p>
                <p>Categoría: ${p.categoria}</p>
            </div>
        `;
    } catch (error) {
        contenedor.innerHTML = `<p>Error al consultar el producto</p>`;
    }
});