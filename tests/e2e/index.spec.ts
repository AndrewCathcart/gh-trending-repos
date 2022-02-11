import { expect, Page, test } from '@playwright/test';

const checkNumFavsInLocalStorage = async (page: Page, num: number) => {
  const res = await page.evaluate(() => localStorage.getItem('favourite-repos'));
  const favs = res ? JSON.parse(res) : {};
  expect(Object.values(favs).length === num).toBeTruthy();
};

// could probably run this in parallel via test.describe.parallel but getting rate limited
test.describe('index page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('initial index page state', async ({ page }) => {
    expect(page).toHaveTitle("What's Trending?");

    await expect(page.locator('nav a').nth(0)).toHaveText("What's Trending?");
    await expect(page.locator('nav a').nth(1)).toHaveText('My Favourites');

    await expect(page.locator('main h1')).toHaveText(
      'Explore some of the most popular GitHub repositories in the past week below...',
    );
    await expect(page.locator('#language-filter')).toHaveValue('Any Language');
    await expect(page.locator('#repos li').first()).toBeVisible();
    await expect(page.locator('data-testid=previous-page')).not.toBeVisible();
    await expect(page.locator('data-testid=current-page')).toHaveText('1');
    await expect(page.locator('data-testid=next-page')).toBeVisible();

    await expect(page.locator('footer span')).toHaveText('By Andrew Cathcart');

    await checkNumFavsInLocalStorage(page, 0);
  });

  test('filtering search based on language', async ({ page }) => {
    const noFilterRepo = page.locator('#repos li').first();
    await expect(noFilterRepo).toBeVisible();
    const firstRepoName = await noFilterRepo.textContent();

    // choose new language to filter search by
    await page.selectOption('select[name="language-filter"]', 'C');

    // different repos have loaded
    const filterRepo = page.locator('#repos li').first();
    await expect(filterRepo).toBeVisible();
    const secondRepoName = await filterRepo.textContent();

    expect(firstRepoName).not.toEqual(secondRepoName);
  });

  test('navigating (forwards and backwards) loads new repos', async ({ page }) => {
    // starting page
    const pageOneFirstRepo = page.locator('#repos li').first();
    await expect(pageOneFirstRepo).toBeVisible();
    const firstRepoName = await pageOneFirstRepo.textContent();

    // next page
    await page.click('[data-testid="next-page"]');
    await expect(page.locator('data-testid=current-page')).toHaveText('2');
    await expect(page.locator('data-testid=previous-page')).toBeVisible();

    // different repos have loaded
    const pageTwoFirstRepo = page.locator('#repos li').first();
    await expect(pageTwoFirstRepo).toBeVisible();
    const secondRepoName = await pageTwoFirstRepo.textContent();

    expect(firstRepoName).not.toEqual(secondRepoName);

    // previous page
    await page.click('[data-testid="previous-page"]');
    await expect(page.locator('data-testid=current-page')).toHaveText('1');
  });

  test('favouriting and unfavouriting repos', async ({ page }) => {
    // on index page
    await page.click('[data-testid="repo-0"] button');
    await checkNumFavsInLocalStorage(page, 1);

    await page.click('[data-testid="repo-0"] button');
    await checkNumFavsInLocalStorage(page, 0);

    // add some favourites
    await page.click('[data-testid="repo-0"] button');
    await page.click('[data-testid="repo-1"] button');
    await page.click('[data-testid="repo-2"] button');
    await checkNumFavsInLocalStorage(page, 3);

    // navigate to the favourites page and check the count
    await Promise.all([page.waitForNavigation(), page.click('nav a:nth-child(2)')]);
    await checkNumFavsInLocalStorage(page, 3);
    await expect(page.locator('#repos li')).toHaveCount(3);

    await page.click('[data-testid="fav-0"] button');
    await checkNumFavsInLocalStorage(page, 2);
    await expect(page.locator('#repos li')).toHaveCount(2);
  });
});
