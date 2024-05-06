namespace VantoApp.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Nazwa { get; set; }
        public string? AdresEmail { get; set; }
        public string? NumerTelefonu { get; set; }
        public DateTime DataUtworzenia
        {
            get; set;
        }
        public bool Status { get; set; }
        public string? PictureThumbnailUrl { get; set; }
        public string? PictureMediumUrl { get; set; }
        public string? PictureLargeUrl { get; set; }
    }
}
