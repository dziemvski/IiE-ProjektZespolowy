using Microsoft.AspNetCore.Identity;
using PodrozeMaleIDuze.Models;

namespace PodrozeMaleIDuze.Services.Auth;

public class AuthService(
    UserManager<ApplicationUser> userManager,
    SignInManager<ApplicationUser> signInManager) : IAuthService
{
    public async Task<SignInResult> LoginAsync(LoginViewModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);

        if (user is null)
            return SignInResult.Failed;

        return await signInManager.PasswordSignInAsync(
            user, model.Password, model.RememberMe, lockoutOnFailure: true);
    }

    public async Task LogoutAsync()
    {
        await signInManager.SignOutAsync();
    }
}