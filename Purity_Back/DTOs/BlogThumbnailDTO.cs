namespace Purity_Back.DTOs
{
    public class BlogThumbnailDTO
    {
        public string Title { get; init; }
        public string Author { get; init; }
        public string Created { get; init; }
        public byte[]? Image { get; init; }
    }
}
