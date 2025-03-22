# Shared - Arquitectura Modular

## Descripción

El directorio `shared` contiene componentes, hooks, utilidades y otros recursos reutilizables que son utilizados por múltiples módulos en toda la aplicación. Estos elementos proporcionan funcionalidades comunes que trascienden los límites de los módulos individuales.

## Estructura

shared/
├── components/        # Componentes UI reutilizables
│   ├── Button/
│   ├── Card/
│   ├── Modal/
│   ├── Form/
│   └── Layout/
│
│
├── utils/             # Funciones utilitarias
│   ├── formatting.js
│   ├── validation.js
│   └── calculations.js
│
├── icons/             # Iconos y assets visuales
│
└── index.js           # Exporta todos los recursos compartidos

## Principios

1. **Reutilización**: Los componentes deben ser diseñados para ser reutilizados en múltiples contextos.
2. **Generalidad**: Evitar lógica específica de dominio en los componentes compartidos.
3. **Composición**: Preferir la composición sobre la herencia.
4. **Desacoplamiento**: Los componentes no deben tener dependencias directas con módulos específicos.

## Directrices para Componentes Compartidos

1. **Propiedades Claras**: Definir interfaces de props claras y con valores por defecto.
2. **Documentación**: Documentar el propósito y uso de cada componente.
3. **Accesibilidad**: Asegurar que los componentes siguen las mejores prácticas de accesibilidad.
4. **Consistencia**: Mantener un estilo y comportamiento consistente entre componentes.
5. **Pruebas**: Los componentes compartidos deben tener una cobertura de pruebas sólida.

## Cuándo Añadir a Shared

Un componente, hook o utilidad debe moverse a `shared` cuando:

1. Se utiliza en más de un módulo.
2. Proporciona funcionalidad genérica no específica de dominio.
3. Representa un patrón de UI o lógica común en la aplicación.

## Evolución de Componentes Compartidos

A medida que evoluciona la aplicación:

1. Refactorizar componentes específicos de módulo en componentes compartidos cuando se identifique reutilización.
2. Mantener los componentes compartidos actualizados con los patrones de diseño de la aplicación.
3. Considerar el desarrollo de una biblioteca de componentes interna si el número de componentes compartidos crece significativamente.
