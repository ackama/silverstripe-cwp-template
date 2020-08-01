# Extend from current stable php apache
FROM php:7.3-apache

# Extra Repositories
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -

ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# OS packages
RUN apt-get -y update; \
    apt-get -y upgrade;\
    apt-get install -f -y --no-install-recommends \
        apt-utils\
        ssl-cert \
        mariadb-client \
        zlib1g-dev \
        libicu-dev \
        libpng-dev \
        libjpeg-dev \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libwebp-dev \
        locales \
        gcc \
        g++ \
        gnupg \
        build-essential \
        zip \
        unzip \
        curl \
        git \
        ssh \
        jq \
        nano \
        vim \
        apt-utils \
        net-tools \
        iputils-ping \
        iproute2 \
        nodejs

RUN \
    # Installs SSPAK for SilverStripe
    # https://github.com/silverstripe/sspak
    curl -sS https://silverstripe.github.io/sspak/install | php -- /usr/local/bin; \
    # Composer binary
    curl -sS https://getcomposer.org/installer | php -- --filename=composer --install-dir=/usr/local/bin; \
    # Makes binaries specified by composer accessible to bash
    echo 'PATH=$PATH:/var/www/vendor/bin' >> /etc/bash.bashrc;

RUN \
    # Changes user id of www-data to 1000 for permissions and shares
    # compatibility with other machines
    usermod -u 1000 www-data; \
    groupmod -g 1000 www-data; \
    # Removes files we won't use from /var/www
    rm -rvf /var/www/*; \
    # Gives ownership of /var/solr to www-data to allow index creation
    mkdir /var/solr && chown -R www-data:www-data /var/solr; \
    mkdir /var/www/.npm && chown -R www-data:www-data /var/www/.npm; \
    mkdir -p /var/www/.composer/cache && chown -R www-data:www-data /var/www/.composer

# Installs PHP Extensions
RUN docker-php-ext-configure intl; \
    docker-php-ext-configure gd --with-png-dir=/usr/lib --with-jpeg-dir=/usr/lib --with-webp-dir=/usr/lib --with-freetype-dir=/usr/lib; \
    docker-php-ext-install -j$(nproc) intl \
        pdo_mysql \
        mysqli \
        gd \
        bcmath; \
    pecl install xdebug; \
    docker-php-ext-enable xdebug;

# Update npm and yarn
RUN npm install -g npm yarn

# Remove trash
RUN apt-get clean; \
    apt-get autoclean; \
    rm -r /var/lib/apt/lists/*

# PHP Configuration
COPY ["./docker/conf/php/php.ini", "/usr/local/etc/php/php.ini"]
COPY ["./docker/conf/php/docker-php-ext*", "/usr/local/etc/php/conf.d/"]

# Apache Configuration
COPY ["./docker/conf/apache2/docker.conf", "/etc/apache2/sites-enabled/000-default.conf"]
RUN \
    # Generates default SSL certificates
    make-ssl-cert generate-default-snakeoil; \
    # Generates SSL certificates for localhost
    cat /etc/ssl/openssl.cnf > /tmp/SSL_SAN_config; \
    printf "[SAN]\nsubjectAltName=DNS:localhost" >> /tmp/SSL_SAN_config; \
    openssl \
        req -newkey rsa:2048 -x509 -nodes \
        -keyout /etc/ssl/private/localhost.key \
        -new \
        -out /etc/ssl/certs/localhost.cert \
        -subj /CN=localhost \
        -reqexts SAN \
        -extensions SAN \
        -config /tmp/SSL_SAN_config \
        -sha256 -days 365; \
    # Adds both runtime users to the ssl-cert group
    usermod --append --groups ssl-cert root; \
    usermod --append --groups ssl-cert www-data;\
    # Enables apache modules
    a2enmod headers rewrite ssl

ENTRYPOINT ["docker-php-entrypoint"]

WORKDIR /var/www

EXPOSE 80
CMD ["apache2-foreground"]
