using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Wpisz e-mail albo nazwę użytkownika.")]
        [Display(Name = "E-mail lub nazwa użytkownika")]
        public string Login { get; set; } = string.Empty;

        [Required(ErrorMessage = "Wpisz hasło.")]
        [DataType(DataType.Password)]
        [Display(Name = "Hasło")]
        public string Password { get; set; } = string.Empty;

        [Display(Name = "Zapamiętaj mnie")]
        public bool RememberMe { get; set; }
    }
}