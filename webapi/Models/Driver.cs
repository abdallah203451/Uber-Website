using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    [Index(nameof(Phone), IsUnique = true)]
    public class Driver
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PlateNumber { get; set; }
        public string Password { get; set; }
        public string Position { get; set; }
    }
}
