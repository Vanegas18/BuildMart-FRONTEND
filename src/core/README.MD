# Core - Arquitectura Modular

## Descripción

El directorio `core` contiene la infraestructura central y la lógica fundamental que sustenta toda la aplicación. Estos elementos no están ligados a características específicas del negocio sino que proporcionan servicios y utilidades esenciales para toda la aplicación.

## Estructura

core/
├── api/ # Cliente y utilidades de API
├── routes/ # Configuración de rutas
├── context/ # Proveedores de contexto de React
├── hooks/ # Hooks fundamentales para toda la aplicación
├── lib/ # Bibliotecas y abstracciones fundamentales
└── utils/ # Utilidades fundamentales

## Propósito

Los componentes en `core` tienen como objetivo:

1. **Proporcionar servicios fundamentales** que serán utilizados por múltiples módulos
2. **Centralizar configuraciones** para toda la aplicación
3. **Establecer patrones y abstracciones** que el resto de la aplicación utilizará
4. **Gestionar estado global** que trasciende los límites de los módulos

## Directrices de Uso

1. **Limitación de dependencias**: El código en `core` no debe depender de módulos específicos
2. **Estabilidad**: Los cambios en `core` afectan a toda la aplicación, por lo que debe ser estable
3. **Generalidad**: Componentes y utilidades deben ser generales, no específicos a un dominio
4. **Documentación**: Debido a su importancia, el código en `core` debe estar bien documentado

## Ejemplos Específicos

- **api/**: Cliente HTTP configurado, interceptores, manejo de errores
- **router/**: Configuración de React Router, rutas protegidas, middleware de navegación
- **context/**: Contextos de React para funcionalidades transversales (tema, datos de usuario)
- **hooks/**: Hooks fundamentales como useAuth, useApi, useWindowSize, useDarkMode
- **lib/**: Abstracciones sobre bibliotecas externas, como adaptadores para servicios de terceros, wrappers personalizados para librerías como axios o firebase
