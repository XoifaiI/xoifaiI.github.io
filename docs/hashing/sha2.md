---
sidebar_position: 1
---

# SHA2

The SHA2 family is the most used in modern cryptography. These are the hashes you will use most often.

## SHA256

```luau
local SHA256 = Cryptography.Hashing.SHA2.SHA256
```

### `SHA256(Message: buffer) -> (string, buffer)`

Computes a 256 bit (32 byte) hash. Returns both a hex string and the raw buffer.

```luau
local Message = buffer.fromstring("Hello World")
local HexDigest, RawDigest = SHA256(Message)

print(HexDigest) -- "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
print(buffer.len(RawDigest)) -- 32
```

SHA256 uses 64 rounds with 512 bit blocks. Collision resistance sits at 2^128, preimage resistance at 2^256. The implementation uses loop unrolling and bit32 operations for native compilation compatibility.

Use it for data integrity checks, as a building block for signatures, or anywhere you need a solid general purpose hash.

## SHA224

```luau
local SHA224 = Cryptography.Hashing.SHA2.SHA224
```

### `SHA224(Message: buffer) -> (string, buffer)`

Truncated SHA256 with different initial values. Outputs 224 bits (28 bytes).

```luau
local HexDigest, RawDigest = SHA224(buffer.fromstring("test"))
```

Just use SHA256 unless you have a specific size requirement. The security margin difference is minimal and SHA256 is more widely supported.

## SHA384

```luau
local SHA384 = Cryptography.Hashing.SHA2.SHA384
```

### `SHA384(Message: buffer) -> (string, buffer)`

Truncated SHA512 with different initial values. Outputs 384 bits (48 bytes).

```luau
local HexDigest, RawDigest = SHA384(buffer.fromstring("test"))
```

A good middle ground when you need more bits than SHA256 but do not want the full 512.

## SHA512

```luau
local SHA512 = Cryptography.Hashing.SHA2.SHA512
```

### `SHA512(Message: buffer) -> (string, buffer)`

The full 512 bit hash. 80 rounds, 1024 bit blocks.

```luau
local HexDigest, RawDigest = SHA512(buffer.fromstring("test"))
```

On native 64 bit systems, SHA512 is actually faster than SHA256 because it uses 64 bit operations natively. In Luau this advantage is reduced since we emulate 64 bit math by splitting it into high/low words, but it is still fast. Ed25519 uses SHA512 internally for signature generation.
