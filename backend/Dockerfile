FROM php:8.2-apache

# Instalar extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip && \
    docker-php-ext-install pdo_mysql zip

# Ativar mod_rewrite do Apache
RUN a2enmod rewrite

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurações do Laravel
WORKDIR /var/www/html
COPY . /var/www/html
RUN composer install
RUN mv .env.example .env
RUN php artisan key:generate

# Permissões
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
