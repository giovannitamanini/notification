# Micro serviço Notification

## Requisitos:

Micro serviço Payment. Disponível em: 
https://github.com/giovannitamanini/payment

Insomnia ou Postman

Node

TypeScript

NestJS

## Instruções para execução do projeto

Primeiramente faça um clone do repositório:

```git clone git@github.com:giovannitamanini/notification.git```

Na raiz do projeto baixe as dependências com:

```npm install```

Crie um arquivo .env com a variável de a variável necessária para conexão com o banco de dados: 

```DATABASE_URL="postgresql://postgres:root@localhost:5432/notification?schema=public"```

Ainda na raiz do projeto, utilize o comando para utilizar o ORM e migrar as entidades para o banco de dados:

```npx prisma migrate dev --name init```

Inicie o micro serviço com:

```npm run start:dev```

Com o Insomnia ou Postman execute requisições HTTP POST para endpoint:

```localhost:3000/credit-card/send```

Lembrando que a requisição depende de um body do tipo:

{
	"idUser": "10",
	"orderNumber": 100000,
	"orderValue": 250.00
} 

Abra o PgAdmin ou outro serviço/software de gerenciamento para banco de dados como o DBeaver, com as variáveis de conexão do PostgreSQL especificadas no projeto. Verifique se houve a persistência dos dados.

Abra a Url do RabbitMQ, e utilize as credencias de acesso especificadas anteriormente:

```http://localhost:15672/```

Faça novas requisições e observe se houve a consistência do serviço de mensageria com o respectivo consumo da fila de mensagens.