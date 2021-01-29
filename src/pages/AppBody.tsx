import React from 'react';
import styled from 'styled-components';

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.06);
  border-radius: 30px;
`;

export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>;
}
