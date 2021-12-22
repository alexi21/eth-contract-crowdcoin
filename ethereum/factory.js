import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x36a58bEd2ecDa689e8cF93b96ab40C3feb484058'
);

export default instance;