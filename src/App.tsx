import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Countries } from './components/countries';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Countries />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
