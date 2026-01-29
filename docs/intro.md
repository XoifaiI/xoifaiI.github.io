---
sidebar_position: 1
---

# Introduction

The fastest cryptography library for Roblox. Pure Luau implementations with native compilation support.

## Installation

### Wally

```toml
[dependencies]
Cryptography = "daily3014/cryptography@3.0.1"
```

### Pesde

```toml
[dependencies]
cryptography = { name = "daily3014/cryptography", version = "3.0.1" }
```

### Manual

Clone the repo and drop the `src` folder into your project.

## Quick Start

```luau
local Cryptography = require(ReplicatedStorage:WaitForChild("Cryptography"))

local SHA256 = Cryptography.Hashing.SHA2.SHA256
local AEAD = Cryptography.Encryption.AEAD
local EdDSA = Cryptography.Verification.EdDSA
local CSPRNG = Cryptography.Utilities.CSPRNG
```

Everything takes buffers as input and returns buffers or strings depending on the function. Convert strings first:

```luau
local Message = buffer.fromstring("Hello World")
```

## What's Included

**Hashing** SHA2, SHA3, BLAKE2b, BLAKE3, HMAC, KMAC, Murmur, XXH32

**Encryption** ChaCha20 Poly1305 AEAD, AES GCM, XOR, Simon, Speck

**Digital Signatures** Ed25519, ML DSA (post quantum)

**Key Exchange** X25519, ML KEM (post quantum)

**Utilities** CSPRNG, Base64, Hex conversions, checksums

## Which Algorithm Should I Use?

**Hashing general data** SHA256 or BLAKE3. Both are fast and secure. BLAKE3 is newer and faster.

**Keyed hashing** Use HMAC with your preferred hash function, or BLAKE3 DigestKeyed, or BLAKE2b with a key.

**Encrypting data** ChaCha20 Poly1305 (AEAD). Authenticated, fast in software, harder to misuse than AES.

**Digital signatures** Ed25519. Fast, secure, small keys and signatures.

**Key exchange** X25519. Derive a shared secret, then use BLAKE3.DeriveKey to get encryption keys.

**Post quantum security** ML DSA for signatures, ML KEM for key exchange. Only use these if you actually need quantum resistance since the keys and signatures are much larger.

## Important Notes

All cryptographic randomness should come from `CSPRNG`. Never use `math.random()` for anything security related.

Nonces must never be reused with the same key. Use `CSPRNG.RandomBytes()` to generate them.

This library runs in Luau. The implementations use constant time operations where feasible, but Luau's compilation behavior cannot guarantee it. For Roblox this is not a practical concern since network jitter masks timing differences.
