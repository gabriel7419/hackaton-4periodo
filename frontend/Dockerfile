# Use uma imagem base Node.js
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do aplicativo
COPY . .

# Exponha a porta padrão do React
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
