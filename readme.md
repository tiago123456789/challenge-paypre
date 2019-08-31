Detalhes:
==========

- Importar arquivo CHALLENGE-PAY-PREV.postman_collection.json no postman para testar. O arquivo se encontra na raiz do projeto.

- Nas routes do postman, após fazer a instrução acima, deve substituir **localhost:3000** por **http://ec2-18-229-126-101.sa-east-1.compute.amazonaws.com:3000** para testar aplicação.

- Para executar os testes execute os seguintes passos:
   - Clone o projeto
   - Mude as informação do arquivo **.env-test**
   - Depois execute o comando: 
    ```
        npm run test
    ```

- Observação: Verificar **role** do usuário cadastrado, pois baseado nas definir do teste.
Exemplo: Usuário role(ADMIN) só pode fazer o que foi descrito no teste, é o mesmo vale para usuário com role(COMUM).