---
sidebar_position: 2
---

# Security Best Practices

A condensed guide to using this library safely.

## Key Management

**Generate keys properly**

```luau
-- Correct
local Key = CSPRNG.RandomBytes(32)
local EdKey = CSPRNG.Ed25519Random()

-- Wrong
local Key = buffer.fromstring("mysecretpassword") -- predictable
local BadKey = buffer.create(32) -- all zeros
```

**Never hardcode keys.** Use Roblox Secrets for server side keys:

```luau
local SecretKey = game:GetService("HttpService"):GetSecret("ENCRYPTION_KEY")
-- Can't use secret data type with buffers though
```

**Rotate keys periodically.** Fresh keys limit damage from unknown compromises.

**Use different keys for different purposes**

```luau
local Context = buffer.fromstring("MyApp encryption key")
local KeyDeriver = Blake3.DeriveKey(Context)

local MasterSecret = CSPRNG.RandomBytes(32)
local EncryptionKey = KeyDeriver(MasterSecret, 32)

local MacContext = buffer.fromstring("MyApp mac key")
local MacDeriver = Blake3.DeriveKey(MacContext)
local MacKey = MacDeriver(MasterSecret, 32)
```

**Never expose keys to clients.** If the client needs to encrypt something, they should not have the key the server uses.

## Nonce and IV Handling

**The cardinal rule: never reuse a nonce with the same key.**

With ChaCha20 Poly1305, reusing a nonce leaks the XOR of plaintexts, allows forgery of authentication tags, and completely breaks security.

```luau
-- Correct: random nonces
local Nonce = CSPRNG.RandomBytes(12)

-- Correct: counter based nonces
local Counter = 0
local function GetNonce()
    Counter += 1
    local Nonce = buffer.create(12)
    buffer.writeu32(Nonce, 0, Counter)
    return Nonce
end

-- Wrong: reusing nonces
local StaticNonce = buffer.fromstring("fixednonce12")
```

**For high volume encryption, use XChaCha20**

```luau
-- 24 byte nonces have negligible collision probability
local Nonce = CSPRNG.RandomBytes(24)
local Ciphertext, Tag = AEAD.Encrypt(Data, Key, Nonce, nil, nil, true)
```

**AES GCM has a 2^32 message limit** per key with random 96 bit IVs. Rotate keys before approaching this.

## Algorithm Selection

### Hashing
| Use Case | Algorithm |
|----------|-----------|
| General purpose | SHA256 or BLAKE3 |
| Speed critical | BLAKE3 |
| Regulatory compliance | SHA256 or SHA3 256 |
| Key derivation | BLAKE3.DeriveKey |

### Symmetric Encryption
| Use Case | Algorithm |
|----------|-----------|
| General purpose | ChaCha20 Poly1305 (AEAD) |
| AES compatibility required | AES GCM |
| Many messages per key | XChaCha20 Poly1305 |

### Signatures
| Use Case | Algorithm |
|----------|-----------|
| General purpose | Ed25519 |
| Post quantum security | ML DSA |
| Both (paranoid) | Ed25519 + ML DSA |

### Key Exchange
| Use Case | Algorithm |
|----------|-----------|
| General purpose | X25519 |
| Post quantum security | ML KEM |
| Both (paranoid) | X25519 + ML KEM hybrid |

## Common Pitfalls

### Comparing secrets incorrectly

```luau
-- Wrong: timing attack possible
if HexMac == ExpectedMac then

-- Correct: constant time comparison
local function ConstantTimeCompare(a, b)
    if buffer.len(a) ~= buffer.len(b) then return false end
    local diff = 0
    for i = 0, buffer.len(a) - 1 do
        diff = bit32.bor(diff, bit32.bxor(buffer.readu8(a, i), buffer.readu8(b, i)))
    end
    return diff == 0
end
```

The library's internal comparisons are constant time, but be careful when writing your own verification logic.

### Using encryption without authentication

```luau
-- Wrong: raw ChaCha20 without Poly1305
local Encrypted = AEAD.ChaCha20(Data, Key, Nonce)
-- attacker can flip bits undetected

-- Correct: authenticated encryption
local Ciphertext, Tag = AEAD.Encrypt(Data, Key, Nonce)
```

### Trusting client provided crypto

```luau
-- Wrong: client sends encrypted data with their own key
RemoteEvent.OnServerEvent:Connect(function(player, encryptedData, clientKey)
    local decrypted = AEAD.Decrypt(encryptedData, clientKey, ...) -- pointless
end)

-- Correct: server controls the keys
RemoteEvent.OnServerEvent:Connect(function(player, encryptedData, nonce, tag)
    local decrypted = AEAD.Decrypt(encryptedData, ServerKey, nonce, tag)
end)
```

### Forgetting that encryption is not authentication

Encryption hides content. It does not prove who sent it. If you need to know the sender, use signatures or MACs.

```luau
-- Encrypt for confidentiality
local Ciphertext, Tag = AEAD.Encrypt(Message, SharedKey, Nonce)

-- Sign for authenticity
local Signature = EdDSA.Sign(Message, SenderPrivate, SenderPublic)
```

## What the Library Cannot Protect Against

**Side channels** Luau execution timing is not constant. The library uses constant time operations where feasible, but the VM's behavior is not guaranteed.

**Memory exposure** Buffers persist until garbage collection. Zeroing them helps but does not guarantee the memory is overwritten before being reallocated.

**Key compromise** If someone gets your key, they get your data.

**Protocol bugs** The primitives are solid, but combining them incorrectly breaks security. AEAD without unique nonces, signatures without verifying the public key source, and so on.

## Quick Checklist

Before releasing:

- [ ] All keys generated with CSPRNG
- [ ] No hardcoded keys in source
- [ ] Nonces are unique per message
- [ ] Using authenticated encryption (AEAD or AES GCM)
- [ ] Signatures verified before trusting data
- [ ] Keys not exposed to clients
- [ ] Error handling does not leak information
- [ ] Tested with invalid inputs
