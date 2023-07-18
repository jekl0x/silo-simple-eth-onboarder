import { useDHConnect } from "@daohaus/connect";
import { ABOUTLINKS, TARGETS } from "../targetDao";
import {
  Card,
  DataIndicator,
  Divider,
  H2,
  ParLg,
  ParMd,
  Progress,
  SingleColumnLayout,
  Spinner,
  Theme,
  WarningText,
  useToast,
} from "@daohaus/ui";
import { useUserMember } from "../hooks/useUserMember";
import { useState } from "react";
import { useTxBuilder } from "@daohaus/tx-builder";
import { APP_TX } from "../legos/tx";
import {
  formatDistanceToNowFromSeconds,
  formatValueTo,
  fromWei,
  handleErrorMessage,
  toBaseUnits,
  TXLego,
} from "@daohaus/utils";
import styled from "styled-components";
import { useOnboarder } from "../hooks/useOnboarder";
import { Member } from "../utils/types";
import { DataGrid } from "../components/DataGrid";
import { MembershipSection } from "../components/MembershipSection";
import { StakeEthSection } from "../components/StakeEthSection";
import { useETH } from "../hooks/useETH";
import { useERC20 } from "../hooks/useERC20";
import { ProgressSection } from "../components/ProgressSection";
import { useSafeETH } from "../hooks/useSafeETH";

const StakeBox = styled.div`
  max-width: 70rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 2rem;
  }
  .space {
    margin-bottom: 2rem;
  }
  .small-space {
    margin-bottom: 1rem;
  }
  svg {
    margin-bottom: 2rem;
  }
  h2 {
    margin-bottom: 4rem;
  }
  label {
    margin-bottom: 1rem;
  }
  .input-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 2rem;
  }
  .err {
    margin-top: 1rem;
    color: ${({ theme }: { theme: Theme }) => theme.danger.step9};
  }
`;

const SpinnerBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const Join = () => {
  const { address, provider, chainId } = useDHConnect();
  const { fireTransaction } = useTxBuilder();

  const {
    ethData,
    isLoading: isEthLoading,
    isRefetching,
    refetch: refetchEth,
  } = useETH({
    chainId: TARGETS.CHAIN_ID,
    userAddress: address,
    provider: provider,
    fetchShape: {
      balanceOf: true,
    },
  });

  const {
    tokenData,
    isLoading: isTokenLoading,
    isRefetching: isTokenRefetching,
    refetch: refetchToken,
  } = useERC20({
    chainId: TARGETS.CHAIN_ID,
    userAddress: address,
    tokenAddress: TARGETS.LOOT_ADDRESS,
    fetchShape: {
      balanceOf: true,
    },
  });

  const { shamanData, isLoading: isShamanLoading } = useOnboarder({
    shamanAddress: TARGETS.SHAMAN_ADDRESS,
    chainId: TARGETS.CHAIN_ID,
    fetchShape: {
      expiry: true,
      minTribute: true,
    },
  });


  const {
    ethData: yeetBankData,
    isLoading: isYeetBankLoading,
    isRefetching: isYeetBankRefetching,
    refetch: refetchYeetBank,
  } = useSafeETH({
    chainId: TARGETS.CHAIN_ID,
    fetchShape: {
      balanceOf: true,
    },
  });

  const { balance } = ethData || {};

  const { tokenBalance } = tokenData || {};
  const { balance: yeetBalance } = yeetBankData || {};

  const { expiry, minTribute, multiply } = shamanData || {};

  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const { successToast, errorToast, defaultToast } = useToast();

  const isLoadingAll =
    isEthLoading || isTokenLoading || isShamanLoading || isYeetBankLoading;

  const handleStake = (wholeAmt: string) => {
    if (!wholeAmt) {
      errorToast({ title: "Error", description: "Please enter an amount" });
      return;
    }
    const baseAmt = toBaseUnits(
      wholeAmt,
      TARGETS.STAKE_TOKEN_DECIMALS
    ).toString();

    fireTransaction({
      tx: {
        ...APP_TX.STAKE,
        staticArgs: [],
        overrides: { value: baseAmt },
        disablePolling: true,
      } as TXLego,
      lifeCycleFns: {
        onRequestSign() {
          setIsLoadingTx(true);
        },
        onTxSuccess() {
          defaultToast({
            title: "Success",
            description: "Transaction successfully sent",
          });
          refetchEth();
          refetchToken();
          refetchYeetBank();
          setIsLoadingTx(false);
        },
        onTxError(err) {
          const errMsg = handleErrorMessage(err as any);
          errorToast({ title: "Error", description: errMsg });
          setIsLoadingTx(false);
        },
      },
    });
  };

  if (isLoadingAll)
    return (
      <SingleColumnLayout>
        <StakeBox>
          <H2>Loading</H2>
          <ParMd className="space">
            getting data from the yeet gods{" "}
          </ParMd>
          <SpinnerBox>
            <Spinner size="12rem" />
          </SpinnerBox>
        </StakeBox>
      </SingleColumnLayout>
    );
  return (
    <SingleColumnLayout>
      <img
        src={ABOUTLINKS.hero}
        alt="logo"
        width="50%"
        style={{ marginBottom: "20px" }}
      />

      <StakeBox>
        {tokenBalance && parseInt(tokenBalance) > 0 ? (
          <>
            {/* <H2>YEET {TARGETS.STAKE_TOKEN_SYMBOL}</H2> */}
            <ParLg>
              YEET {TARGETS.STAKE_TOKEN_SYMBOL} for more {TARGETS.LOOT_SYMBOL}
            </ParLg>
          </>
        ) : (
          <>
            {/* <H2>Join {TARGETS.NAME}</H2> */}
            <ParLg>
              YEET {TARGETS.STAKE_TOKEN_SYMBOL} to Join {TARGETS.NAME}
            </ParLg>
          </>
        )}

        <DataGrid>
          <DataIndicator
            label={`${TARGETS.STAKE_TOKEN_SYMBOL}:${TARGETS.LOOT_SYMBOL}`}
            data={`1:${multiply}`}
            size="sm"
          />

          {expiry && <ExpiryIndicator expiry={expiry} />}
          {minTribute && <MinTributeIndicator minTribute={minTribute} />}
        </DataGrid>

        <ProgressSection yeetBalance={yeetBalance} max={TARGETS.MAX_YEET} />
        {provider && address ? (
          <>
            <Divider className="space" />
            <MembershipSection tokenBalance={tokenBalance} balance={balance} />
            {TARGETS.STAKE_NEXT_START > Date.now() / 1000 ||
            TARGETS.STAKE_PAUSED ||
            parseInt(expiry || "0") < Date.now() / 1000 ? (
              <Card className="space">
                <ParMd>
                  Staking is currently paused. Please check back later.
                </ParMd>
              </Card>
            ) : (
              <StakeEthSection
                balance={balance}
                handleStake={handleStake}
                isLoading={isLoadingTx || isRefetching}
                address={address}
                chainId={chainId}
              />
            )}
          </>
        ) : (
          <WarningText>Connect Wallet First</WarningText>
        )}
      </StakeBox>
    </SingleColumnLayout>
  );
};

const ExpiryIndicator = ({ expiry }: { expiry: string }) => {
  const expiryDate = formatDistanceToNowFromSeconds(expiry);
  return (
    <DataIndicator label="Onboarding Expires:" data={expiryDate} size="sm" />
  );
};

const MinTributeIndicator = ({ minTribute }: { minTribute: string }) => {
  const minTributeEth = formatValueTo({
    value: fromWei(minTribute),
    format: "numberShort",
  });
  return <DataIndicator label="Min Tribute:" data={minTributeEth} size="sm" />;
};
