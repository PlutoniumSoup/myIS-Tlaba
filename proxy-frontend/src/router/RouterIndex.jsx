import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "../components/navigation/Navigation";
import { ProxyIndividualsView } from "../views/proxy/individuals-view/IndividualsView";
import { OrganizationsView } from "../views/proxy/organizations-view/OrganizationsView";
import { ProductsView } from "../views/proxy/product-view/ProductsView";
import { ProxyListView } from "../views/proxy/proxy-view/proxy-list-view/ProxyListView";
import { ProxyView } from "../views/proxy/proxy-view/proxy-view/ProxyView";
import { ProxyCreateView } from "../views/proxy/proxy-view/proxy-view/ProxyCreateView";

import { ActIndividualsView } from "../views/act/individuals-view/IndividualsView";
import { CompaniesView } from "../views/act/companies-view/CompaniesView";
import { MaterialsView } from "../views/act/materials-view/MaterialsView";
import { ActListView } from "../views/act/act-view/act-list-view/ActListView";
import { ActView } from "../views/act/act-view/act-view/ActView";
import { ActCreateView } from "../views/act/act-view/act-view/ActCreateView";

import { ROUTE_PATHS } from "./paths";

export const RouterIndex = (props) => {
  return (
    <BrowserRouter>
      <Navigation>
        <Routes>
          <Route path={"/proxy"} element={<ProxyListView />} />
          <Route path={`/proxy/${ROUTE_PATHS.proxy.products}`} element={<ProductsView />} />
          <Route path={`/proxy/${ROUTE_PATHS.proxy.individuals}`} element={<ProxyIndividualsView />} />
          <Route
            path={`/proxy/${ROUTE_PATHS.proxy.organizations}`}
            element={<OrganizationsView />}
          />
          <Route path={`/proxy/${ROUTE_PATHS.proxy.proxy.list}`} element={<ProxyListView />} />
          <Route path={`/proxy/${ROUTE_PATHS.proxy.proxy.proxy}`} element={<ProxyView />} />
          <Route path={`/proxy/${ROUTE_PATHS.proxy.create}`} element={<ProxyCreateView />} />
        </Routes>
        <Routes>
          <Route path={"/act"} element={<ActListView />} />
          <Route path={`/act/${ROUTE_PATHS.act.materials}`} element={<MaterialsView />} />
          <Route path={`/act/${ROUTE_PATHS.act.individuals}`} element={<ActIndividualsView />} />
          <Route
            path={`/act/${ROUTE_PATHS.act.companies}`}
            element={<CompaniesView />}
          />
          <Route path={`/act/${ROUTE_PATHS.act.act.list}`} element={<ActListView />} />
          <Route path={`/act/${ROUTE_PATHS.act.act.act}`} element={<ActView />} />
          <Route path={`/act/${ROUTE_PATHS.act.create}`} element={<ActCreateView />} />
        </Routes>
      </Navigation>
    </BrowserRouter>
  );
};
