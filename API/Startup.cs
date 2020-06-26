using API.Errors;
using API.Extensions;
using API.Helpers;
using API.Middleware;
using AutoMapper;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using System.Linq;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<StoreContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddDbContext<AppIdentityDbContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("IdentityConnection"));
            });
            services.AddSingleton<IConnectionMultiplexer>(c =>
            {
                var configurationOption = ConfigurationOptions.Parse(Configuration.GetConnectionString("Redis"), true);
                return ConnectionMultiplexer.Connect(configurationOption);
            });
            services.AddApplicationServices();
            services.AddIdentityServices(Configuration);
            //services.AddScoped<IProductRepository, ProductRepository>();
            //services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddAutoMapper(typeof(MappingProfiles));

            // Must be added after services.AddControllers();
            //services.Configure<ApiBehaviorOptions>(options =>
            //{
            //    options.InvalidModelStateResponseFactory = actionContext =>
            //    {
            //        var errors = actionContext.ModelState
            //            .Where(e => e.Value.Errors.Count > 0)
            //            .SelectMany(x => x.Value.Errors)
            //            .Select(x => x.ErrorMessage)
            //            .ToArray();

            //        var errorResponse = new ApiValidationErrorResponse { Errors = errors };

            //        return new BadRequestObjectResult(errorResponse);
            //    };
            //});
            services.AddSwaggerDocumentation();
            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SkiNet API", Version = "v1" });
            //});
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //}

            app.UseMiddleware<ExceptionMiddleware>(); // something went wrong that was not handled by the controller. retrun stacktrace as details.

            app.UseStatusCodePagesWithReExecute("/errors/{0}"); // if the route was not found goes to ErrorController

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseStaticFiles();


            //Before app.UseAuthorization();
            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            // Just above app.UseEndpoints()
            //app.UseSwagger();
            //app.UseSwaggerUI(option =>
            //{
            //    option.SwaggerEndpoint("/swagger/v1/swagger.json", "SkiNet API v1");
            //});
            app.UseSwaggerDocumentation();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
