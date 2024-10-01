using Microsoft.Playwright.NUnit;
using Microsoft.Playwright;
using NUnit.Framework;

[Parallelizable(ParallelScope.Self)]
[TestFixture]
public class Tests : PageTest
{

    [Test]
    public async Task MyTest()
    {

        // Launch browser in headed mode explicitly in this test
        var browser = await Playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
        {
            Headless = false // Set Headless to false to see the browser window
        });

        // Create a new browser context
        var context = await browser.NewContextAsync();

        // Create a new page
        var page = await context.NewPageAsync();


        await Page.GotoAsync("http://localhost:5128/");
        await Page.GetByRole(AriaRole.Heading, new() { Name = "Hello, world!" }).ClickAsync();
        await Page.GetByText("BlazorApp Hello, world!").ClickAsync();
        await Page.GetByRole(AriaRole.Link, new() { Name = "Counter" }).ClickAsync();
        await Page.GetByRole(AriaRole.Link, new() { Name = "Weather" }).ClickAsync();
        await Page.GetByRole(AriaRole.Link, new() { Name = "Counter" }).ClickAsync();
        await Page.GetByRole(AriaRole.Button, new() { Name = "Click me" }).DblClickAsync();


        // Close the browser after the test
        await browser.CloseAsync();
    }
}
