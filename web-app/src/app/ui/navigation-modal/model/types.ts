type BaseNavItem = {
  text: string;
};

type LinkNavItem = BaseNavItem & {
  to: string;
  dropDownList?: never;
};

type DropdownNavItem = BaseNavItem & {
  to?: never;

  dropDownList: {
    to: string;
    text: string;
  }[];
};

export type NavItem = LinkNavItem | DropdownNavItem;
