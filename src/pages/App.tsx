import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import URLWarning from '../components/Header/URLWarning';
import Web3ReactManager from '../components/Web3ReactManager';
import AddLiquidity from './AddLiquidity';
import Pool from './Pool';
import Send from './Send';
import PoolFinder from './PoolFinder';
import RemoveLiquidity from './RemoveLiquidity';
import Swap from './Swap';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`;

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 200px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  z-index: 1;
`;

export default function App() {
  return (
    <Suspense fallback={null}>
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <URLWarning />
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>

        <BodyWrapper>
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/swap" component={Swap} />
              <Route exact strict path="/send" component={Send} />
              <Route exact strict path="/find" component={PoolFinder} />
              <Route exact strict path="/pool" component={Pool} />
              <Route exact strict path="/create" component={AddLiquidity} />
              <Route exact path="/add" component={AddLiquidity} />
              <Route exact strict path="/remove" component={RemoveLiquidity} />
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
          </Web3ReactManager>
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  );
}
