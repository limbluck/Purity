namespace Purity_Back.DTOs
{
    public class CourseThumbnailDTO
    {
        public string Title { get; init; }
        public string Category { get; init; }
        public int Enrolled { get; init; }
        public float? Price { get; init; }
        public string? Summary { get; init; }
        public string? ImageURL { get; init; }
    }
}