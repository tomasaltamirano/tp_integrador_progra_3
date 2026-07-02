// Logica para trabajar con archivos y rutas de proyecto

// Importacion de modulos para trabajar con rutas
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obtener el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Vamos a hacer que el dirname apunte a la raiz de nuestro servidor
const __dirname = join(dirname(__filename), '../../../'); // Esta es la RUTA RAIZ de nuestro servidor, que luego en el index usaremos para apuntar a /src/public

export { __dirname, join };

/* Que esta pasando aca?

En ESM module ("type": "module") no existen __dirname ni __filename
Necesitamos aca reconstruirlos manualmente para:

    1. Trabajar con rutas absolutas
    2. Resolver correctamente rutas de archivos estaticos
    3. Construir paths (rutas) para enviar HTML, CSS, imagenes, JS, etc
    4. Evitar errores como "Cannot fin module" o rutas rotas en produccion


///////////////////////////
// Entendiendo el codigo:

- fileURLToPath: Convierte una URL de archivo (file://) a una ruta de sistema de archivos

- dirname: devuelve el directorio padre de una ruta

- join: Une segmentos de ruta


///////////////////

- import.meta.url: Proporcionamos la URL absoluta del modulo actual
    file:///ruta/al/archivo.js

- fileURLToPath: Convertimos esa URL a una ruta de sistema
    /ruta/al/archivo.js


///////////////////

1. dirname(__filename): Obtenemos el directorio de el archivo actual
2. join(..., "../../../"): Desde src/api/utils retrocedemos tres niveles en la estructura de directorios
*/
