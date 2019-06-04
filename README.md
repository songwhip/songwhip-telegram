A stateless 'function' endpoint that responds to HTTP events sent by Telegram Clients that are chatting to `SongwhipBot` directly or have `SongwhipBot` added to a group.

## Tech overview

- Uses Telegram WebHooks API so that the bot can be hosted in a serverless/Lambda environment, woken-up by inbound requests as opposed to polling for changes.
- There's a risk this could be an expensive service as it listens to every message send in a group for a music link. We'll monitor it.
- We opt-out of replying via the original inbound http response (via `webhookReply: false`) so that we can resolve the request straight away and send a string of follow-up messages after. This makes things simpler when sending more than one message response.
- We're using Now V2.
- The `now.json` defines production env vars, when we deploy to `staging` with `yarn deploy:staging` we override select env vars so that the `@SongwhipDevBot` token is used instead of `@SongwhipBot` and the staging endpoint `songwhip-telegram.wilsonpage.now.sh` is used.
- Some bot configuration (eg. the command list or enabling 'inline' command) must be done from the Telegram app via the `@BotFather` bot.
- We're using `now secret` from the CLi to store the Telegram bot token, which is used in `now.json` via the magic `@songwhip-telegram-bot-token` placeholder.
