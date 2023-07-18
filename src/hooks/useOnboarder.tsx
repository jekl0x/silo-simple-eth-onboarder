import { LOCAL_ABI } from '@daohaus/abis';
import OnboarderABI from '../abis/Onboarder.json';
import { createContract } from '@daohaus/tx-builder';
import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';
import { useQuery } from 'react-query';

type FetchShape = {
  baal?: boolean;
  expiry?: boolean;
  token?: boolean;
  minTribute?: boolean;
  multiply?: boolean;
};

const fetchOnboarder = async ({
  shamanAddress,
  chainId,
  rpcs,
  fetchShape = {
    baal: true,
    expiry: true,
    token: true,
    minTribute: true,
  },
}: {
  shamanAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  fetchShape?: FetchShape;
}) => {
  const shamanContract = createContract({
    address: shamanAddress,
    abi: OnboarderABI,
    chainId,
    rpcs,
  });
  

  try {
    const baal = fetchShape?.baal ? await shamanContract.baal() : null;
    const expiry = fetchShape?.expiry ? await shamanContract.expiry() : null;
    const minTribute = fetchShape?.minTribute ? await shamanContract.minTribute() : null;
    const multiply = fetchShape?.minTribute ? await shamanContract.multiply() : null;


    return {
      baal,
      expiry: expiry.toString() as string,
      minTribute,
      multiply,
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useOnboarder = ({
  shamanAddress,
  chainId,
  rpcs,
  fetchShape = {
    baal: true,
    expiry: true,
    minTribute: true,
    multiply: true,
  },
}: {
  shamanAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  fetchShape?: FetchShape;
}) => {
  const { data, error, ...rest } = useQuery(
    'OnboarderShaman',
    () => {
      return fetchOnboarder({
        shamanAddress,
        chainId,
        rpcs,
        fetchShape,
      });
    },
    {
      enabled: !!shamanAddress && !!chainId,
    }
  );

  return {
    shamanData: data,
    error: error as Error,
    ...rest,
  };
};
