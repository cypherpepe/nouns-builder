import { AddressType, CHAIN_ID } from 'src/typings'

export type L2ChainType =
  | CHAIN_ID.OPTIMISM
  | CHAIN_ID.OPTIMISM_SEPOLIA
  | CHAIN_ID.BASE
  | CHAIN_ID.BASE_SEPOLIA
  | CHAIN_ID.ZORA
  | CHAIN_ID.ZORA_SEPOLIA

export const PUBLIC_MANAGER_ADDRESS = {
  [CHAIN_ID.ETHEREUM]: '0xd310a3041dfcf14def5ccbc508668974b5da7174' as AddressType,
  [CHAIN_ID.OPTIMISM]: '0x3ac0E64Fe2931f8e082C6Bb29283540DE9b5371C' as AddressType,
  [CHAIN_ID.SEPOLIA]: '0x0ca90a96ac58f19b1f69f67103245c9263bc4bfc' as AddressType,
  [CHAIN_ID.OPTIMISM_SEPOLIA]:
    '0x1004e43b540af4dfde2737c29893716817b0a1d7' as AddressType,
  [CHAIN_ID.BASE]: '0x3ac0e64fe2931f8e082c6bb29283540de9b5371c' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]: '0x550c326d688fd51ae65ac6a2d48749e631023a03' as AddressType,
  [CHAIN_ID.ZORA]: '0x3ac0E64Fe2931f8e082C6Bb29283540DE9b5371C' as AddressType,
  [CHAIN_ID.ZORA_SEPOLIA]: '0x550c326d688fd51ae65ac6a2d48749e631023a03' as AddressType,
  [CHAIN_ID.FOUNDRY]: '0xd310a3041dfcf14def5ccbc508668974b5da7174' as AddressType,
}

export const PUBLIC_L1_BRIDGE_ADDRESS = {
  [CHAIN_ID.OPTIMISM]: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' as AddressType,
  [CHAIN_ID.OPTIMISM_SEPOLIA]:
    '0x16Fc5058F25648194471939df75CF27A2fdC48BC' as AddressType,
  [CHAIN_ID.BASE]: '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]: '0x49f53e41452C74589E85cA1677426Ba426459e85' as AddressType,
  [CHAIN_ID.ZORA]: '0x1a0ad011913A150f69f6A19DF447A0CfD9551054' as AddressType,
  [CHAIN_ID.ZORA_SEPOLIA]: '0xeffE2C6cA9Ab797D418f0D91eA60807713f3536f' as AddressType,
}

export const PUBLIC_BUILDER_ADDRESS = {
  [CHAIN_ID.ETHEREUM]: '0xDC9b96Ea4966d063Dd5c8dbaf08fe59062091B6D' as AddressType, // builder treasury address
}

export const PUBLIC_NOUNS_ADDRESS = {
  [CHAIN_ID.ETHEREUM]: '0x0BC3807Ec262cB779b38D65b38158acC3bfedE10' as AddressType, // nouns treasury address
}

export const PUBLIC_ZORA_NFT_CREATOR = {
  [CHAIN_ID.ETHEREUM]: '0xF74B146ce44CC162b601deC3BE331784DB111DC1' as AddressType,
  [CHAIN_ID.OPTIMISM]: '0x7d1a46c6e614A0091c39E102F2798C27c1fA8892' as AddressType,
  [CHAIN_ID.SEPOLIA]: '0x87cfd516c5ea86e50b950678CA970a8a28de27ac' as AddressType,
  [CHAIN_ID.OPTIMISM_SEPOLIA]:
    '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.BASE]: '0x58C3ccB2dcb9384E5AB9111CD1a5DEA916B0f33c' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.ZORA]: '0xA2c2A96A232113Dd4993E8b048EEbc3371AE8d85' as AddressType,
  [CHAIN_ID.ZORA_SEPOLIA]: '0x6b28d7C2F8b2C2189e95b89B67886eEb16489a97' as AddressType,
  [CHAIN_ID.FOUNDRY]: '0xF74B146ce44CC162b601deC3BE331784DB111DC1' as AddressType,
}

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000' as AddressType

export const MERKLE_RESERVE_MINTER = {
  [CHAIN_ID.ETHEREUM]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.OPTIMISM]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.SEPOLIA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.OPTIMISM_SEPOLIA]:
    '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.BASE]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.ZORA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.ZORA_SEPOLIA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.FOUNDRY]: '0x0000000000000000000000000000000000000000' as AddressType,
}

export const L2_MIGRATION_DEPLOYER = {
  [CHAIN_ID.ETHEREUM]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.OPTIMISM]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.SEPOLIA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.OPTIMISM_SEPOLIA]:
    '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.BASE]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.ZORA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.ZORA_SEPOLIA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.FOUNDRY]: '0x0000000000000000000000000000000000000000' as AddressType,
}

export const MERKLE_METADATA_RENDERER = {
  [CHAIN_ID.ETHEREUM]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.OPTIMISM]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.SEPOLIA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.OPTIMISM_SEPOLIA]:
    '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.BASE]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.ZORA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.ZORA_SEPOLIA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.FOUNDRY]: '0x0000000000000000000000000000000000000000' as AddressType,
}

export const L1_MESSENGERS = {
  [CHAIN_ID.ETHEREUM]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.SEPOLIA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.BASE]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.BASE_SEPOLIA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.OPTIMISM]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.OPTIMISM_SEPOLIA]:
    '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.ZORA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.ZORA_SEPOLIA]: '0x0000000000000000000000000000000000000000' as AddressType,
  [CHAIN_ID.FOUNDRY]: '0x0000000000000000000000000000000000000000' as AddressType,
}
