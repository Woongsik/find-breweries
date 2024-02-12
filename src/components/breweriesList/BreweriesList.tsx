import { Link } from 'react-router-dom';
import { 
  Grid,
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button,   
  Chip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import { getColorByType } from '../../utils/ColorByBreweryType';
import { Brewery } from '../../misc/types/Brewery';
import { useFetch } from '../../hooks/useFetch';
import './BreweriesList.css';

type Props = {
  url: string
}

export default function BreweriesList(props: Props) {
  const { url } = props;
  const { data, loading, error } = useFetch<Brewery>(url);

  if (loading) {
    return (
      <div className="breweries-list">
        <p>Loading breweries....</p>
      </div>   
      );
  }

  if (error) {
    return (
      <div className="breweries-list">
        <p>Error: { error }</p>
      </div>
    )
  }
  
  return (
    <Grid container sx={{ my: 5, minHeight: '50vh' }}>
      {data.map((brewery: Brewery) => 
        <Grid item  sx={{ width: '100%' }}>
          <Card sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid gray' }}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {brewery.name} <Chip label={brewery.brewery_type} color={getColorByType(brewery.brewery_type)} variant="outlined" />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                 {brewery.city} {brewery.country}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                <Link to={`/brewery/${brewery.id}`}>
                  <InfoIcon />
                </Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>)
      }
    </Grid>
  )
}
