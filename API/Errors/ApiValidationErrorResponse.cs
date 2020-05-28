using System.Collections;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiValidationErrorResponse : ApiResponse
    {
        public ApiValidationErrorResponse() : base(400) // Because validation error response are always 400 badrequest
        {
        }
        public IEnumerable<string> Errors { get; set; }
    }
}
