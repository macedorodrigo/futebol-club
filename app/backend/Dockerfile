FROM node:16.14-alpine
# Usar a imagem node:16.14-alpine como base

WORKDIR /app-backend
# Mudar para o diretório de trabalho /app-backend

COPY package*.json ./
COPY packages.npm ./
# Copiar os package.json, package-lock.json e packages.npm para o container

RUN npm install
# Instalar as dependências Node

COPY . .
# Copiar o restante dos arquivos da aplicação para o container

EXPOSE 3001
# Sinalize que aplicação expõe a porta 3001

ENTRYPOINT [ "npm" ]
# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas

CMD [ "start" ]
# Dica: Leia a seção Docker e Docker-compose no README para mais informações
