import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/layout/models/product";

interface Props{
    product: Product;
}

export default function ProductCard({product}:Props){
    return(
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor:'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx:{fontWeight:'bold',color : 'primary.main'}
                }}
            />
      <CardMedia
        component="img"
        height="140"        
        image={product.pictureUrl}
        sx={{objectFit:'contain', bgcolor:'primary.light'}}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant="h5">
            £{(product.price/100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.type}/{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button size="small">View</Button>
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