import { useDHConnect } from "@daohaus/connect";
import { TARGETS } from "../targetDao";
import { DataIndicator, Progress } from "@daohaus/ui";
import { formatValueTo, fromWei } from "@daohaus/utils";
import styled from "styled-components";
import { DataGrid } from "./DataGrid";

const ProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
`;

export const ProgressSection = ({
  yeetBalance,
  max,
}: {
  yeetBalance?: string | null;
  max?: string | null;

}) => {

  return (
    <ProgressBox>
      <DataGrid>
        <DataIndicator
          size="sm"
          label={`Max ${TARGETS.STAKE_TOKEN_SYMBOL}:`}
          data={
            Number(TARGETS.MAX_YEET) / 10 ** TARGETS.STAKE_TOKEN_DECIMALS || "?"
          }
        />
        {yeetBalance && (
          <DataIndicator
            size="sm"
            label={`Yeeter ${TARGETS.STAKE_TOKEN_SYMBOL} Balance:`}
            data={
              yeetBalance != null
                ? fromWei(yeetBalance)
                : "--"
            }
          />
        )}
      </DataGrid>
      <Progress
            backgroundColor="black"
            progressSection={[
              {
                color: "green",
                percentage: `${
                  yeetBalance ? (Number(yeetBalance) / Number(TARGETS.MAX_YEET)) * 100 : 0
                }%`
                  
              },
            ]}
          />
      

    </ProgressBox>
  );
};
