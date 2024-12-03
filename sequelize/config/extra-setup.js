function applyExtraSetup(sequelize) {
  const {
    album,
    artist,
    band,
    comment,
    geolocation,
    instrument,
    musicalGenre,
    privateMessage,
    slayer,
    slayerSearch,
    sound,
  } = sequelize.models

  orchestra.hasMany(instrument)
  instrument.belongsTo(orchestra)
}

module.exports = { applyExtraSetup }
