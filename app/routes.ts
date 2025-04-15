import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [index("routes/search.tsx"),
route("wishlist", "routes/wishlist.tsx")
] satisfies RouteConfig;
