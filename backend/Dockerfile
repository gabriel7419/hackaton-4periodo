# Dockerfile para Apache com PHP 8.2
FROM php:8.2-apache

# Instala dependências e extensões
RUN apt-get update && apt-get install -y \
    apt-utils \
    zip \
    unzip \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

RUN apt-get update && apt-get install -y default-mysql-client

# Instala o Composer
RUN apt-get update && apt-get install -y curl \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Configura o diretório de trabalho
WORKDIR /var/www

# Copia os arquivos do projeto
COPY . /var/www

# Executa o script para migrate e outros comandos

# Instala as dependências do Laravel
RUN composer install --optimize-autoloader --no-dev

# Define permissões
RUN chown -R www-data:www-data /var/www

# Executa o script para migrate e outros comandos
copy ./run.sh /tmp
ENTRYPOINT ["/tmp/run.sh"]
