"use strict";

import { getAddress } from "@fksyuan/address";
import { hexZeroPad } from "@fksyuan/bytes";
import {isBech32Address, decodeBech32Address} from "@alayanetwork/web3-utils";

import { Coder, Reader, Writer } from "./abstract-coder";

export class AddressCoder extends Coder {

    constructor(localName: string) {
        super("address", "address", localName, false);
    }

    encode(writer: Writer, value: string): number {
        try {
            getAddress(value);
        } catch (error) {
            this._throwError(error.message, value);
        }
        if (isBech32Address(value)) {
            value = decodeBech32Address(value);
        }
        return writer.writeValue(value);
    }

    decode(reader: Reader): any {
        return getAddress(hexZeroPad(reader.readValue().toHexString(), 20));
    }
}

