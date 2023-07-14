import { newE2EPage } from '@stencil/core/testing';
describe('result-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<result-component></result-component>');
    const element = await page.find('result-component');
    expect(element).toHaveClass('hydrated');
  });
});
//# sourceMappingURL=result-component.e2e.js.map
