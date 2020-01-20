import Vue from "vue";
import Router from "vue-router";
import Farms from "@/views/Farms";
import FarmOverview from "@/views/FarmOverview";
import FarmFieldOverview from "@/views/FarmFieldOverview";
import Equipment from "@/views/Equipment";
import Reports from "@/views/Reports";
import Services from "@/views/Services";
import BadGateway from "@/views/BadGateway";
import Login from "@/views/Login";
import { userService } from "../services/user.service";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/farms",
      name: "Farms",
      props: { page: 0 },
      component: Farms,
      alias: "/"
    },
    {
      path: "/farms/:id",
      name: "FarmOverview",
      component: FarmOverview
    },
    {
      path: "/farms/:farmId/field/:fieldId",
      name: "FarmFieldOverview",
      component: FarmFieldOverview
    },
    {
      path: "/services",
      name: "Services",
      props: { page: 1 },
      component: Services
    },
    {
      path: "/equipment",
      name: "Equipment",
      props: { page: 2 },
      component: Equipment
    },
    {
      path: "/reports",
      name: "Reports",
      props: { page: 3 },
      component: Reports
    },
    {
      path: "/404",
      name: "BadGateway",
      props: { page: 4 },
      component: BadGateway
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = userService.getLoggedInUser();
  const currentPath = to.path;
  if (!currentUser && currentPath !== "/login") next("login");
  else {
    if(FS){
      const email = currentUser && currentUser.email
      FS.identify(email, {
        email
      });
    }
    next();
  }
});

export default router;
