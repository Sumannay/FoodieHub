import { Outlet } from "react-router-dom";
import PageTopbar from "./PageTopbar";
import SiteFooter from "./SiteFooter";

export default function BrowseLayout() {
  return <><PageTopbar /><Outlet /><SiteFooter /></>;
}
