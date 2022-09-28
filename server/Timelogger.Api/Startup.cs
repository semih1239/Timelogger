using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Timelogger.Entities;
using System;
using System.Collections.Generic;
namespace Timelogger.Api
{
    public class Startup
    {
        private readonly IWebHostEnvironment _environment;
        public IConfigurationRoot Configuration { get; }

        public Startup(IWebHostEnvironment env)
        {
            _environment = env;

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContext<ApiContext>(opt => opt.UseInMemoryDatabase("e-conomic interview"));
            services.AddLogging(builder =>
            {
                builder.AddConsole();
                builder.AddDebug();
            });

            services.AddMvc(options => options.EnableEndpointRouting = false);

            if (_environment.IsDevelopment())
            {
                services.AddCors();
            }
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseCors(builder => builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true)
                    .AllowCredentials());
            }

            app.UseMvc();


            var serviceScopeFactory = app.ApplicationServices.GetService<IServiceScopeFactory>();
            using (var scope = serviceScopeFactory.CreateScope())
            {
                SeedDatabase(scope);
            }
        }

        private static void SeedDatabase(IServiceScope scope)
        {
            var context = scope.ServiceProvider.GetService<ApiContext>();

            List<Time_registration> registrations = new List<Time_registration>
            {
                new Time_registration
                {
                    Project_id=1,
                    Description="Frontend Modal Component",
                    Time = 30,
                    Date = new DateTime(2022,09,22,18,24,12)
                },
                new Time_registration
                {
                    Project_id=1,
                    Description="Frontend Table Component",
                    Time = 65,
                    Date = new DateTime(2022,09,22,18,24,12)
                },
                new Time_registration
                {
                    Project_id=2,
                    Description="Application Deployment",
                    Time = 35,
                    Date = new DateTime(2022,09,22,18,24,12)
                },
                new Time_registration
                {
                    Project_id=2,
                    Description="Database Integration",
                    Time = 50,
                    Date = new DateTime(2022,09,22,18,24,12)
                },
                new Time_registration
                {
                    Project_id=2,
                    Description="Homepage Api",
                    Time = 60,
                    Date = new DateTime(2022,09,22,18,24,12)
                },
                new Time_registration
                {
                    Project_id=3,
                    Description="Homepage Api",
                    Time = 40,
                    Date = new DateTime(2022,09,24,18,24,12)
                }
            };

            List<Project> projects = new List<Project>{
                new Project
                {
                    Id = 1,
                    Name = "E-conomic Task",
                    Deadline = new DateTime(2022,10,01,23,59,59),
                    Status = true
                },
                new Project
                {
                    Id = 2,
                    Name = "Web App",
                    Deadline = new DateTime(2022,09,30,23,59,59),
                    Status = false
                },
                new Project
                {
                    Id = 3,
                    Name = "AWS Course",
                    Deadline = new DateTime(2022,10,02,23,59,59),
                    Status = false
                },
                };

            projects.ForEach((project) =>
            {
                context.Projects.Add(project);
            });

            registrations.ForEach((registration) =>
            {
                context.Registrations.Add(registration);
            });

            context.SaveChanges();
        }
    }
}