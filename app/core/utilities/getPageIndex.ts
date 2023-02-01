const pages = [{ href: "/" }];

export const getShownPageIndex = (currentPath: string): number | false => {
  for (let index = 1; index < pages.length; index++) {
    if (currentPath.includes(pages[index].href)) {
      return index;
    }
  }
  if (currentPath === pages[0].href) {
    return 0;
  }
  return false;
};
