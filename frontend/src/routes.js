import React from "react";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";



var routes = [
  {
    path: "/",
    exact: true,
    main: ({ history }) => <Login history={history} />
  },
  {
    path: "/dashboard",
    exact: false,
    main: ({ match, history }) => <Dashboard match={match} history={history} />
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />
  }
];



export default routes;
