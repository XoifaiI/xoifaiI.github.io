---
sidebar_position: 5
---

# KMAC

Keccak Message Authentication Code. SHA3's native MAC mode with built in domain separation.

```luau
local KMAC = Cryptography.Hashing.KMAC
```

## Functions

### `KMAC.KMAC128(Data: buffer, Key: buffer, Output: buffer, CustomBuffer: buffer?) -> (string, buffer)`

KMAC with 128 bit security level.

```luau
local Key = CSPRNG.RandomBytes(32)
local Data = buffer.fromstring("message to authenticate")
local Output = buffer.create(32) -- you provide the output buffer

local HexMac, RawMac = KMAC.KMAC128(Data, Key, Output)
print(HexMac)
```

### `KMAC.KMAC256(Data: buffer, Key: buffer, Output: buffer, CustomBuffer: buffer?) -> (string, buffer)`

KMAC with 256 bit security level.

```luau
local Key = CSPRNG.RandomBytes(32)
local Data = buffer.fromstring("message")
local Output = buffer.create(64)

local HexMac, RawMac = KMAC.KMAC256(Data, Key, Output)
```

## Domain Separation

The optional `CustomBuffer` parameter lets you separate different uses of the same key:

```luau
local Key = CSPRNG.RandomBytes(32)
local Data = buffer.fromstring("shared data")

-- MAC for API requests
local ApiOutput = buffer.create(32)
local ApiMac, _ = KMAC.KMAC256(Data, Key, ApiOutput, buffer.fromstring("api-auth"))

-- MAC for storage integrity
local StorageOutput = buffer.create(32)
local StorageMac, _ = KMAC.KMAC256(Data, Key, StorageOutput, buffer.fromstring("storage-check"))

-- These MACs are different even though Key and Data are the same
```

This is built into the algorithm, so you do not need to manually concatenate strings or worry about length extension attacks.

## KMAC vs HMAC

KMAC has a few advantages over HMAC: variable output length, built in customization/domain separation, and no length extension vulnerability (not that HMAC has one either, but SHA3's sponge construction makes it structurally impossible).

Use KMAC when you are already using SHA3/SHAKE in your system, or when you need the domain separation feature. Use HMAC when you need compatibility with existing systems or standards that specify HMAC.
