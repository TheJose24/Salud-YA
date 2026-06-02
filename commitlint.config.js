module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [2, 'always', 'lower-case'], // Asegura que el alcance esté en minúsculas
    'scope-empty': [2, 'never'], // No permite alcances vacíos
    'scope-enum': [
      2,
      'always',
      [
        'ui', // Cambios en la interfaz de usuario
        'reports', // Cambios en los informes
        'projects', // Cambios en los proyectos
        'clients', // Cambios en los clientes
        'team', // Cambios en el equipo
        'auth', // Cambios en la autenticación
        'api', // Cambios en la API
        'config', // Configuración de la aplicación
        'tests', // Pruebas unitarias o de integración
      ],
    ],
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nueva funcionalidad
        'fix', // Corrección de errores
        'docs', // Cambios en la documentación
        'style', // Cambios en el estilo
        'refactor', // Cambios en el código que no corrigen errores ni añaden funcionalidades
        'perf', // Mejora de rendimiento
        'test', // Añadir pruebas
        'build', // Cambios en el sistema de construcción
        'ci', // Cambios en la configuración de CI
        'chore', // Tareas de mantenimiento
        'revert', // Revertir un commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'], // Asegura que el tipo esté en minúsculas
    'type-empty': [2, 'never'], // No permite tipos vacíos
    'body-leading-blank': [2, 'always'], // Requiere una línea en blanco antes del cuerpo
    'body-max-line-length': [2, 'always', 120], // Limita el cuerpo a 100 caracteres
    'header-max-length': [2, 'always', 100], // Limita el encabezado a 100 caracteres
    'subject-empty': [2, 'never'], // No permite encabezados vacíos
    'subject-case': [2, 'always', 'lower-case'], // Asegura que el encabezado esté en minúsculas
    'body-empty': [2, 'never'], // No permite cuerpos vacíos
  },
};
