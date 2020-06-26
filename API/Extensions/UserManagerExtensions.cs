using Core.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindUserByClaimsPrincipleWithAddressAsync(this UserManager<AppUser> input, ClaimsPrincipal user)
        {
            var email = user.Claims.FirstOrDefault(d => d.Type == ClaimTypes.Email).Value;
            return await input.Users.Include(d => d.Address).SingleOrDefaultAsync(d => d.Email == email);
        }

        public static async Task<AppUser> FindByEmailFromClaimsPrinciple(this UserManager<AppUser> input, ClaimsPrincipal user)
        {
            var email = user.Claims.FirstOrDefault(d => d.Type == ClaimTypes.Email).Value;
            return await input.Users.SingleOrDefaultAsync(d => d.Email == email);
        }
    }
}
