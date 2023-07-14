import { newSpecPage } from '@stencil/core/testing';
import { ResultComponent } from '../result-component';
describe('result-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ResultComponent],
      html: `<result-component></result-component>`,
    });
    expect(page.root).toEqualHtml(`
      <result-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </result-component>
    `);
  });
});
//# sourceMappingURL=result-component.spec.js.map
