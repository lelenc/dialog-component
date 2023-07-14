import { newE2EPage } from '@stencil/core/testing';
describe('step-question', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<step-question></step-question>');
    const element = await page.find('step-question');
    expect(element).toHaveClass('hydrated');
  });
});
//# sourceMappingURL=step-question.e2e.js.map
