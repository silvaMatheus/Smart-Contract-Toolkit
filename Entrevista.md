Desenvolva uma página web utilizando React e a biblioteca Web3.js ou EthersJS que cumpra os seguintes requisitos:

- **Conexão de Carteira:** Permita que o usuário conecte uma carteira Web3 EVM compatível, como Metamask ou Coinbase Wallet, utilizando uma abordagem de design modular para facilitar a adição de novos provedores de carteira no futuro.

- **Carregamento do ABI:** Forneça a funcionalidade para que o usuário carregue um arquivo JSON ABI de um contrato inteligente e insira o endereço do contrato. Inclua validação adequada para garantir que o arquivo e o endereço do contrato sejam válidos.

- **Interatividade do Contrato:** Uma vez carregados o ABI e o endereço, a página deve apresentar dinamicamente as funções do contrato, distinguindo entre funções de escrita (que requerem uma transação blockchain) e funções de consulta (que apenas leem dados do contrato).

- **Manipulação de Funções:** Para cada função do contrato, forneça uma interface que permita ao usuário inserir os argumentos necessários e execute as chamadas correspondentes. Certifique-se de que a interface possa se adaptar a funções com qualquer número de argumentos e tipos de retorno.

- **Feedback ao Usuário:** Implemente feedback visual claro para o usuário durante e após as operações de escrita e consulta, incluindo mas não limitado a animações de carregamento, mensagens de sucesso ou erro, e confirmações de transação.

- **Design e Usabilidade:** Baseie-se nos designs fornecidos para construir a interface, e considere a usabilidade e acessibilidade ao desenvolver a aplicação. A aplicação deve ser responsiva e funcionar em diferentes tamanhos de tela.

- **Segurança e Error Handling:** Implemente tratamento de erros robusto e estratégias de segurança para a interação com a carteira e o contrato. Inclua validação de entrada do usuário e tratamento de exceções durante as operações de contrato.

Por favor, organize seu código de maneira lógica e modular, e inclua comentários claros quando necessário. A qualidade do código, a aderência às melhores práticas e a atenção aos detalhes serão avaliadas.


Para testes, pode se utilizar do ERC20.sol, contrato 0xdac17f958d2ee523a2206206994597c13d831ec7 e rede Ethereum.
