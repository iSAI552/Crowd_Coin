import web3 from './web3';
import CampaignFactort from './build/CampaignFactory.json';
import { defaultMaxListeners } from 'mocha/lib/runner';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactort.interface),
    "0x42b4aC300beF8700Ceaf27b3E1003ccC471b091B"
);

export default instance;