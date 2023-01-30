import axios from 'axios';
import { INft } from '../types';

export class Web3 {
  constructor(private publicAddress: string) {}

  getNftList(): Promise<INft[]> {
    return axios
      .get(`https://api.rarible.org/v0.1/items/byOwner?owner=ETHEREUM:${this.publicAddress}`)
      .then((response) => response.data.items as INft[]);
  }
}
