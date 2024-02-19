const { Socket } = require('net');
const RCONPacket = require('./packets');
const { RCONPacketType } = require("./types")

module.exports = class RCONClient {
    host;
    port;

    socket;

    constructor(host, port) {
        this.host = host;
        this.port = port;

        this.socket = new Socket();
    }

    connect(password) {
        const authPacket = RCONPacket.createFrom(1, RCONPacketType.AUTH, password);

        return new Promise((resolve, reject) => {
            const onConnect = () => {
                this.socket.write(authPacket.buffer);
            };

            const onData = (data) => {
                const packet = new RCONPacket(data);

                if (packet.requestId === -1) {
                    this.socket.destroy(new Error('Authentication failed'));
                    return;
                }

                if (packet.type === RCONPacketType.COMMAND && packet.requestId === authPacket.requestId) {
                    this.socket.removeListener('error', reject);
                    resolve(this);
                    return;
                }

                this.socket.destroy(new Error('Unknown packet'));
            };

            this.socket.once('error', reject).once('data', onData).once('connect', onConnect).connect(this.port, this.host);
        }).catch((err) => {
            this.socket.destroy();
            throw err;
        });
    }

    sendCommand(command) {
        const cmdPacket = RCONPacket.createFrom(0, RCONPacketType.COMMAND, command);
        const endPacket = RCONPacket.createFrom(cmdPacket.requestId + 1, RCONPacketType.COMMAND_END, '');

        let result = '';
        let onData

        const onDataFunc = (resolve, reject) => {
            return (data) => {
                const packet = new RCONPacket(data);

                if (packet.type === RCONPacketType.RESPONSE && packet.requestId === cmdPacket.requestId) {
                    result = packet.payload;

                    resolve(result);

                    return;
                }

                if (packet.type === RCONPacketType.RESPONSE && packet.requestId === endPacket.requestId) {
                    this.socket.off('error', reject);
                    resolve(result);
                    return;
                }
            };
        };

        return new Promise((resolve, reject) => {
            onData = onDataFunc(resolve, reject);

            this.socket.once('error', reject).on('data', onData).write(cmdPacket.buffer);

            this.socket.write(endPacket.buffer);
        }).then((response) => {
            this.socket.off('data', onData);
            return response;
        });
    }
}