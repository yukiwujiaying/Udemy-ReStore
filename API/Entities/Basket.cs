using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id{get; set;}
        public string BuyerId{get; set;}
        public List<BasketItem> Items {get; set;} = new();

        public void AddItem(Product product, int quantity)
        {
            
            if(Items.All(item => item.ProductId != product.Id))
            {
                //if the item is not in basket before add it in basketitem
                //a basketitem can only have one item
                Items.Add(new BasketItem{Product = product, Quantity=quantity});
            }
            //The FirstOrDefault operator is used to return the first element of the given collection or sequence. 
            //Or it can also return the first element according to the given condition.
            var existingItem = Items.FirstOrDefault(item=>item.ProductId==product.Id);
            if (existingItem!=null) existingItem.Quantity = existingItem.Quantity+quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            var item =Items.FirstOrDefault(item=>item.ProductId==productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity==0) Items.Remove(item);
        }
    }
}