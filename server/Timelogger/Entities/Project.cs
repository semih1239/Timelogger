using System;
using System.Collections.Generic;
namespace Timelogger.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Deadline { get; set; }
        public List<Time_registration> Time_registrations { get; set; }
        public bool Status { get; set; }
    }
    public class Time_registration
    {
        public int Id { get; set; }
        public int Project_id { get; set; }
        public string Description { get; set; }
        public int Time { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}
