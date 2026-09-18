import { test, expect } from '@playwright/test';
import fs from 'fs';
 
//file upload
test('Upload a file', async ({ page }, testInfo) => {
  await page.goto('https://demoqa.com/upload-download');
  const filePath = testInfo.outputPath('upload-sample.txt');
  fs.writeFileSync(filePath,'This is a Playwright upload test file.');
  await page.locator('#uploadFile').setInputFiles(filePath);
  //verify uploaded file
  await expect(page.locator('#uploadedFilePath')).toContainText('upload-sample.txt');
});

//multiple file upload
test('Upload multiple files', async ({ page }, testInfo) => {
  await page.setContent(`<input type="file" id="multipleFiles" multiple>`);
  const file1 = testInfo.outputPath('file1.txt');
  const file2 = testInfo.outputPath('file2.txt');
  fs.writeFileSync(file1, 'First file');
  fs.writeFileSync(file2, 'Second file');
  const upload = page.locator('#multipleFiles');
  await upload.setInputFiles([
    file1,
    file2
  ]);
  const fileCount = await upload.evaluate((input: HTMLInputElement) => input.files?.length);
  expect(fileCount).toBe(2);
});

test('Clear selected file', async ({ page }, testInfo) => {
  await page.goto('https://demoqa.com/upload-download');
  const filePath = testInfo.outputPath('clear-test.txt');
  fs.writeFileSync(filePath, 'Test file');
  const upload = page.locator('#uploadFile');
  await upload.setInputFiles(filePath);
  //clear selected file
  await upload.setInputFiles([]);
});

//file download
test('Download a file', async ({ page }, testInfo) => {
  await page.goto('https://demoqa.com/upload-download');
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#downloadButton').click();
  const download = await downloadPromise;
  const fileName = download.suggestedFilename();
  console.log('Downloaded file:',fileName);
  //save downloaded file
  const savePath = testInfo.outputPath(fileName);
  await download.saveAs(savePath);
  //verify file exists
  expect(fs.existsSync(savePath)).toBeTruthy();
  //verify file is not empty
  const stats = fs.statSync(savePath);
  expect(stats.size).toBeGreaterThan(0);
});