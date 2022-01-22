import { useContext, useState } from 'react';
import { Modal } from 'components/ui/Modal';

import { ethers } from 'ethers';
import { Greeter__factory } from 'contracts/typechain/factories/Greeter__factory';

import { WalletContext } from 'contexts/WalletContext';

// allow looking for window.ethereum for MetaMask availability
declare const window: Window &
  typeof globalThis & {
    ethereum: any;
  };

export const TestContractInteraction = () => {
  const [showModal, setShowModal] = useState(false);
  const [greeterContractValue, setGreeterContractValue] = useState('');

  const [newGreetingValue, setNewGreetingValue] = useState('');

  const { walletConnection } = useContext(WalletContext);

  const readContractValue = async () => {
    console.log('readContractValue');

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const greeterContract = Greeter__factory.connect(
      process.env.REACT_APP_GREETER_CONTRACT_ADDRESS ?? '',
      provider.getSigner()
    );

    console.log(
      'greeterContract defined: ',
      JSON.stringify(greeterContract != null, null, 2)
    );
    if (greeterContract != null) {
      let val;
      try {
        val = await greeterContract.greet();
      } catch (e: any) {
        console.log('caught error: ', typeof e, JSON.stringify(e, null, 2));
        throw e;
      }
      if (val != null) {
        setGreeterContractValue(val as string);
      } else {
        setGreeterContractValue('empty');
      }
    } else {
      setGreeterContractValue('contract not defined');
    }
  };

  const sendNewGreetingValueToContract = async (value: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const greeterContract = Greeter__factory.connect(
      process.env.REACT_APP_GREETER_CONTRACT_ADDRESS ?? '',
      signer
    );

    console.log('greeterContract.setGreeting:', JSON.stringify(value, null, 2));

    await greeterContract.setGreeting(value);
  };

  const onFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendNewGreetingValueToContract(newGreetingValue);
  };

  const requestNewGreetingValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGreetingValue(e.target.value);
  };

  return (
    <>
      <div>Test a Contract</div>

      <h3 className="font-bold mt-5">Your current address</h3>
      <code>{walletConnection.account}</code>

      <h3 className="font-bold mt-5">Contract Address</h3>
      <code>{process.env.REACT_APP_GREETER_CONTRACT_ADDRESS}</code>

      <div className="mt-5"></div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={readContractValue}
      >
        Get the value from the contract
      </button>

      {greeterContractValue && (
        <>
          <h3 className="font-bold mt-2">Greeting Value</h3>
          <div>
            <code>{greeterContractValue}</code>
          </div>
        </>
      )}

      <h3 className="font-bold mt-5">Set a new greeting</h3>
      <form className="mt-1" action="" onSubmit={onFormSubmit}>
        <div>
          <input
            type="text"
            name="newgreeting"
            value={newGreetingValue}
            onChange={requestNewGreetingValue}
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Set the new value
          </button>
        </div>
      </form>

      <Modal
        title="This Page Isn't Ready Yet"
        icon="CogIcon"
        closeButton="Got it"
        isOpen={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <p>We're working on this page. It isn't ready yet.</p>
      </Modal>
    </>
  );
};
