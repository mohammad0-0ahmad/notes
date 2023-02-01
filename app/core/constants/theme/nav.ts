import { TabProps } from "@mui/material";

type PageType = Omit<TabProps<"a">, "label" | "icon"> & {
  label: string;
  icon?: FC<any>;
  accessibility?: string[];
};

export const pages: PageType[] = [
  {
    label: "Home",
    href: "/",
  },
].map((item) => {
  const accessibility = [][item.href];
  return {
    ...item,
    ...(accessibility ? { accessibility } : {}),
  };
});
