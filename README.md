# Atividade com Kafka, Node.js e MongoDB
### Descrição
Aplicação encapsulada em Docker que gera um ambiente com uma aplicação contendo um serviço em Node.js conectado ao Kafka que faz o papel de Producer, recebendo objetos no formato JSON através de requisições POST por uma rota do Express.js e enviando ao Topic do Kafka. Em paralelo, outro serviço em Node.js faz o papel de Consumer lendo as mensagens do tópico e salvando em uma Collection do MongoDB.
### Subindo os containers
Na raiz do projeto, com o Docker instalado, execute em linha de comando: <br>
```Shell
docker-compose up
```
### Enviando mensagens
Para enviar mensagens ao tópico do Kafka, faça uma requisição POST para a rota `http://localhost:3000/send/` passando a mensagem em formato JSON no *body* da requisição.
### Visualizando as mensagens
As mensagem enviadas pelo Producer ao tópico do Kafka, são consumidas e salvas em uma Collection do MongoDB. Para visualizar a Collection, acesse no navegador **http://localhost:8081/db/testecv/data_testecv**.
