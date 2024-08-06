export const RouteName = {
  USER_PROFILES: "/users/:id/profile",
  MY_PROFILE: "/my-profile/:id",
  BUY_VIP: "/buy-vip",
  VIP: "/vip/:id",
  CHATS: "/chats/:id/:receiverId",
  BOOST: "/buy-boost/:id/menu",
  Payment: {
    CHAPA: "/payments/chapa",
    CHAPA_SUCCESS: "/payments/chapa/success",
  },
  MATCHes: "/match/:id",
  WITHDRAW: "/withdraw/:id",
  HOME: "/home",
  PROFILE: "/profile",
  PROFILE_EDIT: "/profile/edit",
  MATCH: "/matches",
  CHAT_TAB: "/chats",
  USER_CHAT: "/chats/:id",
  USER_PROFILE: "/users/:id",
};

export const includeHomeRoute = (path: string): boolean => {
  path = path.endsWith("/") ? path.slice(0, -1) : path;
  return [
    RouteName.HOME,
    RouteName.MATCH,
    RouteName.CHAT_TAB,
    RouteName.PROFILE,
  ].includes(path);
};
