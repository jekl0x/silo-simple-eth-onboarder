import { useDHConnect } from "@daohaus/connect";
import { TARGETS } from "../targetDao";
import { DataIndicator } from "@daohaus/ui";
import { formatValueTo, fromWei } from "@daohaus/utils";
import styled from "styled-components";
import { DataGrid } from "./DataGrid";

const MembershipBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
`;

export const MembershipSection = ({
  balance,
  tokenBalance,

}: {
  balance?: string | null;
  tokenBalance?: string | null;

}) => {

  return (
    <MembershipBox>
      <DataGrid>
        <DataIndicator
          size="sm"
          label={`Your ${TARGETS.STAKE_TOKEN_SYMBOL} Balance`}
          data={
            balance != null
              ? formatValueTo({
                  value: fromWei(balance),
                  format: "numberShort",
                })
              : "--"
          }
        />
        {tokenBalance && (
          <DataIndicator
            size="sm"
            label={`Your ${TARGETS.LOOT_SYMBOL} Balance`}
            data={
              tokenBalance != null
                ? formatValueTo({
                    value: fromWei(tokenBalance),
                    decimals: TARGETS.STAKE_TOKEN_DECIMALS,
                    format: "number",
                  })
                : "--"
            }
          />
        )}
      </DataGrid>
    </MembershipBox>
  );
};
