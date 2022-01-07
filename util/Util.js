const fetch = require("node-fetch");
const Lame = require("node-lame").Lame;

exports.canModifyQueue = (member) => member.voice.channelID === member.guild.voice.channelID;

const convertWavEndpointToMp3 = async (url) => {
  const mp3Name = "current.mp3";
  const response = await fetch(url);
  const wavBuffer = await response.buffer();

  const encoder = new Lame({
    output: `./sounds/${mp3Name}`,
    bitrate: 320
  }).setBuffer(wavBuffer);

  await encoder.encode();
  return mp3Name;
};

let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

exports.convertWavEndpointToMp3 = convertWavEndpointToMp3;
exports.TOKEN = config ? config.TOKEN : process.env.TOKEN;
exports.YOUTUBE_API_KEY = config ? config.YOUTUBE_API_KEY : process.env.YOUTUBE_API_KEY;
exports.SOUNDCLOUD_CLIENT_ID = config ? config.SOUNDCLOUD_CLIENT_ID : process.env.SOUNDCLOUD_CLIENT_ID;
exports.PREFIX = (config ? config.PREFIX : process.env.PREFIX) || "/";
exports.MAX_PLAYLIST_SIZE =
  (config ? config.MAX_PLAYLIST_SIZE : parseInt(process.env.MAX_PLAYLIST_SIZE)) || 10;
exports.PRUNING = config ? config.PRUNING : process.env.PRUNING === "true" ? true : false;
exports.STAY_TIME = (config ? config.STAY_TIME : parseInt(process.env.STAY_TIME)) || 30;
exports.DEFAULT_VOLUME = (config ? config.DEFAULT_VOLUME : parseInt(process.env.DEFAULT_VOLUME)) || 100;
exports.LOCALE = (config ? config.LOCALE : process.env.LOCALE) || "en";
