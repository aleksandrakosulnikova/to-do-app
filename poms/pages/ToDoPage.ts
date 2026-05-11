import {expect, Locator, Page} from "@playwright/test";
import {ToDoItem} from "../organisms/ToDoItem";
import {faker} from "@faker-js/faker/locale/en";

export class ToDoPage {
    readonly page: Page;
    private readonly url = 'https://todo-app.tallinn-learning.ee/';
    readonly header: Locator;
    readonly main: Locator;
    readonly footer: Locator;
    readonly todoItemInput: Locator;
    readonly allBtn: Locator;
    readonly activeBtn: Locator;
    readonly completedBtn: Locator;
    readonly clearCompletedBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.getByTestId('header');
        this.main = page.getByTestId('main');
        this.footer = page.getByTestId('footer');
        this.todoItemInput = this.header.getByTestId('text-input');
        this.allBtn = this.footer.locator('[href="#/"]');
        this.activeBtn = this.footer.locator("[href$=active]");
        this.completedBtn = this.footer.locator('.selected');
        this.clearCompletedBtn = this.footer.locator('.clear-completed');
    }

    getToDoItemByIndex(index: number): ToDoItem {
        return new ToDoItem(this.main.getByTestId('todo-item').nth(index));
    }

    getToDoItemByText(text: string): ToDoItem {
        return new ToDoItem(this.main.locator('[data-testid="todo-item"]', {hasText: text}));
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async createToDoItem(text?: string): Promise<ToDoItem> {
        await this.todoItemInput.fill(text == undefined ? faker.word.words(2) : text);
        await this.todoItemInput.press('Enter');
        const todoItems = this.main.getByTestId('todo-item');
        const itemsCount = await todoItems.count();
        return this.getToDoItemByIndex(itemsCount - 1);
    }

    async checkToDoItemsVisible(expectedCount: number, visible = true): Promise<void> {
        const itemCount = await this.main.getByTestId('todo-item').count();
        expect(itemCount).toBe(expectedCount);
    }

    async completedItem(): Promise<void> {
        await this.completedBtn.click();
    }

    async clearCompletedItem(): Promise<void> {
        await this.clearCompletedBtn.click();
    }

    async checkCompletedItems(expectedCount: number, visible = true): Promise<void> {
        const completedItemCount = await this.main.locator('.completed').count();
        expect(completedItemCount).toBe(expectedCount);
    }

    async activeItemsCheck(): Promise<void> {
        await this.activeBtn.click();
    }

    async allItemsCheck(): Promise<void> {
        await this.allBtn.click();
    }
}

