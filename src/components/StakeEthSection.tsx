import { TARGETS } from "../targetDao";
import { Button, Checkbox, Input, Label, ParSm } from "@daohaus/ui";
import { useEffect, useState } from "react";
import { EthAddress, isNumberish, toBaseUnits } from "@daohaus/utils";
import styled from "styled-components";

export const StakeEthSection = ({
  isLoading,
  handleStake,
  balance,
  address,
  chainId,
}: {
  isLoading: boolean;
  balance?: string | null;
  handleStake: (wholeAmt: string) => void;
  address: string | undefined;
  chainId: string | undefined;
}) => {
  const [stkAmt, setStkAmt] = useState<string>("");
  const [valMsg, setValMsg] = useState<string | null>();
  const [isDocsChecked, setIsDocsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (!stkAmt) {
      setValMsg(null);
    } else if (!isNumberish(stkAmt)) {
      setValMsg("Please enter a valid number");
    } else if (!balance) {
      setValMsg(`You do not have a ${TARGETS.STAKE_TOKEN_SYMBOL} balance`);
    } else if (
      Number(balance) <
      Number(toBaseUnits(stkAmt, TARGETS.STAKE_TOKEN_DECIMALS))
    ) {
      setValMsg(`Insufficient ${TARGETS.STAKE_TOKEN_SYMBOL} balance`);
    } else {
      setValMsg(null);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStkAmt(e.target.value);
  };

  const handleLocalStake = () => {
    handleStake(stkAmt);
  };

  const toggleDocsChecked = () => {
    setIsDocsChecked(!isDocsChecked);
  };

  return (
    <>
      <div className="input-box">
        <Label>
          <>
            {TARGETS.STAKE_TOKEN_SYMBOL}{" Amount"}
          </>
        </Label>
        <Input
          id="stkAmt"
          onChange={handleChange}
          number
          //@ts-ignore
          value={stkAmt}
          disabled={isLoading}
          full
          placeholder={"0"}
        />
        {valMsg && <ParSm className="err">{valMsg}</ParSm>}
      </div>

      <CheckArea>
        <Checkbox
          onCheckedChange={toggleDocsChecked}
          checked={isDocsChecked}
          defaultChecked={false}
          title="I have done my research and understand the risks of yeeting ETH."
          className="checkbox"
        />
      </CheckArea>

      <Button
        type="button"
        onClick={handleLocalStake}
        fullWidth
        disabled={
          isLoading ||
          !address ||
          chainId != TARGETS.CHAIN_ID ||
          !isDocsChecked ||
          !!valMsg
        }
      >
      YEET {TARGETS.STAKE_TOKEN_SYMBOL}
      </Button>
    </>
  );
};
const CheckArea = styled.div`
  button {
    transform: translateY(-1rem);
  }
  svg {
    transform: translateY(1rem);
  }
`;
