#!/bin/bash
set -e

echo "Starting container..."

# Check if required environment variables are set
if [ -z "${run_id}" ]; then
    echo "Error: 'run_id' environment variable is not set"
    exit 1
fi

if [ -z "${code_server_password}" ]; then
    echo "Error: 'code_server_password' environment variable is not set"
    exit 1
fi

if [ -z "${preview_endpoint}" ]; then
    echo "Error: 'preview_endpoint' environment variable is not set"
    exit 1
fi

if [ -z "${base_url}" ]; then
    echo "Error: 'base_url' environment variable is not set"
    exit 1
fi

if [ -z "${monitor_polling_interval}" ]; then
    echo "Error: 'monitor_polling_interval' environment variable is not set"
    exit 1
fi

# Update frontend environment variables if frontend directory exists
if [ -d "/app/frontend" ]; then
    echo "WDS_SOCKET_PORT=443" > /app/frontend/.env
    echo "REACT_APP_BACKEND_URL=${preview_endpoint}" >> /app/frontend/.env
fi

# Directly set the password in the supervisor config file
sed -i "s|environment=PASSWORD=\".*\"|environment=PASSWORD=\"${code_server_password}\"|" /etc/supervisor/conf.d/supervisord_code_server.conf

nohup e1_monitor ${run_id} ${base_url} --interval ${monitor_polling_interval} > /var/log/monitor.log 2>&1 &

# Create log directory for supervisor
mkdir -p /var/log/supervisor

# Start supervisor
( sudo service supervisor start && sudo supervisorctl reread && sudo supervisorctl update ) &

while true; do
    uvicorn plugins.tools.agent.server:app --host "0.0.0.0" --port 8010 --workers 1 --no-access-log
    echo "Uvicorn exited with $?, restarting in 3 seconds..."
    sleep 3
done

