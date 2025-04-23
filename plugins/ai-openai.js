import fetch from 'node-fetch'
import axios from 'axios'
import translate from '@vitalets/google-translate-api'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({ organization: global.openai_org_id, apiKey: global.openai_key })
const openaiii = new OpenAIApi(configuration)

var handler = async (m, { conn, text, usedPrefix, command }) => {

if (usedPrefix == 'a' || usedPrefix == 'A') return
if (!text) return conn.reply(m.chat, `*what...¿*\n\n اكتب الي انت عايزه وقبله xm.\n\nوبس يروحي🚀`, m, fake)

try {
conn.sendPresenceUpdate('composing', m.chat)

// Traducir de indonesio a Arabic
const translation = await translate(text, { from: 'en', to: 'ar' })
const indonesianText = translation.text
let syms = هعععع عايز اي`
let res = await openaiii.ChatGpt(indonesianText, syms)

await m.reply(res.text)

} catch (err) {
try {
let ia2 = await fetch(`https://aemt.me/openai?text=${text}`)
let resu2 = await ia2.json()
m.reply(resu2.result.trim())
} catch (err) {
try {
let tioress = await fetch(`https://api.lolhuman.xyz/api/openai-turbo?apikey=GataDios&text=${text}`)
let hasill = await tioress.json()
conn.reply(m.chat, `${hasill.result}`, m, fake, )
} catch (err) {
console.error(err)
conn.reply(m.chat, '❗️❌ *wing*', m, fake, )
}
}}

}
handler.help = ['ia']
handler.tags = ['ai']
handler.command = ['xm', 'chatgpt', 'ia', 'بوت']

export default handler
