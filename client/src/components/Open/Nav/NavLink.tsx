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
  /* width: 18px;
  height: 18px;
  border-radius: 18px; */
  margin-right: 10px;

  width: 14px;
  height: 14px;

  /* .icon {
    width: 14px;
    height: 14px;
    color: var(--black);
  } */
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

  &.notActive {
  }

  &:hover,
  &:focus,
  &.active {
    color: var(--blue);
    border-right: 3px solid var(--blue);

    .icon-container .icon {
      color: var(--blue);
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
