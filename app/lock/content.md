
## !intro Lock.sol
Este es un ejemplo de un contrato de bloqueo (`Lock.sol`) utilizando el framework HardHat. A lo largo de este tutorial, construiremos este contrato paso a paso, explicando cada componente clave.

## !!steps Declaración del contrato
Primero, declaramos nuestro contrato utilizando la palabra reservada `contract`. Este es el bloque base de cualquier contrato en Solidity.

```solidity ! Lock.sol
contract Lock {

}
```

## !!steps Licencia SPDX
Antes de comenzar con el contrato, es buena práctica agregar un comentario con el identificador de licencia `SPDX`, lo cual es obligatorio en Solidity para especificar la licencia del código fuente.

```solidity ! Lock.sol
// SPDX-License-Identifier: UNLICENSED

contract Lock {

}
```

## !!steps Versión de Solidity
Para que el compilador sepa qué versión de Solidity utilizar, debemos especificar la versión del compilador con la declaración `pragma solidity`. En este caso, permitimos cualquier versión igual o superior a `0.8.24`, pero inferior a `0.9.0`.

```solidity ! Lock.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Lock {

}
```

## !!steps Variables de estado
Añadimos una variable de estado llamada `unlockTime`. Las variables de estado son aquellas que se almacenan en la blockchain y persisten entre las llamadas de función. En este caso, `unlockTime` almacenará el tiempo específico en el cual se podrá desbloquear el contrato.

```solidity ! Lock.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Lock {
    uint public unlockTime;
}
```

## !!steps Constructor del contrato
Añadimos un `constructor`, que es una función especial que se ejecuta solo una vez cuando se despliega el contrato. Aquí, permitimos que se pase un parámetro `_unlockTime` para establecer el valor de `unlockTime` al momento de la creación del contrato.

```solidity ! Lock.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Lock {
    uint public unlockTime;

    constructor(uint _unlockTime) payable {
        unlockTime = _unlockTime;
    }
}
```

## !!steps Propietario del contrato
Añadimos una variable de estado llamada `owner` para almacenar la dirección del propietario del contrato. Asignamos esta dirección en el constructor, utilizando `msg.sender`, que es la dirección que despliega el contrato.

```solidity ! Lock.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Lock {
    uint public unlockTime;
    address payable public owner;

    constructor(uint _unlockTime) payable {
        unlockTime = _unlockTime;
        // Asignar el propietario del contrato al deployer
        owner = payable(msg.sender);
    }
}
```

## !!steps Función de retiro
Añadimos una función `withdraw()` que permitirá al propietario retirar los fondos del contrato. En esta etapa, la función no tiene restricciones adicionales.

```solidity ! Lock.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Lock {
    uint public unlockTime;
    address payable public owner;

    constructor(uint _unlockTime) payable {
        unlockTime = _unlockTime;
        // Asignar el propietario del contrato al deployer
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Transferir todo el saldo del contrato al propietario
        owner.transfer(address(this).balance);
    }
}
```

## !!steps Validación de unlockTime
Agregamos la primera validación en el constructor. Utilizamos `require` para asegurarnos de que el tiempo de desbloqueo esté en el futuro. Si esta condición no se cumple, la transacción se revertirá.

```solidity ! Lock.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Lock {
    uint public unlockTime;
    address payable public owner;

    constructor(uint _unlockTime) payable {
        // Validar que el tiempo de desbloqueo sea en el futuro
        require(block.timestamp < _unlockTime, "Unlock time should be in the future");

        unlockTime = _unlockTime;
        // Asignar el propietario del contrato al deployer
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Transferir todo el saldo del contrato al propietario
        owner.transfer(address(this).balance);
    }
}
```

## !!steps Evento de retiro
Añadimos un evento llamado `Withdrawal` para registrar información sobre cada retiro realizado desde el contrato. Emitimos este evento dentro de la función `withdraw()` para que los registros sean accesibles fuera del contrato.

```solidity ! Lock.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Lock {
    uint public unlockTime;
    address payable public owner;

    // Evento para registrar retiros
    event Withdrawal(uint amount, uint when); 

    constructor(uint _unlockTime) payable {
        // Validar que el tiempo de desbloqueo sea en el futuro 
        require(block.timestamp < _unlockTime, "Unlock time should be in the future");

        unlockTime = _unlockTime;
        // Asignar el propietario del contrato al deployer
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Transferir todo el saldo del contrato al propietario
        owner.transfer(address(this).balance);
        // Emitir el evento de retiro
        emit Withdrawal(address(this).balance, block.timestamp);
    }
}
```

## !!steps Restricción de tiempo en retiro
Añadimos otra validación en la función `withdraw()`. Utilizamos `require` para asegurarnos de que los fondos solo se puedan retirar después de que se haya alcanzado `unlockTime`.

```solidity ! Lock.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        // Validar que el tiempo de desbloqueo sea en el futuro
        require(block.timestamp < _unlockTime, "Unlock time should be in the future");

        unlockTime = _unlockTime;
        // Asignar el propietario del contrato al deployer
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Asegurando que el tiempo actual sea mayor o igual a unlockTime
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        
        // Transferir todo el saldo del contrato al propietario
        owner.transfer(address(this).balance);
        // Emitir el evento de retiro
        emit Withdrawal(address(this).balance, block.timestamp);
    }
}
```

## !!steps Restricción de propietario en retiro
Finalmente, añadimos una validación adicional para asegurarnos de que solo el propietario del contrato pueda realizar el retiro.

```solidity ! Lock.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Lock {
    uint public unlockTime;
    address payable public owner;

    // Evento para registrar retiros
    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        // Validar que el tiempo de desbloqueo sea en el futuro
        require(block.timestamp < _unlockTime, "Unlock time should be in the future");

        unlockTime = _unlockTime;
        // Asignar el propietario del contrato al deployer
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Validar que el tiempo actual sea mayor o igual a unlockTime
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        // Validar que solo el propietario pueda retirar los fondos
        require(msg.sender == owner, "You aren't the owner");

        owner.transfer(address(this).balance);
        emit Withdrawal(address(this).balance, block.timestamp);
    }
}
```

## !outro Lock.sol
Hemos completado el contrato `Lock.sol`. Este contrato es un ejemplo sencillo pero efectivo de cómo bloquear fondos en un contrato inteligente hasta un tiempo específico. Hemos cubierto las partes fundamentales de un contrato en Solidity, desde la declaración de variables y constructores hasta la implementación de funciones y eventos. Este ejemplo es una buena base para entender conceptos más avanzados en el desarrollo de contratos inteligentes.
