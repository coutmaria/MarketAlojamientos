# Montaña Stays — Market Alojamientos

## Descripción

**Montaña Stays** es una aplicación web tipo *marketplace* de alojamientos turísticos en Colombia, desarrollada con Angular. Permite a los usuarios explorar apartamentos, casas y cabañas en distintas ciudades y destinos (Bogotá, Medellín, Cartagena, Guatapé, Villa de Leyva y Armenia), filtrarlos según sus necesidades, ver el detalle de cada alojamiento, cotizar una estadía y realizar una reserva simulada.

La aplicación funciona completamente en el navegador: los datos de los alojamientos y reseñas se cargan desde un archivo JSON local (datos de prueba) y las reservas se guardan en el `localStorage` 

## Integrantes

| Nombre | Usuario GitHub |
| ------ | -------------- |
| Maria Ardila | [@coutmaria](https://github.com/coutmaria) |

## Tecnologías utilizadas

- **Angular 21** (componentes *standalone*, *lazy loading* de rutas)
- **TypeScript 5.9**
- **Angular Router** y **Angular Forms**
- **HttpClient** para cargar los datos desde el JSON local
- **HTML5 y CSS3** (estilos propios, sin librerías de UI)
- **Vitest** + **jsdom** para las pruebas unitarias
- **Arquitectura de componentes Atomic Design** (átomos, moléculas, organismos y páginas)

## Requisitos para ejecutar la aplicación

- **Node.js** versión 20.19 o superior (probado con Node.js 24)
- **npm** versión 10 o superior (incluido con Node.js)
- **Git** (para clonar el repositorio)
- Un navegador web moderno (Chrome, Edge, Firefox, etc.)

Para verificar las versiones instaladas:

```bash
node -v
npm -v
```


## Instrucciones de instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/coutmaria/MarketAlojamientos.git
   ```

2. Entrar a la carpeta de la aplicación Angular (el nombre tiene un espacio, por eso va entre comillas):

   ```bash
   cd "MarketAlojamientos/market alojamientos"
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

## Instrucciones de ejecución

Todos los comandos se ejecutan dentro de la carpeta `market alojamientos`.

### Ejecutar en modo desarrollo

```bash
npm start
```

Luego abrir el navegador en **http://localhost:4200/**. La aplicación se recarga automáticamente al modificar los archivos.

### Generar la versión de producción

```bash
npm run build
```

Los archivos compilados quedan en `dist/market-alojamientos/`.

### Ejecutar las pruebas unitarias

```bash
npm test
```

Para ejecutarlas una sola vez (sin modo *watch*):

```bash
npm test -- --watch=false
```

## Principales funcionalidades

- **Página de inicio:** presentación de la plataforma y sección de *alojamientos destacados* (los 3 mejor calificados).
- **Listado de alojamientos:** muestra todos los alojamientos activos en tarjetas con imagen, ciudad, tipo, calificación y precio por noche.
- **Filtros de búsqueda:** por ciudad, tipo de alojamiento (Apartamento, Casa, Cabaña), número de huéspedes y precio máximo por noche. Si ningún alojamiento coincide, se muestra un mensaje indicándolo.
- **Detalle del alojamiento:** galería de imágenes, descripción, ubicación, capacidad, habitaciones, camas, baños, servicios disponibles, reglas básicas y reseñas de otros huéspedes.
- **Cotizador de estadía:** al seleccionar fechas y número de huéspedes calcula el número de noches, el subtotal, la tarifa de limpieza, la tarifa de servicio (10 % del subtotal) y el valor total.
- **Validaciones de negocio:**
  - La fecha de llegada no puede ser anterior a hoy.
  - La fecha de salida debe ser posterior a la de llegada.
  - El número de huéspedes debe ser mayor que cero y no superar la capacidad del alojamiento.
  - El nombre del huésped debe tener mínimo 3 caracteres y el correo debe ser válido.
- **Reserva simulada:** formulario con nombre y correo del huésped que confirma la reserva y la guarda en el `localStorage` del navegador.
- **Mis reservas:** lista de las reservas realizadas con alojamiento, fechas, número de huéspedes, valor total y estado.
- **Página 404:** se muestra al ingresar una ruta que no existe.
- **Formato de moneda:** los precios se muestran en pesos colombianos (por ejemplo, `$180.000`).

### Rutas de la aplicación

| Ruta | Página |
| ---- | ------ |
| `/` | Inicio |
| `/alojamientos` | Listado con filtros |
| `/alojamiento/:id` | Detalle, cotizador y reserva |
| `/mis-reservas` | Reservas realizadas |
| `**` (cualquier otra) | Página no encontrada |

## Prototipos

Los prototipos de las pantallas principales están en [`docs/prototipos/prototipos-montana-stays.drawio`](docs/prototipos/prototipos-montana-stays.drawio) y se pueden abrir en [draw.io](https://app.diagrams.net) o con la extensión *Draw.io Integration* de VS Code. El archivo tiene una página por pantalla:

0. Mapa de navegación
1. Inicio
2. Listado de alojamientos (con el estado sin resultados)
3. Detalle, cotización y reserva (con los errores de validación)
4. Mis reservas (con el estado vacío)
5. Página no encontrada
6. Versión móvil

## Estructura general del proyecto

```
MarketAlojamientos/
├── README.md
├── docs/
│   └── prototipos/                   # Prototipos de las pantallas (draw.io)
└── market alojamientos/              # Aplicación Angular
    ├── angular.json                  # Configuración de Angular CLI
    ├── package.json                  # Dependencias y scripts
    ├── tsconfig*.json                # Configuración de TypeScript
    ├── public/                       # Archivos estáticos (favicon)
    └── src/
        ├── index.html
        ├── main.ts                   # Punto de entrada de la aplicación
        ├── styles.css                # Estilos globales
        ├── assets/
        │   ├── data/
        │   │   └── marketplace-data.json   # Datos de prueba: alojamientos y reseñas
        │   └── images/                     # Imágenes de los alojamientos
        └── app/
            ├── app.component.ts      # Componente raíz (header + router-outlet + footer)
            ├── app.config.ts         # Proveedores (router, HttpClient)
            ├── app.routes.ts         # Definición de rutas (lazy loading)
            ├── components/           # Componentes reutilizables (Atomic Design)
            │   ├── atoms/            # button, campo-formulario
            │   ├── molecules/        # tarjeta-alojamiento, mensaje-vacio
            │   └── organisms/        # header, footer
            ├── pages/                # Páginas de la aplicación
            │   ├── home/
            │   ├── listado/          # + filtros-alojamientos
            │   ├── detalle/          # + galeria-imagenes, cotizador, formulario-reserva
            │   ├── mis-reservas/
            │   └── no-encontrado/
            ├── services/             # Lógica de datos
            │   ├── data.service.ts        # Carga de alojamientos y reseñas desde el JSON
            │   ├── cotizacion.service.ts  # Cálculo de la cotización
            │   └── reservas.service.ts    # Creación y almacenamiento de reservas
            ├── hooks/                # Funciones puras de lógica de negocio
            │   ├── filtro-alojamientos.ts # Filtrado del listado
            │   └── reglas-negocio.ts      # Validaciones de fechas, huéspedes y datos del huésped
            ├── models/               # Interfaces TypeScript (Alojamiento, Reserva, Cotizacion, etc.)
            └── data-transformers/
                └── formato-pesos.pipe.ts  # Pipe para formatear valores en pesos
```
