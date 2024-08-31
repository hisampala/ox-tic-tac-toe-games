/* eslint-disable no-unused-vars */
"use client"
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Typography, Grid, Paper, Box, Snackbar, Alert, Avatar } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { gameService } from '../../services';
import { TypeTicTacToe } from '../../types/tictactoe.type';
import UserSession from '../user-session/user-session';



const Game: FC = () => {
  const [cells, setCells] = useState<Array<TypeTicTacToe>>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [openAlertWinner, setOpenAlertWinner] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [comScore, setComScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false); 
  const [roundMessage, setRoundMessage] = useState(''); // เพิ่มสถานะสำหรับข้อความรอบ
  const [openRoundAlert, setOpenRoundAlert] = useState(false); // เพิ่มสถานะสำหรับแสดงรอบ Alert
  const { data: session } = useSession();
  const router = useRouter();
  const getPoint = useCallback(async()=>{
    if(session){
      const {point} = await gameService.get_point(session)
      setComScore(point.lost)
      setPlayerScore(point.win)
    }
      
  },[])
  useEffect(()=>{
    getPoint()
  },[getPoint])
  const handleCellClick = (index: number) => {
    if (cells[index] || !isPlayerTurn || gameEnded) return;
    const updatedCells = [...cells];
    updatedCells[index] = 'O';
    setCells(updatedCells);
    setOpenRoundAlert(false);
    if (gameService.check_winner('O', updatedCells)) {
      setAlertMessage('Player (O) wins!');
      setOpenAlertWinner(true);
      setPlayerScore(prevScore => prevScore + 1);
      setGameEnded(true);
      if(session){
        gameService.save(true,session).then(()=> console.log("save data success")).catch(console.error)
      }
      return;
    }
  
    setRoundMessage('Com (X) Turn');
    setOpenRoundAlert(true);
    setIsPlayerTurn(false);
  
    setTimeout(() => {
      const bestMove = gameService.get_com_move(updatedCells);
      if (bestMove !== -1) {
        updatedCells[bestMove] = 'X';
        setCells(updatedCells);
  
        if (gameService.check_winner('X', updatedCells)) {
          setAlertMessage('Com (X) wins!');
          setOpenAlertWinner(true);
          setComScore(prevScore => prevScore + 1);
          setGameEnded(true);
          if(session){
            gameService.save(false,session).then(()=> console.log("save data success")).catch(console.error)
          }
          return;
        } else {
          setRoundMessage('Player (O) Turn');
          setOpenRoundAlert(true);
        }
      }
  
      if (updatedCells.every(cell => cell !== null) && !gameEnded) {
        setAlertMessage('It\'s a draw!');
        setOpenAlertWinner(true);
        setGameEnded(true);
        setIsPlayerTurn(true);
      } else {
        setIsPlayerTurn(true);
      }
    }, 1000);
  };

  const handleCloseAlert = () => {
    setOpenAlertWinner(false);
    setCells(Array(9).fill(null)); 
    setGameEnded(false); 
  };
  const handleNavigateToSCoreBoard = () => {
    router.push("/scoreboard");
  };
  const handleExitGame = () => {
    setCells(Array(9).fill(null)); 
    setPlayerScore(0); 
    setComScore(0); 
    setGameEnded(false); 
    signOut({
      redirect: true
    });
  };
  console.log({session})
  if (!session) {
    router.push("/auth/sign-in");
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        backgroundColor: '#e3f2fd', 
        minHeight: '100vh',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#0288d1' }}>
        Games Tic Tac Toe
      </Typography>
      <Grid container spacing={5} sx={{ maxWidth: 900 }}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 2,
              backgroundColor: '#bbdefb',
              width: '100%',
              minHeight: '400px',
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
                width: '100%',
                height: '100%',
              }}
            >
              {cells.map((cell, index) => (
                <Box
                  key={index}
                  onClick={() => handleCellClick(index)}
                  sx={{
                    width: '100%',
                    height: { xs: 80, sm: 100 }, 
                    backgroundColor: '#ffffff',
                    border: '2px solid #0288d1', 
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { xs: 24, sm: 32 }, 
                    fontWeight: 'bold',
                    color: '#0288d1', 
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, transform 0.3s',
                    '&:hover': {
                      backgroundColor: '#e1f5fe', 
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  {cell}
                </Box>
              ))}
            </Box>
            <Grid container sx={{ marginTop: 2 }}>
              <Grid item xs={6}>
                <Typography variant="h6" component="p" sx={{ color: '#0288d1', textAlign: 'left' }}>
                  Player (O) - Score: {playerScore}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" component="p" sx={{ color: '#0288d1', textAlign: 'right' }}>
                  Com (X) - Score: {comScore}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container direction="column" spacing={2}>
            <UserSession session={session}></UserSession>
            <Grid item>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 2,
                  backgroundColor: '#bbdefb',
                  width: '100%',
                  minHeight: '150px', 
                }}
              >
                 <Button variant="contained" color="primary" onClick={handleNavigateToSCoreBoard} sx={{ backgroundColor: '#0288d1', mb: 1 }}>
                   SCOREBOARD
                </Button>
                <Button variant="contained" color="primary" onClick={handleCloseAlert} sx={{ backgroundColor: '#0288d1', mb: 1 }}>
                  PLAY AGAIN
                </Button>
                <Button variant="outlined" color="primary" onClick={handleExitGame} sx={{ color: '#0288d1', borderColor: '#0288d1' }}>
                  EXIT GAME
                </Button>
               
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={openAlertWinner}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert}  severity={alertMessage.includes('wins') ? 'success' : 'error'}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openRoundAlert}
        autoHideDuration={1500}
        onClose={() => setOpenRoundAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenRoundAlert(false)} severity="warning" >
          {roundMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Game;
