import { newSpecPage } from '@stencil/core/testing';
import { StepComponent } from '../step-component';
describe('step-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StepComponent],
      html: `<step-component></step-component>`,
    });
    expect(page.root).toEqualHtml(`
      <step-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </step-component>
    `);
  });
});
//# sourceMappingURL=step-component.spec.js.map
