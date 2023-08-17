module.exports = class AntiInviteUtils {
  static scanMessage(message) {
    const regex = (/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io))/g)
    if (!regex.test(message)) return false
    const messageReplace = message
      .replace(/(https:\/\/)?(http:\/\/)/g, '')
      .replace(/(discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io)/g, '')
      .replace(/(\/)/g, '')

    if (messageReplace.length < 1) return false
    if ((/(\/+(\s+[a-z0-9-.]+)?.+)/g).test(message)) {
      return true
    }

    return regex.test(message)
  }
}