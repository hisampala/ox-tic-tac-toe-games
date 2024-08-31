import { Grid, Paper, Avatar, Typography } from "@mui/material"
import { Session } from "next-auth"


type Prop = {
    session:Session | null
}
const  userSession = ({session}:Prop)=>{
    return (<>
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
                <Avatar
                  alt="Player O"
                  src={session?.user.image}
                  sx={{ width: 115, height: 115, mb: 2 }}
                />
                <Typography variant="h6" component="p" sx={{ color: '#0288d1' }}>
                  {session?.user.name}
                </Typography>
              </Paper>
            </Grid>
    </>)
}
export default userSession