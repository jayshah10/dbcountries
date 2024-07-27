import { ChangeEventHandler, useCallback, useState } from 'react';
import { useCountries } from '../../hooks';
import { CircularProgress, Container, Stack, TextField, Card, CardContent } from '@mui/material';
import useDebounce from '../../hooks/useDebounce/useDebounce';

export const Countries = () => {
  const [searchString, setSearchString] = useState<string | undefined>();
  const debouncedSearchString = useDebounce(searchString, 500);
  const updateSearchString: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSearchString(e.target.value);
    },
    [setSearchString],
  );

  const { data, isPending, error } = useCountries(debouncedSearchString);

  return (
    <Card>
      <CardContent>
        <Container>
          <Stack spacing={2}>
            <TextField value={searchString} onChange={updateSearchString} label="Search" variant="filled" />
            {isPending && <CircularProgress />}
            {data && JSON.stringify(data)}
          </Stack>
        </Container>
      </CardContent>
    </Card>
  );
};
