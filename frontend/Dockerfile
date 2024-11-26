FROM node:20

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale dependências com --legacy-peer-deps para evitar conflitos de dependências
RUN npm install --legacy-peer-deps --include=dev && npm cache clean --force

# Reconstrua o esbuild para evitar erros de instalação
RUN npm rebuild esbuild

# Copie o restante dos arquivos para o container
COPY . .

# Exponha a porta correta
EXPOSE 5173

# Defina o comando de execução do servidor de desenvolvimento
CMD ["npm", "run", "dev"]