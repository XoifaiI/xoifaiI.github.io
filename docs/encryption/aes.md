---
sidebar_position: 2
---

# AES GCM

AES with Galois/Counter Mode. The standard for authenticated encryption.

```luau
local AES = Cryptography.Encryption.AES
```

## Encrypt

### `AES.Encrypt(Plaintext: buffer, Key: buffer, IV: buffer, AAD: buffer?) -> (buffer, buffer)`

Encrypts data and returns ciphertext plus a 16 byte authentication tag.

| Parameter | Type | Description |
|-----------|------|-------------|
| Plaintext | buffer | Data to encrypt |
| Key | buffer | 16, 24, or 32 bytes (AES 128/192/256) |
| IV | buffer | 12 bytes recommended |
| AAD | buffer? | Additional authenticated data (optional) |

```luau
local Key = CSPRNG.RandomBytes(32) -- AES 256
local IV = CSPRNG.RandomBytes(12)
local Plaintext = buffer.fromstring("Secret data")

local Ciphertext, Tag = AES.Encrypt(Plaintext, Key, IV)

-- With AAD
local AAD = buffer.fromstring("metadata")
local Ciphertext2, Tag2 = AES.Encrypt(Plaintext, Key, IV, AAD)
```

## Decrypt

### `AES.Decrypt(Ciphertext: buffer, Key: buffer, IV: buffer, Tag: buffer, AAD: buffer?) -> (boolean, buffer?)`

Returns a success boolean and the decrypted data (or `nil` on failure).

```luau
local Success, Decrypted = AES.Decrypt(Ciphertext, Key, IV, Tag, AAD)
if Success then
    print("Decrypted:", buffer.tostring(Decrypted))
else
    warn("Decryption failed, authentication error")
end
```

The return signature is different from AEAD. You get an explicit boolean instead of checking for nil.

## Key Sizes

| Key Size | Variant | Rounds |
|----------|---------|--------|
| 16 bytes | AES 128 | 10 |
| 24 bytes | AES 192 | 12 |
| 32 bytes | AES 256 | 14 |

```luau
local Key128 = CSPRNG.RandomBytes(16)
local Key192 = CSPRNG.RandomBytes(24)
local Key256 = CSPRNG.RandomBytes(32)
```

For new applications, use AES 256 unless you have specific performance constraints.

## Security Limitations

AES GCM has some important limitations you should understand.

### Nonce Size

The 96 bit (12 byte) IV means you hit birthday bound concerns around 2^32 messages with the same key. After about 4 billion encryptions, you have a non negligible chance of IV collision. Rotate keys before you get anywhere near this limit.

Unlike ChaCha20 Poly1305, there is no built in extended nonce variant. If you need to encrypt many messages with the same key, consider using a counter based IV scheme, rotating keys frequently, or using ChaCha20 Poly1305 with XChaCha20 mode instead.

### Not Key Committing

AES GCM is not key committing. This means the same ciphertext could potentially decrypt to valid (but different) plaintexts under different keys. An attacker who can choose ciphertext might find a collision where two different keys both produce valid decryptions.

This enables the Invisible Salamander attack: in a group messaging scenario, an attacker could craft a message that appears benign to moderators (using one key) but malicious to recipients (using another key).

If key commitment matters for your use case, include a hash or commitment of the key in your AAD, use a key committing AEAD construction, or verify the key through an independent channel.

### Timing Attacks

The S box lookups in AES are theoretically vulnerable to cache timing attacks. In native implementations this is addressed with constant time table lookups or AES NI instructions. In Luau, we cannot guarantee constant time behavior, but practical exploitation in Roblox's environment is extremely difficult due to network jitter and the inability to make precise timing measurements.

## When to Use AES GCM

Use AES GCM when you need compatibility with existing AES GCM systems, standards or regulations require AES specifically, or you are interfacing with hardware that has AES acceleration.

For new Roblox specific implementations, ChaCha20 Poly1305 is generally preferred because it is faster in pure software (no AES NI in Luau), XChaCha20 gives you larger nonces, and there are no table lookup timing concerns.
