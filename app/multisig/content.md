
## !intro MultisigWallet.sol
Este contrato Multisig Wallet (`MultisigWallet.sol`) permite a múltiples propietarios aprobar y ejecutar transacciones. La seguridad se incrementa al requerir un número mínimo de confirmaciones antes de ejecutar una transacción.

## !!steps Declaración del contrato
Definimos el contrato `MultisigWallet` y las variables de estado `owners` y `requiredConfirmations`, que almacenan las direcciones de los propietarios y el número mínimo de confirmaciones requeridas para ejecutar transacciones.

```solidity ! MultisigWallet.sol
contract MultisigWallet {
    address[] public owners;
    uint public requiredConfirmations;

    constructor(address[] memory _owners, uint _confirmations) {
        owners = _owners;
        requiredConfirmations = _confirmations;
    }
}
```

## !!steps Estructura de transacciones
Definimos la estructura `Transaction`, que representa una transacción propuesta. Incluye la dirección de destino, el valor de la transacción, los datos (si los hay), y si la transacción ha sido ejecutada o no.

```solidity ! MultisigWallet.sol
contract MultisigWallet {
    address[] public owners;
    uint public requiredConfirmations;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }

    Transaction[] public transactions;

    constructor(address[] memory _owners, uint _confirmations) {
        owners = _owners;
        requiredConfirmations = _confirmations;
    }
}
```

## !!steps Envío de transacciones
Añadimos la función `submitTransaction`, que permite a un propietario proponer una nueva transacción. La transacción se añade al array `transactions`.

```solidity ! MultisigWallet.sol
contract MultisigWallet {
    address[] public owners;
    uint public requiredConfirmations;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }

    Transaction[] public transactions;

    constructor(address[] memory _owners, uint _confirmations) {
        owners = _owners;
        requiredConfirmations = _confirmations;
    }

    function submitTransaction(address _to, uint _value, bytes memory _data) public {
        transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false,
            numConfirmations: 0
        }));
    }
}
```

## !!steps Confirmación de transacciones
Añadimos la función `confirmTransaction`, que permite a los propietarios confirmar una transacción. Una transacción necesita un número mínimo de confirmaciones antes de poder ser ejecutada.

```solidity ! MultisigWallet.sol
contract MultisigWallet {
    address[] public owners;
    uint public requiredConfirmations;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }

    Transaction[] public transactions;
    mapping(uint => mapping(address => bool)) public confirmations;

    constructor(address[] memory _owners, uint _confirmations) {
        owners = _owners;
        requiredConfirmations = _confirmations;
    }

    function submitTransaction(address _to, uint _value, bytes memory _data) public {
        transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false,
            numConfirmations: 0
        }));
    }

    function confirmTransaction(uint _txIndex) public {
        Transaction storage transaction = transactions[_txIndex];
        require(!transaction.executed, "Transaction already executed");

        confirmations[_txIndex][msg.sender] = true;
        transaction.numConfirmations += 1;
    }
}
```

## !!steps Ejecución de transacciones
Añadimos la función `executeTransaction`, que permite ejecutar una transacción una vez que ha recibido el número necesario de confirmaciones. Esta función transfiere los fondos y ejecuta los datos de la transacción.

```solidity ! MultisigWallet.sol
contract MultisigWallet {
    address[] public owners;
    uint public requiredConfirmations;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }

    Transaction[] public transactions;
    mapping(uint => mapping(address => bool)) public confirmations;

    constructor(address[] memory _owners, uint _confirmations) {
        owners = _owners;
        requiredConfirmations = _confirmations;
    }

    function submitTransaction(address _to, uint _value, bytes memory _data) public {
        transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false,
            numConfirmations: 0
        }));
    }

    function confirmTransaction(uint _txIndex) public {
        Transaction storage transaction = transactions[_txIndex];
        require(!transaction.executed, "Transaction already executed");

        confirmations[_txIndex][msg.sender] = true;
        transaction.numConfirmations += 1;
    }

    function executeTransaction(uint _txIndex) public {
        Transaction storage transaction = transactions[_txIndex];
        require(transaction.numConfirmations >= requiredConfirmations, "Cannot execute tx");

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
        require(success, "Transaction failed");
    }
}
```

## !!steps Revocación de confirmaciones
Añadimos la función `revokeConfirmation`, que permite a un propietario revocar su confirmación antes de que la transacción sea ejecutada. Esto aumenta la flexibilidad del sistema y permite correcciones en caso de errores.

```solidity ! MultisigWallet.sol
contract MultisigWallet {
    address[] public owners;
    uint public requiredConfirmations;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }

    Transaction[] public transactions;
    mapping(uint => mapping(address => bool)) public confirmations;

    constructor(address[] memory _owners, uint _confirmations) {
        owners = _owners;
        requiredConfirmations = _confirmations;
    }

    function submitTransaction(address _to, uint _value, bytes memory _data) public {
        transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false,
            numConfirmations: 0
        }));
    }

    function confirmTransaction(uint _txIndex) public {
        Transaction storage transaction = transactions[_txIndex];
        require(!transaction.executed, "Transaction already executed");

        confirmations[_txIndex][msg.sender] = true;
        transaction.numConfirmations += 1;
    }

    function revokeConfirmation(uint _txIndex) public {
        Transaction storage transaction = transactions[_txIndex];
        require(!transaction.executed, "Transaction already executed");
        require(confirmations[_txIndex][msg.sender], "Transaction not confirmed");

        confirmations[_txIndex][msg.sender] = false;
        transaction.numConfirmations -= 1;
    }

    function executeTransaction(uint _txIndex) public {
        Transaction storage transaction = transactions[_txIndex];
        require(transaction.numConfirmations >= requiredConfirmations, "Cannot execute tx");

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
        require(success, "Transaction failed");
    }
}
```

## !outro MultisigWallet.sol
El contrato `MultisigWallet.sol` permite la gestión segura de fondos a través de múltiples firmas, proporcionando un mayor control y seguridad en la ejecución de transacciones. La revocación de confirmaciones y la ejecución de transacciones solo después de un consenso aseguran la integridad y confianza en el proceso.