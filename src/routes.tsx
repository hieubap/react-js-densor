import Login from "views/Login";
import Manager from "views/Device";

export const publicRoutes = [
  {
    path: "/login",
    name: "",
    icon: "objects_spaceship",
    component: <Login />,
    layout: "/p",
  },
];

var dashRoutes = [
  {
    path: "/device",
    name: "",
    icon: "objects_spaceship",
    component: <Manager />,
    layout: "admin",
    roles: [],
  },
];
export default dashRoutes;
