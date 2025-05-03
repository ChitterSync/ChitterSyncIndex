# VeloSync - Game Server Hosting

## **Overview**

VeloSync is a game server hosting service focused on providing **high-quality, flexible, and cost-effective** game server solutions. Initially supporting **Minecraft** and **Terraria**, the service plans to expand into a variety of other popular multiplayer games.

---

## **Key Features**
- **Flexible Pricing**: Based on **RAM usage** and **tokens**. Servers are charged **per hour** of RAM usage.
- **Subscription Tiers**:
  - **ChitterSyncronixer**: Earn **2,500 VeloSync tokens per month** which stacks over time or **2 24/7 Servers** and **1 24/7 Proxy server** Included with subscription plan.
  - Example cost: **6GB RAM server** = **6 tokens per hour**.
- **Game Server Support**: Starting with Minecraft and expanding to other games.
- **User Control**: Users can configure servers easily through a **web interface** or **API**.
- **Custom Server Options**: Ability to install mods, plugins, and additional game-specific customizations.

---

## **Server Pricing Models**
###  Token Method 
This method is made for Pay-to-play Servers for servers that only need to be online when people are playing, consider Subscription based if you want a server always online or has a lot of activity

| Server RAM + Shared CPU Cores                   | Price (per hour) | Estimated Monthly Cost if always online | Tokens per Month from CSX Plan |
| ----------------------------------------------- | ---------------- | --------------------------------------- | ------------------------------ |
| 1 GB + 0.5 Shared CPU Cores (for proxy servers) | 0.5 tokens       | $5 (approx.)                            | 2,500                          |
| 2GB + 1 CPU(Min for Lighter Games)              | 1 token          | $10 (approx.)                           | 2,500                          |
| 4GB (Base Min Rec.)                             | 2 tokens         | $20 (approx.)                           | 2,500                          |
| 6GB (Rec.)                                      | 3 tokens         | $30 (approx.)                           | 2,500                          |
| 12GB                                            | 6 tokens         | $60 (approx.)                           | 2,500                          |
| 16GB (Rec. Max)                                 | 8 tokens         | $80 (approx.)                           | 2,500                          |
| 32GB + 16 Shared CPU Cores                      | 32 tokens        | $320 (approx.)                          | 2,500                          |
| 64GB + 32 Shared CPU Cores                      | 64 tokens        | $640 (approx.)                          | 2,500                          |
| 128GB (Potentially overkill but we offer it)    | 128 tokens       | $1280 (approx.)                         | 2,5000                         |
#### Q&A
*tldr’s are bolded*

**Q: Do servers that are offline use tokens?**
A: **No**, they only use tokens when online, and by default are set to turn off after 5 minutes of No Players Being Online

**Q: Why any higher than 16 GBs are twice the tokens?**
A: **We Use Cloud-hosting Services** like AWS **for the servers that are 16 GBs or Lower to save on server costs**, but **we also have our own servers that can handle up to 256 GBs**, and **they cost more to run**.

**Q: What if my server is booted online by someone?**
A: **You still get charged** for those, to prevent this, only allow whitelisted users to join by selecting whitelist in `can start by joining` if the game is supported or completely allow no one by turning the feature off (its off by default)

**Q: Can i turn off or change the timer for auto-stop for my server?**
A: Yes, You can by `Server Settings > Automation > autostop server after <number> <Seconds|Minutes> > Toggle` and modifying the number value or Toggling Off (default is 5 Minutes | Toggled On) this is made to save you tokens as not having this could cost too much

### Subscription Method
this is made for Servers that are made to be always online, like proxy servers or minigame server lobbies for Minecraft or Terraria, consider Tokenized Method for servers that aren’t Popula see example pricing below

| Server RAM                                       | Price (per month/year)            | CSX Discount                                  |
| ------------------------------------------------ | --------------------------------- | --------------------------------------------- |
| 1 GB + 0.5 Shared CPU Cores (for proxy servers)  | $0.49/M or $4.99/Y (Save $1.98)   | Included up to 1, 50%                         |
| 2 GB + 1 Shared CPU Cores (Min for most servers) | $0.99/M or $9.99/Y (Save $2.98)   | Included 2 2-6 GB Servers For Most Games, 50% |
| 4 GB + 2 Shared CPU Cores                        | $1.99/M or $19.99/Y (Save $3.98)  | Included 2 2-6 GB Servers For Most Games, 50% |
| 6 GB + 3 Shared CPU Cores                        | $2.99/M or $29.99/Y (Save $5.98)  | Included 2 2-6 GB Servers For Most Games, 50% |
| 8 GB + 4 Shared CPU Cores                        | $3.99/M or $39.99/Y (Save $7.98)  | 50%                                           |
| 10 GB + 5 Shared CPU Cores                       | $4.99/M or $49.99/Y (Save $9.98)  | 50%                                           |
| 12 GB + 6 Shared CPU Cores                       | $5.99/M or $59.99/Y (Save $11.98) | 50%                                           |
You can buy up to 256 GB RAM + 128 Shared CPU Cores Per Month, Contact support for anything Higher for pricing and Availability

---

## **Supported Games (Current and Future)**
### **Current Games**:
- **Minecraft**: 
  - Fully supported with **Java/Bedrock cross-play** via **GeyserMC**.
  - Mods, datapacks, and custom plugins supported.
 - **Barotrauma:** 
   - Partially supported with **Steam**
   - Workshop supported
- **Terraria:**
  - Fully supported with **Steam**
  - tModLoader Supported
  
### **Future Game Support**:
| Game                            | Support Type             | Estimated Availability | Mod/Plugin Support | Modding Methods                                | Free Hosting Available? | Notes                                     |
| ------------------------------- | ------------------------ | ---------------------- | ------------------ | ---------------------------------------------- | ----------------------- | ----------------------------------------- |
| ARK: Survival Evolved           | Dedicated server hosting | Q2 2027                | Yes                | Mods (Steam Workshop), Custom Maps             | No                      | High CPU/memory usage                     |
| Rust                            | Dedicated server hosting | Q4 2027                | Yes                | Mods (uMod), Server Plugins                    | Yes                     | Popular modding support                   |
| Valheim                         | Dedicated server hosting | 2028                   | Yes                | Mods (Valheim Plus, BepInEx)                   | Yes                     | Mod-friendly survival game                |
| GTA V (FiveM)                   | Dedicated server hosting | Q3 2027                | Yes                | Lua, C#, Custom Mods                           | No                      | Resource-heavy, roleplay focused          |
| Red Dead Redemption 2 (RedM)    | Dedicated server hosting | Q4 2027                | Yes                | Lua, C#, Custom Scripts                        | No                      | Heavy load like FiveM                     |
| Counter-Strike 2 (CS2)          | Dedicated server hosting | Q3 2027                | Yes                | Mods (Steam Workshop), SourceMod               | Yes                     | Competitive and modding support           |
| Terraria                        | Dedicated server hosting | Q4 2027                | Yes                | tModLoader, Steam Workshop                     | Yes                     | Low resource usage                        |
| Project Zomboid                 | Dedicated server hosting | 2027                   | Yes                | Mods (Steam Workshop, .ini configs)            | Yes                     | Lightweight with deep modding             |
| Garry's Mod                     | Dedicated server hosting | 2027                   | Yes                | Lua Scripts, Steam Workshop                    | Yes                     | Strong modding scene                      |
| Farming Simulator Series        | Dedicated server hosting | 2027                   | Yes                | Mods (ModHub, .zip), DLC Support               | Yes                     | Great for co-op farms                     |
| Starbound                       | Dedicated server hosting | 2027                   | Yes                | Mods (Steam Workshop), JSON Scripting          | Yes                     | Lightweight and flexible                  |
| Subnautica                      | Dedicated server hosting | 2028                   | Yes (Limited)      | QModManager, ModAPI                            | Yes                     | Mostly single-player mods                 |
| Minecraft (Java/Bedrock)        | Dedicated server hosting | 2027                   | Yes                | Bukkit, Spigot, Paper, Archlight, Forge, Fabric, Datapacks (vanilla) and many many more options         | Yes                     | Free tier up to 2–4GB RAM                 |
| Unturned                        | Dedicated server hosting | 2027                   | Yes                | RocketMod, Steam Workshop                      | Yes                     | Extremely lightweight                     |
| SCP: Secret Laboratory          | Dedicated server hosting | 2027                   | Yes                | Plugins (EXILED), Mods                         | Yes                     | Growing community modding                 |
| The Forest / Sons of the Forest | Dedicated server hosting | 2028                   | Yes (Limited)      | Mods via trainers and modloaders               | Yes                     | Better for private co-op                  |
| Don't Starve Together           | Dedicated server hosting | 2027                   | Yes                | Steam Workshop Mods                            | Yes                     | Flexible config-based mods                |
| Conan Exiles                    | Dedicated server hosting | 2028                   | Yes                | Steam Workshop, modloaders                     | Yes                     | RP and sandbox friendly                   |
| Eco                             | Dedicated server hosting | 2027                   | Yes                | Mods (Mods.io), .cs files                      | Yes                     | Simulation-heavy but light on RAM         |
| Barotrauma                      | Dedicated server hosting | 2027                   | Yes                | Steam Workshop, XML modding                    | Yes                     | Submarine survival                        |
| Satisfactory                    | Dedicated server hosting | 2028                   | Yes                | SML (Satisfactory Mod Loader), mods.ficsit.app | Yes                     | Automation-heavy, growing mods            |
| Palworld                        | Dedicated server hosting | 2028                   | Yes (Expected)     | Mods (pending modding tools)                   | Yes                     | Modding still maturing                    |
| Core Keeper                     | Dedicated server hosting | 2028                   | Yes                | Mods (BepInEx, JSON configs)                   | Yes                     | Terraria-style base builder               |
| No Man’s Sky                    | Limited Support (P2P)    | TBD                    | Yes (Client-side)  | Save editors, trainers                         | No                      | Not ideal for dedicated servers           |
| Among Us                        | Limited Server Hosting   | 2028                   | Yes (Client-side)  | BepInEx, Custom Mods                           | Yes                     | Mostly P2P; modded lobbies                |
| Enshrouded                      | Dedicated server hosting | 2028                   | Yes                | Mods in development                            | Yes                     | New survival game                         |
| Vintage Story                   | Dedicated server hosting | 2027                   | Yes                | JSON/XML modding, community packs              | Yes                     | Minecraft-inspired voxel sandbox          |
| Colony Survival                 | Dedicated server hosting | 2027                   | Yes                | Modding via JSON and community tools           | Yes                     | Unique voxel colony sim                   |
| PixARK                          | Dedicated server hosting | 2028                   | Yes                | Steam mods, configs                            | Yes                     | ARK-like voxel game                       |
| Eco                             | Dedicated server hosting | 2027                   | Yes                | Mod.io, C# mod files                           | Yes                     | Economy-driven game                       |
| Stormworks                      | Dedicated server hosting | 2028                   | Yes                | Steam Workshop, Lua scripts                    | Yes                     | For engineering fans                      |
| Warhammer: Vermintide 2         | Limited Support          | 2028                   | Yes (Limited)      | Mods via sanctioned tools                      | No                      | Co-op focused, modding restricted         |
| Primal Horizon                  | Dedicated server hosting | 2028                   | Yes                | Mods (TBD), Custom Scripts                     | Yes                     | New game with survival mechanics          |
| Assetto Corsa                   | Dedicated server hosting | 2028                   | Yes                | Mods (Steam Workshop, Custom Tracks)           | Yes                     | Racing sim with strong modding community  |
| Operation: Harsh Doorstep       | Dedicated server hosting | 2028                   | Yes                | Mods (TBD), Custom Scripts                     | Yes                     | Tactical FPS with potential modding       |
| Polygoner FPS                   | Dedicated server hosting | 2028                   | Yes                | Mods (TBD), Custom Scripts                     | Yes                     | FPS with map editor and modding potential |
| ARK II                          | Dedicated server hosting | 2028                   | Yes                | Mods (Steam Workshop)                          | No                      | Sequel to ARK, heavy resource usage       |
| ARK: Survival Ascended          | Dedicated server hosting | 2028                   | Yes                | Mods (Steam Workshop)                          | No                      | Next-gen version of ARK                   |
| Hytale                          | Dedicated server hosting | 2028                   | Yes                | Mods (TBD), Custom Scripting                   | Yes                     | Highly anticipated block-based MMO        |
| Subnautica Below Zero           | Dedicated server hosting | 2028                   | Yes                | QModManager, ModAPI                            | Yes                     | Standalone expansion of Subnautica        |
| Dead by Daylight                | Dedicated server hosting | 2028                   | Yes                | Mods (Steam Workshop, Custom Scripts)          | Yes                     | Horror multiplayer with modding support   |
| Phasmophobia                    | Dedicated server hosting | 2028                   | Yes                | Mods (Steam Workshop, Custom Scripts)          | Yes                     | Cooperative horror, mod support           |
| Tera                            | Dedicated server hosting | 2028                   | Yes                | Mods (TeraMod, Custom Scripts)                 | Yes                     | MMO with a strong modding community       |
|                                 |                          |                        |                    |                                                |                         |                                           |

---

## **Game Server Hosting Goals**
- **Scalability**: Expand support for **high-demand games** and those with a **strong modding community**.
- **Community**: Build a **game modding** and **server hosting** ecosystem within VeloSync.
- **Flexibility**: Make game server hosting as customizable as possible through **server settings**, **mods**, **plugins**, and more.
  
---

## **Note**: Free hosting will be offered for select **lightweight games** and **smaller communities**, with paid options for **high-performance games** or those requiring **large amounts of resources**. VeloSync will also offer server **migration tools** for easy server switching, allowing players to move between servers effortlessly.

For more information, visit our website at **www.velosync.com** or **velosync.chittersync.com/**.
