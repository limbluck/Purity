using Dapper;
using System.Data.SqlClient;
using Purity_Back.DTOs;

namespace Purity_Back.Services
{
    public class CoursesService : ICoursesService
    {
        private readonly IConfiguration _configuration;
        public CoursesService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<ServiceResponce<IEnumerable<CourseThumbnailDTO>>> GetRandomCoursesThumbnails(int amount)
        {
            var responce = new ServiceResponce<IEnumerable<CourseThumbnailDTO>>();

            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

                var recievedThumbnails = await connection.QueryAsync<CourseThumbnailDTO>(
                                           """
                                           SELECT TOP (@Amount)
                                               Courses.Title          AS Title,
                                               Courses.Category       AS Category,
                                               Courses.Enrolled       AS Enrolled,
                                               Courses.Price          AS Price,
                                               Courses.Summary        AS Summary,
                                               Courses.Image          AS Image
                                           FROM Courses
                                           ORDER BY newid()
                                           """,
                                           new { Amount = amount }
                                       );

                responce.Data = recievedThumbnails;
            }
            catch (Exception ex)
            {
                responce.Success = false;
                responce.Message = "SQL error: " + ex.Message;
                return responce;
            }

            if (responce.Data.Count() != amount)
            {
                responce.Success = false;
                responce.Message = $"Service error: Requested - {amount} thumbnails. Transferred - {responce.Data.Count()} thumbnails";
                return responce;
            }

            return responce;
        }
    }
}