var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Scopes, Model, Column, Table, ForeignKey, BelongsTo, BelongsToMany, } from 'sequelize-typescript';
import { Album } from './Album.js';
import { Slayer } from './Slayer.js';
import { SlayerSound } from './SlayerSound.js';
let Sound = class Sound extends Model {
    title;
    audio;
    album_id;
    album;
    performers;
};
__decorate([
    Column,
    __metadata("design:type", String)
], Sound.prototype, "title", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], Sound.prototype, "audio", void 0);
__decorate([
    ForeignKey(() => Album),
    Column,
    __metadata("design:type", Number)
], Sound.prototype, "album_id", void 0);
__decorate([
    BelongsTo(() => Album),
    __metadata("design:type", Album)
], Sound.prototype, "album", void 0);
__decorate([
    BelongsToMany(() => Slayer, () => SlayerSound),
    __metadata("design:type", Array)
], Sound.prototype, "performers", void 0);
Sound = __decorate([
    Scopes(() => ({
        album_id: {
            include: [
                {
                    model: Album,
                    through: { attributes: [] },
                },
            ],
        },
        album: {
            include: [
                {
                    model: Album,
                    through: { attributes: [] },
                },
            ],
        },
        performers: {
            include: [
                {
                    model: Slayer,
                    through: { attributes: [] },
                },
            ],
        },
        full: {
            include: [
                {
                    model: Album,
                    through: { attributes: [] },
                },
                {
                    model: Slayer,
                    through: { attributes: [] },
                },
            ],
        },
    })),
    Table({
        timestamps: false,
        underscored: true,
    })
], Sound);
export { Sound };
