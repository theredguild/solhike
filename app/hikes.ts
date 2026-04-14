export interface Hike {
  slug: string
  title: string
  fileName: string
  description: string
  category: string
  status: "complete" | "wip"
}

export const hikes: Hike[] = [
  {
    slug: "lock",
    title: "Lock",
    fileName: "Lock.sol",
    description: "A timelock contract covering Solidity fundamentals, state variables, constructors, events, and the Checks-Effects-Interactions pattern.",
    category: "Basics",
    status: "complete",
  },
  {
    slug: "erc20",
    title: "ERC-20",
    fileName: "ERC20.sol",
    description: "The standard fungible token with OpenZeppelin v5, Ownable access control, Pausable emergency stops, and the allowance mechanism.",
    category: "Tokens",
    status: "complete",
  },
  {
    slug: "erc721",
    title: "ERC-721",
    fileName: "NFT.sol",
    description: "The standard non-fungible token (NFT) with URI storage metadata, Ownable minting, Pausable transfers, and the _update hook.",
    category: "Tokens",
    status: "complete",
  },
  {
    slug: "erc1155",
    title: "ERC-1155",
    fileName: "GameItems.sol",
    description: "The multi-token standard supporting both fungible and non-fungible tokens, batch operations, dynamic URI management, and Pausable.",
    category: "Tokens",
    status: "complete",
  },
  {
    slug: "multisig",
    title: "MultiSig Wallet",
    fileName: "MultisigWallet.sol",
    description: "A multi-signature wallet requiring multiple confirmations, with event logging, access control, duplicate prevention, and CEI pattern.",
    category: "Security",
    status: "complete",
  },
  {
    slug: "reentrancy",
    title: "Reentrancy",
    fileName: "",
    description: "Understanding and preventing reentrancy attacks, one of the most critical Solidity vulnerabilities.",
    category: "Security",
    status: "wip",
  },
  {
    slug: "nft-marketplace",
    title: "NFT Marketplace",
    fileName: "",
    description: "A marketplace for buying and selling NFTs with listing, bidding, and sale mechanisms.",
    category: "Advanced",
    status: "wip",
  },
  {
    slug: "dao",
    title: "DAO",
    fileName: "",
    description: "A decentralized autonomous organization with proposal creation, voting, and execution.",
    category: "Advanced",
    status: "wip",
  },
  {
    slug: "proxy",
    title: "Proxy",
    fileName: "",
    description: "A proxy pattern for delegate calls and upgradeable contract architectures.",
    category: "Advanced",
    status: "wip",
  },
  {
    slug: "upgradeable-proxy",
    title: "Upgradeable Proxy",
    fileName: "",
    description: "An UUPS-style upgradeable proxy pattern with authorization and version management.",
    category: "Advanced",
    status: "wip",
  },
  {
    slug: "voting",
    title: "Voting System",
    fileName: "",
    description: "An on-chain voting system with proposal creation, vote delegation, and tallying.",
    category: "Advanced",
    status: "wip",
  },
]

export const categories = [...new Set(hikes.map((h) => h.category))]