import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Country } from '../../types';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const CountryDetail = (props: { country: Country; onClose: () => void }) => {
  return (
    <Dialog open={true}>
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <img
            width={'32px'}
            height={'32px'}
            src={props.country.flags.svg}
            alt={`${props.country.name.common} flag`}
            className="detail-country-img"
          />
          {props.country.name.common}
          <IconButton
            aria-label="close"
            onClick={props.onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>
            Top Level Domain: <span>{props.country.tld.join(',')}</span>
          </p>
          <p>
            Currencies:{' '}
            <span>
              {Object.values(props.country.currencies)
                .map((cur) => cur.name)
                .join(', ')}
            </span>
          </p>
          <p>
            Languages: <span>{Object.values(props.country.languages).join(', ')}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
