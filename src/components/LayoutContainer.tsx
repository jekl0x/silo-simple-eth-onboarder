import { DHLayout, useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { H4 } from "@daohaus/ui";
import { Outlet, useLocation } from "react-router-dom";
import { ABOUTLINKS, TARGETS } from "../targetDao";
import { useDaoData } from "@daohaus/moloch-v3-hooks";

export const LayoutContainer = () => {
  const location = useLocation();

  const { provider, address } = useDHConnect();

  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={[
        { label: "Yeet", href: "/" },
        { label: "Links", href: `/about` },
      ]}
      leftNav={<>
      {ABOUTLINKS.logo_url ? <img src={ABOUTLINKS.logo_url} alt="logo" width="75" /> : <H4>{TARGETS.NAME}</H4>}
      </>}
    >
      <TXBuilder
        provider={provider}
        chainId={TARGETS.CHAIN_ID}
        daoId={TARGETS.DAO_ADDRESS}
        safeId={TARGETS.SAFE_ADDRESS}
        appState={{ memberAddress: address }}
      >
        <Outlet />
      </TXBuilder>
    </DHLayout>
  );
};
