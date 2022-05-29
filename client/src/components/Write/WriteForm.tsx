import { Grid, TextField, Typography } from "@mui/material";
import SearchForm, { SearchFormProps } from "../SearchForm";

interface WriteFormProps extends SearchFormProps {}
export default function WriteForm({
  handleChangePet,
  handleChangeSido,
  handleChangeSigungu,
  selected,
}: WriteFormProps) {
  return (
    <Grid>
      <Grid>
        <TextField
          fullWidth
          label="글 제목"
          placeholder="글의 제목을 입력해주세요"
        />
      </Grid>
      <Grid>
        <Typography>정보를 입력해 주세요</Typography>
        <SearchForm
          selected={selected}
          handleChangePet={handleChangePet}
          handleChangeSido={handleChangeSido}
          handleChangeSigungu={handleChangeSigungu}
        />
      </Grid>
    </Grid>
  );
}
