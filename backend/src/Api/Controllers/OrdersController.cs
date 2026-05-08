using Microsoft.AspNetCore.Mvc;

namespace KitchenFlow.Api.Controllers;

public class OrdersController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}