import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 480px;
  width: 100%;
  padding: 1.5rem;
  border-radius: 2.2em;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04);
  background: ${({ theme }) => theme.bg1};
`;

const BodyNavLinks = styled.div`
  position: absolute;
  top: -6rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 3rem;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04);
  background-color: ${({ theme }) => theme.bg1};
`;

const activeClassName = 'ACTIVE';

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  outline: none;
  cursor: pointer;
  padding: 1.2rem 2.2rem;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 1.3rem;
  width: fit-content;
  font-weight: 500;
  transition: 0.2s;

  :first-child {
    border-radius: 3rem 0 0 3rem;
  }
  :last-child {
    border-radius: 0 3rem 3rem 0;
  }

  &.${activeClassName}, :hover,
  :focus {
    color: ${({ theme }) => theme.primary1};
  }
`;

export default function AppBody({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <BodyWrapper>
      <BodyNavLinks>
        <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
          {t('swap')}
        </StyledNavLink>
        <StyledNavLink id={`send-nav-link`} to={'/send'}>
          {t('send')}
        </StyledNavLink>
        <StyledNavLink
          id={`pool-nav-link`}
          to={'/pool'}
          isActive={(match, { pathname }) =>
            Boolean(match) ||
            pathname.startsWith('/add') ||
            pathname.startsWith('/remove') ||
            pathname.startsWith('/create') ||
            pathname.startsWith('/find')
          }
        >
          {t('pool')}
        </StyledNavLink>
        <StyledNavLink id={`stake-nav-link`} to={'/luck'}>
          Luck
        </StyledNavLink>
      </BodyNavLinks>

      {children}
    </BodyWrapper>
  );
}
