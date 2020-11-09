import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import theme from "../../../styles/theme";

interface NavLinkProps {
  title: string;
  href: string;
}

const IconContainer = styled.div`
  ${theme.mixins.flexCenter}
  background-color: transparent;
  transition: var(--transition);
  margin-right: 10px;
  width: 14px;
  height: 14px;
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: var(--fz-xxs);
  transition: var(--transition);
  border-right: 3px solid transparent;
  padding: 5px 0;
  width: 100%;
  height: 100%;
  list-style: none;
  line-height: 0;
  cursor: pointer;
  color: var(--darkgrey);

  &.notActive {
  }

  &:hover,
  &:focus,
  &.active {
    color: white;
    border-right: 3px solid white;

    ${IconContainer} {
      color: white;
    }
  }
`;

export const NavLink: React.FC<NavLinkProps> = ({ children, ...props }) => {
  const router = useRouter();
  return (
    <Link href={props.href} scroll={false}>
      <NavItem
        className={`${router.pathname === props.href ? "active" : "notActive"}`}
      >
        <IconContainer>{children}</IconContainer>
        <p>{props.title}</p>
      </NavItem>
    </Link>
  );
};
