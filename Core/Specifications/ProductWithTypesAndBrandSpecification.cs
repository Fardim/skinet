using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Core.Specifications
{
    public class ProductWithTypesAndBrandSpecification : BaseSpecification<Product>
    {
        public ProductWithTypesAndBrandSpecification()
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(X => X.ProductType);
        }

        public ProductWithTypesAndBrandSpecification(int id): base(x=> x.Id == id)
        {
            AddInclude(x => x.ProductBrand);
            AddInclude(X => X.ProductType);
        }
    }
}
