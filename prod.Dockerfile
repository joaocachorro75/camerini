
FROM node:18-alpine

WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./
RUN npm install --production

# Copia os arquivos da aplicação
COPY . .

# Permissões para o banco de dados JSON
RUN touch data.json && chmod 666 data.json

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
