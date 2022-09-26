import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import { pixelToRem } from "../../utils/functions/util";

const Container = styled.div`
  padding: 1rem;
  text-align: center;
  border-radius: 30px 30px 0 0;
  font-size: ${(props) => props.theme.fontSizes.h4};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  > h2 {
    height: ${(props) => props.theme.fontSizes.h4};
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  > svg {
    font-size: ${pixelToRem(30)};
  }
`;

type ComponentProps = {
  children: ReactNode;
};

function DateContainer({ children }: ComponentProps) {
  return <Container>{children}</Container>;
}

export default DateContainer;
