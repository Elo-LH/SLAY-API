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
exports.Geolocation = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Slayer_js_1 = require("./Slayer.js");
// import { SlayerSearch } from './SlayerSearch.js'
let Geolocation = class Geolocation extends sequelize_typescript_1.Model {
    city;
    latitude;
    longitude;
    slayers;
};
exports.Geolocation = Geolocation;
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Geolocation.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Geolocation.prototype, "latitude", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Geolocation.prototype, "longitude", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Slayer_js_1.Slayer),
    __metadata("design:type", Array)
], Geolocation.prototype, "slayers", void 0);
exports.Geolocation = Geolocation = __decorate([
    (0, sequelize_typescript_1.Scopes)(() => ({
        slayers: {
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
                    model: Slayer_js_1.Slayer,
                    through: { attributes: [] },
                },
            ],
        },
    })),
    (0, sequelize_typescript_1.Table)({
        tableName: 'geolocation',
        timestamps: false,
        underscored: true,
    })
], Geolocation);
