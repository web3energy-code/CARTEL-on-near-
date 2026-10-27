import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';

let initialization: Promise<any> | null = null;

export function initializeNearWallet() {
  if (!initialization) {
    initialization = (async () => {
      const selector = await setupWalletSelector({
        network: 'testnet',
        modules: [setupMyNearWallet()],
      });

      const modal = setupModal(selector, {
        contractId: 'cartel-marketplace.testnet',
      });

      return { selector, modal };
    })();
  }

  return initialization;
}
