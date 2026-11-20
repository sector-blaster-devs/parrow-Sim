import {
  CREDITS_CATEGORIES,
  PRIVACY_POLICY_TEMPLATE,
  TERMS_OF_USE_TEMPLATE,
  formatLegalTemplateAsPlainText,
  type LegalDocumentTemplate,
  type LegalTabId,
} from './legalContent.ts';

interface TabButtonEntry {
  id: LegalTabId;
  btn: HTMLButtonElement;
}

/**
 * Accessible French-postcard modal overlay for Credits & Licenses,
 * Terms of Use Template, and Privacy Policy Template.
 * Built strictly with safe DOM APIs (createElement / textContent; zero innerHTML).
 */
export class LegalModal {
  private readonly backdrop: HTMLDivElement;
  private readonly dialog: HTMLDivElement;
  private readonly headingEl: HTMLHeadingElement;
  private readonly closeBtn: HTMLButtonElement;
  private readonly copyBtn: HTMLButtonElement;
  private readonly bodyEl: HTMLDivElement;
  private readonly tabs: TabButtonEntry[] = [];

  private activeTab: LegalTabId = 'credits';
  private isOpenState = false;
  private lastFocusedElement: HTMLElement | null = null;
  private copyResetTimer = 0;

  public onOpenChange?: (open: boolean) => void;

  constructor(parent: HTMLElement = document.body) {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'legal-modal-backdrop';
    this.backdrop.setAttribute('aria-hidden', 'true');

    this.dialog = document.createElement('div');
    this.dialog.className = 'legal-modal';
    this.dialog.setAttribute('role', 'dialog');
    this.dialog.setAttribute('aria-modal', 'true');
    this.dialog.setAttribute('aria-labelledby', 'legal-modal-title');

    // Header row: title + close button
    const header = document.createElement('div');
    header.className = 'legal-modal-header';

    this.headingEl = document.createElement('h2');
    this.headingEl.id = 'legal-modal-title';
    this.headingEl.className = 'legal-modal-title';
    this.headingEl.textContent = 'Credits, Licenses & Legal';

    const headerActions = document.createElement('div');
    headerActions.className = 'legal-modal-header-actions';

    this.copyBtn = document.createElement('button');
    this.copyBtn.type = 'button';
    this.copyBtn.className = 'legal-action-btn is-hidden';
    this.copyBtn.textContent = 'Copy Template';
    this.copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      void this.copyCurrentTemplate();
    });

    this.closeBtn = document.createElement('button');
    this.closeBtn.type = 'button';
    this.closeBtn.className = 'legal-close-btn';
    this.closeBtn.setAttribute('aria-label', 'Close dialog');
    this.closeBtn.textContent = 'Close';
    this.closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    headerActions.appendChild(this.copyBtn);
    headerActions.appendChild(this.closeBtn);
    header.appendChild(this.headingEl);
    header.appendChild(headerActions);

    // Tab bar
    const tabBar = document.createElement('div');
    tabBar.className = 'legal-tab-bar';
    tabBar.setAttribute('role', 'tablist');
    tabBar.setAttribute('aria-label', 'Legal and credits sections');

    const tabSpecs: ReadonlyArray<{ id: LegalTabId; label: string }> = [
      { id: 'credits', label: 'Credits & Licenses' },
      { id: 'terms', label: 'Terms of Use' },
      { id: 'privacy', label: 'Privacy Policy' },
    ];

    for (const spec of tabSpecs) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'legal-tab-btn';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      btn.textContent = spec.label;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectTab(spec.id);
      });
      tabBar.appendChild(btn);
      this.tabs.push({ id: spec.id, btn });
    }

    // Scrollable body
    this.bodyEl = document.createElement('div');
    this.bodyEl.className = 'legal-modal-body';
    this.bodyEl.tabIndex = 0;

    this.dialog.appendChild(header);
    this.dialog.appendChild(tabBar);
    this.dialog.appendChild(this.bodyEl);
    this.backdrop.appendChild(this.dialog);
    parent.appendChild(this.backdrop);

    // Prevent clicks/touches inside dialog from bubbling to LoadingScreen or game canvas
    const stopEvent = (e: Event) => {
      e.stopPropagation();
    };
    this.dialog.addEventListener('click', stopEvent);
    this.dialog.addEventListener('mousedown', stopEvent);
    this.dialog.addEventListener('pointerdown', stopEvent);
    this.dialog.addEventListener('touchstart', stopEvent, { passive: true });
    this.dialog.addEventListener('touchend', stopEvent, { passive: true });

    // Backdrop click closes dialog
    this.backdrop.addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target === this.backdrop) {
        this.close();
      }
    });
    this.backdrop.addEventListener(
      'touchend',
      (e) => {
        e.stopPropagation();
        if (e.target === this.backdrop) {
          e.preventDefault();
          this.close();
        }
      },
      { passive: false }
    );

    window.addEventListener(
      'keydown',
      (e) => {
        if (!this.isOpenState) return;
        if (e.code === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          this.close();
        }
      },
      true
    );

    this.renderActiveTab();
  }

  public isOpen(): boolean {
    return this.isOpenState;
  }

  public open(tab: LegalTabId = 'credits'): void {
    if (!this.isOpenState) {
      this.lastFocusedElement =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    this.isOpenState = true;
    this.selectTab(tab);
    this.backdrop.classList.add('is-open');
    this.backdrop.setAttribute('aria-hidden', 'false');
    this.onOpenChange?.(true);
    this.closeBtn.focus({ preventScroll: true });
  }

  public close(): void {
    if (!this.isOpenState) return;
    this.isOpenState = false;
    this.backdrop.classList.remove('is-open');
    this.backdrop.setAttribute('aria-hidden', 'true');
    this.onOpenChange?.(false);
    if (this.lastFocusedElement && document.contains(this.lastFocusedElement)) {
      this.lastFocusedElement.focus({ preventScroll: true });
    }
    this.lastFocusedElement = null;
  }

  public selectTab(tab: LegalTabId): void {
    this.activeTab = tab;
    for (const entry of this.tabs) {
      const selected = entry.id === tab;
      entry.btn.classList.toggle('is-active', selected);
      entry.btn.setAttribute('aria-selected', selected ? 'true' : 'false');
    }
    this.copyBtn.classList.toggle('is-hidden', tab === 'credits');
    this.copyBtn.textContent = 'Copy Template';
    this.renderActiveTab();
    this.bodyEl.scrollTop = 0;
  }

  private async copyCurrentTemplate(): Promise<void> {
    const doc =
      this.activeTab === 'terms' ? TERMS_OF_USE_TEMPLATE : PRIVACY_POLICY_TEMPLATE;
    const text = formatLegalTemplateAsPlainText(doc);
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text);
        this.flashCopyLabel('Copied');
        return;
      }
    } catch {
      // Fallback below
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', 'true');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      this.flashCopyLabel('Copied');
    } catch {
      this.flashCopyLabel('Select Text');
    } finally {
      textarea.remove();
    }
  }

  private flashCopyLabel(label: string): void {
    this.copyBtn.textContent = label;
    if (this.copyResetTimer !== 0) {
      window.clearTimeout(this.copyResetTimer);
    }
    this.copyResetTimer = window.setTimeout(() => {
      this.copyBtn.textContent = 'Copy Template';
      this.copyResetTimer = 0;
    }, 1800);
  }

  private renderActiveTab(): void {
    this.bodyEl.replaceChildren();
    if (this.activeTab === 'credits') {
      this.renderCredits();
    } else if (this.activeTab === 'terms') {
      this.renderDocumentTemplate(TERMS_OF_USE_TEMPLATE);
    } else {
      this.renderDocumentTemplate(PRIVACY_POLICY_TEMPLATE);
    }
  }

  private renderCredits(): void {
    const intro = document.createElement('p');
    intro.className = 'legal-lead';
    intro.textContent =
      'Complete attribution for Remix Sparrow Sim — covering original application code, the procedural 3D mesh pack, real-time audio synthesis, shader & architectural references, and third-party open-source licenses.';
    this.bodyEl.appendChild(intro);

    for (const category of CREDITS_CATEGORIES) {
      const section = document.createElement('section');
      section.className = 'legal-section';

      const h3 = document.createElement('h3');
      h3.className = 'legal-section-heading';
      h3.textContent = category.heading;
      section.appendChild(h3);

      for (const entry of category.entries) {
        const item = document.createElement('article');
        item.className = 'legal-credit-item';

        const titleRow = document.createElement('div');
        titleRow.className = 'legal-credit-title-row';

        const title = document.createElement('h4');
        title.className = 'legal-credit-title';
        title.textContent = entry.title;

        const license = document.createElement('span');
        license.className = 'legal-credit-license';
        license.textContent = entry.license;

        titleRow.appendChild(title);
        titleRow.appendChild(license);

        const meta = document.createElement('p');
        meta.className = 'legal-credit-meta';
        meta.textContent = `${entry.role} · ${entry.attribution}`;

        const desc = document.createElement('p');
        desc.className = 'legal-paragraph';
        desc.textContent = entry.details;

        item.appendChild(titleRow);
        item.appendChild(meta);
        item.appendChild(desc);

        if (entry.verbatimLicense) {
          const detailsEl = document.createElement('details');
          detailsEl.className = 'legal-license-details';

          const summary = document.createElement('summary');
          summary.className = 'legal-license-summary';
          summary.textContent = 'View License Text';

          const pre = document.createElement('pre');
          pre.className = 'legal-license-pre';
          pre.textContent = entry.verbatimLicense;

          detailsEl.appendChild(summary);
          detailsEl.appendChild(pre);
          item.appendChild(detailsEl);
        }

        section.appendChild(item);
      }

      this.bodyEl.appendChild(section);
    }
  }

  private renderDocumentTemplate(doc: LegalDocumentTemplate): void {
    const title = document.createElement('h3');
    title.className = 'legal-doc-title';
    title.textContent = doc.title;

    const subtitle = document.createElement('p');
    subtitle.className = 'legal-doc-subtitle';
    subtitle.textContent = doc.subtitle;

    const notice = document.createElement('p');
    notice.className = 'legal-template-notice';
    notice.textContent = doc.templateNotice;

    this.bodyEl.appendChild(title);
    this.bodyEl.appendChild(subtitle);
    this.bodyEl.appendChild(notice);

    for (const sec of doc.sections) {
      const section = document.createElement('section');
      section.className = 'legal-section';

      const h4 = document.createElement('h4');
      h4.className = 'legal-section-heading';
      h4.textContent = sec.heading;
      section.appendChild(h4);

      for (const text of sec.paragraphs) {
        const p = document.createElement('p');
        p.className = 'legal-paragraph';
        p.textContent = text;
        section.appendChild(p);
      }

      if (sec.bullets && sec.bullets.length > 0) {
        const ul = document.createElement('ul');
        ul.className = 'legal-bullet-list';
        for (const b of sec.bullets) {
          const li = document.createElement('li');
          li.textContent = b;
          ul.appendChild(li);
        }
        section.appendChild(ul);
      }

      this.bodyEl.appendChild(section);
    }
  }
}
