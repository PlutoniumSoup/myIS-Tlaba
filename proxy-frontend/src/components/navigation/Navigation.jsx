import React from "react";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../router/paths";
import "./style.module.css"

export const Navigation = ({
  children,
  ...props
}) => {
  return (
    <div>
      <Menu mode={"horizontal"} theme={"dark"} defaultActiveFirst={"menu-1"}>
        <Menu.Item key={"menu-1"}>
          <Link to={ROUTE_PATHS.proxy.list}>Документы</Link>
        </Menu.Item>

        <SubMenu title={"Справочники"} key={"sub-1"} popupClassName="popupF721">
          <Menu.Item key={"menu-2"}>
            <Link to={ROUTE_PATHS.individuals}>Физические лица</Link>
          </Menu.Item>

          <Menu.Item key={"menu-3"}>
            <Link to={ROUTE_PATHS.organizations}>Организации</Link>
          </Menu.Item>

          <Menu.Item key={"menu-4"}>
            <Link to={ROUTE_PATHS.products}>Товары</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="link">Выход</Menu.Item>
      </Menu>

      {children}
    </div>
  );
};
