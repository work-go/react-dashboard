export const workspaces = [
  {
    name: "Work Go",
    domain: "app.workgo.com",
    logo: "/logo.png",
  },
  {
    name: "Google",
    domain: "google.com",
    logo: "/google.png",
  },
  {
    name: "Facebook",
    domain: "facebook.com",
    logo: "/facebook.png",
  },
  {
    name: "Amazon",
    domain: "amazon.com",
    logo: "/amazon.png",
  },
];

export type Workspace = (typeof workspaces)[number];
