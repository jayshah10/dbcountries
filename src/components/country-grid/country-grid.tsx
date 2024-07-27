import { AgGridReact } from 'ag-grid-react';
import { ColDef, NewValueParams, RowSelectedEvent, ValueFormatterParams } from 'ag-grid-community';
import { Country } from '../../types';
import { useMemo } from 'react';

interface CountryWithFavourites extends Country {
  favourite: boolean;
}

interface CountryGridProps {
  data: Array<Country>;
  onSelect: (country: Country) => void;
  favourites: Array<string>;
  onToggleFavourite: (cca3: string) => void;
}

const getColDefs = (onToggleFavourite: (cca3: string) => void): Array<ColDef<CountryWithFavourites>> => {
  return [
    { field: 'name.common', headerName: 'Name' },
    { field: 'flag', headerName: 'Flag' },
    { field: 'population', headerName: 'Population' },
    {
      field: 'languages',
      valueFormatter: (params: ValueFormatterParams<CountryWithFavourites>) => {
        return Object.values(params.value).join(',');
      },
    },
    {
      field: 'favourite',
      headerName: 'Favourities',
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      editable: true,
      onCellValueChanged: (event: NewValueParams<CountryWithFavourites>) => {
        onToggleFavourite(event.data.cca3);
      },
    },
  ];
};

const getCountriesWithFavourites = (
  data: Array<Country> | null | undefined,
  favourites: Array<string>,
): Array<CountryWithFavourites> => {
  return data
    ? data.map((country: Country) => ({
        ...country,
        favourite: favourites.includes(country.cca3),
      }))
    : [];
};

export const CountryGrid = (props: CountryGridProps) => {
  const { data, onSelect, favourites, onToggleFavourite } = props;
  const colDefs: Array<ColDef<CountryWithFavourites>> = useMemo<Array<ColDef<CountryWithFavourites>>>(
    () => getColDefs(onToggleFavourite),
    [onToggleFavourite],
  );
  const countryWithFavourites: Array<CountryWithFavourites> = useMemo<Array<CountryWithFavourites>>(
    () => getCountriesWithFavourites(data, favourites),
    [data, favourites],
  );

  const onRowSelected = (e: RowSelectedEvent<CountryWithFavourites>) => {
    if (e.data) {
      onSelect(e.data);
    }
  };

  console.log(countryWithFavourites);

  return (
    <div className="ag-theme-quartz-dark" style={{ height: '800px', width: '800px' }}>
      <AgGridReact<CountryWithFavourites>
        onRowSelected={onRowSelected}
        rowData={countryWithFavourites}
        columnDefs={colDefs}
      />
    </div>
  );
};
