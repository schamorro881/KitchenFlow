# KitchenFlow

Sistema de gestión para cocinas modernas basado en Clean Architecture y Angular.

## Tecnologías
- **Backend**: .NET 10 (C#), Entity Framework Core, PostgreSQL.
- **Frontend**: Angular 18+, Taiga UI.
- **Infraestructura**: Docker Compose, GitHub Actions.

## Estructura del Proyecto
- `backend/`: API y lógica de negocio (Arquitectura Limpia).
- `frontend/`: Aplicación cliente en Angular.
- `tests/`: Pruebas unitarias, de integración y de arquitectura.

## Cómo empezar

### Requisitos
- .NET SDK
- Node.js & npm
- Docker Desktop

### Iniciar la Base de Datos
```bash
docker-compose up -d
```

### Ejecutar el Backend
```bash
cd backend/src/Api
dotnet run
```

### Ejecutar el Frontend
```bash
cd frontend
npm install
npm start
```

### Ejecutar Pruebas
```bash
cd backend
dotnet test
```

## Integración Continua
El proyecto incluye flujos de trabajo de **GitHub Actions** que se ejecutan automáticamente al hacer push a `main` o `master`, validando la compilación y los tests tanto en el frontend como en el backend.
