import { ValidNetwork } from "@daohaus/keychain-utils";
import { EthAddress } from "@daohaus/utils";

export const TARGETS: {
    NAME: string;
    DAO_ADDRESS: EthAddress;
    SAFE_ADDRESS: EthAddress;
    SHARE_ADDRESS: EthAddress;
    SHARE_SYMBOL: string;
    LOOT_ADDRESS: EthAddress;
    LOOT_SYMBOL: string;
    SHAMAN_ADDRESS: EthAddress;
    YEET_BANK: string;
    MAX_YEET: string;
    CHAIN_ID: ValidNetwork;
    STAKE_TOKEN_NAME: string;
    STAKE_TOKEN_SYMBOL: string;
    STAKE_TOKEN_DECIMALS: number;
    STAKE_PAUSED: boolean;
    STAKE_NEXT_START: number;

} = {
    NAME: "SILO DAO",
    DAO_ADDRESS: "0x57fbfaa786b92bde7db05f10f667c173076ce5c8",
    SAFE_ADDRESS: "0x77f5b5f1eba2dc047657f6fd91e9618565f72f25",
    CHAIN_ID: "0x5",
    SHARE_ADDRESS: "0xbf1cae67d4a42946dd04b0d375c1c5c999018f1e",
    SHARE_SYMBOL: "vSILO",
    LOOT_ADDRESS: "0x271dd85a29233386f26e032419c8cbb9074ab8f1",
    LOOT_SYMBOL: "SILO",
    STAKE_TOKEN_NAME: "ETH",
    STAKE_TOKEN_SYMBOL: "ETH",
    STAKE_TOKEN_DECIMALS: 18,
    SHAMAN_ADDRESS: "0x6d98023d9e73708103803818567a5Cc465Bb1486",
    YEET_BANK: "0x51197bda68a2fc4d7af96de76e3f6471786a03d9",
    MAX_YEET: "3000000000000000000",
    STAKE_PAUSED: false,
    STAKE_NEXT_START: 0,
};

export const ABOUTLINKS = {
  discord: "https://discord.gg/QpaXn6CFAN",
  twitter: "https://twitter.com/Silo_Haus",
  github: "https://github.com/SiloHaus/",
  githubOnboarder: "https://github.com/silohaus/simple-eth-yeeter",
  logo_url: "https://media.discordapp.net/attachments/1126954803847770122/1131050067642564639/Silo_Logo_02_Ring.png",
  hero: "https://cdn.discordapp.com/attachments/1126954803847770122/1131080965763125298/SiloHaus_Banner_3-1.png"
};
