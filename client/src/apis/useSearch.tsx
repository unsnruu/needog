import React, { useEffect, useMemo, useReducer } from "react";
import { OptionItem } from "../components/Select";

import { getSigunguQuery } from "../common";
import { petInitItems } from "../data";
import getRegion from "./getRegion";
import deepClone from "./deepCloneObject";
import axios from "axios";

interface SearchItem {
  selected: string | null;
  items: OptionItem[];
}
interface SearchState {
  pet: SearchItem;
  sido: SearchItem;
  sigungu: SearchItem;
}
type SearchAction =
  | { type: "INIT_SIDO"; payload: OptionItem[] }
  | { type: "INIT_SIGUNGU"; payload: OptionItem[] }
  | { type: "UPDATE_PET"; payload: string }
  | { type: "UPDATE_SIDO"; payload: string }
  | { type: "UPDATE_SIGUNGU"; payload: string };

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  const newState = deepClone(state) as SearchState;

  switch (action.type) {
    case "INIT_SIDO": {
      newState.sido.items = action.payload;
      return newState;
    }
    case "INIT_SIGUNGU": {
      newState.sigungu.items = action.payload;
      return newState;
    }
    case "UPDATE_PET": {
      newState.pet.selected = action.payload;
      return newState;
    }
    case "UPDATE_SIDO": {
      newState.sido.selected = action.payload;
      return newState;
    }
    case "UPDATE_SIGUNGU":
      newState.sigungu.selected = action.payload;
      return newState;

    default:
      return state;
  }
}

export default function useSearch() {
  // const [sido, setSido] = useRegion("??00000000");
  // const [sigungu, setSigungu] = useRegion(getSigunguQuery(sido.selected))
  const searchInitialState: SearchState = {
    pet: {
      selected: null,
      items: petInitItems,
    },
    sido: {
      selected: null,
      items: [],
    },
    sigungu: {
      selected: null,
      items: [],
    },
  };
  const [searchState, searchDispatch] = useReducer(
    searchReducer,
    searchInitialState
  );

  let sidoQuery = useMemo(() => "??00000000", []);

  useEffect(() => {
    const source = axios.CancelToken.source();

    getRegion(sidoQuery)
      .then((sidoItems) => {
        if (!sidoItems) return;
        searchDispatch({ type: "INIT_SIDO", payload: sidoItems });
      })
      .catch((err) => console.error(err));

    return () => source.cancel("Error on getting initial sido");
  }, [sidoQuery]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (!searchState.sido.selected) return;
    getRegion(getSigunguQuery(searchState.sido.selected)).then(
      (sigunguItem) => {
        if (!sigunguItem) return;
        searchDispatch({ type: "INIT_SIGUNGU", payload: sigunguItem });
      }
    );

    return () => source.cancel();
  }, [searchState.sido.selected]);

  return [searchState, searchDispatch] as [
    SearchState,
    React.Dispatch<SearchAction>
  ];
}
