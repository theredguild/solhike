
## !intro ERC20.sol
Este es un ejemplo de un contrato ERC20 (`ERC20.sol`) utilizando el framework HardHat. A lo largo de este tutorial, construiremos este contrato paso a paso, explicando cada componente clave.

## !!steps Declaración del contrato
Primero, declaramos nuestro contrato utilizando la palabra reservada `contract`. Este es el bloque base de cualquier contrato en Solidity. En este caso, el contrato implementa la interfaz estándar de ERC20.

```solidity ! ERC20.sol
contract MyToken {

}
```

## !!steps Licencia SPDX
Antes de comenzar con el contrato, es buena práctica agregar un comentario con el identificador de licencia `SPDX`, lo cual es obligatorio en Solidity para especificar la licencia del código fuente.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED

contract MyToken {

}
```

## !!steps Versión de Solidity
Para que el compilador sepa qué versión de Solidity utilizar, debemos especificar la versión del compilador con la declaración `pragma solidity`. En este caso, permitimos cualquier versión igual o superior a `0.8.24`, pero inferior a `0.9.0`.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract MyToken {

}
```

## !!steps Herencia de ERC20
En este paso, hacemos que nuestro contrato herede de `ERC20`, que es la implementación estándar del token ERC20. Esto nos permitirá utilizar todas las funciones y propiedades estándar de un token ERC20.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {

}
```

## !!steps Constructor del contrato
Añadimos un `constructor`, que es una función especial que se ejecuta solo una vez cuando se despliega el contrato. Aquí, inicializamos el nombre y el símbolo del token, y realizamos la asignación inicial de tokens al `msg.sender`, que es la cuenta que despliega el contrato.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

## !!steps Función mint
La función `_mint` es una función interna utilizada para crear nuevas unidades del token. Aquí, se está utilizando en el constructor para asignar una cantidad inicial de tokens al desplegador del contrato.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        // Crear y asignar tokens iniciales al desplegador del contrato
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

## !!steps Restricción de mint
Añadimos una restricción para que la función de minting sólo pueda ser llamada por el propietario del contrato. Esto asegura que no cualquier usuario pueda crear más tokens arbitrariamente.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") {
        // Crear y asignar tokens iniciales al desplegador del contrato
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

## !!steps Transferencia de tokens
El contrato ya tiene implementada la funcionalidad de transferencia de tokens porque hereda de `ERC20`. Aquí, los usuarios pueden transferir tokens entre cuentas usando la función `transfer`.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Funcionalidad de transferencia de tokens ya incluida desde ERC20
}
```

## !!steps Pausar el contrato
Añadimos la capacidad de pausar las funciones del contrato en caso de emergencia, utilizando el contrato `Pausable` de OpenZeppelin.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract MyToken is ERC20, Ownable, Pausable {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Anulación de funciones de transferencia para incluir la pausa
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
```

## !outro ERC20.sol
Hemos completado el contrato `ERC20.sol`. Este contrato es un ejemplo sencillo pero efectivo de cómo implementar un token ERC20 siguiendo el estándar más utilizado en Ethereum. Hemos cubierto las partes fundamentales, desde la inicialización del token hasta la implementación de funciones adicionales como `mint`, `pause` y `transfer`. Este ejemplo proporciona una base sólida para construir funcionalidades más avanzadas en contratos de tokens.
