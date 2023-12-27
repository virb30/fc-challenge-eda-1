# Desafio Full Cycle - Event-drive Architecture

## Como executar

1. inicializar os containeres - os serviços iniciarão automaticamente
1. acionar os endpoints desejados (ambos estão na pasta api dos seus respectivos diretórios `balances e walletcore`)

```console
docker compose up -d # se estiver usando o plugin do compose para docker
# OU
docker-compose up -d # se estiver usando o docker-compose nativo
```

OBS: os ids das contas que são geradas na inicialização já estão salvos nos arquivos `.http`