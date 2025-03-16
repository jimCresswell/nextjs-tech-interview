'use client';

import { GlobalStyles } from './globals.styles';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from './registry';
import styled from 'styled-components';

const inter = Inter({ subsets: ['latin'] });


const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const NavContainer = styled.nav`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  
  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  height: 4rem;
`;

const NavLeftSection = styled.div`
  display: flex;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const Logo = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
`;

const ContentContainer = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1.5rem 1rem;
  
  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <HeaderContainer>
            <NavContainer aria-label="Main navigation">
              <NavInner>
                <NavLeftSection>
                  <LogoContainer>
                    <Logo>Inventory App</Logo>
                  </LogoContainer>
                </NavLeftSection>
              </NavInner>
            </NavContainer>
          </HeaderContainer>
          <ContentContainer>
            {children}
          </ContentContainer>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
} 