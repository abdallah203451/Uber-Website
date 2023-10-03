using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _authContext;

        public UserController(ApplicationDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Phone == userObj.Phone && x.Password == userObj.Password);
            if (user == null)
                return NotFound(new { Message = "User Not Found!" });
            return Ok(new
            {
                Message = "Login Success!"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Phone == userObj.Phone);
            if (user != null)
                return NotFound(new { Message = "This phone number already exist!" });
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered!"
            });
        }
    }
}
