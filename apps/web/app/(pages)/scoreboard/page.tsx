"use client"
import { useCallback, useEffect, useState } from 'react';
import Scoreboard from '../../components/scoreboard/scoreboard';
import { HistoryService } from '../../services/history';
import { TPlayerPoint } from '../../types/player-point.type';
const Page  = ()=>{
    const [dataPlayers,setDataPlayers] = useState<TPlayerPoint[]>([])
    const getScore = useCallback(async ()=>{
        try {
            const data = await HistoryService.get_points()
            setDataPlayers(data)
        } catch (error) {
            console.log("fail",error)
        }
      
    },[])
    useEffect(()=>{getScore()},[getScore])
    return (<>
        <Scoreboard players={dataPlayers} />
    </>)
}
export default Page