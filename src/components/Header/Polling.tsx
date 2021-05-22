import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { TYPE, ExternalLink } from '../../theme';

import { useBlockNumber } from '../../state/application/hooks';
import { getEtherscanLink } from '../../utils';
import { useActiveWeb3React } from '../../hooks';

const StyledPolling = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  right: 0;
  top: 0;
  padding: 1rem;
  transition: opacity 0.3s ease;
  color: ${({ theme }) => theme.text1};

  :hover {
    opacity: 1;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `}
`;

const StyledPollingDot = styled.div`
  width: 12px;
  height: 12px;
  min-height: 12px;
  min-width: 12px;
  margin-left: 0.5rem;
  margin-top: 3px;
  border-radius: 50%;
  position: relative;
  background-color: ${({ theme }) => theme.text1};
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  transform: translateZ(0);

  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-left: 2px solid ${({ theme }) => theme.text1};
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: relative;

  left: -6px;
  top: -6px;
`;

export default function Polling() {
  const { chainId } = useActiveWeb3React();
  const blockNumber = useBlockNumber();
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsMounted(true), 1000);

    return () => {
      setIsMounted(false);
      clearTimeout(timer1);
    };
  }, [blockNumber]);

  return (
    <ExternalLink href={chainId && blockNumber ? getEtherscanLink(chainId, blockNumber.toString(), 'block') : ''}>
      <StyledPolling>
        <TYPE.small style={{ opacity: isMounted ? '0.4' : '0.8' }}>{blockNumber}</TYPE.small>
        <StyledPollingDot>{!isMounted && <Spinner />}</StyledPollingDot>
      </StyledPolling>
    </ExternalLink>
  );
}
