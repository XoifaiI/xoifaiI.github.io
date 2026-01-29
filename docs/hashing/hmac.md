---
sidebar_position: 4
---

# HMAC

import HmacFlow from '@site/src/components/Hmac/HmacFlow';

Hash based Message Authentication Code. The standard way to create a MAC from a hash function when you need compatibility with existing systems.

```luau
local HMAC = Cryptography.Hashing.HMAC
```

## Function

### `HMAC(Message: buffer, Key: buffer, HashFn: function, BlockSize: number, BigEndian: boolean?) -> (string, buffer)`

Generic HMAC that works with any hash function.

```luau
local SHA256 = Cryptography.Hashing.SHA2.SHA256
local Blake3Digest = Cryptography.Hashing.Blake3.Digest

-- HMAC with SHA256
local Key = CSPRNG.RandomBytes(32)
local Message = buffer.fromstring("Hello World")
local HexMac, RawMac = HMAC(Message, Key, SHA256, 64, true)

-- HMAC with BLAKE3 (use BigEndian = false for SHA3/BLAKE family)
local HexMac2, RawMac2 = HMAC(Message, Key, Blake3Digest, 64, false)
```

**Parameters:**
- `Message`: The data to authenticate
- `Key`: Your secret key
- `HashFn`: The hash function to use (must return string, buffer)
- `BlockSize`: The block size of the hash function (64 for SHA256, 128 for SHA512)
- `BigEndian`: Set to `true` for SHA2, `false` for SHA3/BLAKE family

## How It Works

HMAC computes `H((K ⊕ opad) || H((K ⊕ ipad) || M))` where K is the key (padded or hashed to block size), opad is 0x5c repeated, ipad is 0x36 repeated, and M is your message.

Keys longer than the hash's block size get hashed first. Keys shorter than the block size are zero padded. For best security, use a key at least as long as the hash output.

<HmacFlow />

## When to Use It

HMAC is the right choice when you need API authentication tokens, message integrity with sender verification, JWT signatures, or compatibility with existing HMAC based protocols.

If you are building something new and do not need HMAC specifically, BLAKE3 DigestKeyed or BLAKE2b with a key are faster alternatives.
