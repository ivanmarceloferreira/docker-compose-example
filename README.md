
## Rodando localmente

Pré-requisito: ter o Docker e o docker compose instalados

Clone o projeto

```bash
  git clone https://github.com/ivanmarceloferreira/docker-compose-example
```

Entre no diretório do projeto

```bash
  cd docker-compose-example
```

Inicie o docker compose

```bash
  docker compose up -d
```

Extraia o IP vinculado ao container nginx

```bash
  docker inspect -f 'http://{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nginx-container
```

Acesse o IP retornado no comando anterior :)

