using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Timelogger.Entities;

namespace Timelogger.Api.Controllers
{
    [Route("api/registrations")]
    public class RegistrationsController : ControllerBase
    {
        private ApiContext _context;

        public RegistrationsController(ApiContext context)
        {
            _context = context;
        }

        // [HttpGet]
        // [Route("{id}")]
        // public Project GetProject(int id)
        // {
        //     var projects = _context.Projects;
        //     var Registrations = _context.Registrations;
        //     foreach (Time_registration registration in Registrations)
        //     {
        //         foreach (Project project in projects)
        //         {
        //             if (project.Id == registration.Project_id)
        //             {
        //                 if (project.Time_registrations == null) project.Time_registrations = new List<Time_registration> { registration };
        //                 else project.Time_registrations.Add(registration);
        //             }
        //         };
        //     };
        //     var ProjectWithId = new Project();
        //     foreach (Project prj in projects)
        //     {
        //         if (prj.Id == id) ProjectWithId = prj;
        //     }
        //     return ProjectWithId;
        // }

        // GET api/projects
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Registrations);
        }
        [HttpPost]
        public void Post([FromBody] Time_registration time_registration)
        {
            _context.Registrations.Add(time_registration);
            _context.SaveChanges();
        }
    }
}