import { newE2EPage } from '@stencil/core/testing';
describe('step-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<step-component></step-component>');
    const element = await page.find('step-component');
    expect(element).toHaveClass('hydrated');
  });
});
//# sourceMappingURL=step-component.e2e.js.map
