import { test, expect } from '@playwright/test';
import {ToDoPage} from "../poms/pages/ToDoPage";

test('Create to-do item', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.checkToDoItemsVisible(0)
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(1);
});

test('Create 2 to-do items', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem();
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(2);
});

test('Activate card test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const createdToDo = await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(1);

  await createdToDo.activate();
  await createdToDo.checkIsActivated();
});

test('Activate card test - search by text', async ({ page }) => {
  const cardText = 'test text';
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.createToDoItem(cardText);
  await toDoPage.checkToDoItemsVisible(1);
  const createdToDo = toDoPage.getToDoItemByText(cardText)

  await createdToDo.activate();
  await createdToDo.checkIsActivated();
});

test('Delete card test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const createdToDo = await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(1);

  await createdToDo.deleteItem();
  await toDoPage.checkToDoItemsVisible(0);
});

test('Clear completed items test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();

  const toDo1 = await toDoPage.createToDoItem();
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisible(2);

  await toDo1.activate();
  await toDo1.checkIsActivated();

  await toDoPage.clearCompletedItem();
  await toDoPage.checkToDoItemsVisible(1);
});

test('Completed list test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();

  const toDo1 = await toDoPage.createToDoItem();
  await toDoPage.createToDoItem();

  await toDo1.activate();
  await toDo1.checkIsActivated();

  await toDoPage.completedItem();
  await toDoPage.checkCompletedItems(1);
});

test('Active list test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();

  const toDo1 = await toDoPage.createToDoItem('ToDo 1');
  await toDoPage.createToDoItem('ToDo 2');

  await toDo1.activate();
  await toDo1.checkIsActivated();

  await toDoPage.activeItemsCheck();
  const activeToDo = toDoPage.getToDoItemByText('ToDo 2');
  await activeToDo.checkCardVisible(true);
  const completedToDo = toDoPage.getToDoItemByText('ToDo 1');
  await completedToDo.checkCardVisible(false);
});


test('All list test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();

  const toDo1 = await toDoPage.createToDoItem('ToDo 1');
  await toDoPage.createToDoItem('ToDo 2');

  await toDo1.activate();
  await toDo1.checkIsActivated();

  await toDoPage.activeItemsCheck();
  await toDoPage.allItemsCheck();

  const activeToDo = toDoPage.getToDoItemByText('ToDo 1');
  await activeToDo.checkCardVisible(true);
  const completedToDo = toDoPage.getToDoItemByText('ToDo 2');
  await completedToDo.checkCardVisible(true);
});