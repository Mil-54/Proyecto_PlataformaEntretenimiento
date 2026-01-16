FROM node:20-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Limpiar dependencias de desarrollo
RUN npm install --only=production --legacy-peer-deps && npm cache clean --force

# Puerto
EXPOSE 3000

# Comando de inicio (Cluster: LB + 2 Backends)
CMD ["node", "start-cluster.js"]
