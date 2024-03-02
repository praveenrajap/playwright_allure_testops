
exports.Loginpage = class Loginpage {

    constructor(page){
        this.page = page;
        this.baseUrl = process.env.LOGIN_PAGE_URL;
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.logInBtn = page.getByRole('button', { name: 'Login' });
    }

    async goto(){
        await this.page.goto(this.baseUrl);
    }

    async enterUsername(username){
        await this.usernameInput.fill(username);
    }

    async enterPassword(password){
        await this.passwordInput.fill(password);
    }

    async clickOnLoginBtn(){
        await this.logInBtn.click();
    }

    async clickOnLink(linkText) {
        await this.page.getByRole('link', { name: linkText }).click();
    }
}