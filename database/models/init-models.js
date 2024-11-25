var DataTypes = require("sequelize").DataTypes;
var _album = require("./album");
var _artist = require("./artist");
var _artist_instrument = require("./artist_instrument");
var _artist_musical_genre = require("./artist_musical_genre");
var _band = require("./band");
var _band_geolocation = require("./band_geolocation");
var _band_instrument = require("./band_instrument");
var _band_musical_genre = require("./band_musical_genre");
var _comment = require("./comment");
var _geolocation = require("./geolocation");
var _instrument = require("./instrument");
var _musical_genre = require("./musical_genre");
var _private_message = require("./private_message");
var _slayer = require("./slayer");
var _slayer_follow = require("./slayer_follow");
var _slayer_geolocation = require("./slayer_geolocation");
var _slayer_like_sound = require("./slayer_like_sound");
var _slayer_pin_artist = require("./slayer_pin_artist");
var _slayer_pin_sound = require("./slayer_pin_sound");
var _slayer_repost_sound = require("./slayer_repost_sound");
var _slayer_search = require("./slayer_search");
var _slayer_search_instrument = require("./slayer_search_instrument");
var _slayer_search_musical_genre = require("./slayer_search_musical_genre");
var _sound = require("./sound");
var _sound_artist = require("./sound_artist");
var _sound_band = require("./sound_band");

function initModels(sequelize) {
  var album = _album(sequelize, DataTypes);
  var artist = _artist(sequelize, DataTypes);
  var artist_instrument = _artist_instrument(sequelize, DataTypes);
  var artist_musical_genre = _artist_musical_genre(sequelize, DataTypes);
  var band = _band(sequelize, DataTypes);
  var band_geolocation = _band_geolocation(sequelize, DataTypes);
  var band_instrument = _band_instrument(sequelize, DataTypes);
  var band_musical_genre = _band_musical_genre(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var geolocation = _geolocation(sequelize, DataTypes);
  var instrument = _instrument(sequelize, DataTypes);
  var musical_genre = _musical_genre(sequelize, DataTypes);
  var private_message = _private_message(sequelize, DataTypes);
  var slayer = _slayer(sequelize, DataTypes);
  var slayer_follow = _slayer_follow(sequelize, DataTypes);
  var slayer_geolocation = _slayer_geolocation(sequelize, DataTypes);
  var slayer_like_sound = _slayer_like_sound(sequelize, DataTypes);
  var slayer_pin_artist = _slayer_pin_artist(sequelize, DataTypes);
  var slayer_pin_sound = _slayer_pin_sound(sequelize, DataTypes);
  var slayer_repost_sound = _slayer_repost_sound(sequelize, DataTypes);
  var slayer_search = _slayer_search(sequelize, DataTypes);
  var slayer_search_instrument = _slayer_search_instrument(sequelize, DataTypes);
  var slayer_search_musical_genre = _slayer_search_musical_genre(sequelize, DataTypes);
  var sound = _sound(sequelize, DataTypes);
  var sound_artist = _sound_artist(sequelize, DataTypes);
  var sound_band = _sound_band(sequelize, DataTypes);

  artist.belongsToMany(instrument, { as: 'instrument_id_instruments', through: artist_instrument, foreignKey: "artist_id", otherKey: "instrument_id" });
  artist.belongsToMany(musical_genre, { as: 'musical_genre_id_musical_genres', through: artist_musical_genre, foreignKey: "artist_id", otherKey: "musical_genre_id" });
  artist.belongsToMany(slayer, { as: 'slayer_id_slayer_slayer_pin_artists', through: slayer_pin_artist, foreignKey: "artist_id", otherKey: "slayer_id" });
  artist.belongsToMany(sound, { as: 'sound_id_sound_sound_artists', through: sound_artist, foreignKey: "artist_id", otherKey: "sound_id" });
  band.belongsToMany(geolocation, { as: 'geolocation_id_geolocations', through: band_geolocation, foreignKey: "band_id", otherKey: "geolocation_id" });
  band.belongsToMany(instrument, { as: 'instrument_id_instrument_band_instruments', through: band_instrument, foreignKey: "band_id", otherKey: "instrument_id" });
  band.belongsToMany(musical_genre, { as: 'musical_genre_id_musical_genre_band_musical_genres', through: band_musical_genre, foreignKey: "band_id", otherKey: "musical_genre_id" });
  band.belongsToMany(sound, { as: 'sound_id_sound_sound_bands', through: sound_band, foreignKey: "band_id", otherKey: "sound_id" });
  geolocation.belongsToMany(band, { as: 'band_id_bands', through: band_geolocation, foreignKey: "geolocation_id", otherKey: "band_id" });
  geolocation.belongsToMany(slayer, { as: 'user_id_slayers', through: slayer_geolocation, foreignKey: "geolocation_id", otherKey: "user_id" });
  instrument.belongsToMany(artist, { as: 'artist_id_artists', through: artist_instrument, foreignKey: "instrument_id", otherKey: "artist_id" });
  instrument.belongsToMany(band, { as: 'band_id_band_band_instruments', through: band_instrument, foreignKey: "instrument_id", otherKey: "band_id" });
  instrument.belongsToMany(slayer_search, { as: 'slayer_search_id_slayer_searches', through: slayer_search_instrument, foreignKey: "instrument_id", otherKey: "slayer_search_id" });
  musical_genre.belongsToMany(artist, { as: 'artist_id_artist_artist_musical_genres', through: artist_musical_genre, foreignKey: "musical_genre_id", otherKey: "artist_id" });
  musical_genre.belongsToMany(band, { as: 'band_id_band_band_musical_genres', through: band_musical_genre, foreignKey: "musical_genre_id", otherKey: "band_id" });
  musical_genre.belongsToMany(slayer_search, { as: 'slayer_search_id_slayer_search_slayer_search_musical_genres', through: slayer_search_musical_genre, foreignKey: "musical_genre_id", otherKey: "slayer_search_id" });
  slayer.belongsToMany(artist, { as: 'artist_id_artist_slayer_pin_artists', through: slayer_pin_artist, foreignKey: "slayer_id", otherKey: "artist_id" });
  slayer.belongsToMany(geolocation, { as: 'geolocation_id_geolocation_slayer_geolocations', through: slayer_geolocation, foreignKey: "user_id", otherKey: "geolocation_id" });
  slayer.belongsToMany(slayer, { as: 'slayer_id_slayers', through: slayer_follow, foreignKey: "followed_slayer_id", otherKey: "slayer_id" });
  slayer.belongsToMany(slayer, { as: 'followed_slayer_id_slayers', through: slayer_follow, foreignKey: "slayer_id", otherKey: "followed_slayer_id" });
  slayer.belongsToMany(sound, { as: 'sound_id_sounds', through: slayer_like_sound, foreignKey: "slayer_id", otherKey: "sound_id" });
  slayer.belongsToMany(sound, { as: 'sound_id_sound_slayer_pin_sounds', through: slayer_pin_sound, foreignKey: "slayer_id", otherKey: "sound_id" });
  slayer.belongsToMany(sound, { as: 'sound_id_sound_slayer_repost_sounds', through: slayer_repost_sound, foreignKey: "slayer_id", otherKey: "sound_id" });
  slayer_search.belongsToMany(instrument, { as: 'instrument_id_instrument_slayer_search_instruments', through: slayer_search_instrument, foreignKey: "slayer_search_id", otherKey: "instrument_id" });
  slayer_search.belongsToMany(musical_genre, { as: 'musical_genre_id_musical_genre_slayer_search_musical_genres', through: slayer_search_musical_genre, foreignKey: "slayer_search_id", otherKey: "musical_genre_id" });
  sound.belongsToMany(artist, { as: 'artist_id_artist_sound_artists', through: sound_artist, foreignKey: "sound_id", otherKey: "artist_id" });
  sound.belongsToMany(band, { as: 'band_id_band_sound_bands', through: sound_band, foreignKey: "sound_id", otherKey: "band_id" });
  sound.belongsToMany(slayer, { as: 'slayer_id_slayer_slayer_like_sounds', through: slayer_like_sound, foreignKey: "sound_id", otherKey: "slayer_id" });
  sound.belongsToMany(slayer, { as: 'slayer_id_slayer_slayer_pin_sounds', through: slayer_pin_sound, foreignKey: "sound_id", otherKey: "slayer_id" });
  sound.belongsToMany(slayer, { as: 'slayer_id_slayer_slayer_repost_sounds', through: slayer_repost_sound, foreignKey: "sound_id", otherKey: "slayer_id" });
  sound.belongsTo(album, { as: "album", foreignKey: "album_id"});
  album.hasMany(sound, { as: "sounds", foreignKey: "album_id"});
  artist_instrument.belongsTo(artist, { as: "artist", foreignKey: "artist_id"});
  artist.hasMany(artist_instrument, { as: "artist_instruments", foreignKey: "artist_id"});
  artist_musical_genre.belongsTo(artist, { as: "artist", foreignKey: "artist_id"});
  artist.hasMany(artist_musical_genre, { as: "artist_musical_genres", foreignKey: "artist_id"});
  slayer_pin_artist.belongsTo(artist, { as: "artist", foreignKey: "artist_id"});
  artist.hasMany(slayer_pin_artist, { as: "slayer_pin_artists", foreignKey: "artist_id"});
  sound_artist.belongsTo(artist, { as: "artist", foreignKey: "artist_id"});
  artist.hasMany(sound_artist, { as: "sound_artists", foreignKey: "artist_id"});
  band_geolocation.belongsTo(band, { as: "band", foreignKey: "band_id"});
  band.hasMany(band_geolocation, { as: "band_geolocations", foreignKey: "band_id"});
  band_instrument.belongsTo(band, { as: "band", foreignKey: "band_id"});
  band.hasMany(band_instrument, { as: "band_instruments", foreignKey: "band_id"});
  band_musical_genre.belongsTo(band, { as: "band", foreignKey: "band_id"});
  band.hasMany(band_musical_genre, { as: "band_musical_genres", foreignKey: "band_id"});
  sound_band.belongsTo(band, { as: "band", foreignKey: "band_id"});
  band.hasMany(sound_band, { as: "sound_bands", foreignKey: "band_id"});
  band_geolocation.belongsTo(geolocation, { as: "geolocation", foreignKey: "geolocation_id"});
  geolocation.hasMany(band_geolocation, { as: "band_geolocations", foreignKey: "geolocation_id"});
  slayer_geolocation.belongsTo(geolocation, { as: "geolocation", foreignKey: "geolocation_id"});
  geolocation.hasMany(slayer_geolocation, { as: "slayer_geolocations", foreignKey: "geolocation_id"});
  artist_instrument.belongsTo(instrument, { as: "instrument", foreignKey: "instrument_id"});
  instrument.hasMany(artist_instrument, { as: "artist_instruments", foreignKey: "instrument_id"});
  band_instrument.belongsTo(instrument, { as: "instrument", foreignKey: "instrument_id"});
  instrument.hasMany(band_instrument, { as: "band_instruments", foreignKey: "instrument_id"});
  slayer_search_instrument.belongsTo(instrument, { as: "instrument", foreignKey: "instrument_id"});
  instrument.hasMany(slayer_search_instrument, { as: "slayer_search_instruments", foreignKey: "instrument_id"});
  artist_musical_genre.belongsTo(musical_genre, { as: "musical_genre", foreignKey: "musical_genre_id"});
  musical_genre.hasMany(artist_musical_genre, { as: "artist_musical_genres", foreignKey: "musical_genre_id"});
  band_musical_genre.belongsTo(musical_genre, { as: "musical_genre", foreignKey: "musical_genre_id"});
  musical_genre.hasMany(band_musical_genre, { as: "band_musical_genres", foreignKey: "musical_genre_id"});
  slayer_search_musical_genre.belongsTo(musical_genre, { as: "musical_genre", foreignKey: "musical_genre_id"});
  musical_genre.hasMany(slayer_search_musical_genre, { as: "slayer_search_musical_genres", foreignKey: "musical_genre_id"});
  artist.belongsTo(slayer, { as: "slayer", foreignKey: "slayer_id"});
  slayer.hasOne(artist, { as: "artist", foreignKey: "slayer_id"});
  comment.belongsTo(slayer, { as: "author", foreignKey: "author_id"});
  slayer.hasMany(comment, { as: "comments", foreignKey: "author_id"});
  private_message.belongsTo(slayer, { as: "author", foreignKey: "author_id"});
  slayer.hasMany(private_message, { as: "private_messages", foreignKey: "author_id"});
  private_message.belongsTo(slayer, { as: "recipient", foreignKey: "recipient_id"});
  slayer.hasMany(private_message, { as: "recipient_private_messages", foreignKey: "recipient_id"});
  slayer_follow.belongsTo(slayer, { as: "followed_slayer", foreignKey: "followed_slayer_id"});
  slayer.hasMany(slayer_follow, { as: "slayer_follows", foreignKey: "followed_slayer_id"});
  slayer_follow.belongsTo(slayer, { as: "slayer", foreignKey: "slayer_id"});
  slayer.hasMany(slayer_follow, { as: "slayer_slayer_follows", foreignKey: "slayer_id"});
  slayer_geolocation.belongsTo(slayer, { as: "user", foreignKey: "user_id"});
  slayer.hasMany(slayer_geolocation, { as: "slayer_geolocations", foreignKey: "user_id"});
  slayer_like_sound.belongsTo(slayer, { as: "slayer", foreignKey: "slayer_id"});
  slayer.hasMany(slayer_like_sound, { as: "slayer_like_sounds", foreignKey: "slayer_id"});
  slayer_pin_artist.belongsTo(slayer, { as: "slayer", foreignKey: "slayer_id"});
  slayer.hasMany(slayer_pin_artist, { as: "slayer_pin_artists", foreignKey: "slayer_id"});
  slayer_pin_sound.belongsTo(slayer, { as: "slayer", foreignKey: "slayer_id"});
  slayer.hasMany(slayer_pin_sound, { as: "slayer_pin_sounds", foreignKey: "slayer_id"});
  slayer_repost_sound.belongsTo(slayer, { as: "slayer", foreignKey: "slayer_id"});
  slayer.hasMany(slayer_repost_sound, { as: "slayer_repost_sounds", foreignKey: "slayer_id"});
  slayer_search.belongsTo(slayer, { as: "slayer", foreignKey: "slayer_id"});
  slayer.hasMany(slayer_search, { as: "slayer_searches", foreignKey: "slayer_id"});
  slayer_search_instrument.belongsTo(slayer_search, { as: "slayer_search", foreignKey: "slayer_search_id"});
  slayer_search.hasMany(slayer_search_instrument, { as: "slayer_search_instruments", foreignKey: "slayer_search_id"});
  slayer_search_musical_genre.belongsTo(slayer_search, { as: "slayer_search", foreignKey: "slayer_search_id"});
  slayer_search.hasMany(slayer_search_musical_genre, { as: "slayer_search_musical_genres", foreignKey: "slayer_search_id"});
  comment.belongsTo(sound, { as: "sound", foreignKey: "sound_id"});
  sound.hasMany(comment, { as: "comments", foreignKey: "sound_id"});
  slayer_like_sound.belongsTo(sound, { as: "sound", foreignKey: "sound_id"});
  sound.hasMany(slayer_like_sound, { as: "slayer_like_sounds", foreignKey: "sound_id"});
  slayer_pin_sound.belongsTo(sound, { as: "sound", foreignKey: "sound_id"});
  sound.hasMany(slayer_pin_sound, { as: "slayer_pin_sounds", foreignKey: "sound_id"});
  slayer_repost_sound.belongsTo(sound, { as: "sound", foreignKey: "sound_id"});
  sound.hasMany(slayer_repost_sound, { as: "slayer_repost_sounds", foreignKey: "sound_id"});
  sound_artist.belongsTo(sound, { as: "sound", foreignKey: "sound_id"});
  sound.hasMany(sound_artist, { as: "sound_artists", foreignKey: "sound_id"});
  sound_band.belongsTo(sound, { as: "sound", foreignKey: "sound_id"});
  sound.hasMany(sound_band, { as: "sound_bands", foreignKey: "sound_id"});

  return {
    album,
    artist,
    artist_instrument,
    artist_musical_genre,
    band,
    band_geolocation,
    band_instrument,
    band_musical_genre,
    comment,
    geolocation,
    instrument,
    musical_genre,
    private_message,
    slayer,
    slayer_follow,
    slayer_geolocation,
    slayer_like_sound,
    slayer_pin_artist,
    slayer_pin_sound,
    slayer_repost_sound,
    slayer_search,
    slayer_search_instrument,
    slayer_search_musical_genre,
    sound,
    sound_artist,
    sound_band,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
