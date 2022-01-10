using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelper
{
    public class MetaData
    {
        public int CurrentPage { get; set; }
        public int TotalPage { get; set; }

        //page size is the number of products show on a page
        public int PageSize { get; set; }
        
        //count is total number of product
        public int TotalCount { get; set; }
    }
}