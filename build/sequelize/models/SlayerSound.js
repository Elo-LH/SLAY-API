var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Model, Column, Table, ForeignKey, } from 'sequelize-typescript';
import { Sound } from './Sound.js';
import { Slayer } from './Slayer.js';
let SlayerSound = class SlayerSound extends Model {
    slayer_id;
    sound_id;
};
__decorate([
    ForeignKey(() => Slayer),
    Column,
    __metadata("design:type", Number)
], SlayerSound.prototype, "slayer_id", void 0);
__decorate([
    ForeignKey(() => Sound),
    Column,
    __metadata("design:type", Number)
], SlayerSound.prototype, "sound_id", void 0);
SlayerSound = __decorate([
    Table({
        timestamps: false,
        underscored: true,
    })
], SlayerSound);
export { SlayerSound };
