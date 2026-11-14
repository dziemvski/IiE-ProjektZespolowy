using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Wpisz adres e-mail.")]
        [EmailAddress(ErrorMessage = "Podaj poprawny adres e-mail.")]
        [Display(Name = "E-mail")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Wpisz hasło.")]
        [DataType(DataType.Password)]
        [Display(Name = "Hasło")]
        public string Password { get; set; } = string.Empty;

        [Display(Name = "Zapamiętaj mnie")] public bool RememberMe { get; set; }
    }
}