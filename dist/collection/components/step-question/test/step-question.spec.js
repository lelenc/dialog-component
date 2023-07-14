import { newSpecPage } from '@stencil/core/testing';
import { StepQuestion } from '../step-question';
describe('step-question', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [StepQuestion],
      html: `<step-question></step-question>`,
    });
    expect(page.root).toEqualHtml(`
      <step-question>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </step-question>
    `);
  });
});
//# sourceMappingURL=step-question.spec.js.map
