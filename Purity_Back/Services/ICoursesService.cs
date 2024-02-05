using Purity_Back.DTOs;

namespace Purity_Back.Services
{
    public interface ICoursesService
    {
        Task<ServiceResponce<IEnumerable<CourseThumbnailDTO>>> GetRandomCoursesThumbnails(int amount);
    }
}

