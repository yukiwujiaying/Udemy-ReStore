import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/layout/models/product";
import ProductList from "./ProductList";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] =  useState(true);

    useEffect(()=>{
        agent.Catalog.list()
            .then(products=> setProducts(products))
            .catch(error =>console.log(error))
            .finally(()=>setLoading(false))
    },[])
    // useEffect(()=>{
    //   fetch('http://localhost:5000/api/products')
    //   .then(response=>response.json())
    //   .then(data=>setProducts(data))},
    //   [])
      //the first parameter is a call back function "fetch...)"
      //[] is the dependency if we donot have this it will run every time the component render
      //[] means this is only going to be called once 
      //get and setproduct will cause a rerender will end up with endless call so need to only call once here
   
  
    // function addProduct(){
    //   //setProduct([...products,{name:'product3',price:300.00}])
    //   setProducts(prevState=>[...prevState,
    //     {
    //       id: prevState.length+100,
    //       name:'product' + (prevState.length+1),
    //       price:(prevState.length*100)+100,
    //       brand: 'some brand',
    //       description: 'some description',
    //       pictureUrl: 'http://picsum.photo/200'
    //     }])
    // }
    if (loading) return <LoadingComponent message="Loading products..." />
    return (
        <>
            <ProductList products={products}/>
            {/* <Button variant='contained' onClick={addProduct}>Add product</Button> */}
        </>

    )
}
//same as this

// export default function Catalog(props:Props) {
//     return (
//         <>
//             <ul>
//                 {props.products.map((product) => (
//                     <li key={product.id}>{product.name}-{product.price}</li>
//                 ))}
//             </ul>
//             <button onClick={props.addProduct}>Add product</button>
//         </>

//     )
// }