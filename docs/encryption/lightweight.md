---
sidebar_position: 3
---

# Lightweight Ciphers

These exist for specific use cases where you need something simple and fast. They come with tradeoffs you need to understand.

## XOR

```luau
local XOR = Cryptography.Encryption.XOR
```

### `XOR(Data: buffer, Key: buffer) -> buffer`

Simple XOR cipher. Encryption and decryption are the same operation.

```luau
local Key = buffer.fromstring("MySecretKey12345")
local Encrypted = XOR(buffer.fromstring("Hello"), Key)
local Decrypted = XOR(Encrypted, Key)
print(buffer.tostring(Decrypted)) -- "Hello"
```

The implementation handles keys of any length by repeating them. Keys that are multiples of 4 bytes are fastest due to 32 bit word operations.

:::danger Only Secure as a One Time Pad
XOR is only secure if the key is truly random (from CSPRNG, not `math.random`), the key is at least as long as the message, and the key is never reused.

Reusing a key leaks `plaintext1 XOR plaintext2`, which is often enough to recover both plaintexts. In practice, this means XOR is almost never the right choice. Use AEAD instead.
:::

## Simon

```luau
local Simon = Cryptography.Encryption.Simon
```

NSA designed lightweight block cipher. Optimized for hardware, but also reasonably fast in software.

### `Simon.Encrypt(PlaintextBuffer: buffer, KeyBuffer: buffer) -> buffer`
### `Simon.Decrypt(CipherBuffer: buffer, KeyBuffer: buffer) -> buffer`

| Parameter | Size |
|-----------|------|
| Key | 16 bytes |
| Block | 8 bytes (64 bit) |
| Rounds | 44 |

```luau
local Key = buffer.fromstring("MySecretKey12345") -- exactly 16 bytes
local Encrypted = Simon.Encrypt(buffer.fromstring("Hello World"), Key)
local Decrypted = Simon.Decrypt(Encrypted, Key)
```

Messages are automatically padded to 8 byte blocks. The padding is included in the ciphertext.

:::warning No Authentication
Simon is a raw block cipher. There is no authentication, so an attacker can modify ciphertext without detection. It is also in ECB mode, meaning identical plaintext blocks produce identical ciphertext blocks.

For anything serious, use AEAD or AES GCM.
:::

## Speck

```luau
local Speck = Cryptography.Encryption.Speck
```

Another NSA lightweight cipher, optimized for software performance.

### `Speck.Encrypt(PlaintextBuffer: buffer, KeyBuffer: buffer) -> buffer`
### `Speck.Decrypt(CipherBuffer: buffer, KeyBuffer: buffer) -> buffer`

| Parameter | Size |
|-----------|------|
| Key | 16 bytes |
| Block | 8 bytes (64 bit) |
| Rounds | 27 |

```luau
local Key = buffer.fromstring("MySecretKey12345") -- exactly 16 bytes
local Encrypted = Speck.Encrypt(buffer.fromstring("Hello World"), Key)
local Decrypted = Speck.Decrypt(Encrypted, Key)
```

Same caveats as Simon: no authentication, ECB mode, automatic padding.

## Simon vs Speck

Both were released by the NSA in 2013. The main differences:

| | Simon | Speck |
|---|-------|-------|
| Design | Feistel network | ARX (add rotate xor) |
| Optimized for | Hardware | Software |
| Rounds (64 bit block) | 44 | 27 |
| Operations | AND, XOR, rotate | Add, rotate, XOR |

In pure Luau, Speck is typically faster due to fewer rounds and simpler operations. Neither has received as much public cryptanalysis as AES.

## When to Use These

Probably never for security critical applications.

These might make sense if you need to obfuscate data where security is not critical, are constrained by message size and cannot afford AEAD's tag overhead, need compatibility with systems already using Simon/Speck, or understand the risks and have other authentication mechanisms.

For everything else, use AEAD (ChaCha20 Poly1305) or AES GCM.
