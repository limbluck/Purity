using Microsoft.AspNetCore.Mvc;
using Purity_Back.DTOs;
using Purity_Back.Services;

namespace Purity_Back.Controllers
{
    [ApiController]
    [Route("server/api/[controller]")]
    public class CoursesController : ControllerBase
    {
        private readonly ICoursesService _coursesService;
        public CoursesController(ICoursesService coursesService)
        {
            _coursesService = coursesService;
        }

        [HttpGet]
        [Route("thumbnails/{amount}rnd")]
        public async Task<ActionResult<ServiceResponce<IEnumerable<CourseThumbnailDTO>>>> GetRandomCoursesThumbtails(int amount)
        {
            if (amount > 0)
            {
                var serverResponce = await _coursesService.GetRandomCoursesThumbnails(amount);
                if (serverResponce.Success)
                {
                    return Ok(serverResponce);
                }
                else
                {
                    return StatusCode(500, serverResponce);
                }
            }
            else
            {
                return BadRequest(new ServiceResponce<IEnumerable<CourseThumbnailDTO>>()
                {
                    Success = false,
                    Message = "Requested amount of thumbnails must be greater than 0"
                });
            }
        }
    }
}
