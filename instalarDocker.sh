#!/bin/bash

# Atualizando o sistema e instalando dependências necessárias
echo "Atualizando o sistema e instalando dependências..."
sudo apt-get update
sudo apt-get install -y ca-certificates curl

# Criando diretório para a chave GPG do Docker
echo "Criando diretório para chave GPG do Docker..."
sudo install -m 0755 -d /etc/apt/keyrings

# Baixando e configurando a chave GPG oficial do Docker
echo "Baixando a chave GPG oficial do Docker..."
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Adicionando o repositório oficial do Docker
echo "Adicionando o repositório oficial do Docker..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Atualizando os índices do repositório
echo "Atualizando os índices do repositório..."
sudo apt-get update

# Instalando os pacotes do Docker
echo "Instalando os pacotes do Docker..."
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verificando a instalação do Docker
echo "Verificando a instalação do Docker..."
sudo docker run hello-world

# Instalando o Docker Compose
echo "Instalando o Docker Compose..."
sudo apt install -y docker-compose

# Permitindo o uso do Docker sem sudo para todos os usuários
echo "Adicionando o grupo docker e permitindo o uso sem sudo para todos os usuários..."
sudo groupadd docker
sudo usermod -aG docker $USER

# Avisando para reiniciar a sessão
echo "Para usar o Docker sem sudo, é necessário sair e entrar novamente na sessão ou reiniciar o computador."

echo "Instalação concluída!"
#!/bin/bash

# Atualizando o sistema e instalando dependências necessárias
echo "Atualizando o sistema e instalando dependências..."
sudo apt-get update
sudo apt-get install -y ca-certificates curl

# Criando diretório para a chave GPG do Docker
echo "Criando diretório para chave GPG do Docker..."
sudo install -m 0755 -d /etc/apt/keyrings

# Baixando e configurando a chave GPG oficial do Docker
echo "Baixando a chave GPG oficial do Docker..."
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Adicionando o repositório oficial do Docker
echo "Adicionando o repositório oficial do Docker..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Atualizando os índices do repositório
echo "Atualizando os índices do repositório..."
sudo apt-get update

#!bin/bash

# Script simples para instalação do Docker.
# Por Gabriel Paiva.

echo "Instalando os pacotes do Docker..."
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "Verificando a instalação do Docker..."
sudo docker run hello-world

echo "Instalando o Docker Compose..."
sudo apt install -y docker-compose

echo "Adicionando o grupo docker e permitindo o uso sem sudo para todos os usuários..."
sudo groupadd docker
sudo usermod -aG docker $USER

echo "Para usar o Docker sem sudo, é necessário sair e entrar novamente na sessão ou reiniciar o computador."

echo "Instalação concluída!"
