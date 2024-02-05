using Microsoft.AspNetCore.Mvc;
using Purity_Back.DTOs;
using Purity_Back.Services;

namespace Purity_Back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogsController : ControllerBase
    {
        private readonly IBlogsService _blogsService;
        public BlogsController(IBlogsService blogsService)
        {
            _blogsService = blogsService;
        }

        [HttpGet]
        [Route("thumbnails/{amount}rnd")]
        public async Task<ActionResult<ServiceResponce<IEnumerable<BlogThumbnailDTO>>>> GetRandomBlogsThumbtails(int amount)
        {
            if (amount > 0)
            {
                var serverResponce = await _blogsService.GetRandomBlogsThumbnails(amount);
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
