FROM php:8.2-apache

USER root

WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy all files from the host's current directory to the container's /var/www/html directory
COPY . /var/www/html

# Set an environment variable to allow Composer to run as superuser
ENV COMPOSER_ALLOW_SUPERUSER=1

# Run Composer to install project dependencies, ignoring platform requirements
RUN composer install --ignore-platform-reqs

# Change ownership of certain directories to the www-data user (Apache)
RUN chown -R www-data:www-data /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache

# Enable the Apache rewrite module and update Apache's default site configuration
RUN a2enmod rewrite && \
    sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install Node.js dependencies and compile assets
RUN npm install && npm run build

# Expose port 80 for incoming HTTP traffic
EXPOSE 80

# Start the Apache web server in the foreground
CMD ["apache2-foreground"]