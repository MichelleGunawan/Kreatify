import { getIconLink } from "../functions/iconLinks";

var managementMainRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: getIconLink("home"),
  },
  {
    path: "/campaign",
    name: "Campaigns",
    icon: getIconLink("campaign"),
  },
  {
    path: "/influencers",
    name: "Creators",
    icon: getIconLink("creators"),
  },
  {
    path: "/contacts",
    name: "Contacts",
    icon: getIconLink("contacts"),
  },
  {
    path: "/managers",
    name: "Managers",
    icon: getIconLink("managers"),
  },

  {
    path: "/pitchlist",
    name: "Pitch Lists",
    icon: getIconLink("pitchlist"),
  },
  {
    path: "/chat",
    name: "Chat",
    icon: getIconLink("chat"),
  },
];

const talentMainRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: getIconLink("home"),
  },
  {
    path: "/campaign",
    name: "Campaigns",
    icon: getIconLink("campaign"),
  },
  {
    path: "/profile/influencer?tab=1",
    name: "Mediakit",
    icon: getIconLink("mediakit"),
  },
  {
    path: "/chat",
    name: "Chat",
    icon: getIconLink("chat"),
  },
];

export { managementMainRoutes, talentMainRoutes };
