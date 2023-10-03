using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly ApplicationDbContext _authContext;

        public DriverController(ApplicationDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpPost("driverAuthenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Driver driverObj)
        {
            if (driverObj == null)
                return BadRequest();
            var driver = await _authContext.Drivers.FirstOrDefaultAsync(x => x.Phone == driverObj.Phone && x.Password == driverObj.Password);
            if (driver == null)
                return NotFound(new { Message = "User Not Found!" });
            return Ok(new
            {
                Message = "Login Success!"
            });
        }

        [HttpPost("driverRegister")]
        public async Task<IActionResult> RegisterDriver([FromBody] Driver driverObj)
        {
            if (driverObj == null)
                return BadRequest();
            var driver = await _authContext.Drivers.FirstOrDefaultAsync(x => x.Phone == driverObj.Phone);
            if (driver != null)
                return NotFound(new { Message = "This phone number already exist!" });
            await _authContext.Drivers.AddAsync(driverObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered!"
            });
        }
    }
}
