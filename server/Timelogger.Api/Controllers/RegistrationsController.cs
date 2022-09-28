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

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Registrations);
        }
        [HttpPost]
        public IActionResult Post([FromBody] Time_registration time_registration)
        {
            if (time_registration.Time >= 30 & time_registration.Description != null)
            {
                _context.Registrations.Add(time_registration);
                _context.SaveChanges();
                return Ok(time_registration);
            }
            return BadRequest();
        }
    }
}