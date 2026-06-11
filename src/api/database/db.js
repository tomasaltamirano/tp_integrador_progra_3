import mysql2 from 'mysql2/promise';

import environments from '../config/environments.js';

const { database } = environments;

const connection = mysql2.createPool({
	host: database.host,
	database: database.name,
	user: database.user,
	password: database.password || '',
	port: database.db_port || 3307,
});

export default connection; //exportamos esta conexion a la BBDD para poder tirarle sntencias en otro modulo, como por ejemplo en el index.js para hacer un testeo de la conexion a la BBDD.

/*
createPool() es una funcion que crea un grupo (pool) de conexiones a la base de datos. Esto es útil para mejorar el rendimiento y la eficiencia al manejar múltiples solicitudes a la base de datos, ya que permite reutilizar conexiones en lugar de crear una nueva para cada solicitud.

En este caso, se está creando un pool de conexiones a una base de datos MySQL utilizando la configuración proporcionada en el objeto database, que incluye el host, el nombre de la base de datos, el usuario y la contraseña. Luego, esta conexión se exporta para que pueda ser utilizada en otros módulos de la aplicación para ejecutar consultas a la base de datos.


*/
