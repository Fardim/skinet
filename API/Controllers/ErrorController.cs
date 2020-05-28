using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("errors/{code}")] //overriding the BaseApiController Route Attribute
    [ApiExplorerSettings(IgnoreApi = true)] // Swagger gives error because ErrorController.Error doesnot have httpmethod. To ignore this method from swagger api documentation.
    public class ErrorController : BaseApiController
    {
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}
