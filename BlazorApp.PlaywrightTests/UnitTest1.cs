using Microsoft.Playwright.NUnit;
using Microsoft.Playwright;
using NUnit.Framework;
using System.Threading.Tasks;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class Tests : PageTest
{
    [Test]
    public async Task MyTest()
    {
        await Page.GotoAsync("http://localhost:5128/");
        await Page.GetByRole(AriaRole.Link, new() { Name = "Home" }).ClickAsync();
        await Page.GetByRole(AriaRole.Link, new() { Name = "Counter" }).ClickAsync();
        await Page.GetByRole(AriaRole.Link, new() { Name = "Weather" }).ClickAsync();
        await Page.GetByRole(AriaRole.Link, new() { Name = "Counter" }).ClickAsync();
        await Page.GetByRole(AriaRole.Link, new() { Name = "Home" }).ClickAsync();
        await Page.GetByRole(AriaRole.Link, new() { Name = "Counter" }).ClickAsync();
        await Page.GetByRole(AriaRole.Button, new() { Name = "Click me" }).ClickAsync();
        await Page.GetByRole(AriaRole.Button, new() { Name = "Click me" }).DblClickAsync();
        await Page.GetByRole(AriaRole.Button, new() { Name = "Click me" }).ClickAsync(new LocatorClickOptions
        {
            ClickCount = 4,
        });
        await Page.GetByRole(AriaRole.Button, new() { Name = "Click me" }).ClickAsync();
    }
}
