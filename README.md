# proyecto_backend_Movie_App### Proyecto backend: Movie App

### Requisitos del proyecto

Se pide desarrollar una aplicación web de búsqueda y gestión de películas que contemple las siguientes funcionalidades y endpoints asociados. Trabajaremos sobre los conceptos vistos de Frontend y Backend en clase

**Aclaración inicial previa**: La app tendrá dos roles distintos: `Usuario y Administrador`. Las funcionalidades que aparecerán tanto en el panel de control como en el resto de endpoints variarán dependiendo del tipo de usuario, no pudiendo nunca acceder a aquellas zonas o contenidos que no le corresponden.

### Endpoints

Endpoints Web:
- [GET] `/` Vista de inicio de la app
- [GET] `/dashboard` Panel de control
- [GET] `/search/:title` Vista detalle de la película
- [GET] `/search` Buscador de películas
- [GET] `/favorites` Películas favoritas del usuario
- [GET] `/profile` Vista detalle del usuario
- [GET] `/users` : Mostrará la lista de usuarios. Se podrá hacer el CRUD de un usuario desde esta vista (admin)

Endpoints API:
- [GET] `/api/user` Obtener datos del perfil del usuario o administrador
- [POST] `/api/signup` Registrar usuario en la aplicación
- [PUT] `/api/user` Editar datos del perfil del usuario o administrador
- [DELETE] `/api/user` Borrar un usuario de la base de datos (admin)
- [POST] `/api/login` Hacer login en la aplicación
- [POST] `/api/logout` Salir
- [GET] `/api/movie/:title` Buscar película o películas
- [POST] `/api/movie` Crear película (admin)
- [PUT] `/api/movie` Editar película (admin)
- [DELETE] `/api/movie` Borrar película (admin)
- [GET] `/api/favorites` Obtener películas favoritas del usuario
- [POST] `/api/favorites` Guardar favorito del usuario
- [DELETE] `/api/favorites` Borrar favorito del usuario
- [GET] `/api/recoverpassword` Recuperar password
- [GET] `/api/restorepassword` Cambiar password



### Formulario de acceso

Endpoints para formulario:

- [GET] `/` Vista de inicio de la app. Tendrá como mínimo un formulario de email y contraseña como credenciales de entrada a la app. Además, deberá ofrecer la alternativa de identificación mediante Google, Facebook u otro proveedor de autenticación.
- [GET] `/signup` Vista de formulario de registro de la app. Tendrá como mínimo un formulario de email y contraseña como credenciales de entrada a la app. Además, deberá ofrecer la alternativa de identificación mediante Google, Facebook u otro proveedor de autenticación.
- [POST] `/api/signup` Creación de nuevo usuario en base de datos (SQL), abrir sesión y redirección a /dashboard.
- [POST] `/api/login` Validación de credenciales, abrir sesión y redirección a /dashboard si es Usuario, o /movies si es Administrador.
- [POST] `/api/logout` Cierre de sesión y redirección a /.

### Menú

No asociado a ningún endpoint concreto, sino que estará presente una vez dentro de la app, pasada la identificación, en todas las vistas excepto el Panel de control.

Dicho menú se podrá representar como se desee, si bien se recomienda un efecto de persiana asociada a un icono de hamburguesa.

Endpoints para menú Usuario:

- [GET] `/dashboard` Panel de control
- [GET] `/search` Buscador de películas
- [GET] `/movies` Mis películas
- [POST] `/api/logout` Salir

Endpoints para menú Administrador:

- [POST] `/api/logout` Salir

### Panel de control (Usuario): /dashboard

Se mostrarán dos botones con iconos para acceder a las secciones `/search` y `/movies`.

(Como se mencionó antes, idealmente en esta vista no debería haber menú sino sencillamente un icono para Salir.)

### Buscar película (Usuario): /search

Aparecerá un buscador (una caja de texto y un botón o icono de enviar) que buscará una película por título y mostrará a continuación las posibles coincidencias.

Para cada película se mostrará la siguiente info:

- Título completo
- Imagen representativa
- Año
- Director
- Género
- Duración

Para cada película habrá un botón de `Añadir a Favoritos`, que asociará dicha película al Usuario en la BBDD.

### Vista detalle de la película (Usuario): /search/:title

Aparecerá la vista detalle de la película buscada, representando la información de dicha peli:

- Título completo
- Imagen representativa
- Año
- Director
- Género
- Duración
- Sinopsis
- Actores
- Rating
- Opiniones de espectadores reales de al menos 2 fuentes distintas (Estos datos se obtendrán a partir del scraping de [sensacine](https://www.sensacine.com/) o cualquier otra fuente a elección)
- Etc...

Habrá un botón de `Añadir a Favoritos`, que asociará dicha película al Usuario.

### Mis películas favoritas (Usuario): /movies

Aparecerá un listado de las películas que el Usuario añadió a la BBDD a través del buscador, con la misma información adicional de cada una de ellas (título completo, imagen representativa, año, director, género y duración), así como un botón de `Quitar de Mis películas`, que eliminará la asociación de película del Usuario.

### Gestionar películas (Administrador): /movies

Esta es la única vista que tendrá el Administrador en la aplicación, de manera que no podrá acceder a ninguna de las otras. De la misma manera, el Usuario no podrá acceder a esta vista tampoco.

Se mostrará un botón de `Crear nueva` y debajo del mismo, un listado de todas las películas almacenadas en la BBDD, con botones de `Editar` y `Eliminar` para cada una de ellas.

El botón de `Crear nueva` mostrará un formulario con los campos título completo, imagen representativa, año, director, género y duración, para dar de alta una nueva película en la base de datos. Se valorará positivamente la realización de algún tipo de validación de dichos campos. Al enviar el formuliario se invocará al endpoint `POST /api/movie`.

Para el botón de `Editar`, cuando el Administrador pinche sobre él, la aplicación invocará al endpoint `PUT /api/movie` (donde :id tendrá el valor correspondiente), que mostrará un formulario idéntico al del párrafo anterior, pero con los campos autorrellenados con los datos almacenados en la BBDD. Si se realizó la validación en la creación, debería también aplicarse en este caso al modificarlos el Administrador.

Para el botón de `Eliminar`, se solicitará algún tipo de confirmación y en caso afirmativo, se borrará de la base de datos. Se lanzará una petición al endpoint `DELETE /api/movie` Asimismo, se desasociarán todas las posibles relaciones entre dicha película eliminada y aquellos Usuarios que la tuvieran guardada en sus películas.

### Vista perfil

- [GET] `/profile` : Mostrará datos del usuario o administrador logueado. Estos datos podrán ser editados desde aquí.

### Vista de usuarios (Administrador)

- [GET] `/users` : Mostrará la lista de usuarios registrados en la aplicación. Cada usuario podrá ser editado o borrado por el administrador. Además podrá dar de alta nuevos usuarios.

### Vista registro

- [GET] `/signup` : Registro de usuario nuevo. Tendrá como mínimo un formulario con los campos: nombre, email y contraseña (los dos últimos serán usados como credenciales de acceso a la app). Además, deberá ofrecer la alternativa de identificación mediante Google, Facebook u otro proveedor de autenticación a elección.

Los usuarios se guardarán en la BBDD SQL.

### Vista ingresar

- [GET] `/login`: Pantalla con formulario para validación de credenciales, abrir sesión y redirección a **home**.

### Recuperar contraseña
Esto implica construir dos vistas nuevas:

- [GET] `/recoverpassword`: _Tendrá un input para ingresar el e-mail y un botón. Al hacer click se enviará al e-mail (previa comprobación de que corresponde a un usuario existente en la BBDD) un link que redirija a "/restorepassword" y que además contendrá un JWT._

- [GET] `/restorepassword`: _Tendrá dos inputs, el primero será para ingresar la nueva contraseña y el segundo será para repetir la constraseña. Si coinciden, se guardará dicha actualización en la BBDD previa comprobación de la validez del JWT._ 

## Notas adicionales

### Sobre el control de acceso

La aplicación debe estar protegida a entradas indebidas de usuarios no registrados (o autorizados por un proveedor externo), de manera que cualquier endpoint asociado a la zona privada (es decir, distinto de /, /login y /logout) comprobará si la sesión está abierta, y en otro caso redireccionará al inicio de la app.

Para el login con credenciales email y contraseña, deberá hacerse mediante `JWT` (el cifrado es opcional). Para la parte de login con uno o más proveedores de terceros(Google, Github, etc...) deberá hacerse mediante `OAuth` (con o sin Firebase, a elegir; en cualquier caso, con un proveedor OAuth será suficiente).

### Sobre el modelo de datos

Para el almacenamiento y la búsqueda de los datos, se realizará de la siguiente manera:

- La información relativa a usuarios de la plataforma (credenciales y otras cuestiones de acceso, así como la asociación de películas a usuarios) se almacenará en una `base de datos relacional SQL`.

- Los datos de las películas provendrán de dos fuentes distintas:
  - Datos de películas de APIs (elegir una API). Puede ser otra que no esté en la lista
    - [API OMDB](http://www.omdbapi.com/)
    - [themoviedb](https://developer.themoviedb.org/docs/getting-started)
  - Base de datos no relacional `MongoDB`, que será exclusivamente mantenida por el Administrador.

- El objetivo será en todo momento que no se replique información, dando prioridad a `OMDB` si ya dispone de los datos de una película, y si no es así, complementarla con una base de datos.

- Al realizar un Usuario la búsqueda de películas por título, la aplicación deberá consultar en primer lugar a la API `OMDB`:

  1.  Si la película es localizada en dicha API, mostrará sus datos al Usuario por pantalla en los resultados de búsqueda, sin almacenarlos en ninguna base de datos.
  2.  Si la película no es localizada en dicha API, entonces buscará en la BBDD `MongoDB`.
  3.  Si no existe, devolverá un mensaje de `No hay resultados` o similar.

- Cuando un Usuario añada a sus películas una de las mostradas en el buscador, se guardará en la base de datos relacional (`SQL`) la información necesaria para asociar dicho usuario con la fuente de datos correspondiente (`OMDB` o en la `BBDD MongoDB`).
  Remarcar que no deben guardarse de nuevo los datos de la película, puesto que estos ya existen en otro lugar, sino la relación entre la fuente de la que provienen sus datos (`OMDB` o `MongoDB`) y el usuario.

- La base de datos `MongoDB` tan solo guardará las películas que no están en `OMDB` (con los mismos datos: título completo, imagen representativa, año, director, género y duración) para alimentar el buscador del Usuario.
  Para dicho Usuario, el origen de los datos debería ser totalmente transparente, de manera que no debería saber si estos provienen de API externa o de la BBDD. En cualquier caso, el objetivo es evitar cualquier tipo de redundancia.

### Sobre la obtención de opiniones a través de scraping

- Se deberán obtener opiniones de espectadores reales a partir de al menos **dos sitios web distintos**. 

- Podrán utilizarse fuentes como [Sensacine](https://www.sensacine.com/), [FilmAffinity](https://www.filmaffinity.com/es/main.html) o cualquier otro a elección.

- Para realizar el scraping se podrá utilizar el paquete npm [Puppeteer](https://www.npmjs.com/package/puppeteer), [Cheerio](https://www.npmjs.com/package/cheerio) o cualquier otro que se elija y sirva para conseguir el objetivo. 


### Sobre la app

La aplicación debe ser `mobile-first` y de tipo `Server Side Rendering` utilizando un motor de plantillas (`Pug` o `EJS`).

## Control de versiones

Gestión del control de versiones con GiHub desde el principio del proyecto. Lo utilizaremos para trabajar en equipo de manera paralela, utilizando ramas, pull request, etc. Trabajar en un proyecto como colaboradores de equipo.

### Sobre los recursos de terceros

Se permite (y recomienda, si con ello se minimiza el tiempo de desarrollo y se acelera así el de entrega) el uso de cualquier recurso de terceros (librerías, paquetes npm, etc.) además del código propio.

### Sobre la metodología

Durante el desarrollo del proyecto completo, se seguirá una metodología ágil tipo `SCRUM`, aplicando además `TDD` desde el comienzo hasta el final.

Esto implicará el establecimiento de un backlog de tareas, un sprint con sus story points y reparto de tareas, así como la creación de tests unitarios desde el principio y, a ser posible, la realización de tests e2e al final.

### Documentación
Se deberá generar documentación de la app de cada parte. además de comentar el código las partes importantes, se deberá hacer uso de `JSOC` y `Swagger` para agregar documentación a nuestro servidor.

