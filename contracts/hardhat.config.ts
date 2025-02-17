import * as dotenv from 'dotenv';

import fs from 'fs-extra';

import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import '@atixlabs/hardhat-time-n-mine';
import 'hardhat-deploy';
import 'solidity-coverage';

import "./tasks/test-tokens";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

task(
    'copy-compiled',
    'Adds compiled typechain factories to the frontend code',
    async (taskArguments, hre) => {
        try {
            await fs.copy('./typechain', '../frontend/src/contracts-typechain');
            console.log('Copy completed!');
        } catch (err) {
            console.log('An error occurred while copying the folder.');
            return console.error(err);
        }
    }
);

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

enum NetworkIDs {
    MAINNET = 1,
    ROPSTEN = 3,
    POLYGON = 137,
}

const enableGasReport = !!process.env.REPORT_GAS

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.9',
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            }
        }
    },
    namedAccounts: {
        deployer: {
            default: 0,
            [NetworkIDs.MAINNET]: process.env.MAINNET_DEPLOYER_PRIVATE_KEY ? `privatekey://${process.env.MAINNET_DEPLOYER_PRIVATE_KEY}` : 0,
            [NetworkIDs.ROPSTEN]: process.env.ROPSTEN_DEPLOYER_PRIVATE_KEY ? `privatekey://${process.env.ROPSTEN_DEPLOYER_PRIVATE_KEY}` : 0,
            [NetworkIDs.POLYGON]: process.env.POLYGON_DEPLOYER_PRIVATE_KEY ? `privatekey://${process.env.POLYGON_DEPLOYER_PRIVATE_KEY}` : 0,
        },
        daoTreasury: {
            default: 1,
            [NetworkIDs.MAINNET]: process.env.MAINNET_TREASURY_PRIVATE_KEY ? `privatekey://${process.env.MAINNET_TREASURY_PRIVATE_KEY}` : 1,
            [NetworkIDs.ROPSTEN]: process.env.ROPSTEN_TREASURY_PRIVATE_KEY ? `privatekey://${process.env.ROPSTEN_TREASURY_PRIVATE_KEY}` : 1,
            [NetworkIDs.POLYGON]: process.env.POLYGON_TREASURY_PRIVATE_KEY ? `privatekey://${process.env.POLYGON_TREASURY_PRIVATE_KEY}` : 1,
        },
        disputeResolver: {
            default: 2,
            [NetworkIDs.MAINNET]: process.env.MAINNET_DR_RESOLVER_PRIVATE_KEY ? `privatekey://${process.env.MAINNET_DR_RESOLVER_PRIVATE_KEY}` : 2,
            [NetworkIDs.ROPSTEN]: process.env.ROPSTEN_DR_RESOLVER_PRIVATE_KEY ? `privatekey://${process.env.ROPSTEN_DR_RESOLVER_PRIVATE_KEY}` : 2,
            [NetworkIDs.POLYGON]: process.env.POLYGON_DR_RESOLVER_PRIVATE_KEY ? `privatekey://${process.env.POLYGON_DR_RESOLVER_PRIVATE_KEY}` : 2,
        },
    },
    networks: {
        localhost: {
            live: false,
        },
        hardhat: {
            // forking: {
            //     url: process.env.FORKING_RPC_URL || "https://polygon-rpc.com",
            //     blockNumber: 24238595,
            // },
            chainId: 1337,
            live: false,
        },
        ropsten: {
            url: process.env.ROPSTEN_RPC_URL || '',
            live: false,
            chainId: 3,
        },
    },
    gasReporter: {
        enabled: enableGasReport,
        gasPrice: 90,
        currency: 'USD',
        coinmarketcap: process.env.CMC_API_KEY,
        // token: "MATIC",
        // gasPriceApi: "https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice"
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
};

export default config;
