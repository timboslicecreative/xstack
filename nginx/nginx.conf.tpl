user nginx;
worker_processes 1;
pid /var/run/nginx.pid;

events {
        worker_connections 1024;
        # multi_accept on;
}

http {
        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;
        server_tokens off;
        port_in_redirect on;

        server_names_hash_bucket_size 128;
        server_name_in_redirect off;

        client_max_body_size 60m;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        send_timeout 300;
        client_body_timeout   300;
        client_header_timeout 300;

        # Log access as ENV Variable
        access_log $ACCESS_LOG_OUTPUT;

        # Log access as ENV Variable
        error_log $ERROR_LOG_OUTPUT;

        gzip on;
        gzip_disable "msie6";
        gzip_vary on;
        gzip_proxied any;
        gzip_comp_level 6;
        gzip_buffers 16 8k;
        gzip_http_version 1.1;
        gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;

        upstream thumbor {
            server $HOST_NAME:$HOST_PORT;
        }

        server {
                listen 80 default;
                server_name localhost;

                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Allow-Credentials' 'true';
                add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
                add_header 'Access-Control-Allow-Headers' 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Mx-ReqToken,X-Requested-With';

                if ($request_method = 'OPTIONS') {
                    return 204;
                }

                location = /favicon.ico {
                  return 404;
                  access_log     off;
                  log_not_found  off;
                }

                location ~* "^/(..)(..)(.+)?$" {
                    root        /data/result_storage/v2/$1/$2;
                    expires     1M;
                    error_page  404 = @fetch;
                }

                location @fetch {
                    internal;
                    proxy_pass http://thumbor$request_uri;
                }

                location ~ /\.ht { deny  all; }
                location ~ /\.hg { deny  all; }
                location ~ /\.svn { deny  all; }
        }
}