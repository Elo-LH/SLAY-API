"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sound = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Album_js_1 = require("./Album.js");
const Slayer_js_1 = require("./Slayer.js");
const SlayerSound_js_1 = require("./SlayerSound.js");
let Sound = class Sound extends sequelize_typescript_1.Model {
    title;
    audio;
    album_id;
    album;
    performers;
};
exports.Sound = Sound;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Sound.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Sound.prototype, "audio", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Album_js_1.Album),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Sound.prototype, "album_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Album_js_1.Album),
    __metadata("design:type", Album_js_1.Album)
], Sound.prototype, "album", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Slayer_js_1.Slayer, () => SlayerSound_js_1.SlayerSound),
    __metadata("design:type", Array)
], Sound.prototype, "performers", void 0);
exports.Sound = Sound = __decorate([
    (0, sequelize_typescript_1.Scopes)(() => ({
        album_id: {
            include: [
                {
                    model: Album_js_1.Album,
                    through: { attributes: [] },
                },
            ],
        },
        album: {
            include: [
                {
                    model: Album_js_1.Album,
                    through: { attributes: [] },
                },
            ],
        },
        performers: {
            include: [
                {
                    model: Slayer_js_1.Slayer,
                    through: { attributes: [] },
                },
            ],
        },
        full: {
            include: [
                {
                    model: Album_js_1.Album,
                    through: { attributes: [] },
                },
                {
                    model: Slayer_js_1.Slayer,
                    through: { attributes: [] },
                },
            ],
        },
    })),
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        underscored: true,
    })
], Sound);
