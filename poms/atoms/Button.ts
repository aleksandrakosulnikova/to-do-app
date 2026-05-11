import {expect, Locator} from "@playwright/test";

export class Button {
    readonly btnLocator: Locator;

    constructor(btnLocator: Locator) {
        this.btnLocator = btnLocator;
    }

    async click(): Promise<void> {
        await this.btnLocator.click()
    }
}