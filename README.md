# FakeStore

## Estrutura do projeto
src/ <br /><br />       
├── components/             # Componentes Vue <br />
│   ├── CartDetails.vue     # <br />
│   ├── Carts.vue           # precisa ser avaliado <br />
│   ├── Login.vue           # precisa corrigir a autentificação e criação de seção <br />
│   ├── Overview.vue        # <br /> 
│   ├── ProductDetails.vue  # completo(falta implementar o botão carrinho) <br /> 
│   ├── Products.vue        # completo separados por categorias <br />       
│   ├── Signup.vue          # falta configuração de token <br />     
│   ├── Users.vue           # falta capitura de token da seção <br />      
│   └── Dashboard.vue       # não criado ainda <br /><br />  
├── img                     # <br />
│   └── logo.png            # <br /><br />
├── router/                 # Configuração do Vue Router <br />
│   └── index.router.js     # <br /><br />
├── services/               # Serviços para comunicação com a API <br />
│   ├── autent.js           # corrigir altentificação <br />
│   ├── carService.js       # <br />
│   ├── productService.js   # <br />
│   └── userService.js      # <br /><br />
├── store/                  # Configuração do Vuex <br />
│   ├── modules/            # Módulos Vuex <br />
│   │   └── auth.js         # <br />    
│   └── index.js            # Configuração principal do Vuex <br /><br />
├── utils/                  # Funções utilitárias <br />
│   ├── errorHandler.js     # <br />
│   └── validation.js       # <br /><br />
├── App.vue                 # Componente raiz <br />
└── index.html              # <br />




## Rotas da Aplicação
### Rotas Públicas
**/login:** Página de login
.
**/signup:** Página de registro de novos usuários.

Rotas Privadas
**/dashboard:** Página inicial do painel (apenas autenticados).

**/users:** Gerenciamento de usuários (apenas autenticados).

### API Utilizada

Este projeto utiliza a **Fake Store API.**

### Endpoints Principais
POST /auth/login: Autenticação de usuários.

POST /users: Registro de novos usuários.

GET /users: Listagem de todos os usuários.

Funcionalidades Futuras
Integração com autenticação social (Google, Facebook).
Paginação na lista de usuários.
Atualização de informações dos usuários.

## conclusão 
acho que vale um 5 pela insistencia