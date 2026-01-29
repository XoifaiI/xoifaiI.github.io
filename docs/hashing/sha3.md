---
sidebar_position: 2
---

# SHA3

SHA3 is based on the Keccak sponge construction. Completely different design from SHA2, which makes it a solid backup if SHA2 ever gets broken. It is also the foundation for SHAKE and KMAC.

```luau
local SHA3 = Cryptography.Hashing.SHA3
```

## Hash Functions

### `SHA3.SHA3_224(Message: buffer) -> (string, buffer)`
### `SHA3.SHA3_256(Message: buffer) -> (string, buffer)`
### `SHA3.SHA3_384(Message: buffer) -> (string, buffer)`
### `SHA3.SHA3_512(Message: buffer) -> (string, buffer)`

Standard SHA3 hash functions with fixed output sizes.

```luau
local HexDigest, RawDigest = SHA3.SHA3_256(buffer.fromstring("Hello World"))
print(HexDigest)
print(buffer.len(RawDigest)) -- 32
```

The implementation uses interleaved lane representation for the Keccak f[1600] permutation. Since Luau does not have native 64 bit integers, the 64 bit operations are split into high/low 32 bit words.

## SHAKE (Extendable Output)

### `SHA3.SHAKE_128(Message: buffer) -> (string, buffer)`
### `SHA3.SHAKE_256(Message: buffer) -> (string, buffer)`

Extendable output functions (XOFs).

```luau
local HexOutput, RawOutput = SHA3.SHAKE_256(buffer.fromstring("seed data"))
print(HexOutput)
```

SHAKE is useful for key derivation, generating pseudorandom data from a seed, or anywhere you need more flexibility than fixed output hashes provide. SHAKE128 has 128 bit security, SHAKE256 has 256 bit security.

The sponge construction means you can squeeze out as much data as you need. The security level is determined by the capacity (256 bits for SHAKE128, 512 bits for SHAKE256), not the output length.
