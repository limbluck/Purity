using Purity_Back.DTOs;

namespace Purity_Back.Services
{
    public interface IBlogsService
    {
        Task<ServiceResponce<IEnumerable<BlogThumbnailDTO>>> GetRandomBlogsThumbnails(int amount);
    }
}
