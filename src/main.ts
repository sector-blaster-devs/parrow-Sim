import { LoadingScreen } from './ui/LoadingScreen.ts';
import { LegalModal } from './ui/LegalModal.ts';

async function bootstrap(): Promise<void> {
  const loadingScreen = new LoadingScreen();
  const legalModal = new LegalModal(document.body);
  loadingScreen.onOpenLegal = (tab) => legalModal.open(tab);
  loadingScreen.isLegalModalOpen = () => legalModal.isOpen();

  try {
    await loadingScreen.advance(4);
    const { startGameApp } = await import('./GameApp.ts');
    await startGameApp(loadingScreen, legalModal);
  } catch (err) {
    const message =
      err instanceof Error && err.message
        ? err.message
        : 'Unable to initialize graphics in this browser.';
    loadingScreen.showError(message);
  }
}

void bootstrap();
