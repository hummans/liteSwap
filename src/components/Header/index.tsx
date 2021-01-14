import { ChainId, TokenAmount } from '@uniswap/sdk';
import React, { useState } from 'react';
import { Text } from 'rebass';
import styled from 'styled-components';

import Logo from '../../assets/svg/logo.svg';
import LogoDark from '../../assets/svg/logo_white.svg';
import { useActiveWeb3React } from '../../hooks';
import { useDarkModeManager } from '../../state/user/hooks';
import { useETHBalances, useAggregateUniBalance } from '../../state/wallet/hooks';
import { CardNoise } from '../earn/styled';
import { CountUp } from 'use-count-up';
import { TYPE } from '../../theme';
import { OutlineCard } from '../Card';
import Settings from '../Settings';
import Menu from '../Menu';

import { RowFixed } from '../Row';
import Web3Status from '../Web3Status';
import ClaimModal from '../claim/ClaimModal';
import { useUserHasAvailableClaim } from '../../state/claim/hooks';
import Modal from '../Modal';
import UniBalanceContent from './UniBalanceContent';
import usePrevious from '../../hooks/usePrevious';

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 2;
  border-bottom: 1px solid ${({ theme }) => theme.primary4};
  background-color: ${({ theme }) => theme.bg1};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0.8rem .6rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 0.6rem .4rem;
  `}
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 1.6rem 1.6rem 0 0;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.05);
  `};
`;

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`;

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`;

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`;

const LUCKAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.primary4};
`;

const LUCKWrapper = styled.span`
  cursor: pointer;
  width: fit-content;
  position: relative;
  transition: 0.2s;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
    transition: 0.02s;
  }
`;

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`;

const NetworkCard = styled(OutlineCard)`
  border-radius: 12px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`;

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`;

const LUCKIcon = styled.div`
  transition: transform 0.2s ease;

  :hover {
    transform: scale(1.15);
  }
`;

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan'
};

export default function Header() {
  const { account, chainId } = useActiveWeb3React();
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? ''];
  const [isDark] = useDarkModeManager();

  const availableClaim: boolean = useUserHasAvailableClaim(account);
  const aggregateBalance: TokenAmount | undefined = useAggregateUniBalance();
  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false);
  const countUpValue = aggregateBalance?.toFixed(0) ?? '0';
  const countUpValuePrevious = usePrevious(countUpValue) ?? '0';

  return (
    <HeaderFrame>
      <ClaimModal />
      <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
        <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
      </Modal>

      <HeaderRow>
        <Title href=".">
          <LUCKIcon>
            <img width={'34px'} src={isDark ? LogoDark : Logo} alt="logo" />
          </LUCKIcon>
        </Title>
        <TYPE.largeHeader>LUCKYSWAP</TYPE.largeHeader>
      </HeaderRow>

      <HeaderControls>
        <HeaderElement>
          <HideSmall>
            {chainId && NETWORK_LABELS[chainId] && (
              <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
            )}
          </HideSmall>
          {!availableClaim && aggregateBalance && (
            <LUCKWrapper onClick={() => setShowUniBalanceModal(true)}>
              <LUCKAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                {account && (
                  <HideSmall>
                    <TYPE.white
                      style={{
                        paddingRight: '.4rem'
                      }}
                    >
                      <CountUp
                        key={countUpValue}
                        isCounting
                        start={parseFloat(countUpValuePrevious)}
                        end={parseFloat(countUpValue)}
                        thousandsSeparator={','}
                        duration={1}
                      />
                    </TYPE.white>
                  </HideSmall>
                )}
                LUCK
              </LUCKAmount>
              <CardNoise />
            </LUCKWrapper>
          )}
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(4)} ETH
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElementWrap>
          <Settings />
          <Menu />
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  );
}
