## Execução em ambiente de desenvolvimento Django/Python

Executar para verificar se o Python está instalado:
### py --version

Caso esteja instalado executar 

#### pip install -r requirements.txt
#### python manage.py migrate --run-syncdb 
#### py manage.py makemigrations --dry-run --verbosity 3
#### py manage.py runserver
#### py manage.py createsuperuser 
#### pip install coverage

Para debug, é necessário iniciar o programa em modo depuração. Via VSCODE pode 
ser utilizado dentro da pasta principal do projeto em .vscode, um arquivo 
launch.json semelhante ao abaixo, e executar o debug pela aplicação ou via F5

```
{   
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: Arquivo Atual",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/manage.py",
            "args": [ "runserver", ],
            "django": true
        }
    ]
}
```
Há uma camada de autenticação no projeto, e é possível desabilita-la
fazendo uma pequena alteração no `manage.py` alterando a linha
#### os.environ.setdefault('AUTH_FULL', 'TRUE')
para 
#### os.environ.setdefault('AUTH_FULL', 'FALSE')
Somente deve ser utilizado para fins de facilitação de testes da API,
via postman, curl, etc.

Caso seja rodada a aplicação com o `AUTH_FULL` para `TRUE`, ao chamar qualquer
end-point a mensagem apresentada será

### "detail": "Authentication credentials were not provided."

A camada de autenticação utilizada foi a oauth2_provider, 
da biblioteca [https://pypi.org/project/django-oauth-toolkit/]
Onde ao fazer login é gerado um token, e toda requisição para o backend,
com exceção do login é verificado se o token é válido.

## Execução em ambiente produtivo Django/Python

Executar o comando com a instância do python instalada na máquina/servidor, 
utilizando  o manage.py  para inicializar a aplicação

#### py manage.py runserver

## Execução em ambiente de desenvolvimento React/Front-END

Verificar se o `npm` está instalado na máquina

#### npm -v

Verificando que está instalado executar

#### npm install
#### npm start

## Execução em ambiente de produção React/Front-END

Após todas as dependências instaladas e certificando-se que o 
npm do build deu sucesso executar:

#### npm run build

O projeto será colocado na porta :3000 inicialmente

#
- Describe how you would structure the database to account for 
  - Real estate agency registration data
  - Company registration data
  - Contact registration data
  - Describe what needs to be changed on the API you implemented
#
:Seria feito de forma semelhante ao feito na categoria, só que seria
um cadastro provavelmente mais utilizado, sendo necessário um CRUD
para todas as inserções

### Arquivo Postman com todas as API's disponíveis.

O arquivo `Refera.postman_collection.json` pode ser baixado e aberto com 
o Postman, ou algum programa semelhante, onde se encontra coleção com todas
as API's disponíveis, e que são em grande partes consumidas pelo front end
