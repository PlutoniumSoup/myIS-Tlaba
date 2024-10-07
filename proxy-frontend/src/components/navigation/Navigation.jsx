import React from "react";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../router/paths";
import "./style.module.css";
import { Color } from "antd/es/color-picker";

export const Navigation = ({ children, ...props }) => {
  return (
    <div>
      <Menu mode={"horizontal"} theme={"dark"} defaultActiveFirst={"menu-1"}>
        <SubMenu title={"Документы"} key={"sub-0"} popupClassName="popupF721">
          <Menu.Item key={"menu-1-1"}>
            <Link to={`/proxy/${ROUTE_PATHS.proxy.proxy.list}`}>
              Доверенности
            </Link>
          </Menu.Item>
          <Menu.Item key={"menu-1-2"}>
            <Link to={`/act/${ROUTE_PATHS.act.act.list}`}>Акты о списании</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu title={"Справочники"} key={"sub-1"} popupClassName="popupF721">
          <Menu.ItemGroup title="Доверенность" style={{color: "gray", fontSize: "12px", padding: "16px"}}>
            <Menu.Item key={"menu-2"} style={{fontSize: "16px", paddingLeft: "0"}}>
              <Link to={`/proxy/${ROUTE_PATHS.proxy.individuals}`}>Физические лица</Link>
            </Menu.Item>

            <Menu.Item key={"menu-3"} style={{fontSize: "16px", paddingLeft: "0"}}>
              <Link to={`/proxy/${ROUTE_PATHS.proxy.organizations}`}>Организации</Link>
            </Menu.Item>

            <Menu.Item key={"menu-4"} style={{fontSize: "16px", paddingLeft: "0"}}>
              <Link to={`/proxy/${ROUTE_PATHS.proxy.products}`}>Товары</Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Акт о списании" style={{color: "gray", fontSize: "12px", padding: "16px"}}>
            <Menu.Item key={"menu-2"} style={{fontSize: "16px", paddingLeft: "0"}}>
              <Link to={`/act/${ROUTE_PATHS.act.individuals}`}>Физические лица</Link>
            </Menu.Item>

            <Menu.Item key={"menu-3"} style={{fontSize: "16px", paddingLeft: "0"}}>
              <Link to={`/act/${ROUTE_PATHS.act.companies}`}>Компании</Link>
            </Menu.Item>

            <Menu.Item key={"menu-4"} style={{fontSize: "16px", paddingLeft: "0"}}>
              <Link to={`/act/${ROUTE_PATHS.act.materials}`}>Матералы</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>

        <Menu.Item key="link">Выход</Menu.Item>
      </Menu>

      {children}
    </div>
  );
};
