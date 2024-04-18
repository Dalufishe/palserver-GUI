const ENCODING = "utf8";

module.exports = class RCONPacket {
  _buffer;

  constructor(buffer) {
    this._buffer = buffer;
  }

  get buffer() {
    return this._buffer;
  }

  get payloadLength() {
    return this.buffer.readInt32LE(0);
  }

  get requestId() {
    return this.buffer.readInt32LE(4);
  }

  get type() {
    return this.buffer.readInt32LE(8);
  }

  get payload() {
    return this.buffer.toString(ENCODING, 12, 12 + this.payloadLength - 2);
  }

  toString() {
    return `RCONPacket { payloadLength: ${this.payloadLength}, requestId: ${this.requestId}, type: ${this.type}, payload: ${this.payload} }`;
  }

  static randomId() {
    return Number.parseInt(Math.random().toString(2).substring(2, 32), 2);
  }

  static createFrom(
    requestId,
    type,
    payload
  ) {
    // payload length in bytes
    const size = Buffer.byteLength(payload, ENCODING) + 14;

    // RCON packet with length of length(4) + id(4) + type (4) + payload + padding(2)
    const packet = Buffer.alloc(size);

    // Write length of packet - 4 bytes
    packet.writeInt32LE(size - 4, 0); // length of packet
    packet.writeInt32LE(requestId, 4); // request id
    packet.writeInt32LE(type, 8); // type
    packet.write(payload, 12, size - 2, ENCODING); // payload
    packet.writeInt16LE(0, size - 2); // 2 bytes of padding

    return new RCONPacket(packet);
  }
}
