import * as React from 'react';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

export default function ColorBadge(props) {
    const { nftcount } = props
  return (
    <Stack spacing={2} direction="row" style={{margin: "10px"}}>
      <Badge badgeContent={nftcount} color="primary" >
        <CatchingPokemonIcon color="" style={styles.pokemon}/>
      </Badge>
      
    </Stack>
  );
}

const styles={
    pokemon:{
        width: "50",
        height: "50"
    }
}