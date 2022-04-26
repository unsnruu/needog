import React from "react";
import "remixicon/fonts/remixicon.css";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 20%;
  margin-right: 3px;
  & > i {
    font-size: 16px;
  }
`;

interface MenuIconProps {
  icon: string;
  onClick: () => boolean;
  isActive?: boolean;
}

function MenuIcon({ icon, onClick: handleClick, isActive }: MenuIconProps) {
  return (
    <IconWrapper>
      <i className={`ri-${icon}`} onClick={handleClick} />
    </IconWrapper>
  );
}

export default MenuIcon;
