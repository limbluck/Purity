using Dapper;
using System.Data.SqlClient;
using Purity_Back.DTOs;

namespace Purity_Back.Services
{
    public class BlogsService : IBlogsService
    {
        private readonly IConfiguration _configuration;
        public BlogsService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<ServiceResponce<IEnumerable<BlogThumbnailDTO>>> GetRandomBlogsThumbnails(int amount)
        {
            var responce = new ServiceResponce<IEnumerable<BlogThumbnailDTO>>();

            try
            {
                using var connection = new SqlConnection(_configuration.GetConnectionString("Default"));

                var recievedThumbnails = await connection.QueryAsync<BlogThumbnailDTO>(
                                           """
                                           SELECT TOP (@Amount)
                                               Blogs.Title          AS Title,
                                           	   Users.Name           AS Author,
                                           	   Blogs.CreatedDate    AS Created,
                                           	   Blogs.ImageURL       AS ImageURL
                                           FROM Blogs
                                           INNER JOIN Users ON Blogs.AuthorID = Users.ID
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