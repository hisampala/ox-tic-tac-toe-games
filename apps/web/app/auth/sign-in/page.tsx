"use client"
// pages/auth/signin.tsx
import { Button, Typography, Box, CssBaseline, Container, Card, CardContent, CardHeader } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Create a theme for customization
const theme = createTheme({
  palette: {
    primary: {
      main: '#4285F4', // Google Blue
    },
    secondary: {
      main: '#333', // GitHub Dark
    },
    background: {
      default: '#f5f5f5', // Light background
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 'bold',
          textTransform: 'none',
        },
        outlined: {
          borderWidth: '2px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          borderRadius: '16px',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h3: {
          fontWeight: 'bold',
        },
      },
    },
  },
});

const SignIn = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
    if (session) {
      router.push("/games");
    }
  }, [session, router]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: theme.palette.background.default,
          }}
        >
          <Card>
            <CardHeader
              title={<Typography variant="h3" component="h1">Tic Tac Toe Login</Typography>}
              sx={{ textAlign: 'center' }}
            />
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{
                    width: '100%',
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      borderColor: theme.palette.primary.dark,
                      backgroundColor: theme.palette.primary.light,
                    },
                  }}
                  onClick={() => signIn("google")}
                >
                  Sign in with Google
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  sx={{
                    width: '100%',
                    borderColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.main,
                    '&:hover': {
                      borderColor: theme.palette.secondary.dark,
                      backgroundColor: theme.palette.secondary.light,
                    },
                  }}
                  onClick={() => signIn("github")}
                >
                  Sign in with GitHub
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
