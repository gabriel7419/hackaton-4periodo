#!bin/sh

cd /app
php artisan migrate:fresh --seed
php artisan serve --host=0.0.0.0 --port=$APP_PORT
echo "Servidor rodando em http://0.0.0.0:$APP_PORT"
