
# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Se não houver script de build, apenas criamos a pasta para evitar erro no server
RUN npm run build || mkdir -p dist

# Production Stage
FROM node:18-alpine
WORKDIR /app

# Instala express e outros utilitários se necessário
RUN npm install express

# Copia os arquivos necessários do estágio de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/package*.json ./

# Garante que temos permissão de escrita para o data.json
RUN touch data.json && chmod 666 data.json

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
