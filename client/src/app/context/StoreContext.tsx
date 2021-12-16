import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../layout/models/basket";

interface StoreContextValue{
    basket: Basket | null;
    setBasket :(basket: Basket) => void;
    removeItem: (productId: number, quantity: number)  => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

// when we use useStoreContext we are able to use the StoreContextValue above
//basket, setBasket, remove item
export function useStoreContext(){
    const context = useContext(StoreContext);

    if (context == undefined){
        throw Error('Oops - we do not seem to be inside the provider');
    }

    return context;
}

// anything we are going to use in storeprovider is going to be children
//passing {children} as a property, PropsWithchildren is a react type to identify what this object is
export function StoreProvider({children}:PropsWithChildren<any>){
    const [basket, setBasket] = useState<Basket| null>(null);

    function removeItem(productId: number, quantity: number){
        if (!basket) return;

        //create a new copy of state will replace the prevstate at the end
        const items =[...basket.items];

        //e.g want to remove items with index 3 in array, findIndex() return 3
        const itemIndex = items.findIndex(i=>i.productId==productId);

        if (itemIndex >=0){
            items[itemIndex].quantity-=quantity;

            //if quantity=0, At position 3, remove 1 items(items with index 3) 
            if(items[itemIndex].quantity===0) items.splice(itemIndex,1);

            setBasket(prevState =>{
                //return basket inculde the item and replace it with new items array
                //! is just for safty check from typescript
                return{...prevState!,items}
            })
        }
    }

    return (
        //value is what are we going to provide for the children in storeContext
        //value is what we have in the interface
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}