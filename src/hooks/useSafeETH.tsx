import { useQuery } from "react-query";
import { ethers } from "ethers";

import { HAUS_RPC } from "@daohaus/keychain-utils";

import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";
import { TARGETS } from "../targetDao";

type FetchShape = {
  decimals?: boolean;
  name?: boolean;
  symbol?: boolean;
  balanceOf?: boolean;
};

const fetchBalanceData = async ({
  chainId,
  rpcs = HAUS_RPC,
  fetchShape,
}: {
  chainId: ValidNetwork;
  rpcs?: Keychain;
  fetchShape?: FetchShape;
}) => {
  if (!rpcs) {
    console.log("early return");

    return;
  }

  try {
    const decimals = 18;
    const name = "Ethereum";
    const symbol = "ETH";

    const rpcUrl = rpcs[chainId];

    const ethersProvider = new ethers.providers.JsonRpcProvider(rpcUrl);

    const balance = await ethersProvider.getBalance(TARGETS.YEET_BANK);

    const data = {
      decimals,
      name,
      symbol,
      balance: balance ? (balance?.toString() as string) : null,
    };

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useSafeETH = ({
  chainId,
  rpcs,
  cacheTime = 10 * 60 * 20,
  staleTime = 10 * 60 * 20,
  fetchShape = {
    decimals: true,
    name: true,
    symbol: true,
    balanceOf: true,
  },
}: {
  chainId: ValidNetwork;
  rpcs?: Keychain;
  cacheTime?: number;
  staleTime?: number;
  fetchShape?: FetchShape;
}) => {
  const { data, error, ...rest } = useQuery(
    [`safeEthBalance`, { chainId }],
    () =>
      fetchBalanceData({
        chainId,
        rpcs,
        fetchShape,
      }),
    {
      enabled: !!chainId,
      cacheTime,
      staleTime,
    }
  );
  return { ethData: data, error: error as Error, ...rest };
};
