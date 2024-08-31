import React, { FC } from 'react';
import { Typography, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Avatar, Button } from '@mui/material';
import { useRouter } from 'next/navigation'; // ใช้ useRouter สำหรับการนำทาง
import { TPlayerPoint } from '../../types/player-point.type';

interface LeaderboardProps {
  players: TPlayerPoint[];
}

const Scoreboard: FC<LeaderboardProps> = ({ players }) => {
  const router = useRouter(); // ใช้ useRouter สำหรับการนำทาง

  // Sort players by score in descending order
  const sortedPlayers = [...players].sort((a, b) => b.point - a.point);

  const handleBackClick = () => {
    router.back(); // นำทางกลับไปหน้าก่อนหน้า
  };

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
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#0288d1' }}>
        Scoreboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBackClick}
        sx={{ mb: 2, backgroundColor: '#0288d1', '&:hover': { backgroundColor: '#0277bd' } }}
      >
        Back
      </Button>
      <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 800, marginTop: 2, backgroundColor: '#bbdefb' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#0288d1' }}>
                <TableSortLabel>Rank</TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#0288d1' }}>
                <TableSortLabel>Image</TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#0288d1' }}>
                <TableSortLabel>Name</TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#0288d1' }}>
                <TableSortLabel>Score</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPlayers.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar
                    src={player.image}
                    alt={player.name}
                    sx={{ width: 40, height: 40 }}
                  />
                </TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.point}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Scoreboard;
