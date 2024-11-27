function applyExtraSetup(sequelize) {
  const {
    album,
    artist,
    band,
    geolocation,
    instrument,
    musicalGenre,
    privateMessage,
    slayer,
    sound,
  } = sequelize.models

  orchestra.hasMany(instrument)
  instrument.belongsTo(orchestra)
}

module.exports = { applyExtraSetup }
