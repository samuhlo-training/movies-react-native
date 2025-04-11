# Aplicación de Películas

<div align="center">
  <img src="assets/icons/logo.png" alt="Logo de la App de Películas" width="200"/>
  <br />
  <h3>Una aplicación moderna para descubrir películas construida con React Native y Expo</h3>
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.76-blue.svg?style=flat-square&logo=react)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-52.0-black.svg?style=flat-square&logo=expo)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![Appwrite](https://img.shields.io/badge/Appwrite-0.7-F02E65.svg?style=flat-square&logo=appwrite)](https://appwrite.io/)
  [![TMDB API](https://img.shields.io/badge/TMDB%20API-v3-01D277.svg?style=flat-square&logo=themoviedatabase)](https://www.themoviedb.org/documentation/api)
</div>

## Características

- **Búsqueda de Películas**: Encuentra tus películas favoritas con una interfaz de búsqueda intuitiva
- **Películas Tendencia**: Descubre qué es popular basado en las interacciones de los usuarios
- **Soporte Multilingüe**: Visualiza detalles de películas en múltiples idiomas
- **Diseño Responsivo**: Funciona perfectamente en diferentes tamaños de dispositivos
- **Interfaz Moderna**: Interfaz de usuario limpia e intuitiva con Tailwind CSS
- **Actualizaciones en Tiempo Real**: Mantente al día con la información más reciente de películas

## Capturas de Pantalla

<div align="center">
  <table>
    <tr>
      <td align="center"><strong>Pantalla Principal</strong></td>
      <td align="center"><strong>Detalles de Película</strong></td>
      <td align="center"><strong>Búsqueda</strong></td>
    </tr>
    <tr>
      <td><img src="https://via.placeholder.com/200x400" width="200"/></td>
      <td><img src="https://via.placeholder.com/200x400" width="200"/></td>
      <td><img src="https://via.placeholder.com/200x400" width="200"/></td>
    </tr>
  </table>
</div>

## Tecnologías

- **Framework Frontend**: [React Native](https://reactnative.dev/) con [Expo](https://expo.dev/)
- **Navegación**: [Expo Router](https://docs.expo.dev/router/introduction/) (Enrutamiento basado en archivos)
- **Estilos**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS para React Native)
- **Gestión de Estado**: React Hooks
- **Integración de API**: [TMDB API](https://www.themoviedb.org/documentation/api)
- **Backend y Analíticas**: [Appwrite](https://appwrite.io/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)

## Primeros Pasos

### Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o más reciente)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)

### Instalación

1. Clonar el repositorio
   ```bash
   git clone https://github.com/tuusuario/movies-react-native.git
   cd movies-react-native
   ```

2. Instalar dependencias
   ```bash
   npm install
   # o
   yarn install
   ```

3. Crear un archivo `.env` en el directorio raíz con tus claves API
   ```
   EXPO_PUBLIC_MOVIE_API_KEY=tu_clave_api_tmdb
   EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=tu_id_proyecto_appwrite
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=tu_id_base_datos_appwrite
   EXPO_PUBLIC_APPWRITE_COLLECTION_DETAILS_ID=tu_id_coleccion_appwrite
   ```

4. Iniciar el servidor de desarrollo
   ```bash
   npx expo start
   ```

## Estructura del Proyecto

```
movies-RN/
├── app/                    # Código principal de la aplicación
│   ├── (tabs)/             # Pantallas de navegación por pestañas
│   │   ├── index.tsx       # Pantalla principal
│   │   ├── search.tsx      # Pantalla de búsqueda
│   │   ├── profile.tsx     # Pantalla de perfil
│   │   └── saved.tsx       # Pantalla de películas guardadas
│   ├── movie/              # Pantallas relacionadas con películas
│   │   └── [id].tsx        # Pantalla de detalles de película
│   └── _layout.tsx         # Componente de diseño raíz
├── assets/                 # Activos estáticos
│   ├── icons/              # Iconos de la aplicación
│   └── images/             # Imágenes
├── components/             # Componentes reutilizables
├── constants/              # Constantes de la aplicación
├── services/               # Integraciones de API y servicios
│   ├── api.ts              # Integración con TMDB API
│   ├── appwrite.ts         # Integración con Appwrite
│   └── useFetch.ts         # Hook personalizado de fetch
└── types/                  # Definiciones de tipos TypeScript
```

## Integración de API

Esta aplicación utiliza la [API de The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api) para obtener datos de películas. Necesitarás obtener una clave API de TMDB para usar esta aplicación.

## Analíticas y Backend

La aplicación utiliza [Appwrite](https://appwrite.io/) para servicios de backend, incluyendo:
- Seguimiento de películas populares basado en conteo de vistas
- Almacenamiento de preferencias de usuario
- Analíticas para interacciones de usuario

## Contribuciones

¡Las contribuciones son bienvenidas! No dudes en enviar un Pull Request.

1. Haz un fork del repositorio
2. Crea tu rama de características (`git checkout -b feature/caracteristica-increible`)
3. Haz commit de tus cambios (`git commit -m 'Añadir alguna característica increíble'`)
4. Haz push a la rama (`git push origin feature/caracteristica-increible`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.

## Agradecimientos

- [TMDB](https://www.themoviedb.org/) por proporcionar la API de datos de películas
- [Expo](https://expo.dev/) por la increíble plataforma de desarrollo para React Native
- [Appwrite](https://appwrite.io/) por los servicios de backend
- Todas las bibliotecas de código abierto utilizadas en este proyecto
