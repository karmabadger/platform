import { ethers } from 'ethers';
import { IProviderInfo } from 'web3modal';

export interface IWalletState {
  connected: boolean;
  account: string | null;
  provider: ethers.providers.Web3Provider | null;
  providerInfo: IProviderInfo | null;
  chainId: string | null;
  chainIsSupported: boolean;
}

export type WalletStateActionPayload = Omit<IWalletState, 'chainIsSupported'>;
