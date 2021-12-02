import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home";
import About from "@/views/About";
import NotFound from "@/views/NotFound";

const history = createWebHistory();

export default createRouter({
  history,

  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },

    // el error not found
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFound,
    },
  ],
});
