
## !intro ERC20.sol
Este es un ejemplo de un contrato ERC20 (`ERC20.sol`) utilizando el framework HardHat. A lo largo de
este tutorial, construiremos este contrato paso a paso, explicando cada componente clave.

## !!steps Declaración del contrato
Primero, declaramos nuestro contrato utilizando la palabra reservada `contract`. Este es el bloque
base de cualquier contrato en Solidity. En este caso, el contrato implementará la interfaz estándar
de ERC20.

```solidity ! ERC20.sol
contract MyToken {

}
```

## !!steps Licencia SPDX
Antes de comenzar con el contrato, es buena práctica agregar un comentario con el identificador de
licencia `SPDX`, lo cual es obligatorio en Solidity para especificar la licencia del código fuente.
Este comentario no afecta el código ejecutable, pero es necesario para la conformidad legal.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED

contract MyToken {

}
```

## !!steps Versión de Solidity
Para que el compilador sepa qué versión de Solidity utilizar, debemos especificar la versión del
compilador con la declaración `pragma solidity`. Esto asegura que el contrato se compile
correctamente solo con versiones compatibles del compilador.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract MyToken {

}
```

## !!steps Importar la implementación estándar de ERC20
Aquí importamos la implementación estándar de `ERC20` desde OpenZeppelin. Esto nos permite utilizar
todas las funciones y propiedades que conforman el estándar ERC20 en nuestro contrato, como
`transfer`, `balanceOf`, etc.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {

}
```

## !!steps Constructor del contrato
Añadimos un `constructor`, que es una función especial que se ejecuta solo una vez cuando se
despliega el contrato. Aquí, inicializamos el nombre y el símbolo del token utilizando el
constructor de `ERC20`, y realizamos la asignación inicial de tokens al `msg.sender`, que es la
cuenta que despliega el contrato.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        // Mint inicial de tokens al deployer del contrato
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

## !!steps Función de mint interna
La función `_mint` es una función interna utilizada para crear nuevas unidades del token. Aquí, se
está utilizando en el constructor para asignar una cantidad inicial de tokens al desplegador del
contrato. La cantidad de tokens se especifica en función del `decimals`, que es típicamente 18 para
un token ERC20.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        // Mint inicial de tokens al deployer del contrato
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

## !!steps Restricción de minting
Añadimos una función pública llamada `mint`, que permite crear nuevos tokens. Para evitar que
cualquier usuario cree tokens arbitrariamente, esta función está restringida al `owner` del
contrato, utilizando la biblioteca `Ownable` de OpenZeppelin.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") {
        // Mint inicial de tokens al deployer del contrato
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Función para minting adicional, restringida al owner
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

## !!steps Transferencia de tokens
El contrato ya tiene implementada la funcionalidad de transferencia de tokens porque hereda de
`ERC20`. Aquí, los usuarios pueden transferir tokens entre cuentas usando la función `transfer`, que
está disponible de manera predeterminada en el contrato ERC20.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") {
        // Mint inicial de tokens al deployer del contrato
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Función para minting adicional, restringida al owner
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // La funcionalidad de transferencia de tokens ya está implementada en ERC20
}
```

## !!steps Añadir capacidad de pausado
Añadimos la capacidad de pausar las funciones del contrato en caso de emergencia, utilizando el
contrato `Pausable` de OpenZeppelin. Esto nos permite detener las transferencias de tokens en
situaciones críticas.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract MyToken is ERC20, Ownable, Pausable {
    constructor() ERC20("MyToken", "MTK") {
        // Mint inicial de tokens al deployer del contrato
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Función para minting adicional, restringida al owner
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Función para pausar el contrato, restringida al owner
    function pause() public onlyOwner {
        _pause();
    }

    // Función para reanudar el contrato, restringida al owner
    function unpause() public onlyOwner {
        _unpause();
    }
}
```

## !!steps Modificar transferencias con capacidad de pausado
Modificamos la función interna `_beforeTokenTransfer` para incluir la verificación de que el
contrato no esté pausado antes de permitir transferencias de tokens. Esto se realiza anulando la
función de `ERC20` e incluyendo la verificación de `whenNotPaused`.

```solidity ! ERC20.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract MyToken is ERC20, Ownable, Pausable {
    constructor() ERC20("MyToken", "MTK") {
        // Mint inicial de tokens al deployer del contrato
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Función para minting adicional, restringida al owner
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Función para pausar el contrato, restringida al owner
    function pause() public onlyOwner {
        _pause();
    }

    // Función para reanudar el contrato, restringida al owner
    function unpause() public onlyOwner {
        _unpause();
    }

    // Modificación de transferencias para incluir verificación de pausa
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
Hemos completado el contrato `ERC20.sol`. Este contrato es un ejemplo detallado de cómo implementar
un token ERC20 siguiendo el estándar más utilizado en Ethereum. Hemos cubierto las partes
fundamentales y progresivas del contrato, desde la inicialización del token hasta la implementación
de funciones adicionales como `mint`, `pause` y `transfer`. Este ejemplo proporciona una base sólida
para construir funcionalidades más avanzadas en contratos de tokens.