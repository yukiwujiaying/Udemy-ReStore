using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Controllers
{
    
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        
        public ProductsController(StoreContext context)
        {
            _context = context;
           
        }

        [HttpGet]
        public async Task<ActionResult<PageList<Product>>> GetProducts([FromQuery]ProductPrams productPrams)
        {
            var query = _context.Products
                        .Sort(productPrams.OrderBy)
                        .Search(productPrams.SearchTerm)
                        .Filter(productPrams.Brands,productPrams.Types)
                        .AsQueryable();  

            var products= await PageList<Product>.ToPagedlist(query, productPrams.PageNumber,productPrams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
            
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product= await _context.Products.FindAsync(id);

            if (product==null) return NotFound();
            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            //want unique brands (distinct) from the list of product
            var brands = await _context.Products.Select(p=>p.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p=>p.Type).Distinct().ToListAsync();

            return Ok(new {brands,types});
        }

    }
}