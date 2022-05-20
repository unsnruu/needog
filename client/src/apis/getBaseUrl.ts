export const getBaseUrl = (pathname: string) => {
  const split = pathname.split("/").filter((v) => v !== "");

  return split[0];
};
