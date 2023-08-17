const { ShardingManager } = require('discord.js')
require('dotenv').config()
const shard = new ShardingManager('./src/IrisLauncher.js', { totalShards: Number(process.env.TOTAL_SHARDS) ?? 1, respawn: true, token: process.env.TOKEN })

shard.spawn()