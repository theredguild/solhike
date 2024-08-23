
## !intro NFT.sol
Este es un ejemplo de un contrato ERC721 (`NFT.sol`) utilizando el framework HardHat. A lo largo de este tutorial, construiremos este contrato paso a paso, explicando cada componente clave.

## !!steps Declaración del contrato
Primero, declaramos nuestro contrato utilizando la palabra reservada `contract`. Este es el bloque base de cualquier contrato en Solidity. En este caso, el contrato implementará la interfaz estándar de ERC721.

```solidity ! NFT.sol
contract MyNFT {

}
```

## !!steps Licencia SPDX
Antes de comenzar con el contrato, es buena práctica agregar un comentario con el identificador de licencia `SPDX`, lo cual es obligatorio en Solidity para especificar la licencia del código fuente. Este comentario no afecta el código ejecutable, pero es necesario para la conformidad legal.

```solidity ! NFT.sol
// SPDX-License-Identifier: UNLICENSED

contract MyNFT {

}
```

## !!steps Versión de Solidity
Para que el compilador sepa qué versión de Solidity utilizar, debemos especificar la versión del compilador con la declaración `pragma solidity`. Esto asegura que el contrato se compile correctamente solo con versiones compatibles del compilador.

```solidity ! NFT.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract MyNFT {

}
```

## !!steps Importar la implementación estándar de ERC721
Aquí importamos la implementación estándar de `ERC721` desde OpenZeppelin. Esto nos permite utilizar todas las funciones y propiedades que conforman el estándar ERC721 en nuestro contrato, como `transferFrom`, `balanceOf`, etc.

```solidity ! NFT.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {

}
```


## !!steps Constructor del contrato
Añadimos un `constructor`, que es una función especial que se ejecuta solo una vez cuando se despliega el contrato. Aquí, inicializamos el nombre y el símbolo del NFT utilizando el constructor de `ERC721`.

```solidity ! NFT.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") {
        // Aquí se puede inicializar más lógica si es necesario
    }
}
```

## !!steps Función de minting de tokens
Añadimos una función para crear (o "mint") nuevos tokens NFT. Esta función permite al propietario del contrato asignar un nuevo token a una dirección específica. Los tokens NFT son únicos y cada uno tiene un identificador único (`tokenId`).

```solidity ! NFT.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") {
        // Aquí se puede inicializar más lógica si es necesario
    }

    // Función para crear un nuevo token NFT
    function mintNFT(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }
}
```

## !!steps Restringir la función de minting
Para evitar que cualquier usuario pueda crear tokens arbitrariamente, restringimos la función de minting al propietario del contrato. Utilizamos la biblioteca `Ownable` de OpenZeppelin para gestionar esta propiedad.

```solidity ! NFT.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    constructor() ERC721("MyNFT", "MNFT") {
        // Aquí se puede inicializar más lógica si es necesario
    }

    // Función para crear un nuevo token NFT, restringida al owner
    function mintNFT(address to, uint256 tokenId) public onlyOwner {
        _mint(to, tokenId);
    }
}
```


## !!steps Metadatos de los tokens
Añadimos la capacidad de definir y asignar metadatos a cada token NFT. Los metadatos son típicamente una URL que apunta a un archivo JSON que describe el NFT, incluyendo su nombre, descripción y otros atributos.

```solidity ! NFT.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("MyNFT", "MNFT") {
        // Aquí se puede inicializar más lógica si es necesario
    }

    // Función para crear un nuevo token NFT, restringida al owner
    function mintNFT(address to, uint256 tokenId, string memory _tokenURI) public onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }

    // Función para asignar un URI de token
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
    }

    // Función para obtener el URI de un token
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _tokenURIs[tokenId];
    }
}
```

## !!steps Capacidad de pausado del contrato
Añadimos la capacidad de pausar el contrato en situaciones críticas, utilizando la biblioteca `Pausable` de OpenZeppelin. Esto nos permite detener las transferencias de tokens en caso de emergencia.

```solidity ! NFT.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract MyNFT is ERC721, Ownable, Pausable {
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("MyNFT", "MNFT") {
        // Aquí se puede inicializar más lógica si es necesario
    }

    // Función para crear un nuevo token NFT, restringida al owner
    function mintNFT(address to, uint256 tokenId, string memory _tokenURI) public onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }

    // Función para asignar un URI de token
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
    }

    // Función para obtener el URI de un token
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _tokenURIs[tokenId];
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


## !!steps Modificación de transferencias con capacidad de pausado
Modificamos la función interna `_beforeTokenTransfer` para incluir la verificación de que el contrato no esté pausado antes de permitir transferencias de tokens. Esto se realiza anulando la función de `ERC721` e incluyendo la verificación de `whenNotPaused`.

```solidity ! NFT.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract MyNFT is ERC721, Ownable, Pausable {
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("MyNFT", "MNFT") {
        // Aquí se puede inicializar más lógica si es necesario
    }

    // Función para crear un nuevo token NFT, restringida al owner
    function mintNFT(address to, uint256 tokenId, string memory _tokenURI) public onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }

    // Función para asignar un URI de token
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
    }

    // Función para obtener el URI de un token
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _tokenURIs[tokenId];
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
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
```

## !outro NFT.sol
Hemos completado el contrato `NFT.sol`. Este contrato es un ejemplo detallado de cómo implementar un token ERC721 siguiendo el estándar más utilizado en Ethereum. Hemos cubierto las partes fundamentales y progresivas del contrato, desde la inicialización del NFT hasta la implementación de funciones adicionales como `mint`, `pause` y `transfer`. Este ejemplo proporciona una base sólida para construir funcionalidades más avanzadas en contratos de tokens no fungibles.