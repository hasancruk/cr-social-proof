class SocialProof extends HTMLElement {
  static tagName = "cr-social-proof";
    
  static css = `
    :host {
      --_clr-border: var(--cr_clr__border, #BBC7D9); 

      --_h2-size: var(--cr_typography__h2_size, 2rem); 
      --_h2_line-height: var(--cr_typography__h2_line-height, 2.75rem); 
      --_h3-size: var(--cr_typography__h3_size, 1.375rem); 
      --_h3_line-height: var(--cr_typography__h3_line-height, 2rem); 

      --_padding-inline: 2rem;
      --_padding-block: 2.5rem;

      display: inline-block;
      
      &, *, *::before, *::after {
        box-sizing: border-box;
      }
    }
   
    *, ::slotted(*) {
      margin: 0;
      padding: 0;
      font: inherit;
    }

    h2, ::slotted(h2) {
      font-size: var(--_h2-size);
      line-height: var(--_h2_line-height);
    }

    article {
      border: 2px solid var(--_clr-border);
      padding-inline: var(--_padding-inline);
      padding-block-start: calc((var(--_h2_line-height) / 2) + var(--_padding-block));
      padding-block-end: var(--_padding-block);

      position: relative;

      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    
    svg, ::slotted(svg) {
      /* TODO Pull out styles to css custom properties */
      width: 2rem;
      aspect-ratio: 1;
      transform: rotate(180deg);
      color: #E60079;
    }

    #title {
      --_title-padding: 0.5rem;
      position: absolute;

      /* TODO Pull out styles to css custom properties */
      inset: calc(-1 * (var(--_h2_line-height) / 2)) auto auto calc(var(--_padding-inline) - var(--_title-padding));
      background-color: white;
      padding-inline: var(--_title-padding);
    }

    slot[name="quote"]::slotted(*) {
      font-size: var(--_h3-size);
      line-height: var(--_h3_line-height);
    }

    footer {
      display: flex;
    }

    footer > span, slot[name="citation"]::slotted(*) {
      font-size: 1.125rem;
      line-height: 1.75rem;
      letter-spacing: 0.02em;
    }
  `;
    
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.createElement("template");

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(SocialProof.css);
    shadowRoot.adoptedStyleSheets = [sheet];
    template.innerHTML = `
      <article>
        <h2 id="title">Meet Tanya</h2>
        <div>
          <slot name="photo"></slot>
        </div>
        <blockquote>
          <slot name="quote-icon">
            <svg viewBox="40 0 88 62" focusable="false" class="chakra-icon css-s854wl">
              <path fill="currentColor" d="M46.2857 62L65.1429 62L77.7143 37.2L77.7143 -1.39329e-05L40 -1.72299e-05L40 37.2L58.8571 37.2L46.2857 62ZM96.5714 62L115.429 62L128 37.2L128 -9.53674e-06L90.2857 -1.28338e-05L90.2857 37.2L109.143 37.2L96.5714 62Z"></path>
            </svg>
          </slot>
          <slot name="quote"></slot>
          <footer>
            <span>&#8211;</span>
            <slot name="citation"></slot>
          </footer>
        </blockquote>
        <slot></slot>
      </article>
    `;
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

if ("customElements" in window) {
  customElements.define(SocialProof.tagName, SocialProof);
}
