import { newE2EPage } from '@stencil/core/testing';
describe('description-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<description-component></description-component>');
    const element = await page.find('description-component');
    expect(element).toHaveClass('hydrated');
  });
});
//# sourceMappingURL=description-component.e2e.js.map
