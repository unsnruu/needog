export const getSigunguQuery = (sidoSelected: string | null) => {
  return sidoSelected ? sidoSelected.slice(0, 2) + "*00000" : null;
};
