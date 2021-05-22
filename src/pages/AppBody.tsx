import React from 'react';
import styled from 'styled-components';

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 480px;
  width: 100%;
  padding: 0.9rem;
  border-radius: 2.2em;
  border: 1px solid ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.06), 0px 11px 23px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.bg1};
`;

export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>;
}
