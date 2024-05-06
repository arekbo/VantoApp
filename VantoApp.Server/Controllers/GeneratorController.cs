using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Newtonsoft.Json;
using VantoApp.Server.Data;
using VantoApp.Server.Models;

namespace VantoApp.Server.Controllers
{
    [Route("api/[controller]")]
    public class GeneratorController : Controller
    {
        private readonly AppDbContext _context;

        public GeneratorController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Generate()
        {
            try
            {
                for (var i = 0; i < 5; i++)
                {
                    using (var client = new HttpClient())
                    {
                        User user = await GetUser(client);
                        SaveUser(user);
                    }
                }

                return Ok();
            }
            catch (HttpRequestException httpRequestException)
            {
                return BadRequest($"Error generating person: {httpRequestException.Message}");
            }
        }

        private async Task<User> GetUser(HttpClient client)
        {
            // https://randomuser.me/api/
            client.BaseAddress = new Uri("https://api.randomuser.me");
            var response = await client.GetAsync("https://api.randomuser.me");
            response.EnsureSuccessStatusCode();

            var stringResult = await response.Content.ReadAsStringAsync();
            //var rawData = JsonConvert.DeserializeObject<PersonAPIResponse>(stringResult);
            RootObject person = JsonConvert.DeserializeObject<RootObject>(stringResult);
            var user = new User
            {
                Nazwa = person.results[0].name.first + " " + person.results[0].name.last,
                AdresEmail = person.results[0].email,
                NumerTelefonu = person.results[0].phone,
                PictureLargeUrl = person.results[0].picture.large,
                PictureMediumUrl = person.results[0].picture.medium,
                PictureThumbnailUrl = person.results[0].picture.thumbnail,
                DataUtworzenia = DateTime.UtcNow,
                Status = false
            };

            return user;
        }

        private async void SaveUser(User user )
        {
            user.DataUtworzenia = DateTime.UtcNow;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
    }
}
