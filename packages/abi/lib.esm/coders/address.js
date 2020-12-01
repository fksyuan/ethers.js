"use strict";
import { getAddress } from "@fksyuan/address";
import { hexZeroPad } from "@fksyuan/bytes";
import { Coder } from "./abstract-coder";
import {isBech32Address, decodeBech32Address} from "@alayanetwork/web3-utils";
export class AddressCoder extends Coder {
    constructor(localName) {
        super("address", "address", localName, false);
    }
    encode(writer, value) {
        try {
            getAddress(value);
        }
        catch (error) {
            this._throwError(error.message, value);
        }
        if (isBech32Address(value)) {
            value = decodeBech32Address(value);
        }
        return writer.writeValue(value);
    }
    decode(reader) {
        return getAddress(hexZeroPad(reader.readValue().toHexString(), 20));
    }
}
