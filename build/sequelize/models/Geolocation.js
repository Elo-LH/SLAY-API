var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Model, Column, Table, HasMany, AllowNull } from 'sequelize-typescript';
import { Slayer } from './Slayer.js';
// import { SlayerSearch } from './SlayerSearch.js'
let Geolocation = class Geolocation extends Model {
    city;
    latitude;
    longitude;
    slayers;
};
__decorate([
    AllowNull(false),
    Column,
    __metadata("design:type", String)
], Geolocation.prototype, "city", void 0);
__decorate([
    AllowNull(false),
    Column,
    __metadata("design:type", Number)
], Geolocation.prototype, "latitude", void 0);
__decorate([
    AllowNull(false),
    Column,
    __metadata("design:type", Number)
], Geolocation.prototype, "longitude", void 0);
__decorate([
    HasMany(() => Slayer),
    __metadata("design:type", Array)
], Geolocation.prototype, "slayers", void 0);
Geolocation = __decorate([
    Table({
        timestamps: false,
        underscored: true,
    })
], Geolocation);
export { Geolocation };
