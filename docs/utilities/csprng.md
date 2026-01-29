---
sidebar_position: 1
---

# CSPRNG

Cryptographically Secure Pseudo Random Number Generator. Use this for ALL cryptographic randomness. Never use `math.random()` for anything security related.

```luau
local CSPRNG = Cryptography.Utilities.CSPRNG
```

## Random Numbers

### `CSPRNG.Random() -> number`

Returns a random float between 0 (inclusive) and 1 (exclusive).

```luau
local RandomFloat = CSPRNG.Random()
print(RandomFloat) -- e.g., 0.7234891...
```

### `CSPRNG.RandomInt(Min: number, Max: number?) -> number`

Returns a random integer. If only one argument, returns 1 to Min.

```luau
local DiceRoll = CSPRNG.RandomInt(1, 6)
local Index = CSPRNG.RandomInt(100) -- 1 to 100
```

### `CSPRNG.RandomNumber(Min: number, Max: number?) -> number`

Returns a random float in range. If only one argument, returns 0 to Min.

```luau
local Value = CSPRNG.RandomNumber(0.5, 10.5)
local Normalized = CSPRNG.RandomNumber(1.0) -- 0 to 1
```

## Random Bytes

### `CSPRNG.RandomBytes(Count: number) -> buffer`

The workhorse function. Returns Count cryptographically random bytes.

```luau
local Key = CSPRNG.RandomBytes(32)      -- 256 bit key
local Nonce = CSPRNG.RandomBytes(12)    -- 96 bit nonce
local IV = CSPRNG.RandomBytes(16)       -- 128 bit IV
```

Use this for generating keys, nonces, IVs, salts, and any other security sensitive random data.

### `CSPRNG.RandomHex(Length: number) -> string`

Returns a hex string of the specified length.

```luau
local HexToken = CSPRNG.RandomHex(32) -- 32 hex chars
print(HexToken) -- e.g., "a7f3c1d4e8b2..."
```

### `CSPRNG.RandomString(Length: number, AsBuffer: boolean?) -> buffer | string`

Returns random alphanumeric characters.

```luau
local Token = CSPRNG.RandomString(20) -- returns string
local TokenBuffer = CSPRNG.RandomString(20, true) -- returns buffer
```

## Ed25519 Key Generation

### `CSPRNG.Ed25519Random() -> buffer`

Generates a properly clamped 32 byte Ed25519 secret key.

```luau
local SecretKey = CSPRNG.Ed25519Random()
local PublicKey = EdDSA.PublicKey(SecretKey)
```

Always use this instead of `RandomBytes(32)` for Ed25519 keys. The clamping ensures the key is a valid scalar for the curve.

### `CSPRNG.Ed25519ClampedBytes(Input: buffer) -> buffer`

Clamps existing 32 bytes to valid Ed25519 format.

```luau
local SomeBytes = CSPRNG.RandomBytes(32)
local ClampedKey = CSPRNG.Ed25519ClampedBytes(SomeBytes)
```

Clamping clears the lowest 3 bits, clears the highest bit, and sets the second highest bit. This ensures the scalar is in the right subgroup and has consistent bit length.

## Entropy Management

### `CSPRNG.Reseed(CustomEntropy: buffer?)`

Forces state regeneration with optional custom entropy.

```luau
-- Reseed with system entropy only
CSPRNG.Reseed()

-- Add custom entropy
local Entropy = buffer.create(8)
buffer.writef64(Entropy, 0, tick())
CSPRNG.Reseed(Entropy)
```

The CSPRNG auto reseeds periodically, but you can force a reseed if you want to mix in application specific entropy.

### `CSPRNG.AddEntropyProvider(ProviderFunction: () -> buffer?)`

Registers a function that provides additional entropy.

```luau
local function GameEntropy()
    local Buf = buffer.create(12)
    buffer.writeu32(Buf, 0, PlayerCount)
    buffer.writef64(Buf, 4, SomeUnpredictableGameState)
    return Buf
end

CSPRNG.AddEntropyProvider(GameEntropy)
```

Provider functions are called during reseeding. They should return fresh entropy each time or `nil` if nothing new is available.

### `CSPRNG.RemoveEntropyProvider(ProviderFunction: () -> buffer?)`

Unregisters an entropy provider.

```luau
CSPRNG.RemoveEntropyProvider(GameEntropy)
```

## How It Works

The CSPRNG uses ChaCha20 as a deterministic random bit generator (DRBG) with BLAKE3 for entropy mixing.

**Initialization** Gather entropy from available sources (tick, os.clock, os.time, math.random for initial seeding), mix entropy with BLAKE3 to derive the ChaCha20 key and nonce, generate initial random block.

**Generation** Run ChaCha20 to produce 64 byte blocks, extract bytes as needed, when the block is exhausted increment counter and generate another.

**Reseeding** Auto reseeds periodically, mixes fresh entropy with BLAKE3.

## Security Notes

**Do:**
- Use `CSPRNG` for all cryptographic randomness
- Use `Ed25519Random()` for Ed25519 secret keys
- Consider adding application specific entropy via providers

**Do not:**
- Use `math.random()` for keys, nonces, or anything security sensitive
- Assume CSPRNG output is truly random (it is pseudorandom, unless you use TrueRandom example)
- Expose CSPRNG state or output directly to untrusted parties

The CSPRNG produces output computationally indistinguishable from random for anyone who does not know the internal state. The auto reseeding limits damage if state is ever found out.
