---
sidebar_position: 1
---

# ChaCha20 Poly1305 (AEAD)

import AEADFlow from '@site/src/components/AEAD/AEADFlow';

This is what you should use for symmetric encryption. It is authenticated encryption with associated data (AEAD), meaning tampered ciphertext will fail to decrypt. You get confidentiality and integrity in one package.

```luau
local AEAD = Cryptography.Encryption.AEAD
```

## Encrypt

### `AEAD.Encrypt(Message: buffer, Key: buffer, Nonce: buffer, AAD: buffer?, Rounds: number?, UseXChaCha20: boolean?) -> (buffer, buffer)`

Encrypts data and returns ciphertext plus a 16 byte authentication tag.

| Parameter | Type | Description |
|-----------|------|-------------|
| Message | buffer | Data to encrypt |
| Key | buffer | 32 bytes, use `CSPRNG.RandomBytes(32)` |
| Nonce | buffer | 12 bytes for ChaCha20, 24 bytes for XChaCha20 |
| AAD | buffer? | Additional authenticated data (optional) |
| Rounds | number? | Default 20, can use 12 or 8 for speed |
| UseXChaCha20 | boolean? | Use extended nonce variant |

```luau
local Key = CSPRNG.RandomBytes(32)
local Nonce = CSPRNG.RandomBytes(12)
local Plaintext = buffer.fromstring("Secret message")

-- Basic encryption
local Ciphertext, Tag = AEAD.Encrypt(Plaintext, Key, Nonce)

-- With additional authenticated data
local AAD = buffer.fromstring("user:alice,timestamp:12345")
local Ciphertext2, Tag2 = AEAD.Encrypt(Plaintext, Key, Nonce, AAD)
```

The AAD is authenticated but not encrypted. Use it for metadata you want to verify (like headers or routing info) but do not need to hide.

## Decrypt

### `AEAD.Decrypt(Ciphertext: buffer, Key: buffer, Nonce: buffer, Tag: buffer, AAD: buffer?, Rounds: number?, UseXChaCha20: boolean?) -> buffer?`

Decrypts and verifies. Returns `nil` if authentication fails.

```luau
local Decrypted = AEAD.Decrypt(Ciphertext, Key, Nonce, Tag, AAD)
if Decrypted then
    print("Decrypted:", buffer.tostring(Decrypted))
else
    warn("Authentication failed, data was tampered")
end
```

<AEADFlow />

:::warning Always Check for nil
If `Decrypt` returns `nil`, the ciphertext was modified or the wrong key/nonce was used. Never try to use the data.
:::

## XChaCha20 Mode

Standard ChaCha20 uses a 96 bit nonce, which has a birthday bound around 2^32 messages with the same key. If you are encrypting a lot of messages or want to use random nonces without worrying, use XChaCha20 with its 192 bit nonce:

```luau
local Key = CSPRNG.RandomBytes(32)
local Nonce = CSPRNG.RandomBytes(24) -- 24 bytes for XChaCha20

local Ciphertext, Tag = AEAD.Encrypt(Plaintext, Key, Nonce, nil, nil, true)
local Decrypted = AEAD.Decrypt(Ciphertext, Key, Nonce, Tag, nil, nil, true)
```

XChaCha20 uses HChaCha20 to derive a subkey from the first 128 bits of the nonce, giving you essentially unlimited messages per key without birthday concerns.

## Reduced Rounds

The default 20 rounds provide a large security margin. If you need more speed and can accept a smaller margin:

```luau
-- 12 rounds (ChaCha12), still considered secure
local Ciphertext, Tag = AEAD.Encrypt(Plaintext, Key, Nonce, nil, 12)

-- 8 rounds (ChaCha8), minimal security margin
local Ciphertext, Tag = AEAD.Encrypt(Plaintext, Key, Nonce, nil, 8)
```

For most applications, stick with 20 rounds. The performance difference in Luau is not dramatic enough to justify reduced security margin.

## Raw Stream Ciphers

If you need just the stream cipher without Poly1305 authentication:

### `AEAD.ChaCha20(Data: buffer, Key: buffer, Nonce: buffer, Counter: number?, Rounds: number?) -> buffer`
### `AEAD.XChaCha20(Data: buffer, Key: buffer, Nonce: buffer, Counter: number?, Rounds: number?) -> buffer`

```luau
local Encrypted = AEAD.ChaCha20(Data, Key, Nonce, 1, 20)
local Decrypted = AEAD.ChaCha20(Encrypted, Key, Nonce, 1, 20)
```

:::danger No Authentication
These raw functions do not authenticate. An attacker can flip bits in your ciphertext and you will not know. Only use these if you have a separate authentication mechanism.
:::

## Security Properties

**What AEAD gives you:**
- Confidentiality: attacker cannot read the plaintext
- Integrity: attacker cannot modify ciphertext without detection
- Authenticity: ciphertext was created by someone with the key

**What AEAD does not give you:**

**Key commitment** The same ciphertext can potentially decrypt to different plaintexts under different keys. This matters in multi key scenarios where an attacker might try to find a key that decrypts malicious content to something benign (Invisible Salamander attack). If this is a concern, include a hash of the key in your AAD.

**Nonce misuse resistance** Reusing a nonce with the same key is catastrophic. It leaks the XOR of plaintexts and breaks authentication. Use random nonces with XChaCha20 if you cannot guarantee uniqueness.
