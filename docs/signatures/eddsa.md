---
sidebar_position: 1
---

# Ed25519 (EdDSA)

import EddsaFlow from '@site/src/components/Eddsa/EddsaFlow';

Ed25519 is the modern standard for digital signatures. Fast, secure, and hard to mess up. Use this unless you need post quantum security.

```luau
local EdDSA = Cryptography.Verification.EdDSA
```

## Key Generation

### `EdDSA.PublicKey(SecretKey: buffer) -> buffer`

Derives a 32 byte public key from a 32 byte secret key.

```luau
local SecretKey = CSPRNG.Ed25519Random()
local PublicKey = EdDSA.PublicKey(SecretKey)

print(buffer.len(SecretKey)) -- 32
print(buffer.len(PublicKey)) -- 32
```

Always use `CSPRNG.Ed25519Random()` to generate secret keys. It handles the clamping required by Ed25519 (clearing the lowest 3 bits, setting the highest bit, and so on).

## Signing

### `EdDSA.Sign(Message: buffer, SecretKey: buffer, PublicKey: buffer) -> buffer`

Creates a 64 byte signature.

```luau
local Message = buffer.fromstring("Sign this message")
local Signature = EdDSA.Sign(Message, SecretKey, PublicKey)

print(buffer.len(Signature)) -- 64
```

The signature is deterministic: signing the same message with the same key always produces the same signature. This eliminates an entire class of bugs related to bad randomness during signing (which has broken real world systems).

## Verification

### `EdDSA.Verify(Message: buffer, PublicKey: buffer, Signature: buffer) -> boolean`

Returns `true` if the signature is valid.

```luau
local IsValid = EdDSA.Verify(Message, PublicKey, Signature)
if IsValid then
    print("Signature verified")
else
    warn("Invalid signature")
end
```

## How It Works

Ed25519 uses the Edwards25519 curve (a twisted Edwards curve birationally equivalent to Curve25519) with SHA512 for internal hashing.

The implementation uses extended projective coordinates (X:Y:Z:T) for point representation, fixed window scalar multiplication, and precomputed tables for the base point.

Key sizes are small (32 bytes each for public and secret), signatures are compact (64 bytes), and operations are fast.

## Security Properties

**Signature security level** Around 128 bits (breaking requires solving discrete log on a 255 bit curve)

**Deterministic signatures** No randomness needed during signing, eliminating nonce reuse vulnerabilities

**Malleability** Ed25519 signatures are slightly malleable (the same signature can have multiple valid representations). This does not affect security for most use cases, but matters if you are using signatures as unique identifiers.

**Not quantum resistant** A sufficiently powerful quantum computer could break Ed25519 using Shor's algorithm. If you need post quantum security, use ML DSA instead.

## Examples

### Sign then encrypt

```luau
-- Sender signs, then encrypts
local Signature = EdDSA.Sign(Message, SenderSecret, SenderPublic)
local SignedMessage = buffer.create(buffer.len(Message) + 64)
buffer.copy(SignedMessage, 0, Message)
buffer.copy(SignedMessage, buffer.len(Message), Signature)

local Ciphertext, Tag = AEAD.Encrypt(SignedMessage, SharedKey, Nonce)

-- Receiver decrypts, then verifies
local Decrypted = AEAD.Decrypt(Ciphertext, SharedKey, Nonce, Tag)
local RecoveredMessage = buffer.create(buffer.len(Decrypted) - 64)
local RecoveredSig = buffer.create(64)
buffer.copy(RecoveredMessage, 0, Decrypted, 0, buffer.len(Decrypted) - 64)
buffer.copy(RecoveredSig, 0, Decrypted, buffer.len(Decrypted) - 64, 64)

local Valid = EdDSA.Verify(RecoveredMessage, SenderPublic, RecoveredSig)
```

<EddsaFlow />

### Public key authentication

```luau
-- Server stores user public keys
local UserPublicKeys = {
    ["alice"] = AlicePublicKey,
    ["bob"] = BobPublicKey,
}

-- Client signs request
local Request = buffer.fromstring('{"action":"transfer","amount":103}')
local Signature = EdDSA.Sign(Request, ClientSecretKey, ClientPublicKey)

-- Server verifies
local function AuthenticateRequest(UserId, Request, Signature)
    local PublicKey = UserPublicKeys[UserId]
    if not PublicKey then return false end
    return EdDSA.Verify(Request, PublicKey, Signature)
end
```
