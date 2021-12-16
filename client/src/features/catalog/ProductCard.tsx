import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/layout/models/product";
import { currencyFormat } from "../../app/util/util";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setloading] = useState(false);
  const {setBasket} =useStoreContext();

  function handleAddItem(productId:number){
    setloading(true);
    agent.Basket.addItem(productId)
         .then(basket=>setBasket(basket))
         .catch(error => console.log(error))
         .finally(()=>setloading(false));
  }
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.main' }
        }}
      />
      <CardMedia
        component="img"
        height="140"
        image={product.pictureUrl}
        sx={{ objectFit: 'contain', bgcolor: 'primary.light' }}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant="h5">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand}/{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading} 
                        onClick={()=>handleAddItem(product.id)} 
                        size="small">
            Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>

    // <ListItem key={product.id}>
    //     <ListItemAvatar>
    //         <Avatar src={product.pictureUrl} />
    //     </ListItemAvatar>
    //     <ListItemText>
    //         {product.name}-{product.price}
    //     </ListItemText>
    // </ListItem>

  )
}