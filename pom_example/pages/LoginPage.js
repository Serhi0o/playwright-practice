import { expect } from '@playwright/test';
import CommonActions from '../utils/CommonActions';

export default class LoginPage {
    constructor(page) {
        this.actions = new CommonActions(page)
        this.usernameSelector = '#username'
    }

    async openLink() {
        await this.actions.navigate('https://the-internet.herokuapp.com/login')
    }

    async login(username, password) {
        await this.actions.fill(this.usernameSelector, username)
        await this.actions.fill('#password', password)
        await this.actions.click('button[type="submit"]')
    }

    async getErrorMessage() {
        return await this.actions.getText('#flash')
    }

    async assertErrorMessage (expectedMessage){
        const actualMessage = await this.getErrorMessage()
        expect (actualMessage).toContain(expectedMessage)
    }

}

// import CommonActions from '../utils/CommonActions';

// export default class LoginPage {
//     constructor(page) {
//         this.actions = new CommonActions(page)
//         this.usernameSelector = '#username'
//         this.passwordSelector = '#password'
//         this.baseUrl = 'https://the-internet.herokuapp.com/login'
//         this.submitButtonSelector = 'button[type="submit"]'
//     }

//     async navigate() {
//         await this.actions.navigate(this.baseUrl)
//     }

//     async login(username, password) {
//         await this.actions.fill.waitForSelector(this.usernameSelector, username)
//         await this.actions.fill.waitForSelector(this.passwordSelector, password)
//         await this.actions.click.waitForSelector(this.submitButtonSelector)
//     }

// }