using Microsoft.AspNetCore.Identity;
using PodrozeMaleIDuze.Models;

namespace PodrozeMaleIDuze.Services.Auth;

public interface IAuthService
{
    Task<SignInResult> LoginAsync(LoginViewModel model);
    Task LogoutAsync();
}