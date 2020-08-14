import { html, fixture, expect } from '@open-wc/testing';

import {RdxTest} from '../src/RdxTest.js';
import '../src/rdx-test.js';

describe('RdxTest', () => {
  let element: RdxTest;
  beforeEach(async () => {
    element = await fixture(html`
      <rdx-test></rdx-test>
    `);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
