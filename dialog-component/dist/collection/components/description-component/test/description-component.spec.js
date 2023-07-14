import { newSpecPage } from '@stencil/core/testing';
import { DescriptionComponent } from '../description-component';
describe('description-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DescriptionComponent],
      html: `<description-component></description-component>`,
    });
    expect(page.root).toEqualHtml(`
      <description-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </description-component>
    `);
  });
});
//# sourceMappingURL=description-component.spec.js.map
