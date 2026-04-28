# Caída del VPS - 27/04/2026

## Resumen

El VPS 194.163.161.99 se reinició o quedó inaccesible. La causa raíz fue el **OOM Killer** (Out of Memory) que mató procesos por falta de memoria.

---

## Causas Identificadas

### 1. OOM Kill - Proceso Node (26/04 05:25)

```
Out of memory: Killed process 196071 (node) total-vm:28742328kB, anon-rss:6238204kB
```

- Un proceso node consumió **28GB de memoria virtual / 6GB RSS**
- Fue matado por el OOM killer
- Esto sugiere que outreach-api o outreach-daemon tuvo un leak o peak de memoria

### 2. OOM Kill - Python3 (27/04 20:37)

```
Out of memory: Killed process 307388 (python3) total-vm:8264560kB, anon-rss:7197056kB
```

- Proceso python3 consumió **8GB de memoria / 7.2GB RSS**
- UID 0 (root)
- Puede ser parte de wolfim-cron-alerts o algún script python

### 3. Script de inicio perdido

- `/tmp/start_api.sh` fue borrado en el reinicio
- outreach-api no podía levantar → 820+ restart loops

### 4. Ataques SSH Bruteforce

Múltiples IPs intentando acceder por SSH con usuarios inventados:

| IP | Usuario intentado |
|---|---|
| 2.57.121.112 | admin |
| 186.96.145.241 | ftp |
| 157.66.144.16 | root |
| 193.24.211.95 | tester |
| 176.241.21.126 | inspur |

---

## Estado del VPS

### Memoria
- Total: 8GB RAM
- Swap: 2GB
- Tras aplicar fixes: ~7GB disponible

### Servicios Corriendo
- Docker (wolfim-api, wolfim-cron-alerts, wolfim-alerts, wolfim-crawler, wolfim-agent)
- Nginx (puertos 80, 443, 3443)
- PM2 (outreach-daemon, outreach-api, wolfim-alerts, wolfim-cron-alerts)
- SSH
- Cron
- Fail2ban (recién instalado)

### Ports en uso
| Puerto | Servicio |
|---|---|
| 22 | SSH |
| 80/443 | Nginx |
| 3000 | outreach-api (node) |
| 3443 | Nginx (algo más) |
| 4011 | wolfim-api-docker |
| 4002 | wolfim-crawler-docker |
| 5003 | wolfim-alerts-docker |

---

## Fixes Aplicados

### 1. Swap
Ya existía swap de 2GB activo — no se tocó.

### 2. Límites de memoria PM2

```bash
pm2 start outreach-daemon --max-memory-restart 300M
pm2 start wolfim-alerts --max-memory-restart 200M
pm2 start wolfim-cron-alerts --max-memory-restart 200M
```

### 3. Swappiness bajo

```bash
echo 10 > /proc/sys/vm/swappiness
echo 'vm.swappiness=10' >> /etc/sysctl.conf
```

Esto hace que el kernel use swap ANTES de matar procesos.

### 4. Fail2ban instalado

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban
```

Banea IPs que intenten brute-force en SSH.

### 5. Script de outreach-api

Creado en `/root/start_api.sh` con las variables de entorno necesarias:

```bash
#!/bin/bash
export SUPABASE_URL=https://mrrieeeilameejhvbccu.supabase.co
export SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
export API_SECRET=30038fa230438403eeb24caa3c2670d1f62eeb36fcc80f7da4eca6b2c9d45
export PORT=3000
cd /home/hermes/workspace/projects/outreach-connect/apps/api && exec node dist/apps/api/src/index.js
```

---

## Recomendaciones a Futuro

1. **Monitor de memoria**: Agregar alertas cuando RAM > 80%
2. **OOM score adj**: Bajar el oom_score_adj de PM2 para que el kernel mate PM2 antes que otros procesos
3. **Limitar Docker memory**: Asignar memory limits a los containers docker
4. **SSH key-only**: Deshabilitar password authentication en SSH
5. **定期 reboot**: Reiniciar semanalmente para limpiar leaks de memoria

---

## Comandos Útiles de Debug

```bash
# Ver consumo de memoria
free -m

# Ver procesos que más memoria usan
ps aux --sort=-%mem | head -15

# Ver logs de OOM
grep -i 'oom' /var/log/syslog | tail -20

# Ver estado PM2
pm2 list

# Ver logs de un proceso
pm2 logs outreach-api --lines 50

# Ver estado fail2ban
systemctl status fail2ban
fail2ban-client status sshd
```
