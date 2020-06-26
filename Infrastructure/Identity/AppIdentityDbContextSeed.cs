using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager, ILoggerFactory loggerFactory)
        {
            try
            {
                if(!userManager.Users.Any())
                {
                    var user = new AppUser
                    {
                        DisplayName = "Bob",
                        Email = "Bob@yopmail.com",
                        UserName = "Bob@yopmail.com",
                        Address = new Address
                        {
                            FirstName = "Bob",
                            LastName = "Bobbity",
                            Street = "10 The Street",
                            City = "New York",
                            State = "NY",
                            ZipCode = "90210"
                        }
                    };
                    await userManager.CreateAsync(user, "1qazZAQ!");
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<AppIdentityDbContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}
