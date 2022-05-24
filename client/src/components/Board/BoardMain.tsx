import React from "react";
import { Grid } from "@mui/material";

import Card, { CardProp } from "../Card";

interface BoardMainProps {
  cardItems: CardItem[];
  pathname: string;
}
type CardItem = Omit<CardProp, "pathname">;

export default function BoardMain({ cardItems, pathname }: BoardMainProps) {
  return (
    <Grid item container>
      {cardItems.map(({ author, id, title }) => (
        <Card
          key={id}
          author={author}
          pathname={pathname}
          id={id}
          title={title}
        />
      ))}
    </Grid>
  );
}
